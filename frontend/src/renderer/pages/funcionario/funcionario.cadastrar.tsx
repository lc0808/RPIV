import { Form, useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import './funcionario.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { api } from '../../api/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type TipoFuncionario = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  rg: string;
  telefone: string;
  role: string;
  // salario: string;

  rua: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  numero: string;
};

export default function CadastrarFuncionario() {
  const navegar = useNavigate();

  const [funcionario, setFuncionario] = useState<TipoFuncionario>({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    rg: '',
    telefone: '',
    role: '',
    // salario: '',
    rua: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    numero: '',
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

  const handleChange = (fieldName: keyof TipoFuncionario, value: string) => {
    setFuncionario((prevFuncionario) => ({
      ...prevFuncionario,
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
        navegar('/funcionarios');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleCadastro(e: FormEvent) {
    e.preventDefault();

    await api
      .post('/funcionarios/novo', funcionario)
      .then((data) => {
        navegar('/funcionarios');
        toast.success('Funcionario cadastrado com sucesso!');
      })
      .catch((err) => {
        toast.error('Funcionario já existente ou campos inválidos!');
      });
  }

  return (
    <div>
      <TopBar />

      <form onSubmit={(e) => handleCadastro(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Cadastrar Funcionário</h1>
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
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="email"
                    name="email"
                    value={funcionario.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                  <label htmlFor="email" className="input-label">
                    Email
                  </label>
                </div>
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="senha"
                    name="senha"
                    value={funcionario.senha}
                    onChange={(e) => handleChange('senha', e.target.value)}
                    required
                  />
                  <label htmlFor="senha" className="input-label">
                    Senha
                  </label>
                </div>
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
                    // value={funcionario.salario}
                    // onChange={(e) => handleChange('salario', e.target.value)}
                    required
                  />
                  <label htmlFor="salario" className="input-label">
                    Salário
                  </label>
                </div>
              </div>
              <div className="input-container">
                <input
                  className="input-text"
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={funcionario.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  required
                />
                <label htmlFor="cargo" className="input-label">
                  Cargo
                </label>
              </div>
              <div className="div-content">
                <div className="input-container">
                  <input
                    className="input-text"
                    type="text"
                    id="rua"
                    name="rua"
                    value={funcionario.rua}
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
                    value={funcionario.bairro}
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
                    value={funcionario.numero}
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
                    value={funcionario.cidade}
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
                    value={funcionario.estado}
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
                    value={funcionario.cep}
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
