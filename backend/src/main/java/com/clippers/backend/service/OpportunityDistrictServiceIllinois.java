package com.clippers.backend.service;

import com.clippers.backend.model.OpportunityDistrictDataIllinois;
import com.clippers.backend.repository.OpportunityDistrictRepositoryIllinois;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OpportunityDistrictServiceIllinois {

    private final OpportunityDistrictRepositoryIllinois opportunityDistrictRepositoryIllinois;

    @Autowired
    public OpportunityDistrictServiceIllinois(OpportunityDistrictRepositoryIllinois opportunityDistrictRepositoryIllinois) {
        this.opportunityDistrictRepositoryIllinois = opportunityDistrictRepositoryIllinois;
    }

    public Optional<OpportunityDistrictDataIllinois> getDataByType(String type) {
        return opportunityDistrictRepositoryIllinois.findByType(type);
    }
}
