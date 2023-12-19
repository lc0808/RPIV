package com.museu.museu.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import com.museu.museu.domain.EmprestarPeca;
import com.museu.museu.domain.Peca;
import com.museu.museu.dto.DadosListagemPeca;
import com.museu.museu.dto.DadosPeca;
import com.museu.museu.dto.EditarPeca;
import com.museu.museu.dto.NovaPeca;
import com.museu.museu.repositories.PecaRepository;
import com.museu.museu.repositories.SecaoRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/pecas")
public class PecaController {

    @Autowired
    private PecaRepository pecaRepository;

    @Autowired
    private SecaoRepository secaoRepository;

    
    @PostMapping("/criar")
    @Transactional
    public ResponseEntity<DadosPeca> criarPeca(@Valid @RequestBody NovaPeca peca, HttpServletRequest request,
            UriComponentsBuilder builder) {
        Peca novaPeca = new Peca(peca);
        var secao = secaoRepository.findById(peca.secao());
        novaPeca.setSecao(secao.get());
        pecaRepository.save(novaPeca);

        var uri = builder.buildAndExpand(novaPeca.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosPeca(novaPeca));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemPeca>> listarPecas(
            @PageableDefault(size = 10, sort = "id") Pageable paginacao, String filtro) {

        if (filtro == null) {

            Page<Peca> lista = pecaRepository.findAll(paginacao);

            var dados = lista.getContent();

            List<DadosListagemPeca> dadosList = new ArrayList<>();

            for (Peca p : dados) {
                dadosList.add(new DadosListagemPeca(p));
            }

            Page<DadosListagemPeca> dadosPage = new PageImpl<>(dadosList, paginacao, 0);

            return ResponseEntity.ok(dadosPage);

        } else if (filtro.equals("emprestadas")) {

            Page<Peca> lista = pecaRepository.findAllByEmprestarPecaNotNull(paginacao);

            var dados = lista.getContent();

            List<DadosListagemPeca> dadosList = new ArrayList<>();

            for (Peca p : dados) {
                dadosList.add(new DadosListagemPeca(p));
            }

            Page<DadosListagemPeca> dadosPage = new PageImpl<>(dadosList, paginacao, 0);

            return ResponseEntity.ok(dadosPage);
        }
        return null;
    }

    @Transactional
    @DeleteMapping("{id}")
    public ResponseEntity<String> excluirPeca(@PathVariable Integer id) {

        pecaRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/d/{id}")
    public ResponseEntity<DadosPeca> detalharPeca(@PathVariable Integer id) {

        Optional<Peca> peca = pecaRepository.findById(id);

        return ResponseEntity.ok(new DadosPeca(peca.get()));
    }

    @PutMapping("{id}")
    public ResponseEntity<DadosPeca> atualizarPeca(@PathVariable Integer id, @Valid @RequestBody EditarPeca novaPeca) {
        try {
            Peca peca = pecaRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Peca not found with id: " + id));

            peca.setNome(novaPeca.nome());
            peca.setAutor(novaPeca.autor());
            peca.setCurador(novaPeca.curador());
            peca.setDescricao_peca(novaPeca.descricao_peca());
            peca.setEstado_conservacao(novaPeca.estado_conservacao());

            Peca pecaAtualizada = pecaRepository.save(peca);

            return ResponseEntity.ok(new DadosPeca(pecaAtualizada));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

  @PutMapping("/emprestar/{id}")
    public ResponseEntity<Peca> emprestarPeca(@Valid @RequestBody EmprestarPeca emprestarPeca, @PathVariable Integer id,
            HttpServletRequest request, UriComponentsBuilder builder) {
        try {
            Peca peca = pecaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Peca not found with id: " + id));

            peca.setEmprestarPeca(emprestarPeca);

            Peca pecaSalva = pecaRepository.save(peca);

            var uri = builder.path("/pecas/{id}").buildAndExpand(pecaSalva.getId()).toUri();

            return ResponseEntity.ok().location(uri).body(pecaSalva);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/devolver/{id}")
    public ResponseEntity<Peca> devolverPeca(@PathVariable Integer id, HttpServletRequest request,
            UriComponentsBuilder builder) {
        try {
            Peca peca = pecaRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Peca not found with id: " + id));

            peca.setEmprestarPeca(null);

            Peca pecaDevolvida = pecaRepository.save(peca);

            var uri = builder.path("/pecas/{id}").buildAndExpand(pecaDevolvida.getId()).toUri();

            return ResponseEntity.ok().location(uri).body(pecaDevolvida);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
