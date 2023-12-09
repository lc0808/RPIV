type SecaoComponentProps = {
  secao: Secao;
};

export default function SectionsItens({ secao }: SecaoComponentProps) {
  return (
    <div className="secoes-square">
      <div className="secoes-square-img">
        <img className="img-secoes" src="https://via.placeholder.com/90x90" />
      </div>
      <div className="context-secoes-box">
        <div className="content-secoes-tittle-box">{secao.nome}</div>
        <div className="subcontent-secoes-tittle-box">
          <div className="subcontent-secoes-box">Prédio {secao.predio}</div>
          <div className="subcontent-secoes-box">•</div>
          <div className="subcontent-secoes-box">Sala {secao.sala}</div>
          <div className="subcontent-secoes-box">•</div>
          <div className="subcontent-secoes-box">
            Divisão {secao.nomeDivisao}
          </div>
        </div>
      </div>
    </div>
  );
}
