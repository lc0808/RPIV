package com.museu.museu.dto;

import jakarta.validation.constraints.Pattern;

import java.util.List;

import com.museu.museu.domain.Divisao;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CadastroFuncionario(@NotBlank String nome, @NotBlank @Pattern(regexp = "[0-9]{11}") String cpf,
        @NotBlank @Email String email, @NotBlank @Pattern(regexp = "[0-9]{0,11}") String telefone,
        @NotBlank String senha, @NotBlank @Pattern(regexp = "[0-9]{0,10}") String rg,
        CadastroEndereco endereco, @NotBlank String role,
        String area_especializacao, @NotNull double salario, List<Divisao> divisao_responsavel) {

}
