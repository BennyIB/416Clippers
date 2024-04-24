package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Arizona")
public class EthnicityReps extends MongoDocument {

    private List<String> ethnicities;
    private List<Float> populations; 

    public EthnicityReps(String id, String type, List<String> ethnicities, List<Float> populations) {
        super(id, type);
        this.ethnicities = ethnicities;
        this.populations = populations;
    }

    public List<String> getEthnicities() {
        return ethnicities;
    }

    public List<Float> getPopulations() {
        return populations;
    }



}
