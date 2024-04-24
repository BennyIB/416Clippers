package com.clippers.backend.service;

import com.clippers.backend.model.EthnicityRepsIL;
import com.clippers.backend.repository.EthnicityRepsILRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EthnicityRepsILService {

    private final EthnicityRepsILRepository ethnicityRepsILRepository;

    @Autowired
    public EthnicityRepsILService(EthnicityRepsILRepository ethnicityRepsILRepository) {
        this.ethnicityRepsILRepository = ethnicityRepsILRepository;
    }

    public Optional<EthnicityRepsIL> getDataByType(String type) {
        Optional<EthnicityRepsIL> ethnicityRepsIL = ethnicityRepsILRepository.findByType(type);
        if (ethnicityRepsIL.isPresent()) {
            EthnicityRepsIL erIL = ethnicityRepsIL.get();
            System.out.println("EthnicityRepsIL found:");
            System.out.println("ID: " + erIL.getId());
            System.out.println("Type: " + erIL.getType());
            System.out.println("Ethnicities: " + erIL.getEthnicities());
            System.out.println("Representatives: " + erIL.getPopulations());
        } else {
            System.out.println("No Ethnicity Representatives found for type: " + type);
        }
        return ethnicityRepsIL;
    }

}
