package com.museu.museu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.museu.museu.domain.Visitante;

public interface VisitanteRepository extends JpaRepository<Visitante, Integer> {
    
}
