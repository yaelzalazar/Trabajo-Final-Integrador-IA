package com.universidad.backend.repository;

import com.universidad.backend.model.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {

    List<Mensaje> findByAlumnoId(Integer alumnoId);
}
