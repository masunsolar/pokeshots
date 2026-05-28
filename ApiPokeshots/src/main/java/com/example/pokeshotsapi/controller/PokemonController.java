package com.example.pokeshotsapi.controller;

import com.example.pokeshotsapi.Dto.DailyPokemonResponse;
import com.example.pokeshotsapi.Dto.GuessRequest;
import com.example.pokeshotsapi.Dto.GuessResponse;
import com.example.pokeshotsapi.model.PokemonModel;
import com.example.pokeshotsapi.service.PokemonService;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pokemons")
public class PokemonController {

    private final PokemonService service;

    public PokemonController(PokemonService service) {
        this.service = service;
    }

    // GET /pokemons?page=0&size=20
    @GetMapping
    public Map<String, Object> listar(Pageable pageable) {
        var page = service.listar(pageable);
        return Map.of(
                "pokemons",       page.getContent(),
                "totalPages",     page.getTotalPages(),
                "totalElements",  page.getTotalElements(),
                "currentPage",    page.getNumber()
        );
    }

    // GET /pokemons/{id}
    @GetMapping("/{id}")
    public PokemonModel buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // GET /pokemons/name/{nome}
    @GetMapping("/name/{nome}")
    public PokemonModel buscarPorNome(@PathVariable String nome) {
        return service.buscarPorNome(nome);
    }

    // GET /pokemons/daily
    @GetMapping("/daily")
    public DailyPokemonResponse daily() {
        return service.getPokemonDoDia();
    }

    // GET /pokemons/autocomplete?q=char
    @GetMapping("/autocomplete")
    public List<String> autocomplete(@RequestParam String q) {
        return service.autocomplete(q);
    }

    // POST /pokemons/guess/{idSecreto}
    @PostMapping("/guess/{idSecreto}")
    public GuessResponse guess(
            @PathVariable Long idSecreto,
            @RequestBody GuessRequest request) {
        return service.guess(idSecreto, request);
    }

    // POST /pokemons/victory — registra vitória e inicia cooldown no servidor
    @PostMapping("/victory")
    public void victory() {
        service.registrarVitoria();
    }

    // POST /pokemons (admin)
    @PostMapping
    public PokemonModel salvar(@RequestBody PokemonModel pokemon) {
        return service.salvar(pokemon);
    }

    // PUT /pokemons/{id} (admin)
    @PutMapping("/{id}")
    public PokemonModel atualizar(@PathVariable Long id, @RequestBody PokemonModel pokemon) {
        pokemon.setId(id);
        return service.salvar(pokemon);
    }

    // DELETE /pokemons/{id} (admin)
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
