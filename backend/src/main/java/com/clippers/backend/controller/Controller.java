package com.clippers.backend.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
public class Controller {
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/Arizona_Illinois_Legislative_Districts")
    public String getLegislativeJson() throws IOException {
        // Load the JSON file from the static directory
        ClassPathResource resource = new ClassPathResource("static/Arizona_Illinois_Legislative_Districts.json");
        // Read the content of the JSON file
        String jsonContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        // Return the content as the response
        return jsonContent;
    }

    @GetMapping("/Arizona_Illinois_Boundaries")
    public String getBoundariesJson() throws IOException {
        // Load the JSON file from the static directory
        ClassPathResource resource = new ClassPathResource("static/Arizona_Illinois_Boundary.json");
        // Read the content of the JSON file
        String jsonContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        // Return the content as the response
        return jsonContent;
    }
}
