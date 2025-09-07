package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Player;

public interface PlayerService {
    Player addPlayer(Player player);
    List<Player> getAllPlayers();
    Player getPlayerById(int id);
    Player updatePlayer(Player player);
    void deletePlayerById(int id);
}
