package com.clippers.backend.repository;
import com.clippers.backend.model.PrecinctAnalysisTable;
import org.springframework.stereotype.Repository;

@Repository
public interface PrecinctAnalysisTableRepository extends MongoDocumentRepository<PrecinctAnalysisTable, String>{
    
}
