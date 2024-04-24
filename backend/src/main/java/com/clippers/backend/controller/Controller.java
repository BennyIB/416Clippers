package com.clippers.backend.controller;

import com.clippers.backend.model.VoteShareData;
import com.clippers.backend.service.VoteShareService;
import com.clippers.backend.service.EthnicityRepsService;
import com.clippers.backend.model.EthnicityReps;
import com.clippers.backend.model.EthnicityPopulation;
import com.clippers.backend.service.EthnicityPopulationService;
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
    // private final VoteShareService voteShareService;
    // private final EthnicityPopulationService ethnicityPopulationService;
    // private final EthnicityRepsService ethnicityRepsService;

    @Autowired
    private VoteShareService voteShareService;

    @Autowired
    private EthnicityPopulationService ethnicityPopulationService;

    @Autowired
    private EthnicityRepsService ethnicityRepsService;


    // @Autowired
    // public Controller(VoteShareService voteShareService, EthnicityPopulationService ethnicityPopulationService, EthnicityRepsService ethnicityRepsService) { 
    //     this.voteShareService = voteShareService;
    //     this.ethnicityPopulationService = ethnicityPopulationService;
    //     this.ethnicityRepsService = ethnicityRepsService;

    // }

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
        return voteShareService.getDataByType("precinct analysis") // Call method on voteShareService
            .map(ResponseEntity::ok)
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
