package com.museu.museu.dto;

import com.museu.museu.domain.Divisao;

public record DadosListagemDivisao(Integer id, String nome, String predio, String sala) {

    public DadosListagemDivisao(Divisao d) {
        this(d.getId(), d.getNome(), d.getPredio(), d.getSala());
    }
}
