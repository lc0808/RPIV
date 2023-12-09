package com.museu.museu.dto;

import com.museu.museu.domain.CategoriaIngresso;

public record DadosCategoriaIngresso(String nome, double preco) {
    public DadosCategoriaIngresso(CategoriaIngresso categoria) {
        this(categoria.getNome(), categoria.getPreco());
    }
}
