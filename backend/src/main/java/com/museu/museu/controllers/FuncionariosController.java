package com.museu.museu.controllers;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.museu.museu.domain.FactoryFuncionario;
import com.museu.museu.domain.Funcionario;
import com.museu.museu.domain.Role;
import com.museu.museu.domain.Usuario;
import com.museu.museu.dto.CadastroFuncionario;
import com.museu.museu.dto.DadosFuncionario;
import com.museu.museu.dto.DadosListagemFuncionario;
import com.museu.museu.dto.EditarFuncionario;
import com.museu.museu.repositories.FuncionarioRepository;
import com.museu.museu.repositories.RoleRepository;
import com.museu.museu.repositories.UsuarioRepository;

import jakarta.validation.Valid;

@RequestMapping("/funcionarios")
@RestController
public class FuncionariosController {

    // @Autowired
    // private Cache cache;

    private Cache cache = Cache.getInstance();

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/novo")
    @Transactional
    public ResponseEntity<DadosFuncionario> registrarFuncionario(@Valid @RequestBody CadastroFuncionario funcionario,
            UriComponentsBuilder builder) {

        FactoryFuncionario f = new FactoryFuncionario();
        Funcionario novoFuncionario = f.getFuncionario(funcionario);
        Collection<Role> role = new ArrayList<>();

        role.add(roleRepository.findByNome(funcionario.role()));
        Usuario usuario = new Usuario(funcionario.email(), encoder.encode(funcionario.senha()), novoFuncionario, role);

        novoFuncionario.setUsuario(usuario);

        usuarioRepository.save(usuario);
        funcionarioRepository.save(novoFuncionario);

        var uri = builder.buildAndExpand(novoFuncionario.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosFuncionario(novoFuncionario));
    }

    @GetMapping("{id}")
    public ResponseEntity<DadosFuncionario> infoFuncionario(@PathVariable Integer id) {
        cache.imprime();
        Funcionario cachedfuncionario = (Funcionario) cache.get("funcionario" + id);

        if (cachedfuncionario != null) {
            return ResponseEntity.ok(new DadosFuncionario(cachedfuncionario));
        }

        var funcionario = funcionarioRepository.findById(id);

        if (funcionario.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        cache.put("funcionario" + id, funcionario.get());
        return ResponseEntity.ok(new DadosFuncionario(funcionario.get()));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemFuncionario>> listarFuncionarios(
            @PageableDefault(size = 10, sort = "id") Pageable paginacao) {

        Page<Funcionario> lista = funcionarioRepository.findAll(paginacao);

        var dados = lista.getContent();

        List<DadosListagemFuncionario> dadosList = new ArrayList<>();

        for (Funcionario f : dados) {
            dadosList.add(new DadosListagemFuncionario(f));
        }

        Page<DadosListagemFuncionario> dadosPage = new PageImpl<>(dadosList, paginacao, 0);

        return ResponseEntity.ok(dadosPage);
    }

    @PutMapping("{id}")
    @Transactional
    public ResponseEntity<DadosFuncionario> mudarDados(@PathVariable Integer id,
            @RequestBody @Valid EditarFuncionario f) {

        cache.remove("funcionario" + id);
        var updateFuncionario = funcionarioRepository.findById(id);
        updateFuncionario.get().setEdit(f);

        funcionarioRepository.save(updateFuncionario.get());

        return ResponseEntity.ok(new DadosFuncionario(updateFuncionario.get()));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> demitirFuncionario(@PathVariable Integer id) {

        Optional<Funcionario> f = funcionarioRepository.findById(id);

        f.get().setDemitido(true);

        funcionarioRepository.save(f.get());

        return ResponseEntity.noContent().build();
    }
}
