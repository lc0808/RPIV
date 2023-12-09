import React, { useEffect, useState } from 'react';
import FuncionarioComponent from '../../components/FuncionarioComponent';
import TopBar from '../../components/TopBar';
import { api } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';

export default function ListarFuncionario() {
  // Inicializa o estado com um objeto contendo uma propriedade 'content' que é um array de Funcionario
  const [data, setData] = useState<{ content: Funcionario[] }>({ content: [] });
  const [numberOfFuncionarios, setNumberOfFuncionarios] = useState(0);
  const [numberOfViagens, setNumberOfViagens] = useState(0);

  const navegar = useNavigate();

  const handleCadastrar = () => {
    navegar('/funcionarios/cadastrar');
  };

  useEffect(() => {
    // Faz uma chamada para a API para obter dados de funcionários
    api
      .get('/funcionarios')
      .then((response) => {
        // Atualiza o estado com os dados recebidos da API
        setData(response.data);
        setNumberOfFuncionarios(response.data.content.length);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });

    api
      .get('/viagenspesquisa')
      .then((response) => {
        setNumberOfViagens(response.data.content.length);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div>
      <TopBar />

      <div className="options-pages">
        <div>
          <Link to="/funcionarios" className="a" id="paginitial">
            Funcionários
          </Link>
          <div id="qnt-funcionarios" className="sub-info">
            {numberOfFuncionarios} funcionários
          </div>
        </div>
        <div>
          <div>
            <Link to="/viagenspesquisador" className="a" id="paginitial">
              Viagens Pesquisadores
            </Link>
          </div>
          <div className="sub-info">{numberOfViagens} viagens</div>
        </div>
      </div>

      <div className="div-btn">
        <button
          id="btn-adc-funcionario"
          className="btn-adc-funcionario"
          onClick={handleCadastrar}
        >
          Adicionar funcionário
        </button>
      </div>

      <div id="funcionarios" className="list-funcionarios">
        {data.content.map((funcionario, index) => (
          // Renderiza o componente FuncionarioComponent para cada funcionário
          <FuncionarioComponent key={index} funcionario={funcionario} />
        ))}
      </div>
    </div>
  );
}
