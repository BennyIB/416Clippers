package com.clippers.backend.service;

import com.clippers.backend.model.VoteShareData;
import com.clippers.backend.repository.VoteShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.Optional;
import java.util.List;



@Service
public class VoteShareService {

    private final VoteShareRepository repository;

    @Autowired
    public VoteShareService(VoteShareRepository repository) {
        this.repository = repository;
    }

    public Optional<VoteShareData> getVoteShareDataByType(String type) {
        //System.out.println("Searching for type: " + type);
        Optional<VoteShareData> result = repository.findByType(type);
        if (result.isPresent()) {
            VoteShareData voteShareData = result.get();
            System.out.println("VoteShareData: " + voteShareData.getId());
            System.out.println("type:" + voteShareData.getType());
            System.out.println("Democrat points: " + voteShareData.getDemocratPoints());
            System.out.println("Republican points: " + voteShareData.getRepublicanPoints());
            System.out.println("Democrat equation: " + voteShareData.getEquationDemocrat());
            System.out.println("Republican equation: " + voteShareData.getEquationRepublican());

        } else {
            System.out.println("No vote share data found for type: " + type);
        }
        
        return result;
    }
}
