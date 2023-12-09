import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoPeca = {
  nome: string;
  autor: string;
  curador: string;
  data_adquirida: string;
  descricao_peca: string;
  estado_conservacao: string;
  secao: string;
};

export default function CadastrarPeca() {
  const navegar = useNavigate();

  const [peca, setPeca] = useState<TipoPeca>({
    nome: '',
    autor: '',
    curador: '',
    data_adquirida: '',
    descricao_peca: '',
    estado_conservacao: '',
    secao: '',
  });

  const handleChange = (fieldName: keyof TipoPeca, value: string) => {
    setPeca((prevPeca) => ({
      ...prevPeca,
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
        navegar('/pecas');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleCadastro(e: FormEvent) {
    e.preventDefault();

    console.log(peca);

    await api
      .post('/pecas/criar', peca)
      .then((data) => {
        navegar('/pecas');
        toast.success('Peça cadastrada com sucesso!');
      })
      .catch((err) => {
        toast.error('Peça já existente ou campos inválidos!');
      });
  }

  return (
    <div>
      <TopBar />

      <form onSubmit={(e) => handleCadastro(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Cadastrar Peça</h1>
              <div id="msg"></div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="nome"
                  value={peca.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Nome Peça
                </label>
              </div>
              <div className="div-content">
                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    name="autor"
                    value={peca.autor}
                    onChange={(e) => handleChange('autor', e.target.value)}
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Autor
                  </label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    name="curador"
                    value={peca.curador}
                    onChange={(e) => handleChange('curador', e.target.value)}
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Curador
                  </label>
                </div>
              </div>
              <div className="div-content">
                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    name="estado_conservacao"
                    value={peca.estado_conservacao}
                    onChange={(e) =>
                      handleChange('estado_conservacao', e.target.value)
                    }
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Estado de Conservação
                  </label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    name="secao"
                    value={peca.secao}
                    onChange={(e) => handleChange('secao', e.target.value)}
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Seção
                  </label>
                </div>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="descricao"
                  value={peca.descricao_peca}
                  onChange={(e) =>
                    handleChange('descricao_peca', e.target.value)
                  }
                  required
                />
                <label htmlFor="name" className="input-label">
                  Descrição
                </label>
              </div>

              <div className="input-container">
                <input
                  type="date"
                  className="input-text"
                  name="data_adquirida"
                  value={peca.data_adquirida}
                  onChange={(e) => {
                    const data = e.target.value;

                    handleChange('data_adquirida', data);
                  }}
                  required
                />
                <label htmlFor="data_adquirida" className="input-label"></label>
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
