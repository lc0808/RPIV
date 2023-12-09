package com.museu.museu.dto;

import com.museu.museu.domain.Secao;

public record DadosListagemSecao(Integer id, String nome, String descricao, Integer idDivisao, String predio,
        String sala, String nomeDivisao) {

    public DadosListagemSecao(Secao s) {
        this(s.getId(), s.getNome(), s.getDescricao(), s.getDivisao().getId(), s.getDivisao().getPredio(),
                s.getDivisao().getSala(), s.getDivisao().getNome());
    }
}
