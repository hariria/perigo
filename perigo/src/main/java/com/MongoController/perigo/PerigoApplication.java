package com.MongoController.perigo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.MongoController.perigo.services.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class PerigoApplication {
	
	public static void main(String args[]) {
		SpringApplication.run(PerigoApplication.class);
	}
}
