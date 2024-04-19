package com.clippers.backend.repository;

import com.clippers.backend.model.EthnicityReps;
import org.springframework.stereotype.Repository;

@Repository
public interface EthnicityRepsRepository extends MongoDocumentRepository<EthnicityReps, String> {
}
