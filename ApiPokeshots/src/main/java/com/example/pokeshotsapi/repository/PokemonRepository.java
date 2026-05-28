package com.example.pokeshotsapi.repository;

import com.example.pokeshotsapi.model.PokemonModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PokemonRepository extends JpaRepository<PokemonModel, Long> {

    PokemonModel findByNameIgnoreCase(String name);

    // Busca nomes para autocomplete (retorna só o nome pra ser leve)
    @Query("SELECT p.name FROM PokemonModel p WHERE LOWER(p.name) LIKE LOWER(CONCAT(:prefix, '%')) ORDER BY p.name")
    List<String> findNamesByPrefix(String prefix);
}
