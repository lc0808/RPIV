package com.museu.museu.domain;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Visitante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String docStorage;
    private String cpf;

    public Visitante(String cpf, String docStorage) {
        this.cpf = cpf;
        this.docStorage = docStorage;
    }

    public String saveDoc(String diretorio, MultipartFile arquivo){
        Path diretorioPath = Paths.get("C:\\Usuários\\Marco\\tmp\\", diretorio);
        Path arquivoPath = diretorioPath.resolve(arquivo.getOriginalFilename());

        try {
            Files.createDirectories(diretorioPath);
            arquivo.transferTo(arquivoPath.toFile());

            return arquivoPath.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
