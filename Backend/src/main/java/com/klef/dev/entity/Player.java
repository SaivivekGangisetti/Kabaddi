package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @Column(name = "player_id")
    private int id;

    @Column(name = "player_name", nullable = false, length = 50)
    private String playername;

    @Column(name = "player_type", nullable = false, length = 20)
    private String playertype; // Raider / Defender / All-Rounder

    @Column(name = "player_position", nullable = false, length = 50)
    private String position;

    @Column(name = "team_name", nullable = false, length = 50)
    private String teamname;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getPlayername() { return playername; }
    public void setPlayername(String playername) { this.playername = playername; }

    public String getPlayertype() { return playertype; }
    public void setPlayertype(String playertype) { this.playertype = playertype; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getTeamname() { return teamname; }
    public void setTeamname(String teamname) { this.teamname = teamname; }

    @Override
    public String toString() {
        return "Player [id=" + id + ", playername=" + playername +
               ", playertype=" + playertype + ", position=" + position +
               ", teamname=" + teamname + "]";
    }
}
