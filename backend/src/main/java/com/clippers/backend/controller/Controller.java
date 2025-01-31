package com.clippers.backend.controller;

import com.clippers.backend.model.VoteShareData;
import com.clippers.backend.model.VoteShareDataIllinois;
import com.clippers.backend.model.VoteShareSeatShare;
import com.clippers.backend.service.VoteShareService;
import com.clippers.backend.service.VoteShareServiceIllinois;
import com.clippers.backend.service.EthnicityRepsService;
import com.clippers.backend.model.EthnicityReps;
import com.clippers.backend.model.EthnicityPopulation;
import com.clippers.backend.service.EthnicityPopulationService;
import com.clippers.backend.model.EthnicityPopulationIL;
import com.clippers.backend.service.EthnicityPopulationILService;
import com.clippers.backend.model.EthnicityRepsIL;
import com.clippers.backend.service.EthnicityRepsILService;
import com.clippers.backend.model.PrecinctAnalysisTable;
import com.clippers.backend.model.PrecinctAnalysisTableIllinois;
import com.clippers.backend.service.PrecinctAnalysisTableService;
import com.clippers.backend.service.PrecinctAnalysisTableServiceIllinois;
import com.clippers.backend.service.VoteShareSeatShareService;
import com.clippers.backend.model.OpportunityDistrictData;
import com.clippers.backend.service.OpportunityDistrictService;
import com.clippers.backend.service.OpportunityDistrictServiceIllinois;
import com.clippers.backend.model.OpportunityDistrictDataIllinois;
import com.clippers.backend.repository.OpportunityDistrictRepositoryIllinois;

import com.clippers.backend.model.VoteShareSeatShareIllinois;
import com.clippers.backend.service.VoteShareSeatShareIllinoisService;

