package com.museu.museu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NovaPeca(@NotBlank String nome, @NotBlank String autor, @NotBlank String curador, @NotNull String data_adquirida, @NotBlank String descricao_peca, @NotBlank String estado_conservacao, @NotNull Integer secao) {
    
}
