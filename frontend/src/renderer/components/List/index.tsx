import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import 'src/renderer/components/List/ListComponent.style.css';

type SecaoComponentProps = {
  secao: Secao;
};

function ListComponent({ secao }: SecaoComponentProps) {
  console.log(secao);
  return (
    <div className="funcionario-box">
      <div className="funcionario-content">
        <div className="info-funcionario">
          <div className="name-funcionario">{secao.nome}</div>
          <div className="div-dados">
            {/* <img src={iconCargo} alt="" id="img-endereco" /> */}
            Descrição: {secao.descricao}
          </div>
          <div className="div-dados">
            {/* <img src={iconTelefone} alt="" id="img-endereco" /> */}
            <span>ID da Divisao:{secao.idDivisao}</span>
          </div>
        </div>
        <div className="horizontal-bar">
          <hr />
        </div>
        <div>
          <Link to={`/secao/${secao.id}/editar`}>
            <button className="btn-editar">Editar informações</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListComponent;
