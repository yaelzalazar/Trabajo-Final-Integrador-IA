package com.universidad.backend.controller;

import com.universidad.backend.dto.AlumnoResumenDTO;
import com.universidad.backend.service.MateriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/materias")
public class MateriaController {

    private final MateriaService materiaService;

    public MateriaController(MateriaService materiaService) {
        this.materiaService = materiaService;
    }

    @GetMapping("/{id}/alumnos")
    public List<AlumnoResumenDTO> obtenerAlumnos(@PathVariable Integer id) {
        return materiaService.obtenerAlumnosPorMateria(id);
    }
}
