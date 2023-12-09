package com.museu.museu.domain;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.museu.museu.dto.NovaPeca;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_pecas")
@Entity
public class Peca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String autor;
    private String curador;
    private Date data_adquirida;
    private String descricao_peca;
    private String estado_conservacao;

    
    @ManyToOne(cascade = CascadeType.ALL, fetch = jakarta.persistence.FetchType.EAGER)
    private Secao secao;

    @Embedded
    private EmprestarPeca emprestarPeca = null;

    public Peca(@Valid NovaPeca peca) {
        this.nome = peca.nome();
        this.autor = peca.autor();
        this.curador = peca.curador();
        DateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        try {
            this.data_adquirida = formatter.parse(peca.data_adquirida());
        } catch (ParseException e) {
            throw new RuntimeException("Erro ao converter data");
        }

        this.descricao_peca = peca.descricao_peca();
        this.estado_conservacao = peca.estado_conservacao();
    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getAutor() {
        return autor;
    }

    public String getCurador() {
        return curador;
    }

    public Date getData_adquirida() {
        return data_adquirida;
    }

    public String getDescricao_peca() {
        return descricao_peca;
    }

    public String getEstado_conservacao() {
        return estado_conservacao;
    }

    @JsonIgnore(true)
    public Secao getSecao() {
        return secao;
    }

    public EmprestarPeca getEmprestarPeca() {
        return emprestarPeca;
    }

    
}
