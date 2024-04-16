package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "Arizona")
public class VoteShareData extends MongoDocument {
    @Field("democrat_points")
    private List<Object[]> democratPoints;
    @Field("republican_points")
    private List<Object[]> republicanPoints;
    @Field("equation_democrat")
    private String equationDemocrat;
    @Field("equation_republican")
    private String equationRepublican;

    public VoteShareData(String id, String type, List<Object[]> democratPoints, List<Object[]> republicanPoints, String equationDemocrat, String equationRepublican) {
        super(id, type);
        this.democratPoints = democratPoints;
        this.republicanPoints = republicanPoints;
        this.equationDemocrat = equationDemocrat;
        this.equationRepublican = equationRepublican;
    }

    // Getters and setters
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
}
