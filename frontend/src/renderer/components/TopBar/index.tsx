import { ChangeEvent, FormEvent, useState } from 'react';
import iconUnipampa from 'assets/icons/Museum.png';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';

export default function TopBar() {
  const navegar = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navegar('/');
  };

  return (
    <div className="top-nav">
      <div className="top-nav-left-content">
        <div>
          <Link to="/home" className="a" id="paginitial">
            Página Inicial
          </Link>
          {/* <a href="" className="a" id="paginitial">
            Página Inicial
          </a> */}
        </div>
        <div>
          <a href="" className="a">
            Gerenciar Museu
          </a>
        </div>
      </div>
      <div>
        <img src={iconUnipampa} alt="Unipampa" className="unipampa-logo" />
      </div>
      <div className="top-nav-right-content">
        <div>
          <a href="" className="a">
            Perfil
          </a>
        </div>
        <div>
          <a href="" className="a">
            <Button onClick={handleClick}>Desconectar</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
