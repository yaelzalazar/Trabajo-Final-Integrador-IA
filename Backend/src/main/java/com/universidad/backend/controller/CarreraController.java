package com.universidad.backend.controller;

import com.universidad.backend.model.Carrera;
import com.universidad.backend.model.Materia;
import com.universidad.backend.repository.CarreraRepository;
import com.universidad.backend.repository.MateriaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/carreras")
public class CarreraController {

    private final CarreraRepository carreraRepository;
    private final MateriaRepository materiaRepository;

    public CarreraController(CarreraRepository carreraRepository,
                             MateriaRepository materiaRepository) {
        this.carreraRepository = carreraRepository;
        this.materiaRepository = materiaRepository;
    }

    @GetMapping
    public List<Carrera> obtenerCarreras() {
        return carreraRepository.findAll();
    }

    @GetMapping("/{id}/materias")
    public List<Materia> obtenerMateriasPorCarrera(@PathVariable Integer id) {
        return materiaRepository.findByCarreraId(id);
    }
}
