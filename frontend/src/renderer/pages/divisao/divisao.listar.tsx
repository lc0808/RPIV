import TopBar from '../../components/TopBar';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import ListComponent from '../../components/List';
import Button from '../../components/Button';
import DivisaoComponent from '../../components/DivisaoComponent';

export default function ListarDivisao() {
  const [data, setData] = useState<{ content: Divisao[] }>({ content: [] });

  const navegar = useNavigate();

  useEffect(() => {
    // Faz uma chamada para a API para obter dados de funcionários
    api
      .get('/divisao')
      .then((response) => {
        // Atualiza o estado com os dados recebidos da API
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  const handleCadastrar = () => {
    navegar('/divisao/cadastrar');
  };
  return (
    <div>
      <TopBar />

      <div className="div-btn">
        <Button
          children="Adicionar Divisão"
          className="btn-adc-funcionario"
          onClick={handleCadastrar}
        />
      </div>

      <div id="funcionarios" className="list-funcionarios">
        {data.content.map((divisao, index) => (
          // Renderiza o componente FuncionarioComponent para cada funcionário
          <DivisaoComponent key={index} divisao={divisao} />
        ))}
      </div>
    </div>
  );
}
