package com.museu.museu.domain;

import java.util.ArrayList;
import java.util.List;

import com.museu.museu.dto.DadosCategoriaIngresso;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "tb_categoria_ingressos")
@Entity
public class CategoriaIngresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private double preco;
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    private List<Ingresso> ingressos = new ArrayList<>();

    public CategoriaIngresso(DadosCategoriaIngresso dadosCategoriaIngresso) {
        this.nome = dadosCategoriaIngresso.nome();
        this.preco = dadosCategoriaIngresso.preco();
    }
}
