import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoDivisao = {
  nome: string;
  predio: string;
  sala: string;
};

export default function CadastrarDivisao() {
  const navegar = useNavigate();

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
          'Todos os dados preenchidos foram descartados.',
          'success',
        );
        navegar('/divisao');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleCadastro(e: FormEvent) {
    e.preventDefault();

    await api
      .post('/divisao/nova', divisao)
      .then((data) => {
        navegar('/divisao');
        toast.success('Divisão cadastrada com sucesso!');
      })
      .catch((err) => {
        toast.error('Divisão já existente ou campos inválidos!');
      });
  }

  return (
    <div>
      <TopBar />

      <form onSubmit={(e) => handleCadastro(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Cadastrar Divisão</h1>
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
                  Nome Divisao
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
                  Predio
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
