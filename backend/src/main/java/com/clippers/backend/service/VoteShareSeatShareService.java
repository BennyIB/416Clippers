package com.clippers.backend.service;

import com.clippers.backend.model.VoteShareSeatShare;
import com.clippers.backend.repository.VoteShareSeatShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VoteShareSeatShareService {

    private final VoteShareSeatShareRepository voteShareSeatShareRepository;

    @Autowired
    public VoteShareSeatShareService(VoteShareSeatShareRepository voteShareSeatShareRepository) {
        this.voteShareSeatShareRepository = voteShareSeatShareRepository;
    }

    public Optional<VoteShareSeatShare> getDataByType(String type) {
        Optional<VoteShareSeatShare> voteShareSeatShare = voteShareSeatShareRepository.findByType(type);

        if (voteShareSeatShare.isPresent()) {
            VoteShareSeatShare vsss = voteShareSeatShare.get();
            System.out.println("VoteShareSeatShare found:");
            System.out.println("ID: " + vsss.getId());
            System.out.println("Type: " + vsss.getType());
            System.out.println("Data Points: " + vsss.getDataPoints());
        } else {
            System.out.println("No VoteShareSeatShare found for type: " + type);
        }

        return voteShareSeatShare;
    }
}
