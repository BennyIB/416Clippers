package com.clippers.backend.service;

import com.clippers.backend.model.VoteShareData;
import com.clippers.backend.repository.VoteShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;


@Service
public class VoteShareService {

    private final VoteShareRepository voteShareRepository;

    @Autowired
    public VoteShareService(VoteShareRepository voteShareRepository) {
        this.voteShareRepository = voteShareRepository;
    }

    public Optional<VoteShareData> getDataByType(String type) {
        return voteShareRepository.findByType(type);
    }


}
