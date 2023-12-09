import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoEmprestimo = {
  peca: string;
  instituto: string;
  localizacao: string;
  data_devolucao: string;
};

export default function CadastrarEmprestimo() {
  const navegar = useNavigate();

  const obterDataAtual = () => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };


  const [emprestimo, setEmprestimo] = useState<TipoEmprestimo>({
    peca: '',
    instituto: '',
    localizacao: '',
    data_devolucao: obterDataAtual(),
  });

  const handleChange = (fieldName: keyof TipoEmprestimo, value: string) => {
    setEmprestimo((prevEmprestimo) => ({
      ...prevEmprestimo,
      [fieldName]: value,
    }));
  };

  const handleCancelar = () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Todos os dados preenchidos serão descartados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Emprestimo cancelado',
          'Todos os dados preenchidos foram descartados.',
          'success',
        );
        navegar('/emprestimopecas');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  async function handleCadastro(e: FormEvent) {
    e.preventDefault();

    await api
      .put(`/pecas/emprestar/${emprestimo.peca}`,
        {
          ...emprestimo,
          data_devolucao: new Date(emprestimo.data_devolucao).toISOString()
        })
      .then((data) => {
        navegar('/emprestimopecas');
        toast.success('Peça emprestada com sucesso!');
      })
      .catch((err) => {
        toast.error('Erro ao emprestar peça. Por favor, verifique os campos e tente novamente.');
      });
  }

  const [data, setData] = useState<{ content: Peca[] }>({ content: [] });

  useEffect(() => {
    // Faz uma chamada para a API para obter dados de funcionários
    api
      .get('/pecas')
      .then((response) => {
        const result = response.data.content.filter((item: Peca) => {
          return item.emprestada === null;
        })
        console.log(result);
        setData({content: result});
        console.log(data);
      })
      // .then((response) => {
      //   console.log(response.data)
      //   setData(response.data);
      // })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <div>
      <TopBar />

      <form onSubmit={(e) => handleCadastro(e)}>
        <div className="box">
          <div className="create-area">
            <div className="create-area-content">
              <h1 className="title">Emprestar Peça</h1>
              <div id="msg"></div>

              <select
                value={emprestimo.peca}
                onChange={(e) => handleChange('peca', e.target.value)}
                className="appearance-none hover:placeholder-shown:bg-emerald-500 relative text-black bg-transparent ring-0 outline-none border border-gray-300 placeholder-neutral-700 text-sm rounded-lg focus:ring-black-500 focus:border-gray-300 block p-2.5 w-full"
                placeholder="Selecione uma peça"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'medium', marginBottom: '1.25em' }}
              >
                <option value="" disabled>
                  Selecione uma peça
                </option>
                {data.content.map((peca) => (
                  <option key={peca.id as string} value={peca.id as string}>
                    {peca.nome}
                  </option>
                ))}
              </select>
              <div className="div-content">
                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    name="autor"
                    value={emprestimo.instituto}
                    onChange={(e) => handleChange('instituto', e.target.value)}
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Instituto
                  </label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    className="input-text"
                    name="curador"
                    value={emprestimo.localizacao}
                    onChange={(e) => handleChange('localizacao', e.target.value)}
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Localização
                  </label>
                </div>
              </div>

              <div className="input-container">
                <input
                  type="date"
                  className="input-text"
                  name="data_adquirida"
                  value={emprestimo.data_devolucao}
                  onChange={(e) => {
                    const data = e.target.value;

                    handleChange('data_devolucao', data);
                  }}
                  required
                />
                <label htmlFor="data_adquirida" className="input-label">Data prevista de devolução</label>
              </div>

              <div className="btns">
                <button
                  type="button"
                  id="cancel-btn"
                  className="cancel-btn"
                  onClick={handleCancelar}
                  defaultChecked
                >
                  Cancelar
                </button>

                <input
                  type="submit"
                  className="input-submit"
                  id="submit"
                  value="Emprestar"
                />
              </div>
            </div>
          </div>
          <div className="background-area"></div>
        </div>
      </form>
    </div>
  );
}
