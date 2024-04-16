package com.clippers.backend.service;

import com.clippers.backend.model.MongoDocument;
import com.clippers.backend.repository.MongoDocumentRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MongoService<T extends MongoDocument> {

    private final MongoDocumentRepository<T, String> repository;

    public MongoService(MongoDocumentRepository<T, String> repository) {
        this.repository = repository;
    }

    public Optional<T> getDataByType(String type) {
        return repository.findByType(type);
    }

}
