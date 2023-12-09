package com.museu.museu.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.museu.museu.domain.Cache;
import com.museu.museu.domain.Secao;
import com.museu.museu.dto.CadastroSecao;
import com.museu.museu.dto.DadosListagemSecao;
import com.museu.museu.dto.DadosSecao;
import com.museu.museu.dto.EditarSecao;
import com.museu.museu.repositories.DivisaoRepository;
import com.museu.museu.repositories.SecaoRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RequestMapping("/secao")
@RestController
public class SecaoController {

    // @Autowired
    // private Cache cache;

    private Cache cache = Cache.getInstance();

    @Autowired
    private SecaoRepository secaoRepository;

    @Autowired
    private DivisaoRepository divisaoRepository;

    @Transactional
    @PostMapping("/nova")
    public ResponseEntity<DadosSecao> novaSecao(@Valid @RequestBody CadastroSecao cadastroSecao,
            UriComponentsBuilder builder, HttpServletRequest request) {
        var divisao = divisaoRepository.findById(cadastroSecao.divisaoId());
        var secao = new Secao(cadastroSecao);

        secao.setDivisao(divisao.get());

        secaoRepository.save(secao);

        var uri = builder.path("/secao/{id}").buildAndExpand(secao.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosSecao(secao));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemSecao>> listarSecao(
            @PageableDefault(size = 10, sort = "nome") Pageable paginacao) {

        Page<Secao> lista = secaoRepository.findAll(paginacao);

        var dados = lista.getContent();

        List<DadosListagemSecao> listaDados = new ArrayList<>();

        for (Secao secao : dados) {
            listaDados.add(new DadosListagemSecao(secao));
        }

        Page<DadosListagemSecao> listaFinal = new PageImpl<>(listaDados, paginacao, 0);

        return ResponseEntity.ok(listaFinal);
    }

    @GetMapping("{id}")
    public ResponseEntity<DadosSecao> detalharSecao(@PathVariable Integer id) {

        Secao cachedSecao = (Secao) cache.get("secao" + id);

        if (cachedSecao != null) {
            return ResponseEntity.ok(new DadosSecao(cachedSecao));
        } else {
            var secao = secaoRepository.findById(id);
            if (secao.isPresent()) {
                cache.put("secao" + id, secao.get());
                return ResponseEntity.ok(new DadosSecao(secao.get()));
            } else {
                return ResponseEntity.notFound().build();
            }

        }

    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosSecao> editarSecao(@PathVariable Integer id, @RequestBody EditarSecao cadastroSecao) {

        var secao = secaoRepository.findById(id);

        if (secao.isPresent()) {
            var secaoEditada = secao.get();

            secaoEditada.setNome(cadastroSecao.nome());
            secaoEditada.setDescricao(cadastroSecao.descricao());

            secaoRepository.save(secaoEditada);
            System.out.println(secaoEditada);

            return ResponseEntity.ok(new DadosSecao(secaoEditada));
        }

        return ResponseEntity.notFound().build();

    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deletarSecao(@PathVariable Integer id) {

        secaoRepository.deleteById(id);

        return ResponseEntity.notFound().build();
    }

}
