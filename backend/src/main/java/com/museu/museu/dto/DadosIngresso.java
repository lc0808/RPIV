package com.museu.museu.dto;

import com.museu.museu.domain.CategoriaIngresso;
import com.museu.museu.domain.Visitante;

public record DadosIngresso(CategoriaIngresso categoria, boolean compra_online, String pagamento, Visitante visitante, java.util.Date venda) {

}
