import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import 'src/renderer/components/List/ListComponent.style.css';
import iconObjetivo from 'assets/icons/objetivo.png';
import iconPredio from 'assets/icons/predio.png';
import iconSala from 'assets/icons/sala.png';

type DivisaoComponentProps = {
  divisao: Divisao;
};

function ListComponent({ divisao }: DivisaoComponentProps) {
  console.log(divisao);
  return (
    <div className="funcionario-box">
      <div className="funcionario-content">
        <div className="info-funcionario">
          <div className="name-funcionario">{divisao.nome}</div>
          <div className="div-dados">
            <img src={iconObjetivo} alt="" id="img-endereco" />
            Nome: {divisao.nome}
          </div>
          <div className="div-dados">
            <img src={iconPredio} alt="" id="img-endereco" />
            <span>Predio:{divisao.predio}</span>
          </div>
          <div className="div-dados">
            <img src={iconSala} alt="" id="img-endereco" />
            Sala: {divisao.sala}
          </div>
        </div>
        <div className="horizontal-bar">
          <hr />
        </div>
        <div>
          <Link to={`/divisao/${divisao.id}/editar`}>
            <button className="btn-editar">Editar informações</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListComponent;
