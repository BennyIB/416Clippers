package com.clippers.backend.service;

import com.clippers.backend.model.VoteShareDataIllinois;
import com.clippers.backend.repository.VoteShareRepositoryIllinois;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VoteShareServiceIllinois {

    private final VoteShareRepositoryIllinois voteShareRepositoryIllinois;

    @Autowired
    public VoteShareServiceIllinois(VoteShareRepositoryIllinois voteShareRepositoryIllinois) {
        this.voteShareRepositoryIllinois = voteShareRepositoryIllinois;
    }

    public Optional<VoteShareDataIllinois> getDataByType(String type) {
        return voteShareRepositoryIllinois.findByType(type);
    }

}
