package com.museu.museu.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.museu.museu.domain.Peca;

public interface PecaRepository extends JpaRepository<Peca, Integer>{

    Page<Peca> findAllByEmprestarPecaNotNull(Pageable paginacao);
    
}
