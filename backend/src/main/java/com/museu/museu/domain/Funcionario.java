package com.museu.museu.domain;

import com.museu.museu.dto.CadastroFuncionario;
import com.museu.museu.dto.EditarFuncionario;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "tb_funcionarios")
public abstract class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String cpf;
    private String telefone;
    private String rg;
    private double salario;
    private boolean demitido = false;

    @Embedded
    private Endereco endereco;
    @OneToOne
    private Usuario usuario;

    protected Funcionario(@Valid CadastroFuncionario funcionario) {
        this.nome = funcionario.nome();
        this.cpf = funcionario.cpf();
        this.telefone = funcionario.telefone();
        this.salario = funcionario.salario();
        this.rg = funcionario.rg();
        this.endereco = new Endereco(funcionario.endereco());
    }

    public void setEdit(@Valid EditarFuncionario f) {
        this.nome = f.nome();
        this.telefone = f.telefone();
        this.endereco = f.endereco();
        this.salario = f.salario();

    }

    public void demitir() {
        this.demitido = true;
    }

    public void recontratar() {
        this.demitido = false;
    }

    public boolean getDemitido() {
        return this.demitido;
    }
}
