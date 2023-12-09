package com.museu.museu.domain;

import com.museu.museu.dto.CadastroFuncionario;

public class FactoryFuncionario {
    

    public Funcionario getFuncionario(CadastroFuncionario f) {
        if(f.role().equals("PESQUISADOR")) return new Pesquisador(f);
        else if(f.role().equals("GERENTE")) return new Gerente(f);
        else if(f.role().equals("VENDEDOR")) return new Vendedor(f);
        else return null;
    }
}
