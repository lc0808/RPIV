import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ButtonPassword';
import TopBar from '../../components/TopBar';
import MuseumInitial from '../../components/MuseumInitial';
import 'src/renderer/pages/home/Home.css';
import Sections from '../../components/HomeComponents/Sections';
import Divisions from '../../components/HomeComponents/Divisions';
import Pecas from '../../components/HomeComponents/Pecas';
import LinhaQuadrados from '../../components/HomeComponents/Pecas';

interface IRota {
  label: string;
  to: string;
}

const rotas = [
  {
    label: 'Funcionarios',
    to: '/funcionarios',
  },
  {
    label: 'Secoes',
    to: '/secao/cadastrar',
  },
  {
    label: 'Cadastrar Divisao',
    to: '/divisao/cadastrar',
  },
  {
    label: 'Cadastrar Peca',
    to: '/pecas/cadastrar',
  },
];

export default function Home() {
  const navegar = useNavigate();

  // const handleClick = () => {
  //   localStorage.removeItem('token');
  //   navegar('/');
  // };

  return (
    <div>
      <TopBar />
      <MuseumInitial />
      <Sections />
      <LinhaQuadrados />
    </div>
    // <section className="h-screen w-full bg-black">
    //   <div className="grid grid-rows-[64px,1fr]">
    //     <div className="flex items-center bg-green-700">
    //       <div className="flex items-center justify-between gap-1 w-full px-5">
    //         <span>Hello</span>
    //         {/* <Button onClick={handleClick}>Deslogar</Button> */}
    //       </div>
    //     </div>
    //     <div className="w-full h-screen bg-blue-700">
    //       <ul>
    //         {rotas.map((rota: IRota, index: number) => (
    //           <li key={index}>
    //             <Link to={rota.to}>{rota.label}</Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </section>
  );
}
