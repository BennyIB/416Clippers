package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@Document(collection = "Illinois")
public class VoteShareSeatShareIllinois extends MongoDocument {

    @Field("data_points")
    private List<VoteSeatData> dataPoints;

    public VoteShareSeatShareIllinois(String id, String type, List<VoteSeatData> dataPoints) {
        super(id, type);
        this.dataPoints = dataPoints;
    }

    public List<VoteSeatData> getDataPoints() {
        return dataPoints;
    }

    public static class VoteSeatData {
        @Field("votes")
        private Double votes;

        @Field("seatsR")
        private Double seatsR;

        @Field("seatsD")
        private Double seatsD;

        public VoteSeatData(Double votes, Double seatsR, Double seatsD) {
            this.votes = votes;
            this.seatsR = seatsR;
            this.seatsD = seatsD;
        }

        public Double getVotes() {
            return votes;
        }

        public Double getSeatsR() {
            return seatsR;
        }

        public Double getSeatsD() {
            return seatsD;
        }
    }
}
