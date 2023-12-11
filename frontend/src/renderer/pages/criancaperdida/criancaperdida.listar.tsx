import { SetStateAction, useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import ListComponent from '../../components/List';
import Button from '../../components/Button';

export default function ListarSecao() {
  const [data, setData] = useState<{ content: CriancaPerdida[] }>({ content: [] });

  const navegar = useNavigate();

  useEffect(() => {
    // Faz uma chamada para a API para obter dados de funcionários
    api
      .get('/criancaperdida')
      .then((response: { data: SetStateAction<{ content: Secao[]; }>; }) => {
        // Atualiza o estado com os dados recebidos da API
        setData(response.data);
      })
      .catch((error: any) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  const handleCadastrar = () => {
    navegar('/criancaperdida/cadastrar');
  };
  return (
    <div>
      <TopBar />

      <div className="div-btn">
        <Button
          children="Adicionar Seção"
          className="btn-adc-funcionario"
          onClick={handleCadastrar}
        />
      </div>

      <div id="funcionarios" className="list-funcionarios">
        {data.content.map((criancaPerdida, index) => (
          // Renderiza o componente FuncionarioComponent para cada funcionário
          <ListComponent key={index} criancaperdida={criancaPerdida} />
        ))}
      </div>
    </div>
  );
}
