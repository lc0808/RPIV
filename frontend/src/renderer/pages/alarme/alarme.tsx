import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import TopBar from '../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

export default function AutorizacaoDesativacao() {
  const navegar = useNavigate();

  const [motivo, setMotivo] = useState('');
  const [alarmeAtivado, setAlarmeAtivado] = useState(true);
  const [tempoRestante, setTempoRestante] = useState(0);

  const handleChange = (e) => {
    setMotivo(e.target.value);
  };

  const handleCancelar = () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'A autorização e desativação dos alarmes serão cancelados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Autorização e desativação cancelados',
          'Todos os dados preenchidos foram descartidos.',
          'success',
        );
        navegar('/home');
      }
    });
  };

  // ...

const handleAutorizar = async () => {
  if (alarmeAtivado) {
    try {
      // Exibir modal de autenticação
      const { value: credentials } = await Swal.fire({
        title: 'Digite suas credenciais',
        html:
          '<input id="login" class="swal2-input" placeholder="Login">' +
          '<input id="senha" type="password" class="swal2-input" placeholder="Senha">',
        focusConfirm: false,
        preConfirm: () => {
          return {
            login: (document.getElementById('login') as HTMLInputElement).value,
            senha: (document.getElementById('senha') as HTMLInputElement).value,
          };
        },
      });

      if (credentials && credentials.login && credentials.senha) {
        const usuario = {
          login: credentials.login,
          senha: credentials.senha,
        };

        // Simule a autenticação (substitua por sua lógica real de autenticação)
        await api
          .post('/login', usuario)
          .then(() => {
            // Simule a desativação bem-sucedida (substitua por sua lógica real)
            toast.success('Desativação autorizada e realizada com sucesso!');
            setAlarmeAtivado(false); // Marque o alarme como desativado

            // Defina um temporizador para reativar o alarme após um período (substitua por sua lógica real)
            const tempoReativacao = 60000; // 1 minuto neste exemplo, ajuste conforme necessário
            setTempoRestante(tempoReativacao / 500);

            const intervalId = setInterval(() => {
              setTempoRestante((prevTempoRestante) => {
                if (prevTempoRestante === 1) {
                  clearInterval(intervalId);
                  setAlarmeAtivado(true);
                  return 0;
                }
                return prevTempoRestante - 1;
              });
            }, 1000);

            setMotivo(''); // Resetar o conteúdo da textarea

            // navegar('/home');
          })
          .catch((err) => {
            toast.error('Credenciais inválidas!');
          });
      } else {
        console.log('Operação cancelada ou credenciais não fornecidas');
      }
    } catch (error) {
      console.error('Erro ao autorizar desativação:', error);
      toast.error('Erro ao autorizar desativação. Tente novamente.');
    }
  } else {
    toast.warning('O alarme já está desativado. Aguarde e tente novamente.');
  }
};



  return (
    <div>
      <TopBar />

      <div className="box">
        <div className="create-area">
          <div className="create-area-content">
            <h1 className="title">Autorização de Desativação Temporária dos Alarmes</h1>
            <div id="msg"></div>
            {alarmeAtivado && (
              <div className="input-container">
                <textarea
                  className="input-textarea"
                  name="motivo"
                  value={motivo}
                  onChange={handleChange}
                  placeholder="Digite o motivo da desativação temporária..."
                  required
                  style={{ width: '100%', border: '1px solid #ccc', minHeight: '200px' }}
                />
              </div>
            )}

            {alarmeAtivado ? (
              <div className="btns">
                <button
                  type="button"
                  id="cancel-btn"
                  className="cancel-btn"
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="input-submit"
                  onClick={handleAutorizar}
                >
                  Autorizar Desativação
                </button>
              </div>
            ) : (
              <div>
                <p>Alarme desativado. Aguarde {tempoRestante} segundos para reativação.</p>
                <button
                  type="button"
                  id="cancel-btn"
                  className="cancel-btn"
                  onClick={handleCancelar}
                  disabled
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="background-area"></div>
      </div>
    </div>
  );
}
