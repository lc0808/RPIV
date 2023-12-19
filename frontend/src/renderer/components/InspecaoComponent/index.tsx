import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import 'src/renderer/components/List/ListComponent.style.css';
import iconObjetivo from 'assets/icons/objetivo.png';
import iconPredio from 'assets/icons/predio.png';
import iconSala from 'assets/icons/sala.png';

type InspecaoComponentProps = {
  inspecao: Inspecao;
};

function ListComponent({ inspecao }: InspecaoComponentProps) {
  console.log(inspecao);
  return (
    <div className="funcionario-box">
      <div className="funcionario-content">
        <div className="info-funcionario">
          <div className="name-funcionario">{inspecao.titulo}</div>
          <div className="div-dados">
            <img src={iconObjetivo} alt="" id="img-endereco" />
            Descricao: {inspecao.descricao}
          </div>
          <div className="div-dados">
            <img src={iconPredio} alt="" id="img-endereco" />
            <span>ID da inspecao:{inspecao.id}</span>
          </div>
        </div>
        <div className="horizontal-bar">
          <hr />
        </div>
        {/* <div>
          <Link to={`/inspecao/${inspecao.id}/editar`}>
            <button className="btn-editar">Editar informações</button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default ListComponent;
