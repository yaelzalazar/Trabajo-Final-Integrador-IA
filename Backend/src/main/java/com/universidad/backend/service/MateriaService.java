package com.universidad.backend.service;

import com.universidad.backend.dto.AlumnoResumenDTO;
import com.universidad.backend.model.Alumno;
import com.universidad.backend.model.Inscripcion;
import com.universidad.backend.repository.InscripcionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MateriaService {

    private final InscripcionRepository inscripcionRepository;

    public MateriaService(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    public List<AlumnoResumenDTO> obtenerAlumnosPorMateria(Integer materiaId) {
        List<Inscripcion> inscripciones = inscripcionRepository.findByMateriaId(materiaId);
        List<AlumnoResumenDTO> alumnos = new ArrayList<>();

        for (Inscripcion inscripcion : inscripciones) {
            Alumno alumno = inscripcion.getAlumno();

            if (alumno == null) {
                continue;
            }

            AlumnoResumenDTO dto = new AlumnoResumenDTO();
            dto.setId(alumno.getId());
            dto.setNombre(alumno.getNombre());
            dto.setApellido(alumno.getApellido());
            alumnos.add(dto);
        }

        return alumnos;
    }
}
