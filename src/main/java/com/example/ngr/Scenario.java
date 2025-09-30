package com.example.ngr;


public class Scenario {
    private String name;
    private String type;

    
    Scenario(String n, String t) {
        this.name = n;
        this.type = t;
    }

    public String getName() {
        return this.name;
    }

    public String getType() {
        return this.type;
    }

    public void setName(String n) {
        this.name = n;
    }

    public void setType(String t) {
        this.type = t;
    }
}
