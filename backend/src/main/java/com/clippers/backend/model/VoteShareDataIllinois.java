package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "Illinois")
public class VoteShareDataIllinois extends MongoDocument {
    @Field("democrat_points")
    private List<Object[]> democratPoints;
    @Field("republican_points")
    private List<Object[]> republicanPoints;
    @Field("equation_democrat")
    private String equationDemocrat;
    @Field("equation_republican")
    private String equationRepublican;
    @Field("form_democrat")
    private String formDemocrat; 
    @Field("form_republican")
    private String formRepublican;

    // Assuming MongoDocument has a constructor that accepts id and type
    public VoteShareDataIllinois(String id, String type, List<Object[]> democratPoints, List<Object[]> republicanPoints, String equationDemocrat, String equationRepublican) {
        super(id, type);
        this.democratPoints = democratPoints;
        this.republicanPoints = republicanPoints;
        this.equationDemocrat = equationDemocrat;
        this.equationRepublican = equationRepublican;
    }
    public List<Object[]> getDemocratPoints() {
        return democratPoints;
    }

    public List<Object[]> getRepublicanPoints() {
        return republicanPoints;
    }

    public String getEquationDemocrat() {
        return equationDemocrat;
    }

    public String getEquationRepublican() {
        return equationRepublican;
    }
    public String getFormDemocrat() {
        return formDemocrat;
    }

    public String getFormRepublican() {
        return formRepublican;
    }
    
}
