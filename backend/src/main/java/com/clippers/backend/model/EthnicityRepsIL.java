package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Illinois")
public class EthnicityRepsIL extends MongoDocument {

    private List<String> ethnicities;
    private List<Float> populations; 

    // Constructor with parameters
    public EthnicityRepsIL(String id, String type, List<String> ethnicities, List<Float> populations) {
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
