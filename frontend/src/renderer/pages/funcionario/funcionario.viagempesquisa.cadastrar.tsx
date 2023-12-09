import { Form, useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import './funcionario.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { api } from '../../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type TipoViagem = {
  custos: string;
  objetivo: string;
  destino: string;
  data_inicio: string;
  data_fim: string;
  idFuncionario: string;
};

export default function CadastrarViagemPesquisador() {
  const navegar = useNavigate();

  const [viagemPesquisador, setViagemPesquisador] = useState<TipoViagem>({
    custos: '',
    objetivo: '',
    destino: '',
    data_inicio: '',
    data_fim: '',
    idFuncionario: '',
  });

  // const handleChange = (
  //   fieldName: keyof TipoFuncionario | keyof TipoFuncionario['endereco'],
  //   value: string,
  // ) => {
  //   setFuncionario((prevFuncionario) => {
  //     if (fieldName in prevFuncionario) {
  //       return {
  //         ...prevFuncionario,
  //         [fieldName]: value,
  //       };
  //     } else {
  //       return {
  //         ...prevFuncionario,
  //         endereco: {
  //           ...prevFuncionario.endereco,
  //           [fieldName as keyof TipoFuncionario['endereco']]: value,
  //         },
  //       };
  //     }
  //   });
  // };

  const handleChange = (fieldName: keyof TipoViagem, value: string) => {
    setViagemPesquisador((prevViagemPesquisador) => ({
      ...prevViagemPesquisador,
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
        navegar('/viagenspesquisador');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleCadastro(e: FormEvent) {
    e.preventDefault();

    await api
      .post(
        `/viagenspesquisa/cadastrar/${viagemPesquisador.idFuncionario}`,
        viagemPesquisador,
      )
      .then((data) => {
        navegar('/viagenspesquisador');
        toast.success('Viagem cadastrada com sucesso!');
      })
      .catch((err) => {
        toast.error('Viagem já existente ou campos inválidos!');
      });
  }

  return (
    <div>
      <TopBar />

      <form onSubmit={(e) => handleCadastro(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Cadastrar Viagem de Pesquisador</h1>
              <div id="msg"></div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  id="name"
                  name="name"
                  value={viagemPesquisador.objetivo}
                  onChange={(e) => handleChange('objetivo', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Objetivo da Viagem
                </label>
              </div>

              <div className="div-content">
                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    id="name"
                    name="name"
                    value={viagemPesquisador.destino}
                    onChange={(e) => handleChange('destino', e.target.value)}
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Destino
                  </label>
                </div>

                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    id="name"
                    name="name"
                    value={viagemPesquisador.custos}
                    onChange={(e) => handleChange('custos', e.target.value)}
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Custos
                  </label>
                </div>
              </div>

              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  id="name"
                  name="name"
                  value={viagemPesquisador.idFuncionario}
                  onChange={(e) =>
                    handleChange('idFuncionario', e.target.value)
                  }
                  required
                />
                <label htmlFor="name" className="input-label">
                  Id do Pesquisador
                </label>
              </div>

              <div className="div-content">
                <div className="input-container">
                  <input
                    type="date"
                    className="input-text"
                    name="data_adquirida"
                    value={viagemPesquisador.data_inicio}
                    onChange={(e) => {
                      const data = e.target.value;

                      handleChange('data_inicio', data);
                    }}
                    required
                  />
                  <label
                    htmlFor="data_adquirida"
                    className="input-label"
                  ></label>
                </div>
                <div className="input-container">
                  <input
                    type="date"
                    className="input-text"
                    name="data_adquirida"
                    value={viagemPesquisador.data_fim}
                    onChange={(e) => {
                      const data = e.target.value;

                      handleChange('data_fim', data);
                    }}
                    required
                  />
                  <label
                    htmlFor="data_adquirida"
                    className="input-label"
                  ></label>
                </div>
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
