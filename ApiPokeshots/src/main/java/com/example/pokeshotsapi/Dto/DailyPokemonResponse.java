package com.example.pokeshotsapi.Dto;

import java.time.LocalDateTime;

/**
 * Retorna apenas o ID e a imagem do Pokémon do dia.
 * Nunca expõe o nome ou atributos antes do jogo acabar.
 * cooldownFim: se não-nulo, o jogador já ganhou e deve aguardar até esse horário.
 */
public class DailyPokemonResponse {

    private Long id;
    private String image;
    private LocalDateTime cooldownFim;

    public DailyPokemonResponse(Long id, String image, LocalDateTime cooldownFim) {
        this.id = id;
        this.image = image;
        this.cooldownFim = cooldownFim;
    }

    public Long getId() { return id; }
    public String getImage() { return image; }
    public LocalDateTime getCooldownFim() { return cooldownFim; }
}
