package com.museu.museu.domain;

import java.time.LocalDate;
import java.util.Optional;

import com.museu.museu.dto.DadosIngresso;

import jakarta.persistence.Column;
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

@NoArgsConstructor
@Getter
@Setter
@Table(name = "tb_ingressos")
@AllArgsConstructor
@Entity
public class Ingresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @ManyToOne
    private CategoriaIngresso categoria;
    private boolean compra_online;
    private LocalDate data_compra;
    @ManyToOne
    private Vendedor vendedor;
    private String pagamento;
    private String doc_visitante;

    public Ingresso(@Valid DadosIngresso dadosIngresso) {
        this.categoria = dadosIngresso.categoria();
        this.compra_online = dadosIngresso.compra_online();
        this.data_compra = LocalDate.now();
        this.pagamento = dadosIngresso.pagamento();
        // this.visitante = dadosIngresso.visitante();
    }

    public void setVendedor(Optional<Funcionario> funcionario) {

    }
}