package com.universidad.backend.repository;

import com.universidad.backend.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MateriaRepository extends JpaRepository<Materia, Integer> {

    List<Materia> findByCarreraId(Integer carreraId);

}