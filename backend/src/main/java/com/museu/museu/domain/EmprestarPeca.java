package com.museu.museu.domain;

import java.time.OffsetDateTime;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class EmprestarPeca {

    private String localizacao;
    private String instituto;
    private OffsetDateTime data_devolucao;

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getInstituto() {
        return instituto;
    }

    public void setInstituto(String instituto) {
        this.instituto = instituto;
    }

    public OffsetDateTime getData_devolucao() {
        return data_devolucao;
    }

    public void setData_devolucao(OffsetDateTime data_devolucao) {
        this.data_devolucao = data_devolucao;
    }

}
