package com.clippers.backend.repository;

import com.clippers.backend.model.EthnicityPopulationIL;
import org.springframework.stereotype.Repository;

@Repository
public interface EthnicityPopulationILRepository extends MongoDocumentRepository<EthnicityPopulationIL, String> {

}
