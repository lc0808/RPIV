import React from 'react';
import './PecaComponent.style.css';
import iconCargo from 'assets/icons/cargo.png';
import iconTelefone from 'assets/icons/telefone.png';
import iconEndereco from 'assets/icons/endereco.png';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar';
import { data } from 'autoprefixer';

type PecaComponentProps = {
  peca: Peca;
  opcaoBtn?: string;
  emprestimo?: string;
};

function PecaComponent({ peca, opcaoBtn, emprestimo }: PecaComponentProps) {
  console.log(peca);

  function formatarData(dataString: string): string {
    const data = new Date(dataString);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Note que os meses são baseados em zero
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
  return (
    <div>
      <div className="funcionario-box">
        <div className="funcionario-content">
          <div className="info-funcionario">
            <div className="name-funcionario">{peca.nome}</div>
            <div className="div-dados"><strong>Descrição:</strong> {peca.descricao}</div>
            <div className="div-dados">
              <span><strong>Autor:</strong> {peca.autor}</span>
            </div>
            <div className="div-dados">
              <span><strong>Curador:</strong> {peca.curador}</span>
            </div>
            {/* <div className="div-dados">
              <span>ID da Seção: {peca.secao}</span>
            </div>
            <div className="div-dados">
              <span>ID da Peça: {peca.id}</span>
            </div> */}
            <div className="div-dados">
              <span><strong>Estado de conservação:</strong> {peca.estado_conservacao}</span>
            </div>
            {peca.emprestada ? (
              <div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span><strong>Peça Emprestada para outra Instituição </strong>(Abaixo informações da instituição)</span>
                </div>
                <div className="div-dados">
                  <span>&nbsp;&nbsp;Instituto: {peca.emprestada.instituto}</span>
                </div>
                <div className="div-dados">
                  <span>&nbsp;&nbsp;Localização: {peca.emprestada.localizacao}</span>
                </div>
                <div className="div-dados">
                  <span>&nbsp;&nbsp;{`Data prevista de devolução: ${formatarData(
              peca.emprestada.data_devolucao,
            )}`}</span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="horizontal-bar">
            <hr />
          </div>
          <div>
            <Link to={emprestimo? `/emprestimopecas/devolver/${peca.id}` : `/pecas/${peca.id}/editar`}>
            <button className="btn-editar">
              {opcaoBtn ? opcaoBtn : 'Editar informações'}
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PecaComponent;
