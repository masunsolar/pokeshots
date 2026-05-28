package com.example.pokeshotsapi.service;

import com.example.pokeshotsapi.Dto.DailyPokemonResponse;
import com.example.pokeshotsapi.Dto.GuessRequest;
import com.example.pokeshotsapi.Dto.GuessResponse;
import com.example.pokeshotsapi.model.PokemonModel;
import com.example.pokeshotsapi.repository.PokemonRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class PokemonService {

    private final PokemonRepository repository;

    private PokemonModel pokemonAtual = null;
    private LocalDateTime horaDoSorteio = null;
    private boolean podeTrocarPokemon = false;
    private LocalDateTime cooldownFim = null;
    private long seed = 0;

    public PokemonService(PokemonRepository repository) {
        this.repository = repository;
    }

    // -------------------------------------------------------
    // LISTAGEM
    // -------------------------------------------------------

    public Page<PokemonModel> listar(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public PokemonModel buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pokémon não encontrado: " + id));
    }

    public PokemonModel buscarPorNome(String nome) {
        return repository.findByNameIgnoreCase(nome);
    }

    public PokemonModel salvar(PokemonModel pokemon) {
        return repository.save(pokemon);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    // -------------------------------------------------------
    // POKÉMON DO DIA
    // -------------------------------------------------------

    public DailyPokemonResponse getPokemonDoDia() {

        LocalDateTime agora = LocalDateTime.now();

        // Primeira vez
        if (pokemonAtual == null) {
            sortearNovoPokemon();
        }

        // Cooldown expirou: sorteia novo pokémon
        if (podeTrocarPokemon && cooldownFim != null && agora.isAfter(cooldownFim)) {
            sortearNovoPokemon();
            podeTrocarPokemon = false;
            cooldownFim = null;
        }

        // Retorna cooldownFim apenas se ainda está ativo
        LocalDateTime cooldownAtivo = (cooldownFim != null && agora.isBefore(cooldownFim))
                ? cooldownFim
                : null;

        return new DailyPokemonResponse(
                pokemonAtual.getId(),
                pokemonAtual.getImage(),
                cooldownAtivo
        );
    }

    private void sortearNovoPokemon() {
        List<PokemonModel> todos = repository.findAll();
        Random random = new Random(seed);
        int index = random.nextInt(todos.size());
        pokemonAtual = todos.get(index);
        horaDoSorteio = LocalDateTime.now();
    }

    // -------------------------------------------------------
    // VITÓRIA — chamado pelo endpoint POST /pokemons/victory
    // Inicia o cooldown de 5 minutos no servidor.
    // -------------------------------------------------------

    public void registrarVitoria() {
        this.cooldownFim = LocalDateTime.now().plusSeconds(5); // ← aqui
        this.podeTrocarPokemon = true;
    }

    // -------------------------------------------------------
    // AUTOCOMPLETE
    // -------------------------------------------------------

    public List<String> autocomplete(String prefix) {
        if (prefix == null || prefix.isBlank()) return List.of();
        return repository.findNamesByPrefix(prefix.trim());
    }

    // -------------------------------------------------------
    // GUESS
    // -------------------------------------------------------

    public GuessResponse guess(Long idSecreto, GuessRequest request) {
        PokemonModel secreto = buscarPorId(idSecreto);
        PokemonModel tentativa = repository.findByNameIgnoreCase(request.getName());

        GuessResponse r = new GuessResponse();

        if (tentativa == null) {
            r.setWon(false);
            r.setNameResult("incorrect");
            r.setType1Result("incorrect");
            r.setType2Result("incorrect");
            r.setHabitatResult("incorrect");
            r.setColorResult("incorrect");
            r.setPhaseResult("incorrect");
            r.setHeightHint("incorrect");
            r.setWeightHint("incorrect");
            r.setGuessedName(request.getName());
            return r;
        }

        boolean acertouNome = tentativa.getName().equalsIgnoreCase(secreto.getName());
        r.setWon(acertouNome);
        r.setNameResult(acertouNome ? "correct" : "incorrect");

        // REMOVIDO: registrarVitoria() aqui — agora é feito pelo endpoint /victory

        r.setType1Result(compareField(tentativa.getType1(), secreto.getType1(), secreto.getType2()));
        r.setType2Result(compareField(tentativa.getType2(), secreto.getType2(), secreto.getType1()));
        r.setHabitatResult(compareExact(tentativa.getHabitat(), secreto.getHabitat()));
        r.setColorResult(compareExact(tentativa.getColor(), secreto.getColor()));
        r.setPhaseResult(compareExact(tentativa.getPhase(), secreto.getPhase()));
        r.setHeightHint(compareNumeric(tentativa.getHeight(), secreto.getHeight()));
        r.setWeightHint(compareNumeric(tentativa.getWeight(), secreto.getWeight()));

        r.setGuessedName(tentativa.getName());
        r.setGuessedType1(nvl(tentativa.getType1()));
        r.setGuessedType2(nvl(tentativa.getType2()));
        r.setGuessedHabitat(nvl(tentativa.getHabitat()));
        r.setGuessedColor(nvl(tentativa.getColor()));
        r.setGuessedPhase(nvl(tentativa.getPhase()));
        r.setGuessedHeight(nvl(tentativa.getHeight()));
        r.setGuessedWeight(nvl(tentativa.getWeight()));
        r.setGuessedImage(nvl(tentativa.getImage()));

        return r;
    }

    // -------------------------------------------------------
    // HELPERS
    // -------------------------------------------------------

    private String compareField(String tentativa, String principal, String alternativo) {
        if (tentativa == null && principal == null) return "correct";
        if (tentativa == null) return "incorrect";
        if (tentativa.equalsIgnoreCase(principal)) return "correct";
        if (alternativo != null && tentativa.equalsIgnoreCase(alternativo)) return "partial";
        return "incorrect";
    }

    private String compareExact(String tentativa, String secreto) {
        if (tentativa == null && secreto == null) return "correct";
        if (tentativa == null || secreto == null) return "incorrect";
        return tentativa.equalsIgnoreCase(secreto) ? "correct" : "incorrect";
    }

    private String compareNumeric(String tentativa, String secreto) {
        double vTentativa = parseDoubleSafe(tentativa);
        double vSecreto = parseDoubleSafe(secreto);
        if (vTentativa == vSecreto) return "correct";
        return vTentativa > vSecreto ? "lower" : "higher";
    }

    private double parseDoubleSafe(String value) {
        try {
            if (value == null || value.isBlank()) return 0.0;
            return Double.parseDouble(value.trim());
        } catch (Exception e) {
            return 0.0;
        }
    }

    private String nvl(String value) {
        return value != null ? value : "";
    }

    public long getSeed() { return seed; }
    public void setSeed(long seed) { this.seed = seed; }
}