package com.museu.museu.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.museu.museu.domain.Role;
import com.museu.museu.dto.CadastroRole;
import com.museu.museu.repositories.RoleRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/roles")
public class RoleController {
    

    @Autowired
    private RoleRepository roleRepository;


    @Transactional
    @PostMapping("/novo")
    public ResponseEntity<Role> registrarRole(@Valid @RequestBody CadastroRole novaRole, UriComponentsBuilder builder) {

        Role role = new Role(novaRole.nome());

        roleRepository.save(role);

        URI uri = builder.buildAndExpand(role.getId()).toUri();

        return ResponseEntity.created(uri).body(role);
    }
}
