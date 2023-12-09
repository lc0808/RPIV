package com.museu.museu.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.museu.museu.dto.CadastroSecao;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_secao")
@Entity
public class Secao {

    public Secao(@Valid CadastroSecao cadastroSecao) {
        this.nome = cadastroSecao.nome();
        this.descricao = cadastroSecao.descricao();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String descricao;
    @OneToMany(mappedBy = "secao")
    private List<Peca> pecas;
    @ManyToOne
    private Divisao divisao;

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    @JsonIgnore(true)
    public List<Peca> getPecas() {
        return pecas;
    }

    public Divisao getDivisao() {
        return divisao;
    }

}
