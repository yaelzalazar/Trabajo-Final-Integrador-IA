package com.universidad.backend.dto;

import com.universidad.backend.model.Alumno;
import com.universidad.backend.model.Inscripcion;
import lombok.Data;

import java.util.List;

@Data
public class AlumnoMateriasDTO {

    private Alumno alumno;
    private List<Inscripcion> materias;
}