package com.clippers.backend.service;

import com.clippers.backend.model.EthnicityPopulation;
import com.clippers.backend.repository.EthnicityPopulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EthnicityPopulationService {

    private final EthnicityPopulationRepository ethnicityPopulationRepository;

    @Autowired
    public EthnicityPopulationService(EthnicityPopulationRepository ethnicityPopulationRepository) {
        this.ethnicityPopulationRepository = ethnicityPopulationRepository;
    }

    public Optional<EthnicityPopulation> getDataByType(String type) {
        Optional<EthnicityPopulation> ethnicityPopulation = ethnicityPopulationRepository.findByType(type);
        if (ethnicityPopulation.isPresent()) {
            EthnicityPopulation ep = ethnicityPopulation.get();
            System.out.println("EthnicityPopulation found:");
            System.out.println("ID: " + ep.getId());
            System.out.println("Type: " + ep.getType());
            System.out.println("Ethnicities: " + ep.getEthnicities());
            System.out.println("Populations: " + ep.getPopulations());
        } else {
            System.out.println("No Ethnicity Population found for type: " + type);
        }
        return ethnicityPopulation;
    }

}
