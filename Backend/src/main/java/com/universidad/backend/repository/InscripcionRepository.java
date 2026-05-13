package com.universidad.backend.repository;

import com.universidad.backend.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Integer> {

    // Traer todas las inscripciones de un alumno por su ID
    List<Inscripcion> findByAlumnoId(Integer alumnoId);

    List<Inscripcion> findByMateriaId(Integer materiaId);

    //Esto genera una consulta, que me seleccione la tabla de inscripciones, donde el id de alumno me traiga el estado de la materia
    List<Inscripcion> findByAlumnoIdAndEstado(Integer alumnoId, String estado);
}
