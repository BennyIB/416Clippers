package com.clippers.backend.repository;

import com.clippers.backend.model.VoteShareSeatShare;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteShareSeatShareRepository extends MongoDocumentRepository<VoteShareSeatShare, String> {
}
