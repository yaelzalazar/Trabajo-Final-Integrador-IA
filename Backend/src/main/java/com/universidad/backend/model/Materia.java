package com.universidad.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "materias")
@Data
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String codigo;
    private Integer creditos;

    @ManyToOne
    @JoinColumn(name = "carrera_id")
    @JsonIgnore
    private Carrera carrera;
}