import Button from '../../components/ButtonPassword';
import buttonEye from 'assets/icons/icon-eye.png';
import './Login.style.css';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';

type TipoLogin = {
  login: string;
  senha: string;
};

type RespostaAPI = {
  data: {
    token: string;
  };
};

export default function Login() {
  const navegar = useNavigate();

  const [usuario, setUsuario] = useState<TipoLogin>({
    login: 'pesquisador26@admin.com',
    senha: '123456',
  });

  const handleChange = (fieldName: keyof TipoLogin, value: string) => {
    setUsuario({ ...usuario, [fieldName]: value });
  };

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    console.log(usuario);

    await api
      .post('/login', usuario)
      .then(({ data: { token } }: RespostaAPI) => {
        localStorage.setItem('token', token);
        toast.success('Login efetuado com sucesso!');
        navegar('/home');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <form onSubmit={(e) => handleLogin(e)} className="w-full">
      <div className="box">
        <div className="login-area">
          <div className="login-area-content">
            <h1 className="title">Entrar</h1>
            <div id="msg" />
            <input
              type="text"
              className="input-text"
              id="username"
              value={usuario.login}
              onChange={(e) => handleChange('login', e.target.value)}
              placeholder="Nome do usuário"
            />
            <div className="relative">
              <input
                type="password"
                className="input-password pr-10 w-full"
                id="password"
                value={usuario.senha}
                onChange={(e) => handleChange('senha', e.target.value)}
                placeholder="Senha"
              />
              <Button
                className="rounded-full absolute top-0 right-0"
                id="show-password"
                aria-label="Mostrar Senha"
                icon={<img src={buttonEye} alt="" />}
              />
            </div>
            <input
              type="submit"
              className="input-submit"
              id="submit"
              value="Entrar"
            />
          </div>
        </div>
        <div className="background-area">
          <div className="background-area-content">
            <h1 className="title">Bem vindo</h1>
            <h1 className="title-normal">Ao Museu Pampa</h1>
            Faça login para gerenciar seu museu
          </div>
        </div>
      </div>
    </form>
  );
}
