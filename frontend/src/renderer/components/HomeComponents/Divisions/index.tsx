import React from 'react';
import DivisionImage from 'assets/divisoes.jpg';
import Button from '../../Button';
import { useNavigate } from 'react-router-dom';

function Divisions() {
  const navegar = useNavigate();
  const handleVerMais = () => {
    navegar('/divisao');
  };

  return (
    <div className="divisoes-predios">
      <div className="divisoes">
        <img className="img-divisoes" src={DivisionImage} alt="Divisoes" />
        <div className="divisoes-first-rec">
          <div className="divisoes-second-rec"></div>
          <div className="divisoes-content">
            <div className="divisoes-tittles">
              <div className="divisoes-tittles-primary">Divisões</div>
              <div className="divisoes-tittles-secondary">
                Divisões existentes dentro do Museu Pampa
              </div>
            </div>
            <div className="button-divisoes-ver-maiss">
              <div className="button-divisoes">
                <Button
                  children="Ver mais"
                  className="button-divisoes-content-text"
                  onClick={handleVerMais}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Divisions;
