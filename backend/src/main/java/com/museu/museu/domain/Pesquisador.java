package com.museu.museu.domain;

import java.util.List;

import com.museu.museu.dto.CadastroFuncionario;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pesquisador extends Funcionario {

    private String area_especializacao;

    @OneToMany(mappedBy = "pesquisador")
    private List<ViagensPesquisa> viagensPesquisa;

    public Pesquisador(@Valid CadastroFuncionario funcionario) {
        super(funcionario);
        this.area_especializacao = funcionario.area_especializacao();
    }
}
