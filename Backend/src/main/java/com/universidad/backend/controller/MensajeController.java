package com.universidad.backend.controller;

import com.universidad.backend.model.Mensaje;
import com.universidad.backend.repository.MensajeRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/mensajes")
public class MensajeController {

    private final MensajeRepository mensajeRepository;

    public MensajeController(MensajeRepository mensajeRepository) {
        this.mensajeRepository = mensajeRepository;
    }

    @PostMapping("/enviar")
    public String enviarMensaje(@RequestBody Mensaje mensaje) {
        mensaje.setFecha(LocalDateTime.now());
        mensajeRepository.save(mensaje);
        return "Mensaje enviado";
    }

    @GetMapping("/historial/{alumnoId}")
    public List<Mensaje> obtenerMensajes(@PathVariable Integer alumnoId) {
        return mensajeRepository.findByAlumnoId(alumnoId);
    }
}
