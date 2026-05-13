package com.universidad.backend.controller;

import com.universidad.backend.model.Mesa;
import com.universidad.backend.repository.MesaRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/mesas")
public class MesaController {

    private final MesaRepository mesaRepository;

    public MesaController(MesaRepository mesaRepository) {
        this.mesaRepository = mesaRepository;
    }

    // Todas las mesas
    @GetMapping
    public List<Mesa> obtenerTodas() {
        return mesaRepository.findAll();
    }

    // Mesas próximas (desde hoy)
    @GetMapping("/proximas")
    public List<Mesa> obtenerProximas() {
        return mesaRepository.findByFechaExamenAfter(LocalDate.now());
    }

    @GetMapping("/proximas/materia/{id}")
    public List<Mesa> obtenerProximasPorMateria(@PathVariable Integer id) {
        return mesaRepository.findByFechaExamenAfterAndMateriaId(LocalDate.now(), id);
    }

    @GetMapping("/proximas/buscar")
    public List<Mesa> buscarMesasPorNombre(@RequestParam String materia) {
        return mesaRepository.findByFechaExamenAfterAndMateriaNombreContainingIgnoreCase(LocalDate.now(), materia);
    }
}
