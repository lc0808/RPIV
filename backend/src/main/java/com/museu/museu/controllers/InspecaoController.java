package com.museu.museu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.museu.museu.domain.Inspecao;
import com.museu.museu.repositories.InspecaoRepository;

import java.util.List;
import java.util.Optional;

@RequestMapping("/inspecao")
@RestController
public class InspecaoController {

    private final InspecaoRepository inspecaoRepository;

    @Autowired
    public InspecaoController(InspecaoRepository inspecaoRepository) {
        this.inspecaoRepository = inspecaoRepository;
    }

    @PostMapping("/nova")
    @Transactional
    public ResponseEntity<Inspecao> criarInspecao(@RequestBody Inspecao inspecao) {
        inspecaoRepository.save(inspecao);
        return ResponseEntity.ok(inspecao);
    }

    @GetMapping
    public ResponseEntity<List<Inspecao>> getInspecao() {
        var inspecoes = inspecaoRepository.findAll();
        return ResponseEntity.ok(inspecoes);
    }

    @GetMapping("{id}")
    public ResponseEntity<Inspecao> getInspecaoById(@PathVariable Integer id) {
        var inspecaoOptional = inspecaoRepository.findById(id);
        return inspecaoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> excluirInspecao(@PathVariable Integer id) {
        inspecaoRepository.deleteById(id);
        return ResponseEntity.ok("Inspeção excluída com sucesso!");
    }

    @PostMapping("{id}")
    public ResponseEntity<Inspecao> updateInspecao(@PathVariable Integer id, @RequestBody Inspecao inspecao) {
        var inspecaoOptional = inspecaoRepository.findById(id);

        if (inspecaoOptional.isPresent()) {
            var existingInspecao = inspecaoOptional.get();
            // Atualize os campos necessários de acordo com sua lógica
            existingInspecao.setTitulo(inspecao.getTitulo());
            existingInspecao.setDescricao(inspecao.getDescricao());
            
            inspecaoRepository.save(existingInspecao);
            return ResponseEntity.ok(existingInspecao);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}