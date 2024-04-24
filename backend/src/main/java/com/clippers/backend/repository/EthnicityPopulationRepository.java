package com.clippers.backend.repository;

import com.clippers.backend.model.EthnicityPopulation;
import org.springframework.stereotype.Repository;

@Repository
public interface EthnicityPopulationRepository extends MongoDocumentRepository<EthnicityPopulation, String> {

}
