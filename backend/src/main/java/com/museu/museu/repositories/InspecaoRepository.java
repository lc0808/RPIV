package com.museu.museu.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.museu.museu.domain.Inspecao;

public interface InspecaoRepository extends JpaRepository<Inspecao, Integer> {
   
    Page<Inspecao> findAll(Pageable pageable);
 
}