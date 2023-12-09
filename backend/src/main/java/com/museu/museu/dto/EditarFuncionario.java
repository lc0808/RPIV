package com.museu.museu.dto;

import com.museu.museu.domain.Endereco;

public record EditarFuncionario(
    String nome,
    String telefone,
    String cargo,
    double salario,
    Endereco endereco) {

}
