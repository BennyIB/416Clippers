package com.clippers.backend.repository;

import com.clippers.backend.model.OpportunityDistrictData;
import org.springframework.stereotype.Repository;

@Repository
public interface OpportunityDistrictRepository extends MongoDocumentRepository<OpportunityDistrictData, String> {
}
