import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import SectionsItens from './SectionsItens';

export default function Sections() {
  const navegar = useNavigate();
  const handleVerMais = () => {
    navegar('/secao');
  };

  const [data, setData] = useState<{ content: Secao[] }>({ content: [] });

  useEffect(() => {
    // Faz uma chamada para a API para obter dados de funcionários
    api
      .get('/secao')
      .then((response) => {
        // Atualiza o estado com os dados recebidos da API
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div>
      <div className="secoes">
        <div className="secoes-title-box">
          <div className="secoes-second-title-box">
            <div className="secoes-title">Seções </div>
          </div>
          <div className="ver-mais-box">
            <div className="ver-mais-border-box">
              <Button children="Ver mais" onClick={handleVerMais} />
            </div>
          </div>
        </div>
        <div className="secoes-block">
          {data.content.map((secao, index) => (
            <SectionsItens key={index} secao={secao} />
          ))}
        </div>
      </div>
    </div>
  );
}
