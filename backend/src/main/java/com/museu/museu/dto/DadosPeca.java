package com.museu.museu.dto;

import java.util.Date;

import com.museu.museu.domain.EmprestarPeca;
import com.museu.museu.domain.Peca;
import com.museu.museu.domain.Secao;

public record DadosPeca(Integer id, String nome, String autor, String curador, Date data_adquirida, String descricao_peca, String estado_conservacao, Secao secao, EmprestarPeca emprestarPeca) {
    public DadosPeca(Peca p){
        this(p.getId(), p.getNome(), p.getAutor(), p.getCurador(), p.getData_adquirida(), p.getDescricao_peca(), p.getEstado_conservacao(), p.getSecao(), p.getEmprestarPeca());
    }
}
