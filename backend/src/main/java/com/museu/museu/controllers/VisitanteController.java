package com.museu.museu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.museu.museu.domain.Visitante;
import com.museu.museu.dto.CadastrarVisitante;
import com.museu.museu.repositories.VisitanteRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/visitante")
public class VisitanteController {
    

    @Autowired
    private VisitanteRepository visitanteRepository;

    @Transactional
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarVisitante(@ModelAttribute @Valid CadastrarVisitante visitante, UriComponentsBuilder builder) {

        Visitante v = new Visitante(visitante.cpf(), null);
        String path = v.saveDoc("docs", visitante.doc());
        v.setDocStorage(path);
        visitanteRepository.save(v);

        return ResponseEntity.ok(path);
    }
}
