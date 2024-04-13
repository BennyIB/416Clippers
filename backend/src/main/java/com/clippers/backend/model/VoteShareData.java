package com.clippers.backend.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Arizona")
public class VoteShareData {
    @Id
    private String id;
    private String type;
    private List<Point> democratPoints;
    private List<Point> republicanPoints;

    // Getters
    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public List<Point> getDemocratPoints() {
        return democratPoints;
    }

    public List<Point> getRepublicanPoints() {
        return republicanPoints;
    }

    // Inner class to represent a Point
    public static class Point {
        private int index;
        private double voteShare;

        // Getters
        public int getIndex() {
            return index;
        }

        public double getVoteShare() {
            return voteShare;
        }
    }
}
