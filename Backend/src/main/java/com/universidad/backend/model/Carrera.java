package com.universidad.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "carreras")
@Data
public class Carrera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    @Column(name = "duracion_anios")
    private Integer duracionAnios;

    @Column(name = "cantidad_materias")
    private Integer cantidadMaterias;

    @OneToMany(mappedBy = "carrera")
    @JsonIgnore
    private List<Materia> materias;
}

/*
Usamos @JsonIgnore para evitar bucles infinitos
 */