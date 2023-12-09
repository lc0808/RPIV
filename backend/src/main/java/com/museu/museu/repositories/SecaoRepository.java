package com.museu.museu.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.museu.museu.domain.Secao;

public interface SecaoRepository extends JpaRepository<Secao, Integer>{
    

    Page<Secao> findAll(Pageable pageable);
}
