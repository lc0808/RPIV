package com.museu.museu.dto;

import jakarta.validation.constraints.NotBlank;

public record CadastroRole(@NotBlank String nome) {

}
