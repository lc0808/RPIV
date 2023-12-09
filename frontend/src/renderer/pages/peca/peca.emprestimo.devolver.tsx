import Swal from "sweetalert2";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import TopBar from "../../components/TopBar";


export default function DevolverPeca() {
  const navegar = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("vai tomar no cu")
    const confirmarDevolucao = async () => {
      try {
        await api.put(`/pecas/devolver/${id}`);
        toast.success('Devolução de peça realizada com sucesso!');
        navegar('/emprestimopecas');
      } catch (error) {
        console.error('Erro ao devolver peça:', error);
        toast.error('Não foi possível realizar a devolução da peça.');
        navegar('/emprestimopecas');
      }
    };

    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você está confirmando a devolução da peça em questão',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmarDevolucao();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navegar('/emprestimopecas');
      }
    });

  }, [id, navegar]);

  return (

    <div style={{ backgroundColor: '#F5FAFF', width: '100%'}}>
      <TopBar />
    </div>
  );
}
