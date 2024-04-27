package com.clippers.backend.service;

import com.clippers.backend.model.PrecinctAnalysisTableIllinois;
import com.clippers.backend.repository.PrecinctAnalysisTableRepositoryIllinois;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PrecinctAnalysisTableServiceIllinois {

    private final PrecinctAnalysisTableRepositoryIllinois precinctAnalysisTableRepositoryIllinois;

    @Autowired
    public PrecinctAnalysisTableServiceIllinois(PrecinctAnalysisTableRepositoryIllinois precinctAnalysisTableRepositoryIllinois) {
        this.precinctAnalysisTableRepositoryIllinois = precinctAnalysisTableRepositoryIllinois;
    }

    public Optional<PrecinctAnalysisTableIllinois> getDataByType(String type) {
        return precinctAnalysisTableRepositoryIllinois.findByType(type);
    }


}
