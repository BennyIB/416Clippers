package com.clippers.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.util.List;

@Document(collection = "Arizona")
public class VoteShareData {
    @Id
    private String id;
    private String type;
    @Field("democrat_points")
    private List<Object[]> democratPoints;
    @Field("republican_points")
    private List<Object[]> republicanPoints;
    @Field("equation_democrat")  
    private String equationDemocrat; 
    @Field("equation_republican")  
    private String equationRepublican;  

    public VoteShareData() {}

    public VoteShareData(String id, String type, List<Object[]> democratPoints, List<Object[]> republicanPoints, String equationDemocrat, String equationRepublican) {
        this.id = id;
        this.type = type;
        this.democratPoints = democratPoints;
        this.republicanPoints = republicanPoints;
        this.equationDemocrat = equationDemocrat;
        this.equationRepublican = equationRepublican;
    }


    // Getters and setters

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
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
    



}
