package com.example.ngr;

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
    private String polygonCoords;
    private String polygonShape;
    private String polygonColor;
    private String note_text;
    private String name;
    private boolean isready;

    public EventType getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public void setName(String n) {
        name = n;
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

    public String getPolygonCoords() {
        return polygonCoords;
    }

    public String getPolygonColor() {
        return polygonColor;
    }

    public void setPolygonColor(String color) {
        polygonColor = color;
    }

    public void setPolygonCoords(String coords) {
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
