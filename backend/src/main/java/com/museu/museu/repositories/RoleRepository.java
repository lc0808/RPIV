package com.museu.museu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.museu.museu.domain.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{

    Role findByNome(String role);
    
}
