import React from 'react';
import 'src/renderer/components/FuncionarioComponent/funcionarioComponent.style.css';
import iconCargo from 'assets/icons/cargo.png';
import iconTelefone from 'assets/icons/telefone.png';
import iconEndereco from 'assets/icons/endereco.png';
import iconDestino from 'assets/icons/destino.png';
import iconObjetivo from 'assets/icons/objetivo.png';
import iconDataInicio from 'assets/icons/data_inicio.png';
import iconDataFim from 'assets/icons/data_fim.png';
import iconCusto from 'assets/icons/custo.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { api } from '../../api/api';
import { toast } from 'react-toastify';

type ViagensPesquisaComponentProps = {
  viagensPesquisa: ViagensPesquisa;
};

export default function ViagensPesquisaComponent({
  viagensPesquisa,
}: ViagensPesquisaComponentProps) {
  function formatarData(dataString: string): string {
    const data = new Date(dataString);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Note que os meses são baseados em zero
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function handleAprovar() {
    Swal.fire({
      title: 'Deseja realmente aprovar a viagem?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api
          .put(`viagenspesquisa/aprovar/${viagensPesquisa.id}`)
          .then((data) => {
            toast.success('Viagem aprovada com sucesso!');
          })
          .catch((err) => {
            toast.error('Não foi possível aprovar a viagem.');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  return (
    <div className="funcionario-box">
      <div className="img-funcionario"></div>
      <div className="funcionario-content">
        <div className="info-funcionario">
          <div className="name-funcionario">{viagensPesquisa.pesquisador}</div>

          <div className="div-dados">
            <img src={iconObjetivo} alt="" id="img-endereco" />
            <span>{viagensPesquisa.objetivo}</span>
          </div>
          <div className="div-dados">
            <img src={iconDestino} alt="" id="img-endereco" />
            <span>{`${viagensPesquisa.destino}`}</span>
          </div>
          <div className="div-dados">
            <img src={iconCusto} alt="" id="img-endereco" />
            <span>{`${viagensPesquisa.custos},00`}</span>
          </div>
          <div className="div-dados">
            <img src={iconDataInicio} alt="" id="img-endereco" />
            <span>{`Data ida: ${formatarData(
              viagensPesquisa.data_inicio,
            )}`}</span>
          </div>
          <div className="div-dados">
            <img src={iconDataFim} alt="" id="img-endereco" />
            <span>{`Data volta: ${formatarData(
              viagensPesquisa.data_fim,
            )}`}</span>
          </div>
        </div>
        <div className="horizontal-bar">
          <hr />
        </div>
        <div>
          <Link to={`/viagenspesquisador`}>
            <button
              className={`btn-editar ${
                viagensPesquisa.aprovada ? 'viagem-aprovada' : ''
              }`}
              disabled={viagensPesquisa.aprovada}
              onClick={handleAprovar}
            >
              {viagensPesquisa.aprovada ? 'Viagem Aprovada' : 'Aprovar Viagem'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
