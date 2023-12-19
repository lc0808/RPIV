import TopBar from '../../components/TopBar';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import InspecaoComponent from '../../components/InspecaoComponent';

export default function ListarInspecao() {
  const [data, setData] = useState<Inspecao[]>([]); // Alterado para um array diretamente

  const navegar = useNavigate();

  useEffect(() => {
    api
      .get('/inspecao')
      .then((response) => {
        console.log('Dados da API:', response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  const handleCadastrar = () => {
    navegar('/inspecao/cadastrar');
  };

  return (
    <div>
      <TopBar />

      <div className="div-btn">
        <Button
          children="Adicionar Inspeção"
          className="btn-adc-funcionario"
          onClick={handleCadastrar}
        />
      </div>

      <div id="funcionarios" className="list-funcionarios">
        {data.map((inspecao, index) => (
          <InspecaoComponent key={index} inspecao={inspecao} />
        ))}
      </div>
    </div>
  );
}
