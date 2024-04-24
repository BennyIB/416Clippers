package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Illinois")
public class EthnicityPopulationIL extends MongoDocument {

    private List<String> ethnicities;
    private List<Float> populations; 

    public EthnicityPopulationIL(String id, String type, List<String> ethnicities, List<Float> populations) {
        super(id, type);
        this.ethnicities = ethnicities;
        this.populations = populations;
    }

    // Getters and setters
    public List<String> getEthnicities() {
        return ethnicities;
    }


    public List<Float> getPopulations() {
        return populations;
    }

}
