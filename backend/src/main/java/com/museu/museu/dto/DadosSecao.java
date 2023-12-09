package com.museu.museu.dto;

import java.util.List;

import com.museu.museu.domain.Peca;
import com.museu.museu.domain.Secao;

public record DadosSecao(Integer id, String nome, String descricao, List<Peca> pecas, DadosDivisao divisao) {

    public DadosSecao(Secao s) {
        this(s.getId(), s.getNome(), s.getDescricao(), s.getPecas(), new DadosDivisao(s.getDivisao()));
    }

}
