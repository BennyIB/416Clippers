package com.clippers.backend.repository;

import com.clippers.backend.model.EthnicityRepsIL;
import org.springframework.stereotype.Repository;

@Repository
public interface EthnicityRepsILRepository extends MongoDocumentRepository<EthnicityRepsIL, String> {
    
}
