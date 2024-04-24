package com.clippers.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Arizona")
public class StateDataSummary extends MongoDocument {

    private String stateName;
    private String voterDistributionPercentage;
    private String totalPopulation;
    private String racialGroupLatinoPopulation;
    private String racialGroupWhitePopulation;
    private String racialGroupBlackPopulation;
    private String racialGroupAsianPopulation;
    private String redistrictingControl;
    private int partySummaryDemocrat;
    private int partySummaryRepublican;
    private int racialSummaryWhite;
    private int racialSummaryLatino;
    private int racialSummaryBlack;
    private int racialSummaryAsian;

    // Constructor with parameters
    public StateDataSummary(String id, String type, String stateName, String voterDistributionPercentage, String totalPopulation, String racialGroupLatinoPopulation, String racialGroupWhitePopulation, String racialGroupBlackPopulation, String racialGroupAsianPopulation, String redistrictingControl, int partySummaryDemocrat, int partySummaryRepublican, int racialSummaryWhite, int racialSummaryLatino, int racialSummaryBlack, int racialSummaryAsian) {
        super(id, type);
        this.stateName = stateName;
        this.voterDistributionPercentage = voterDistributionPercentage;
        this.totalPopulation = totalPopulation;
        this.racialGroupLatinoPopulation = racialGroupLatinoPopulation;
        this.racialGroupWhitePopulation = racialGroupWhitePopulation;
        this.racialGroupBlackPopulation = racialGroupBlackPopulation;
        this.racialGroupAsianPopulation = racialGroupAsianPopulation;
        this.redistrictingControl = redistrictingControl;
        this.partySummaryDemocrat = partySummaryDemocrat;
        this.partySummaryRepublican = partySummaryRepublican;
        this.racialSummaryWhite = racialSummaryWhite;
        this.racialSummaryLatino = racialSummaryLatino;
        this.racialSummaryBlack = racialSummaryBlack;
        this.racialSummaryAsian = racialSummaryAsian;
    }

    // Getters only

    public String getStateName() {
        return stateName;
    }

    public String getVoterDistributionPercentage() {
        return voterDistributionPercentage;
    }

    public String getTotalPopulation() {
        return totalPopulation;
    }

    public String getRacialGroupLatinoPopulation() {
        return racialGroupLatinoPopulation;
    }

    public String getRacialGroupWhitePopulation() {
        return racialGroupWhitePopulation;
    }

    public String getRacialGroupBlackPopulation() {
        return racialGroupBlackPopulation;
    }

    public String getRacialGroupAsianPopulation() {
        return racialGroupAsianPopulation;
    }

    public String getRedistrictingControl() {
        return redistrictingControl;
    }

    public int getPartySummaryDemocrat() {
        return partySummaryDemocrat;
    }

    public int getPartySummaryRepublican() {
        return partySummaryRepublican;
    }

    public int getRacialSummaryWhite() {
        return racialSummaryWhite;
    }

    public int getRacialSummaryLatino() {
        return racialSummaryLatino;
    }

    public int getRacialSummaryBlack() {
        return racialSummaryBlack;
    }

    public int getRacialSummaryAsian() {
        return racialSummaryAsian;
    }
}
