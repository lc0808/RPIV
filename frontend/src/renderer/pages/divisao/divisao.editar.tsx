import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoDivisao = {
  nome: string;
  predio: string;
  sala: string;
};

export default function EditarDivisao() {
  const navegar = useNavigate();
  const { id } = useParams();

  const [divisao, setDivisao] = useState<TipoDivisao>({
    nome: '',
    predio: '',
    sala: '',
  });

  const handleChange = (fieldName: keyof TipoDivisao, value: string) => {
    setDivisao((prevDivisao) => ({
      ...prevDivisao,
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
          'Todos os dados preenchidos foram descartidos.',
          'success',
        );
        navegar('/divisao');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleEditar(e: FormEvent) {
    e.preventDefault();

    await api
      .put(`/divisao/${id}`, divisao)
      .then((data) => {
        navegar('/divisao');
        toast.success('Divisão editada com sucesso!');
      })
      .catch((err) => {
        toast.error('Divisão com campos inválidos!');
      });
  }

  useEffect(() => {
    // Faz uma chamada para a API para obter dados da divisão
    api
      .get(`/divisao/${id}`)
      .then((response) => {
        // Atualiza o estado com os dados recebidos da API
        setDivisao(response.data);
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
              <h1 className="title">Editar Divisão</h1>
              <div id="msg"></div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="nome"
                  value={divisao.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Nome Divisão
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="predio"
                  value={divisao.predio}
                  onChange={(e) => handleChange('predio', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Prédio
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  name="sala"
                  value={divisao.sala}
                  onChange={(e) => handleChange('sala', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Sala
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
