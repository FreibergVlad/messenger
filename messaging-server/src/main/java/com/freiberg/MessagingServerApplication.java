package com.freiberg;

import com.freiberg.config.CryptographyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"model", "com.freiberg.model"})
@EnableJpaRepositories(basePackages = {"dao", "com.freiberg.dao"})
@EnableConfigurationProperties(CryptographyProperties.class)
public class MessagingServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MessagingServerApplication.class, args);
	}
}