import com.clippers.backend.model.VoteShareSeatShare;
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

    @Autowired
    private VoteShareService voteShareService;

    @Autowired
    private EthnicityPopulationService ethnicityPopulationService;

    @Autowired
    private EthnicityRepsService ethnicityRepsService;

    @Autowired
    private EthnicityPopulationILService ethnicityPopulationILService;

    @Autowired
    private EthnicityRepsILService ethnicityRepsILService;

    @Autowired
    private PrecinctAnalysisTableService precinctAnalysisTableService;

    @Autowired
    private VoteShareServiceIllinois voteShareServiceIllinois;

    @Autowired
    private PrecinctAnalysisTableServiceIllinois precinctAnalysisTableServiceIllinois;

    @Autowired
    private OpportunityDistrictService opportunityDistrictService;

    @Autowired
    private OpportunityDistrictServiceIllinois opportunityDistrictServiceIllinois;

    @Autowired
    private VoteShareSeatShareService voteShareSeatShareService;

    @Autowired
    private VoteShareSeatShareIllinoisService voteShareSeatShareIllinoisService;

    


    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/Arizona_Illinois_Legislative_Districts")
    public String getLegislativeJson() throws IOException {
        ClassPathResource resource = new ClassPathResource("static/Arizona_Illinois_Legislative_Districts.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
    //mapping for district boundaries
    @GetMapping("/Arizona_Illinois_Boundaries")
    public String getBoundariesJson() throws IOException {
        ClassPathResource resource = new ClassPathResource("static/Arizona_Illinois_Boundary.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    //mapping for precinct analysis data
    @GetMapping("/api/arizona/vote-shares/precinct-analysis")
    public ResponseEntity<?> getVoteShareDataByTypeAndRace(@RequestParam String race) {  
    String typeWithRace = "precinct_analysis_" + race;  
    Optional<VoteShareData> data = voteShareService.getDataByType(typeWithRace);
    return data
        .map(ResponseEntity::ok)
        .orElseGet(() -> {
            System.out.println("No vote share data found for type and race '" + typeWithRace + "'");
            return ResponseEntity.notFound().build();
        });
    }

    @GetMapping("/api/illinois/vote-shares/precinct-analysis")
    public ResponseEntity<?> getVoteShareDataIllinoisByTypeAndRace(@RequestParam String race) {  
        String typeWithRace = "precinct_analysis_" + race;  
        Optional<VoteShareDataIllinois> data = voteShareServiceIllinois.getDataByType(typeWithRace);
        return data
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("No vote share data found for Illinois with type and race '" + typeWithRace + "'");
                return ResponseEntity.notFound().build();
            });
    }
    //mapping for ethnicity population
    @GetMapping("/api/arizona/ethnicity-population")
    public ResponseEntity<EthnicityPopulation> getEthnicityPopulationByType() {
        System.out.println("Endpoint /api/arizona/ethnicity-population was hit");

        return ethnicityPopulationService.getDataByType("ethnicity_population")
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("No ethnicity population found'");
                return ResponseEntity.notFound().build();
            });
    }
    

    @GetMapping("/api/illinois/ethnicity-population")
    public ResponseEntity<EthnicityPopulationIL> getEthnicityPopulationILByType() {
        System.out.println("Endpoint /api/illinois/ethnicity-population was hit");

        return ethnicityPopulationILService.getDataByType("ethnicity_population")
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("No ethnicity population found for Illinois");
                return ResponseEntity.notFound().build();
            });
    }

    //mapping for representatives
    @GetMapping("/api/arizona/ethnicity-representatives")
    public ResponseEntity<EthnicityReps> getEthnicityRepresentativesByType() {
        return ethnicityRepsService.getDataByType("ethnicity_population_reps")
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("No ethnicity representatives data found");
                return ResponseEntity.notFound().build();
            });
    
    }

    @GetMapping("/api/illinois/ethnicity-representatives")
    public ResponseEntity<EthnicityRepsIL> getEthnicityRepresentativesILByType() {
        System.out.println("Endpoint /api/illinois/ethnicity-representatives was hit");

        return ethnicityRepsILService.getDataByType("ethnicity_population_reps")
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("No ethnicity representatives found for Illinois");
                return ResponseEntity.notFound().build();
            });
    }
    
    //precinct analysis table
    @GetMapping("api/arizona/precinct-analysis-table")
    public ResponseEntity<PrecinctAnalysisTable> getPrecinctAnalysisDataByType() {
        return precinctAnalysisTableService.getDataByType("precinct_analysis_table2")
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("Error getting precinct table");
                return ResponseEntity.notFound().build();
            });
    }

    @GetMapping("/api/illinois/precinct-analysis-table")
    public ResponseEntity<PrecinctAnalysisTableIllinois> getPrecinctAnalysisDataIllinoisByType() {
        String type = "precinct_analysis_table"; // Adjust the type as necessary for your use case
        Optional<PrecinctAnalysisTableIllinois> data = precinctAnalysisTableServiceIllinois.getDataByType(type);
        return data
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("Error getting Illinois precinct table for type: " + type);
                return ResponseEntity.notFound().build();
            });
    }


    @GetMapping("/config_data")
    public String getConfigData() throws IOException {
        ClassPathResource resource = new ClassPathResource("static/config_data.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    @GetMapping("/illinois/box-whisker-data/5000")
    public String getBoxWhiskerDataIl(@RequestParam String race) throws IOException {
        ClassPathResource resource = new ClassPathResource("static/"+race+"_ranked_data_il.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    @GetMapping("/arizona/box-whisker-data/5000")
    public String getBoxWhiskerDataAZ(@RequestParam String race) throws IOException {
        ClassPathResource resource = new ClassPathResource("static/"+race+"_ranked_data_az.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    @GetMapping("/illinois/box-whisker-data/250")
    public String getBoxWhiskerDataIl250(@RequestParam String race) throws IOException {
        ClassPathResource resource = new ClassPathResource("static/"+race+"_250_ranked_data_il.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    @GetMapping("/arizona/box-whisker-data/250")
    public String getBoxWhiskerDataAZ250(@RequestParam String race) throws IOException {
        ClassPathResource resource = new ClassPathResource("static/"+race+"_250_ranked_data_az.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

   

    @GetMapping("/api/arizona/opportunity-districts")
    public ResponseEntity<?> getOpportunityDistrictDataByRace(@RequestParam String race) {
        String typeWithRace = "opportunity_district_" + race;
        System.out.println("This race: " + race);
        Optional<OpportunityDistrictData> data = opportunityDistrictService.getDataByType(typeWithRace);
        return data
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("No opportunity district data found for race: " + race);
                return ResponseEntity.notFound().build();
            });
    }

    @GetMapping("/api/illinois/opportunity-districts")
    public ResponseEntity<?> getOpportunityDistrictDataIllinoisByRace(@RequestParam String race) {
        String typeWithRace = "opportunity_district_" + race;
        System.out.println("Checking Illinois data for race: " + race);
        Optional<OpportunityDistrictDataIllinois> data = opportunityDistrictServiceIllinois.getDataByType(typeWithRace);
        return data
            .map(ResponseEntity::ok)
            .orElseGet(() -> {
                System.out.println("No opportunity district data found for Illinois with race: " + race);
                return ResponseEntity.notFound().build();
            });
    }

    //seat share curve

    @GetMapping("/api/arizona/vote-seat-share")
    public ResponseEntity<VoteShareSeatShare> getVoteShareSeatShareByType() {
    String type = "vote_seat_share";
    Optional<VoteShareSeatShare> data = voteShareSeatShareService.getDataByType(type);
    return data.map(ResponseEntity::ok)
                .orElseGet(() -> {
                    return ResponseEntity.notFound().build();
                });
    }
    
    @GetMapping("/api/illinois/vote-seat-share")
    public ResponseEntity<VoteShareSeatShareIllinois> getVoteShareSeatShareIllinoisByType() {
        String type = "vote_seat_share"; // Adjust the type as necessary for your use case
        Optional<VoteShareSeatShareIllinois> data = voteShareSeatShareIllinoisService.getDataByType(type);
        return data.map(ResponseEntity::ok)
                   .orElseGet(() -> {
                       System.out.println("No VoteShareSeatShare data found for Illinois.");
                       return ResponseEntity.notFound().build();
                   });
    }


}