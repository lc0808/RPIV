import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import { api } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import PecaComponent from '../../components/PecaComponent';

export default function ListarEmprestimosPecas() {
  // Inicializa o estado com um objeto contendo uma propriedade 'content' que é um array de Funcionario
  const [data, setData] = useState<{ content: Peca[] }>({ content: [] });
  const [numberOfPecas, setNumberOfPecas] = useState(0);
  const [numberOfEmprestimoPecas, setNumberOfEmprestimoPecas] = useState(0);

  const navegar = useNavigate();

  const handleCadastrar = () => {
    navegar('/emprestimopecas/emprestar');
  };

  useEffect(() => {
    // Defina o valor do filtro que você deseja usar
    const filtro = "emprestadas";

    // Faz uma chamada para a API para obter dados de funcionários
    api
      .get('/pecas', {
        params: {
          filtro: filtro
        }})
      .then((response) => {
        // Atualiza o estado com os dados recebidos da API
        setData(response.data);
        setNumberOfEmprestimoPecas(response.data.content.length);
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });

      api
      .get('/pecas')
      .then((response) => {
        setNumberOfPecas(response.data.content.length);
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
          <Link to="/pecas" className="a" id="paginitial">
            Peças
          </Link>
          <div id="qnt-funcionarios" className="sub-info">
            {numberOfPecas} peças
          </div>
        </div>
        <div>
          <div>
            <Link to="/emprestimopecas" className="a" id="paginitial">
              Empréstimo de Peças
            </Link>
          </div>
          <div className="sub-info">{numberOfEmprestimoPecas} empréstimos</div>
        </div>
      </div>

      <div className="div-btn">
        <Button
          className="btn-adc-funcionario"
          children="Realizar Empréstimo"
          onClick={handleCadastrar}
        ></Button>
      </div>

      <div>
        <div id="funcionarios" className="list-funcionarios">
          {data.content.map((peca, index) => (
            <PecaComponent key={index} peca={peca} opcaoBtn='Confirmar devolução' emprestimo='true'/>
          ))}
        </div>
      </div>
    </div>
  );
}
