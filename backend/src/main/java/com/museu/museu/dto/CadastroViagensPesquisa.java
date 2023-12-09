package com.museu.museu.dto;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CadastroViagensPesquisa(@NotNull double custos, @NotBlank String objetivo, @NotBlank String destino, @NotNull Date data_inicio, @NotNull Date data_fim, @NotNull Integer idFuncionario ) {
    
}
