package com.clippers.backend.repository;

import com.clippers.backend.model.VoteShareDataIllinois;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteShareRepositoryIllinois extends MongoDocumentRepository<VoteShareDataIllinois, String> {
}
