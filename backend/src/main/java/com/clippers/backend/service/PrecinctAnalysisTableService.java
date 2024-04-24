package com.clippers.backend.service;

import com.clippers.backend.model.PrecinctAnalysisTable;
import com.clippers.backend.repository.PrecinctAnalysisTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PrecinctAnalysisTableService {

    private final PrecinctAnalysisTableRepository precinctAnalysisTableRepository;

    @Autowired
    public PrecinctAnalysisTableService(PrecinctAnalysisTableRepository precinctAnalysisTableRepository) {
        this.precinctAnalysisTableRepository = precinctAnalysisTableRepository;
    }

    public Optional<PrecinctAnalysisTable> getDataByType(String type) {
        Optional<PrecinctAnalysisTable> precinctAnalysisTable = precinctAnalysisTableRepository.findByType(type);
        if (precinctAnalysisTable.isPresent()) {
            PrecinctAnalysisTable pat = precinctAnalysisTable.get();
            System.out.println("PrecinctAnalysisTable found:");
            System.out.println("ID: " + pat.getId());
            System.out.println("Type: " + pat.getType());
            System.out.println("Data: " + pat.getData());
        } else {
            System.out.println("No Precinct Analysis Table found for type: " + type);
        }
        return precinctAnalysisTable;
    }

}
