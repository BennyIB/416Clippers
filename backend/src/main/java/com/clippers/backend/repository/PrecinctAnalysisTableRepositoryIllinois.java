package com.clippers.backend.repository;

import com.clippers.backend.model.PrecinctAnalysisTableIllinois;
import org.springframework.stereotype.Repository;

@Repository
public interface PrecinctAnalysisTableRepositoryIllinois extends MongoDocumentRepository<PrecinctAnalysisTableIllinois, String> {
    
}
