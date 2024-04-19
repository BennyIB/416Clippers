package com.clippers.backend.service;

import com.clippers.backend.model.EthnicityReps;
import com.clippers.backend.repository.EthnicityRepsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EthnicityRepsService {

    private final EthnicityRepsRepository ethnicityRepsRepository;

    @Autowired
    public EthnicityRepsService(EthnicityRepsRepository ethnicityRepsRepository) {
        this.ethnicityRepsRepository = ethnicityRepsRepository;
    }

    public Optional<EthnicityReps> getDataByType(String type) {
        Optional<EthnicityReps> ethnicityReps = ethnicityRepsRepository.findByType(type);
        if (ethnicityReps.isPresent()) {
            EthnicityReps er = ethnicityReps.get();
            System.out.println("EthnicityReps found:");
            System.out.println("ID: " + er.getId());
            System.out.println("Type: " + er.getType());
            System.out.println("Ethnicities: " + er.getEthnicities());
            System.out.println("Representatives: " + er.getPopulations());
        } else {
            System.out.println("No Ethnicity Representatives found for type: " + type);
        }
        return ethnicityReps;
    }

}
