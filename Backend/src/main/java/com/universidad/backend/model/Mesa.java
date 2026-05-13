package com.universidad.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "mesas")
@Data
public class Mesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "materia_id")
    private Materia materia;

    @Column(name = "fecha_examen")
    private LocalDate fechaExamen;

    @Column(name = "fecha_consulta")
    private LocalDate fechaConsulta;

    private String aula;

    private String turno;
}