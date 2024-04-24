package com.clippers.backend.controller;

import com.clippers.backend.model.VoteShareData;
import com.clippers.backend.service.MongoService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
public class Controller {
    private final MongoService<VoteShareData> mongoService;

    @Autowired
    public Controller(MongoService<VoteShareData> mongoService) {
        this.mongoService = mongoService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/Arizona_Illinois_Legislative_Districts")
    public String getLegislativeJson() throws IOException {
        ClassPathResource resource = new ClassPathResource("static/Arizona_Illinois_Legislative_Districts.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    @GetMapping("/Arizona_Illinois_Boundaries")
    public String getBoundariesJson() throws IOException {
        ClassPathResource resource = new ClassPathResource("static/Arizona_Illinois_Boundary.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
    
    @GetMapping("/api/arizona/vote-shares/precinct-analysis")
    public ResponseEntity<VoteShareData> getVoteShareDataByType() {
        return mongoService.getDataByType("precinct analysis")
            .map(data -> {
                System.out.println("Retrieved vote share data: " + data);
                return ResponseEntity.ok(data);
            })
            .orElseGet(() -> {
                System.out.println("No vote share data found for type 'precinct analysis'");
                System.out.println(mongoService.toString());
                return ResponseEntity.notFound().build();
            });
    }

    @GetMapping("/config_data")
    public String getConfigData() throws IOException {
        ClassPathResource resource = new ClassPathResource("static/config_data.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
}
