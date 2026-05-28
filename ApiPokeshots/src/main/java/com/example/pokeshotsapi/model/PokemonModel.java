package com.example.pokeshotsapi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "POKEMON")
public class PokemonModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME")
    private String name;

    @Column(name = "TIPO1")
    private String type1;

    @Column(name = "TIPO2")
    private String type2;

    @Column(name = "HABITAT")
    private String habitat;

    @Column(name = "COR")
    private String color;

    @Column(name = "FASE")
    private String phase;

    @Column(name = "ALTURA")
    private String height;

    @Column(name = "PESO")
    private String weight;

    @Column(name = "IMAGEM")
    private String image;

    public PokemonModel() {}
}
