package com.museu.museu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.museu.museu.domain.ViagensPesquisa;
import com.museu.museu.dto.CadastroViagensPesquisa;
import com.museu.museu.dto.DadosViagensPesquisa;
import com.museu.museu.repositories.PesquisadorRepository;
import com.museu.museu.repositories.ViagensPesquisaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RequestMapping("/viagenspesquisa")
@RestController
public class ViagensPesquisaController {

    @Autowired
    private ViagensPesquisaRepository viagensPesquisaRepository;

    @Autowired
    private PesquisadorRepository pesquisadorRepository;

    @GetMapping
    public ResponseEntity<Page<DadosViagensPesquisa>> listarViagensPesquisa(
            @PageableDefault(size = 10, sort = "id") Pageable paginacao) {

        Page<ViagensPesquisa> lista = viagensPesquisaRepository.findAll(paginacao);

        var dados = lista.getContent();

        List<DadosViagensPesquisa> dadosList = new ArrayList<>();

        for (ViagensPesquisa v : dados) {
            dadosList.add(new DadosViagensPesquisa(v));
        }

        Page<DadosViagensPesquisa> dadosPage = new PageImpl<>(dadosList, paginacao,
                0);
        return ResponseEntity.ok(dadosPage);
    }

    @PostMapping("/cadastrar/{id}")
    @Transactional
    public ResponseEntity<DadosViagensPesquisa> novaViagemPesquisa(@Valid @RequestBody CadastroViagensPesquisa viagem,
            @PathVariable Integer id) {

        if (pesquisadorRepository.existsById(id)) {
            var p = pesquisadorRepository.findById(id);

            var viagens = new ViagensPesquisa(viagem);
            viagens.setPesquisador(p.get());
            viagensPesquisaRepository.save(viagens);

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/aprovar/{id}")
    @Transactional
    public ResponseEntity<DadosViagensPesquisa> aprovarViagemPesquisa(@PathVariable Integer id,
            HttpServletRequest request) {

        if (viagensPesquisaRepository.existsById(id)) {
            var viagem = viagensPesquisaRepository.findById(id);
            viagem.get().setAprovada(true);
            viagensPesquisaRepository.save(viagem.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
