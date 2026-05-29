package com.example.pokeshotsapi.Dto;

public class GuessResponse {

    // true = acertou o pokémon, jogo encerrado
    private boolean won;

    // ---- Resultado por coluna ----
    // "correct" | "partial" | "incorrect"
    private String nameResult;
    private String type1Result;
    private String type2Result;
    private String habitatResult;
    private String colorResult;
    private String phaseResult;

    // "correct" | "higher" | "lower"
    private String heightHint;
    private String weightHint;

    // ---- Valores da tentativa (para exibir na linha) ----
    private String guessedName;
    private String guessedType1;
    private String guessedType2;
    private String guessedHabitat;
    private String guessedColor;
    private String guessedPhase;
    private String guessedHeight;
    private String guessedWeight;
    private String guessedImage;

    // Getters e Setters
    public boolean isWon() { return won; }
    public void setWon(boolean won) { this.won = won; }

    public String getNameResult() { return nameResult; }
    public void setNameResult(String nameResult) { this.nameResult = nameResult; }

    public String getType1Result() { return type1Result; }
    public void setType1Result(String type1Result) { this.type1Result = type1Result; }

    public String getType2Result() { return type2Result; }
    public void setType2Result(String type2Result) { this.type2Result = type2Result; }

    public String getHabitatResult() { return habitatResult; }
    public void setHabitatResult(String habitatResult) { this.habitatResult = habitatResult; }

    public String getColorResult() { return colorResult; }
    public void setColorResult(String colorResult) { this.colorResult = colorResult; }

    public String getPhaseResult() { return phaseResult; }
    public void setPhaseResult(String phaseResult) { this.phaseResult = phaseResult; }

    public String getHeightHint() { return heightHint; }
    public void setHeightHint(String heightHint) { this.heightHint = heightHint; }

    public String getWeightHint() { return weightHint; }
    public void setWeightHint(String weightHint) { this.weightHint = weightHint; }

    public String getGuessedName() { return guessedName; }
    public void setGuessedName(String guessedName) { this.guessedName = guessedName; }

    public String getGuessedType1() { return guessedType1; }
    public void setGuessedType1(String guessedType1) { this.guessedType1 = guessedType1; }

    public String getGuessedType2() { return guessedType2; }
    public void setGuessedType2(String guessedType2) { this.guessedType2 = guessedType2; }

    public String getGuessedHabitat() { return guessedHabitat; }
    public void setGuessedHabitat(String guessedHabitat) { this.guessedHabitat = guessedHabitat; }

    public String getGuessedColor() { return guessedColor; }
    public void setGuessedColor(String guessedColor) { this.guessedColor = guessedColor; }

    public String getGuessedPhase() { return guessedPhase; }
    public void setGuessedPhase(String guessedPhase) { this.guessedPhase = guessedPhase; }

    public String getGuessedHeight() { return guessedHeight; }
    public void setGuessedHeight(String guessedHeight) { this.guessedHeight = guessedHeight; }

    public String getGuessedWeight() { return guessedWeight; }
    public void setGuessedWeight(String guessedWeight) { this.guessedWeight = guessedWeight; }

    public String getGuessedImage() { return guessedImage; }
    public void setGuessedImage(String guessedImage) { this.guessedImage = guessedImage; }
}
