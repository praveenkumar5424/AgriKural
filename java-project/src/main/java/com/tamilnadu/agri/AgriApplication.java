package com.tamilnadu.agri;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AgriApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgriApplication.class, args);
        System.out.println("=========================================================");
        System.out.println(" Tamil Nadu Smart Agriculture Backend (Spring Boot / Java) ");
        System.out.println(" Running on: http://localhost:8080                       ");
        System.out.println(" APIs available at /api/districts, /api/mandi/prices, etc.");
        System.out.println("=========================================================");
    }
}
