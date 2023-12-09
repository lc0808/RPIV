import React from 'react';
import Button from '../../Button';
import { useNavigate } from 'react-router-dom';
import PecaImage from 'assets/predios.jpg';

export default function Pecas() {
  const navegar = useNavigate();

  const handleVerMaisDivisoes = () => {
    navegar('/divisao');
  };

  const handleVerMaisPecas = () => {
    navegar('/pecas');
  };

  const handleVerMaisFuncionarios = () => {
    navegar('/funcionarios');
  };

  return (
    // <div className="predios">
    //   <img className="img-predios" src={PecaImage} alt="Predios" />
    //   <div className="predios-first-rec">
    //     <div className="predios-second-rec"></div>
    //     <div className="predios-content">
    //       <div className="predios-tittles">
    //         <div className="predios-tittles-primary">Peças</div>
    //         <div className="predios-tittles-secondary">
    //           Peças existentes dentro do Museu Pampa
    //         </div>
    //       </div>
    //       <div className="button-predios-ver-mais">
    //         <div className="button-predios">
    //           <div className="button-divisoes">
    //             <Button
    //               children="Ver mais"
    //               className="button-predios-content-text"
    //               onClick={handleVerMais}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="conteudo-inferior">
        <div className="conteudo-colunas">
          <div className="conteudo">
            <div className="button-divisoes">
              <Button
                children="Ver mais"
                className="button-divisoes-content-text"
                onClick={handleVerMaisDivisoes}
              />
            </div>
            <span className="predios-tittles-secondary">
              Divisões existentes dentro do Museu Pampa
            </span>
            <span className="predios-tittles-primary">Divisões</span>
          </div>
          <div className="conteudo2">
            {/* <img src={PecaImage} alt="" /> */}
            <div className="button-divisoes">
              <Button
                children="Ver mais"
                className="button-divisoes-content-text"
                onClick={handleVerMaisPecas}
              />
            </div>
            <span className="predios-tittles-secondary">
              Peças existentes dentro do Museu Pampa
            </span>
            <span className="predios-tittles-primary">Peças</span>
          </div>
          <div className="conteudo3">
            <div className="button-divisoes">
              <Button
                children="Ver mais"
                className="button-divisoes-content-text"
                onClick={handleVerMaisFuncionarios}
              />
            </div>
            <span className="predios-tittles-secondary">
              Funcionários existentes dentro do Museu Pampa
            </span>
            <span className="predios-tittles-primary">Funcionários</span>
          </div>
        </div>
      </div>
    </div>
  );
}
