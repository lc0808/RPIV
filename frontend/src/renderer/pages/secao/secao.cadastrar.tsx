import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoSecao = {
  nome: string;
  descricao: string;
  divisaoId: string;
};

export default function CadastrarSecao() {
  const navegar = useNavigate();

  const [secao, setSecao] = useState<TipoSecao>({
    nome: '',
    descricao: '',
    divisaoId: '',
  });

  const handleChange = (fieldName: keyof TipoSecao, value: string) => {
    setSecao((prevSecao) => ({
      ...prevSecao,
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
        navegar('/secao');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleCadastro(e: FormEvent) {
    e.preventDefault();

    await api
      .post('/secao/nova', secao)
      .then((data) => {
        navegar('/secao');
        toast.success('Seção cadastrada com sucesso!');
      })
      .catch((err) => {
        toast.error('Seção já existente ou campos inválidos!');
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
                  value={secao.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Nome Seção
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="descricao"
                  value={secao.descricao}
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
                  name="divisaoId"
                  value={secao.divisaoId}
                  onChange={(e) => handleChange('divisaoId', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  ID da Divisão
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
