package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.entity.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
}
