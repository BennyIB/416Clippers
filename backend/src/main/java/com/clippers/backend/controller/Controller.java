package com.clippers.backend.controller;

import com.clippers.backend.model.VoteShareData;
import com.clippers.backend.service.VoteShareService;
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
    private final VoteShareService voteShareService;

    public Controller(VoteShareService voteShareService) {
        this.voteShareService = voteShareService;
    }

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
    
    @GetMapping("/api/arizona/vote-shares/precinct-analysis")
    public ResponseEntity<VoteShareData> getVoteShareDataByType() {
        Optional<VoteShareData> voteShareDataOptional = voteShareService.getVoteShareDataByType("precinct analysis");

        if (voteShareDataOptional.isPresent()) {
            VoteShareData voteShareData = voteShareDataOptional.get();
            System.out.println("Retrieved vote share data: " + voteShareData);
            return ResponseEntity.ok(voteShareData);
        } else {
            System.out.println("No vote share data found for type 'precinct analysis'");
            return ResponseEntity.notFound().build();
        }
    
    }
}
