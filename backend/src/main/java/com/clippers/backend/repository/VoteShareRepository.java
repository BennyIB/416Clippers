package com.clippers.backend.repository;

import com.clippers.backend.model.VoteShareData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VoteShareRepository extends MongoRepository<VoteShareData, String> {
    Optional<VoteShareData> findByType(String type);
}
