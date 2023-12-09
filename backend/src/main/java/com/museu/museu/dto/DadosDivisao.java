package com.museu.museu.dto;

import com.museu.museu.domain.Divisao;

public record DadosDivisao(String nome, String predio, String sala) {
    public DadosDivisao(Divisao divisao) {
        this(divisao.getNome(), divisao.getPredio(), divisao.getSala());
    }
}
