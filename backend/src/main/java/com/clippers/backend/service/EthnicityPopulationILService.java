package com.clippers.backend.service;

import com.clippers.backend.model.EthnicityPopulationIL;
import com.clippers.backend.repository.EthnicityPopulationILRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EthnicityPopulationILService {

    private final EthnicityPopulationILRepository ethnicityPopulationILRepository;

    @Autowired
    public EthnicityPopulationILService(EthnicityPopulationILRepository ethnicityPopulationILRepository) {
        this.ethnicityPopulationILRepository = ethnicityPopulationILRepository;
    }

    public Optional<EthnicityPopulationIL> getDataByType(String type) {
        Optional<EthnicityPopulationIL> ethnicityPopulationIL = ethnicityPopulationILRepository.findByType(type);
        if (ethnicityPopulationIL.isPresent()) {
            EthnicityPopulationIL ep = ethnicityPopulationIL.get();
            System.out.println("EthnicityPopulationIL found:");
            System.out.println("ID: " + ep.getId());
            System.out.println("Type: " + ep.getType());
            System.out.println("Ethnicities: " + ep.getEthnicities());
            System.out.println("Populations: " + ep.getPopulations());
        } else {
            System.out.println("No Ethnicity PopulationIL found for type: " + type);
        }
        return ethnicityPopulationIL;
    }

}
