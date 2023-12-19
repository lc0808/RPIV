import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoInspecao = {
  id: string;
  titulo: string;
  descricao: string;
};

export default function CadastrarInspecao() {
  const navegar = useNavigate();

  const [inspecao, setInspecao] = useState<TipoInspecao>({
    id: '',
    titulo: '',
    descricao: '',
  });

  const handleChange = (fieldName: keyof TipoInspecao, value: string) => {
    setInspecao((prevInspecao) => ({
      ...prevInspecao,
      [fieldName]: value,
    }));
  };

  const handleCancelar = () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Todos os dados preenchidos serão descartados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Cadastro cancelado',
          'Todos os dados preenchidos foram descartados.',
          'success',
        );
        navegar('/inspecao');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleCadastro(e: FormEvent) {
    e.preventDefault();

    await api
      .post('/inspecao/nova', inspecao)
      .then((data) => {
        navegar('/inspecao');
        toast.success('Inspeção cadastrada com sucesso!');
      })
      .catch((err) => {
        toast.error('Inspeção já existente ou campos inválidos!');
      });
  }

  return (
    <div>
      <TopBar />

      <form onSubmit={(e) => handleCadastro(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Cadastrar Inspeção</h1>
              <div id="msg"></div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="nome"
                  value={inspecao.titulo}
                  onChange={(e) => handleChange('titulo', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Titulo da Inspeção
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="predio"
                  value={inspecao.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Descrição
                </label>
              </div>

              <div className="btns">
                <button
                  type="button"
                  id="cancel-btn"
                  className="cancel-btn"
                  onClick={handleCancelar}
                  defaultChecked
                >
                  Cancelar
                </button>

                <input
                  type="submit"
                  className="input-submit"
                  id="submit"
                  value="Cadastrar"
                />
              </div>
            </div>
          </div>
          <div className="background-area"></div>
        </div>
      </form>
    </div>
  );
}
