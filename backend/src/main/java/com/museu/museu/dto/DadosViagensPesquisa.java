package com.museu.museu.dto;

import java.util.Date;
import com.museu.museu.domain.Funcionario;
import com.museu.museu.domain.ViagensPesquisa;

public record DadosViagensPesquisa(Integer id, String destino, String objetivo, double custos, boolean aprovada,
        String pesquisador, Integer idPesquisador, Date data_inicio, Date data_fim, String resultados) {

    public DadosViagensPesquisa(ViagensPesquisa vp) {
        this(vp.getId(), vp.getDestino(), vp.getObjetivo(), vp.getCustos(), vp.isAprovada(),
                vp.getPesquisador().getNome(), vp.getPesquisador().getId(), vp.getData_inicio(),
                vp.getData_fim(), vp.getResultados());
    }
}