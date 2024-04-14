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

    public VoteShareData() {}

    public VoteShareData(String id, String type, List<Object[]> democratPoints, List<Object[]> republicanPoints) {
        this.id = id;
        this.type = type;
        this.democratPoints = democratPoints;
        this.republicanPoints = republicanPoints;
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
    



}
