package com.universidad.backend.controller;

import com.universidad.backend.dto.ChatRequestDTO;
import com.universidad.backend.dto.ChatResponseDTO;
import com.universidad.backend.model.Alumno;
import com.universidad.backend.repository.AlumnoRepository;
import com.universidad.backend.service.AlumnoService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/chat-campus")
public class ChatCampusController {

    private final AlumnoService alumnoService;
    private final AlumnoRepository alumnoRepository;

    public ChatCampusController(AlumnoService alumnoService,
                                AlumnoRepository alumnoRepository) {
        this.alumnoService = alumnoService;
        this.alumnoRepository = alumnoRepository;
    }

    @PostMapping
    public ChatResponseDTO procesarMensaje(@RequestBody ChatRequestDTO request) {
        String mensaje = request.getMensaje()
                .toLowerCase()
                .replace("á", "a")
                .replace("é", "e")
                .replace("í", "i")
                .replace("ó", "o")
                .replace("ú", "u")
                .replace("¿", "")
                .replace("?", "");

        ChatResponseDTO response = new ChatResponseDTO();

        String legajo = request.getLegajo();

        Alumno alumno = alumnoRepository.findByLegajo(legajo)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        Integer alumnoId = alumno.getId();

        if (mensaje.contains("cursando")
                || mensaje.contains("mis materias")
                || mensaje.contains("que materias estoy cursando")) {
            String resultado = alumnoService.obtenerMateriasCursando(alumnoId);
            response.setIntent("MATERIAS_CURSANDO");
            response.setRespuesta(resultado);
            return response;
        }

        if (mensaje.contains("pendientes")
                || mensaje.contains("que materias debo")) {
            String resultado = alumnoService.obtenerMateriasPendientes(alumnoId);
            response.setIntent("MATERIAS_PENDIENTES");
            response.setRespuesta(resultado);
            return response;
        }

        if (mensaje.contains("pago")
                || mensaje.contains("cuota")
                || mensaje.contains("debo")) {
            String resultado = alumnoService.obtenerEstadoPagos(alumnoId);
            response.setIntent("PAGOS");
            response.setRespuesta(resultado);
            return response;
        }

        if (mensaje.contains("aprobe")
                || mensaje.contains("aprobadas")) {
            String resultado = alumnoService.obtenerMateriasAprobadas(alumnoId);
            response.setIntent("MATERIAS_APROBADAS");
            response.setRespuesta(resultado);
            return response;
        }

        if (mensaje.contains("recursando")
                || mensaje.contains("recursar")) {
            String resultado = alumnoService.obtenerMateriasRecursando(alumnoId);
            response.setIntent("MATERIAS_RECURSANDO");
            response.setRespuesta(resultado);
            return response;
        }

        if (mensaje.contains("alerta")
                || mensaje.contains("vencimiento")
                || mensaje.contains("deuda")) {
            String resultado = alumnoService.obtenerAlertasPagos(alumnoId);
            response.setIntent("ALERTAS_PAGOS");
            response.setRespuesta(resultado);
            return response;
        }

        if (mensaje.contains("alertas")
                || mensaje.contains("tengo algo pendiente")
                || mensaje.contains("avisos")) {
            String resultado = alumnoService.obtenerAlertasPagos(alumnoId);
            response.setIntent("ALERTAS");
            response.setRespuesta(resultado);
            return response;
        }

        response.setIntent("UNKNOWN");
        response.setRespuesta("No entendi la consulta del campus.");
        return response;
    }
}
