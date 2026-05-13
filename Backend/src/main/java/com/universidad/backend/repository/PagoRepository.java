package com.universidad.backend.repository;

import com.universidad.backend.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PagoRepository extends JpaRepository<Pago, Integer> {

    List<Pago> findByAlumnoLegajo(String legajo);

    List<Pago> findByAlumnoLegajoAndEstado(String legajo, String estado);

    List<Pago> findByAlumnoId(Integer alumnoId);
}
