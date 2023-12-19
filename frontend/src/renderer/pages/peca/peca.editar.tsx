import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoPeca = {
  nome: string;
  autor: string;
  curador: string;
  descricao_peca: string;
  estado_conservacao: string;
};

export default function EditarPeca() {
  const navegar = useNavigate();
  const { id } = useParams();

  const [peca, setPeca] = useState<TipoPeca>({
    nome: '',
    autor: '',
    curador: '',
    descricao_peca: '',
    estado_conservacao: '',
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
          'Edição cancelada',
          'Todos os dados preenchidos foram descartidos.',
          'success',
        );
        navegar('/pecas');
      }
    });
  };

  async function handleEditar(e: FormEvent) {
    e.preventDefault();

    await api
      .put(`/pecas/${id}`, {
        ...peca,
        // Não inclua os campos indesejados no objeto enviado à API
      })
      .then(() => {
        navegar('/pecas');
        toast.success('Peça editada com sucesso!');
      })
      .catch(() => {
        toast.error('Peça com campos inválidos!');
      });
  }

  useEffect(() => {
    api
      .get(`/pecas/d/${id}`)
      .then((response) => {
        const { data_adquirida, ...rest } = response.data;
        const formattedData = new Date(data_adquirida).toLocaleDateString('pt-BR');

        setPeca((prevPeca) => ({
          ...prevPeca,
          ...rest,
          data_adquirida: formattedData,
        }));
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, [id]);

  return (
    <div>
      <TopBar />

      <form onSubmit={(e) => handleEditar(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Editar Peça</h1>
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
                  value="Salvar"
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
