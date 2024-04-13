package com.clippers.backend.service;

import com.clippers.backend.model.VoteShareData;
import com.clippers.backend.repository.VoteShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.Optional;


@Service
public class VoteShareService {

    private final VoteShareRepository repository;

    @Autowired
    public VoteShareService(VoteShareRepository repository) {
        this.repository = repository;
    }

    public Optional<VoteShareData> getVoteShareDataByType(String type) {
        Optional<VoteShareData> result = repository.findByType(type);
        return result;
    }
}
