package com.museu.museu.dto;

import com.museu.museu.domain.Endereco;
import com.museu.museu.domain.Funcionario;

public record DadosFuncionario(Integer id, String nome, String cpf, String telefone, double salario,
        String rg,
        Endereco endereco, boolean demitido) {

    public DadosFuncionario(Funcionario funcionario) {
        this(funcionario.getId(), funcionario.getNome(), funcionario.getCpf(),
                funcionario.getTelefone(),
                funcionario.getSalario(), funcionario.getRg(), funcionario.getEndereco(), funcionario.getDemitido());
    }
}
