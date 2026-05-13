package com.universidad.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "inscripciones")
@Data
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Relación con alumno
    @ManyToOne
    @JoinColumn(name = "alumno_id")
    @JsonIgnore
    private Alumno alumno;

    // Relación con materia
    @ManyToOne
    @JoinColumn(name = "materia_id")
    private Materia materia;

    private String estado;

    @Column(name = "fecha_inscripcion")
    private LocalDate fechaInscripcion;

    @Column(name = "fecha_vencimiento")
    private LocalDate fechaVencimiento;
}

/*
aca tenemos nuestra relaciones  y que se conecta a la tabla de alumnos
*/