package com.clippers.backend.service;

import com.clippers.backend.model.VoteShareData;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VoteShareService {

    private final MongoService<VoteShareData> voteShareDataService;

    public VoteShareService(MongoService<VoteShareData> voteShareDataService) {
        this.voteShareDataService = voteShareDataService;
    }

    public Optional<VoteShareData> getVoteShareDataByType(String type) {
        Optional<VoteShareData> result = voteShareDataService.getDataByType(type);
        result.ifPresent(voteShareData -> {
            System.out.println("VoteShareData: " + voteShareData.getId());
            System.out.println("type:" + voteShareData.getType());
            System.out.println("Democrat points: " + voteShareData.getDemocratPoints());
            System.out.println("Republican points: " + voteShareData.getRepublicanPoints());
            System.out.println("Democrat equation: " + voteShareData.getEquationDemocrat());
            System.out.println("Republican equation: " + voteShareData.getEquationRepublican());
        });
        return result;
    }
}
