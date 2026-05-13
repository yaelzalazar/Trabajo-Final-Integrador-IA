package com.universidad.backend.controller;

import com.universidad.backend.dto.AlumnoMateriasDTO;
import com.universidad.backend.model.Alumno;
import com.universidad.backend.repository.AlumnoRepository;
import org.springframework.web.bind.annotation.*;
import com.universidad.backend.model.Inscripcion;
import com.universidad.backend.repository.InscripcionRepository;
import com.universidad.backend.model.Pago;
import com.universidad.backend.repository.PagoRepository;

import java.util.List;

@RestController
@RequestMapping("/alumnos")
public class AlumnoController {

    private final AlumnoRepository alumnoRepository;
    private final InscripcionRepository inscripcionRepository;
    private final PagoRepository pagoRepository;

    public AlumnoController(AlumnoRepository alumnoRepository,
                            InscripcionRepository inscripcionRepository,
                            PagoRepository pagoRepository) {
        this.alumnoRepository = alumnoRepository;
        this.inscripcionRepository = inscripcionRepository;
        this.pagoRepository = pagoRepository;
    }

    @GetMapping
    public List<Alumno> obtenerTodos() {
        return alumnoRepository.findAll();
    }

    @GetMapping("/{id}/materias")
    public AlumnoMateriasDTO obtenerMateriasPorAlumno(@PathVariable Integer id) {

        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        List<Inscripcion> inscripciones = inscripcionRepository.findByAlumnoId(id);

        AlumnoMateriasDTO dto = new AlumnoMateriasDTO();
        dto.setAlumno(alumno);
        dto.setMaterias(inscripciones);

        return dto;
    }

    @GetMapping("/{id}/materias-pendientes")
    public List<Inscripcion> obtenerMateriasPendientes(@PathVariable Integer id) {
        return inscripcionRepository.findByAlumnoIdAndEstado(id, "pendiente");
    }

    @GetMapping("/{legajo}/pagos")
    public List<Pago> obtenerPagos(@PathVariable String legajo) {

        List<Pago> pagos = pagoRepository.findByAlumnoLegajo(legajo);

        // lógica: si hay deuda anterior
        boolean tieneDeuda = pagos.stream()
                .anyMatch(p -> p.getEstado().equalsIgnoreCase("pendiente"));

        if (tieneDeuda) {
            return pagos.stream()
                    .filter(p -> p.getEstado().equalsIgnoreCase("pendiente"))
                    .toList();
        }

        // si no tiene deuda → devolver el último pago (cuota actual)
        return pagos.stream()
                .sorted((a, b) -> b.getFechaVencimiento().compareTo(a.getFechaVencimiento()))
                .limit(1)
                .toList();
    }
}
