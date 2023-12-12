import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoExposicao = {
  nome: string;
  descricao: string;
  local: string;
};

export default function CadastrarExposicao() {
  const navegar = useNavigate();

  const [exposicao, setExposicao] = useState<TipoExposicao>({
    nome: '',
    descricao: '',
    local: '',
  });

  const handleChange = (fieldName: keyof TipoExposicao, value: string) => {
    setExposicao((exposicao) => ({
      ...exposicao,
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
        navegar('/exposicao');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleCadastro(e: FormEvent) {
    e.preventDefault();

    await api
      .post('/exposicao/nova', exposicao)
      .then((data: any) => {
        navegar('/exposicao');
        toast.success('Criança perdida cadastrada com sucesso!');
      })
      .catch((err: any) => {
        toast.error('Criança perdida já existente ou campos inválidos!');
      });
  }

  return (
    <div>
      <TopBar />

      <form onSubmit={(e) => handleCadastro(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Cadastrar Seção</h1>
              <div id="msg"></div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="nome"
                  value={exposicao.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Nome Exposicao
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="descricao"
                  value={exposicao.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Descrição
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="local"
                  value={exposicao.local}
                  onChange={(e) => handleChange('local', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Local
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
