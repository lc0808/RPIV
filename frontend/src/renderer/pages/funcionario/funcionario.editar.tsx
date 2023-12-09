import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/api';
import { toast } from 'react-toastify';
import { FormEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';

type TipoFuncionario = {
  nome: string;
  cpf: string;
  rg: string;
  telefone: string;
  role: string;
  salario: string;
  endereco: {
    rua: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    numero: string;
  };
  demitido: string;
};

export default function EditarFuncionario() {
  const navegar = useNavigate();

  const { id } = useParams();

  const [funcionario, setFuncionario] = useState<TipoFuncionario>({
    nome: '',
    cpf: '',
    rg: '',
    telefone: '',
    role: '',
    salario: '',
    endereco: {
      rua: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
      numero: '',
    },
    demitido: '',
  });

  console.log(funcionario);

  // const handleChange = (fieldName: keyof TipoFuncionario, value: string) => {
  //   setFuncionario((prevFuncionario) => ({
  //     ...prevFuncionario,
  //     [fieldName]: value,
  //   }));
  // };

  const handleChange = (
    fieldName: keyof TipoFuncionario | keyof TipoFuncionario['endereco'],
    value: string,
  ) => {
    setFuncionario((prevFuncionario) => {
      if (fieldName in prevFuncionario) {
        return {
          ...prevFuncionario,
          [fieldName]: value,
        };
      } else {
        return {
          ...prevFuncionario,
          endereco: {
            ...prevFuncionario.endereco,
            [fieldName as keyof TipoFuncionario['endereco']]: value,
          },
        };
      }
    });
  };

  const handleCancelar = () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Todas as alteroções serão descartadas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Edição cancelada', 'Nenhum dado foi alterado.', 'success');
        navegar('/funcionarios');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  const handleInativar = () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'O funcionario será inativado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Swal.fire('Funcionario inativado!', '', 'success');
        await api
          .delete(`/funcionarios/${id}`)
          .then((data) => {
            navegar('/funcionarios');
            toast.success('Funcionario inativado com sucesso!');
            console.log(funcionario);
          })
          .catch((err) => {
            toast.error('Não foi possível inativar Funcionario.');
          });
        navegar('/funcionarios');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  function handleEditar(e: FormEvent) {
    e.preventDefault();

    console.log(funcionario);
    Swal.fire({
      title: 'Deseja aplicar alterações?',
      text: 'Todas as alteroções serão aplicadas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api
          .put(`/funcionarios/${id}`, funcionario)
          .then((data) => {
            navegar('/funcionarios');
            toast.success('Funcionario editado com sucesso!');
          })
          .catch((err) => {
            toast.error('Não foi possível aplicar alterações ao Funcionario.');
          });
        navegar('/funcionarios');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  useEffect(() => {
    // Faz uma chamada para a API para obter dados de funcionários
    api
      .get(`/funcionarios/${id}`)
      .then((response) => {
        // Atualiza o estado com os dados recebidos da API
        setFuncionario(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div>
      <TopBar />
      <form onSubmit={(e) => handleEditar(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Editar Funcionário</h1>
              <div id="msg"></div>
              <div className="input-container">
                <input
                  type="text"
                  className="input-text"
                  id="name"
                  name="name"
                  value={funcionario.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                />
                <label htmlFor="name" className="input-label">
                  Nome Completo
                </label>
              </div>
              <div className="div-content">
                {/* <div className="input-container">
                <input
                  className="input-text"
                  type="text"
                  id="email"
                  name="email"
                  value={funcionario.email}
                  // onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
                <label htmlFor="email" className="input-label">
                  Email
                </label>
              </div> */}
                {/* <div className="input-container">
                <input
                  className="input-text"
                  type="text"
                  id="senha"
                  name="senha"
                  value={funcionario.senha}
                  // onChange={(e) => handleChange('senha', e.target.value)}
                  required
                />
                <label htmlFor="senha" className="input-label">
                  Senha
                </label>
              </div> */}
              </div>
              <div className="div-content">
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={funcionario.cpf}
                    onChange={(e) => handleChange('cpf', e.target.value)}
                    required
                  />
                  <label htmlFor="cpf" className="input-label">
                    CPF
                  </label>
                </div>
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="rg"
                    name="rg"
                    value={funcionario.rg}
                    onChange={(e) => handleChange('rg', e.target.value)}
                    required
                  />
                  <label htmlFor="rg" className="input-label">
                    RG
                  </label>
                </div>
              </div>
              <div className="div-content">
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="telefone"
                    name="telefone"
                    value={funcionario.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    required
                  />
                  <label htmlFor="telefone" className="input-label">
                    Telefone
                  </label>
                </div>
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="salario"
                    name="salario"
                    value={funcionario.salario}
                    onChange={(e) => handleChange('salario', e.target.value)}
                    required
                  />
                  <label htmlFor="salario" className="input-label">
                    Salário
                  </label>
                </div>
              </div>
              {/* <div className="input-container">
              <input
                className="input-text"
                type="text"
                id="cargo"
                name="cargo"
                value={funcionario.role}
                // onChange={(e) => handleChange('role', e.target.value)}
                required
              />
              <label htmlFor="cargo" className="input-label">
                Cargo
              </label>
            </div> */}
              <div className="div-content">
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="rua"
                    name="rua"
                    value={funcionario.endereco.rua}
                    onChange={(e) => handleChange('rua', e.target.value)}
                    required
                  />
                  <label htmlFor="rua" className="input-label">
                    Endereço
                  </label>
                </div>
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={funcionario.endereco.bairro}
                    onChange={(e) => handleChange('bairro', e.target.value)}
                    required
                  />
                  <label htmlFor="bairro" className="input-label">
                    Bairro
                  </label>
                </div>
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="numero"
                    name="numero"
                    value={funcionario.endereco.numero}
                    onChange={(e) => handleChange('numero', e.target.value)}
                    required
                  />
                  <label htmlFor="numero" className="input-label">
                    Número
                  </label>
                </div>
              </div>
              <div className="div-content">
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={funcionario.endereco.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                    required
                  />
                  <label htmlFor="cidade" className="input-label">
                    Cidade
                  </label>
                </div>
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="estado"
                    name="estado"
                    value={funcionario.endereco.estado}
                    onChange={(e) => handleChange('estado', e.target.value)}
                    required
                  />
                  <label htmlFor="estado" className="input-label">
                    Estado
                  </label>
                </div>
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="cep"
                    name="cep"
                    value={funcionario.endereco.cep}
                    onChange={(e) => handleChange('cep', e.target.value)}
                    required
                  />
                  <label htmlFor="cep" className="input-label">
                    CEP
                  </label>
                </div>
              </div>

              <div className="btns">
                <button
                  type="button"
                  id="cancel-btn"
                  className="cancel-btn2"
                  onClick={handleCancelar}
                  defaultChecked
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  id="cancel-btn"
                  className="cancel-btn"
                  onClick={handleInativar}
                  defaultChecked
                >
                  Inativar
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
