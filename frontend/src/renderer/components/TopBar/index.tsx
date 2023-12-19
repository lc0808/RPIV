import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import iconUnipampa from 'assets/icons/Museum.png';
import './index.css';
import Button from '../Button';

export default function TopBar() {
  const navegar = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleClick = () => {
    localStorage.removeItem('token');
    navegar('/');
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="top-nav">
      <div className="top-nav-left-content">
        <div>
          <Link to="/home" className="a" id="paginitial">
            Página Inicial
          </Link>
        </div>
        <div>
          <a href="#" className="a" onClick={handleDropdownToggle}>
            Gerenciar Museu
          </a>
          {dropdownVisible && (
            <div className="dropdown-content">
              {/* Adicione os links do dropdown aqui */}
              <Link to="/funcionarios">Funcionarios</Link>
              <Link to="/viagenspesquisador">Viagens Pesquisadores</Link>
              <Link to="/pecas">Peças</Link>
              <Link to="/emprestimopecas">Empréstimos de Peças</Link>
              <Link to="/secao">Seções</Link>
              <Link to="/divisao">Divisões</Link>
              <Link to="/inspecao">Inspeções</Link>
              <Link to="/autorizacao-desativacao">Ativar/Desativar Alarmes</Link>
              {/* ... */}
            </div>
          )}
        </div>
      </div>
      <div>
        <img src={iconUnipampa} alt="Unipampa" className="unipampa-logo" />
      </div>
      <div className="top-nav-right-content">
        <div>
          <a href="#" className="a">
            Perfil
          </a>
        </div>
        <div>
          <a href="#" className="a">
            <Button onClick={handleClick}>Desconectar</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
