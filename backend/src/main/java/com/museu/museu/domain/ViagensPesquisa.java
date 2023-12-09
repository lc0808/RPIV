package com.museu.museu.domain;

import java.util.Date;

import com.museu.museu.dto.CadastroViagensPesquisa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_viagens_pesquisa")
@Setter
@Getter
public class ViagensPesquisa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private double custos;
    private boolean aprovada;
    private String destino;
    private String objetivo;
    private Date data_inicio;
    private Date data_fim;
    @ManyToOne
    private Pesquisador pesquisador;
    private String resultados;

    public ViagensPesquisa(@Valid CadastroViagensPesquisa dados) {
        this.aprovada = false;
        this.custos = dados.custos();
        this.destino = dados.destino();
        this.objetivo = dados.objetivo();
        this.resultados = null;
        this.data_inicio = dados.data_inicio();
        this.data_fim = dados.data_fim();

    }

    public Integer getId() {
        return id;
    }

    public double getCustos() {
        return custos;
    }

    public boolean isAprovada() {
        return aprovada;
    }

    public String getDestino() {
        return destino;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public Date getData_inicio() {
        return data_inicio;
    }

    public Date getData_fim() {
        return data_fim;
    }

    public Pesquisador getPesquisador() {
        return pesquisador;
    }

    public String getResultados() {
        return resultados;
    }
}
