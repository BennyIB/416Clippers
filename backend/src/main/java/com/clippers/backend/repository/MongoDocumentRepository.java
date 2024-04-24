package com.clippers.backend.repository;

import com.clippers.backend.model.MongoDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface MongoDocumentRepository<T extends MongoDocument, ID> extends MongoRepository<T, ID> {
    Optional<T> findByType(String type);
}