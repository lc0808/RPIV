package com.museu.museu.dto;

import org.springframework.web.multipart.MultipartFile;

public record CadastrarVisitante(MultipartFile doc, String cpf) {
    
}
