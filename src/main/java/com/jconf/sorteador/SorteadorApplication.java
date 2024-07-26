package com.jconf.sorteador;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class SorteadorApplication {

	public static void main(String[] args) {
		SpringApplication.run(SorteadorApplication.class, args);
	}

}
