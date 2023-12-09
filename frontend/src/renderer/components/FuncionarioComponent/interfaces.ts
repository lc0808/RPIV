interface Endereco {
  rua: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  numero: string;
}

interface Funcionario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  cargo: string;
  role: string;
  endereco: Endereco;
  demitido: string;
}

interface Secao {
  id: String;
  nome: string;
  descricao: string;
  idDivisao: string;
  predio: string;
  sala: string;
  nomeDivisao: string;
}

interface Peca {
  id: String;
  nome: String;
  autor: String;
  curador: String;
  descricao: String;
  estado_conservacao: String;
  data_adquirida: String;
  secao: String;
  emprestada: {
    localizacao: String;
    instituto: String;
    data_devolucao: string
  };
}

interface ViagensPesquisa {
  id: String;
  destino: String;
  objetivo: String;
  custos: String;
  aprovada: boolean;
  pesquisador: String;
  idPesquisador: String;
  data_inicio: string;
  data_fim: string;
  resultados: String;
}

interface Divisao {
  id: String;
  nome: String;
  predio: String;
  sala: String;
}
