package com.clippers.backend.repository;

import com.clippers.backend.model.VoteShareData;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteShareRepository extends MongoDocumentRepository<VoteShareData, String> {
    // add specific methods to this repo here
}
