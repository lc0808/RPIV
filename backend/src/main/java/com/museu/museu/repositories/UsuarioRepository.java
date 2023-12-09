package com.museu.museu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.museu.museu.domain.Usuario;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    UserDetails findByEmail(String subject);

}
