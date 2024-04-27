package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "Illinois")
public class PrecinctAnalysisTableIllinois extends MongoDocument {
    
    @Field("data")
    private List<PrecinctDataIllinois> data;

    public PrecinctAnalysisTableIllinois(String id, String type, List<PrecinctDataIllinois> data) {
        super(id, type);
        this.data = data;
    }

    public List<PrecinctDataIllinois> getData() {
        return data;
    }

    public static class PrecinctDataIllinois {
        @Field("precinct_name")
        private String precinctName;
        
        @Field("total_population")
        private Integer totalPopulation;
        
        @Field("hispanic_population")
        private Integer hispanicPopulation;
        
        @Field("asian_population")
        private Integer asianPopulation;
        
        @Field("white_population")
        private Integer whitePopulation;
        
        @Field("black_population")
        private Integer blackPopulation;
        
        @Field("republican_votes")
        private Integer republicanVotes;
        
        @Field("democratic_votes")
        private Integer democraticVotes;

        public String getPrecinctName() {
            return precinctName;
        }

        public Integer getTotalPopulation() {
            return totalPopulation;
        }

        public Integer getHispanicPopulation() {
            return hispanicPopulation;
        }

        public Integer getAsianPopulation() {
            return asianPopulation;
        }

        public Integer getWhitePopulation() {
            return whitePopulation;
        }

        public Integer getBlackPopulation() {
            return blackPopulation;
        }

        public Integer getRepublicanVotes() {
            return republicanVotes;
        }

        public Integer getDemocraticVotes() {
            return democraticVotes;
        }
        
    }
}
