package com.example.ngr;
import java.util.ArrayList;

public class Event {
    public enum EventType {
        UNIT_MOVED,
        UNIT_ADDED,
        AREA_CREATED,
        NOTE_ADDED,
        UNIT_STATUS_CHANGED,
        AREA_MODIFIED
    }
    /*
     * Not all event types will use each field, only 
     */
    private EventType type;
    private String destination_coords;
    private ArrayList<String> polygonCoords;
    private String polygonShape;
    private String note_text;
    private boolean isready;

    public EventType getType() {
        return type;
    }

    public void setType(EventType t) {
        type = t;
    }

    public String getDestCoords() {
        return destination_coords;
    }

    public void setDestCoords(String d) {
        destination_coords = d;
    }

    public ArrayList<String> getPolygonCoords() {
        return polygonCoords;
    }

    public void setPolygonCoords(ArrayList<String> coords) {
        polygonCoords = coords;
    }

    public String getPolygonShape() {
        return polygonShape;
    }

    public void setPolygonShape(String shape) {
        polygonShape = shape;
    }

    public String getNote() {
        return note_text;
    }

    public void setNote(String n) {
        note_text = n;
    }

    public boolean isReady() {
        return isready;
    }

    public void setReady(boolean r) {
        isready = r;
    }

}
