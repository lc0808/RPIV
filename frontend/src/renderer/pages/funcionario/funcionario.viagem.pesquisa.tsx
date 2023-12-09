import React, { useEffect, useState } from 'react';
import FuncionarioComponent from '../../components/FuncionarioComponent';
import TopBar from '../../components/TopBar';
import { api } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import ViagensPesquisaComponent from '../../components/ViagensPesquisa';

export default function ListarViagensPesquisador() {
  // Inicializa o estado com um objeto contendo uma propriedade 'content' que é um array de Funcionario
  const [data, setData] = useState<{ content: ViagensPesquisa[] }>({
    content: [],
  });
  const [numberOfFuncionarios, setNumberOfFuncionarios] = useState(0);
  const [numberOfViagens, setNumberOfViagens] = useState(0);

  const navegar = useNavigate();

  const handleCadastrar = () => {
    navegar('/viagenspesquisador/cadastrar');
  };

  useEffect(() => {
    // Faz uma chamada para a API para obter dados de funcionários
    api
      .get('/viagenspesquisa')
      .then((response) => {
        // Atualiza o estado com os dados recebidos da API
        setData(response.data);
        setNumberOfViagens(response.data.content.length);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });

    api
      .get('/funcionarios')
      .then((response) => {
        setNumberOfFuncionarios(response.data.content.length);
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
          Adicionar Viagem
        </button>
      </div>

      <div id="funcionarios" className="list-funcionarios">
        {data.content.map((viagensPesquisa, index) => (
          // Renderiza o componente FuncionarioComponent para cada funcionário
          <ViagensPesquisaComponent
            key={index}
            viagensPesquisa={viagensPesquisa}
          />
        ))}
      </div>
    </div>
  );
}
