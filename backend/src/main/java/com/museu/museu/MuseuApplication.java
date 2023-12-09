package com.museu.museu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories()
@SpringBootApplication
public class MuseuApplication {

	public static void main(String[] args) {
		SpringApplication.run(MuseuApplication.class, args);
	}

}
