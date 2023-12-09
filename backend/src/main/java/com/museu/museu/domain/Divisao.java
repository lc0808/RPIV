package com.museu.museu.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.museu.museu.dto.DadosDivisao;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Table(name = "tb_divisao")
@AllArgsConstructor
@Entity
public class Divisao {
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String predio;
    private String sala;
    @OneToMany(mappedBy = "divisao")
    @JsonIgnore
    private List<Secao> secao;

    @ManyToOne
    private Gerente gerente;

    public Divisao(@Valid DadosDivisao divisao) {
        this.nome = divisao.nome();
        this.predio = divisao.predio();
        this.sala = divisao.sala();
    }
}
