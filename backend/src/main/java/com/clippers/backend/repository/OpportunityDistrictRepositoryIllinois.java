package com.clippers.backend.repository;

import com.clippers.backend.model.OpportunityDistrictDataIllinois;
import org.springframework.stereotype.Repository;

@Repository
public interface OpportunityDistrictRepositoryIllinois extends MongoDocumentRepository<OpportunityDistrictDataIllinois, String> {
}
