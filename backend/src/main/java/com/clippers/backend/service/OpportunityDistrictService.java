package com.clippers.backend.service;

import com.clippers.backend.model.OpportunityDistrictData;
import com.clippers.backend.repository.OpportunityDistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OpportunityDistrictService {

    private final OpportunityDistrictRepository opportunityDistrictRepository;

    @Autowired
    public OpportunityDistrictService(OpportunityDistrictRepository opportunityDistrictRepository) {
        this.opportunityDistrictRepository = opportunityDistrictRepository;
    }

    public Optional<OpportunityDistrictData> getDataByType(String type) {
        return opportunityDistrictRepository.findByType(type);
    }
}
