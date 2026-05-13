package com.universidad.backend.repository;

import com.universidad.backend.model.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MesaRepository extends JpaRepository<Mesa, Integer> {

    List<Mesa> findByFechaExamenAfter(LocalDate fecha);
    List<Mesa> findByFechaExamenAfterAndMateriaId(LocalDate fecha, Integer materiaId);
    List<Mesa> findByFechaExamenAfterAndMateriaNombreContainingIgnoreCase(LocalDate fecha, String nombre);
}