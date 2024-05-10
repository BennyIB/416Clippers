package com.clippers.backend.service;

import com.clippers.backend.model.VoteShareSeatShareIllinois;
import com.clippers.backend.repository.VoteShareSeatShareIllinoisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VoteShareSeatShareIllinoisService {

    private final VoteShareSeatShareIllinoisRepository voteShareSeatShareIllinoisRepository;

    @Autowired
    public VoteShareSeatShareIllinoisService(VoteShareSeatShareIllinoisRepository voteShareSeatShareIllinoisRepository) {
        this.voteShareSeatShareIllinoisRepository = voteShareSeatShareIllinoisRepository;
    }

    public Optional<VoteShareSeatShareIllinois> getDataByType(String type) {
        Optional<VoteShareSeatShareIllinois> voteShareSeatShare = voteShareSeatShareIllinoisRepository.findByType(type);

        if (voteShareSeatShare.isPresent()) {
            VoteShareSeatShareIllinois vsss = voteShareSeatShare.get();
            System.out.println("VoteShareSeatShareIllinois found:");
            System.out.println("ID: " + vsss.getId());
            System.out.println("Type: " + vsss.getType());
            System.out.println("Data Points: " + vsss.getDataPoints());
        } else {
            System.out.println("No VoteShareSeatShareIllinois found for type: " + type);
        }

        return voteShareSeatShare;
    }
}
