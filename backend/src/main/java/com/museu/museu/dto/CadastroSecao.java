package com.museu.museu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CadastroSecao(@NotBlank String nome, @NotBlank String descricao, @NotNull Integer divisaoId) {
    
}
