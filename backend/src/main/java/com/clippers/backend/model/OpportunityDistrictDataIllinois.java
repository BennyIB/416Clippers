package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Illinois")
public class OpportunityDistrictDataIllinois extends MongoDocument {

    private List<Integer> x_points; 
    private List<Integer> y_points; 

    public OpportunityDistrictDataIllinois(String id, String type, List<Integer> x_points, List<Integer> y_points) {
        super(id, type); 
        this.x_points = x_points;
        this.y_points = y_points;
    }

    
    public List<Integer> getX_points() {
        return x_points;
    }

    public List<Integer> getY_points() {
        return y_points;
    }

}
