import React from 'react';
import './funcionarioComponent.style.css';
import iconCargo from 'assets/icons/cargo.png';
import iconTelefone from 'assets/icons/telefone.png';
import iconEndereco from 'assets/icons/endereco.png';
import { Link } from 'react-router-dom';

type FuncionarioComponentProps = {
  funcionario: Funcionario;
};

function FuncionarioComponent({ funcionario }: FuncionarioComponentProps) {
  return (
    <div className="funcionario-box">
      <div className="img-funcionario"></div>
      <div className="funcionario-content">
        <div className="info-funcionario">
          <div className="name-funcionario">{funcionario.nome}</div>
          <div className="div-dados">
            <img src={iconCargo} alt="" id="img-endereco" />
            <span>
              {funcionario.role ? funcionario.role : 'Cargo não informado'}
            </span>
          </div>
          <div className="div-dados">
            <img src={iconTelefone} alt="" id="img-endereco" />
            <span>{funcionario.telefone}</span>
          </div>
          <div className="div-dados">
            <img src={iconEndereco} alt="" id="img-endereco" />
            <span>
              {`${funcionario.endereco.rua} No.${funcionario.endereco.numero} ${funcionario.endereco.bairro}, ${funcionario.endereco.cidade}`}
            </span>
          </div>
        </div>
        <div className="horizontal-bar">
          <hr />
        </div>
        <div>
          <Link to={`/funcionarios/${funcionario.id}/editar`}>
            <button className="btn-editar">Editar informações</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FuncionarioComponent;
