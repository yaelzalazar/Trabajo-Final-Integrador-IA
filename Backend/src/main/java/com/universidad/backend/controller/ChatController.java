package com.universidad.backend.controller;

import com.universidad.backend.dto.ChatRequestDTO;
import com.universidad.backend.dto.ChatResponseDTO;
import com.universidad.backend.repository.CarreraRepository;
import com.universidad.backend.repository.MateriaRepository;
import com.universidad.backend.service.OpenAIService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/chat")
public class ChatController {

    private final CarreraRepository carreraRepository;
    private final MateriaRepository materiaRepository;
    private final OpenAIService openAIService;

    public ChatController(CarreraRepository carreraRepository,
                          MateriaRepository materiaRepository,
                          OpenAIService openAIService) {
        this.carreraRepository = carreraRepository;
        this.materiaRepository = materiaRepository;
        this.openAIService = openAIService;
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

        // =========================
        // INSCRIPCIÓN
        // =========================
        if (mensaje.contains("inscribo") || mensaje.contains("inscripcion")) {
            response.setIntent("INSCRIPCION");
            response.setRespuesta("Podés inscribirte de forma online o presencial en la facultad.");
            return response;
        }

        if (mensaje.contains("cuando abren")) {
            response.setIntent("FECHAS_INSCRIPCION");
            response.setRespuesta("Las inscripciones suelen abrir en noviembre y diciembre.");
            return response;
        }

        if (mensaje.contains("documentacion")) {
            response.setIntent("DOCUMENTACION");
            response.setRespuesta("Necesitás DNI, título secundario y foto tipo carnet.");
            return response;
        }

        if (mensaje.contains("curso de ingreso")) {
            response.setIntent("CURSO_INGRESO");
            response.setRespuesta("Sí, el curso de ingreso es obligatorio en la mayoría de las carreras.");
            return response;
        }

        if (mensaje.contains("debo materias")) {
            response.setIntent("MATERIAS_SECUNDARIO");
            response.setRespuesta("Podés inscribirte adeudando materias, pero debés regularizarlas.");
            return response;
        }

        // =========================
        // COSTOS
        // =========================
        if (mensaje.contains("cuanto cuesta") || mensaje.contains("precio")) {
            response.setIntent("COSTO");
            response.setRespuesta("El costo depende de la carrera. Consultá en administración.");
            return response;
        }

        if (mensaje.contains("cuotas") || mensaje.contains("matricula")) {
            response.setIntent("CUOTAS");
            response.setRespuesta("Se paga matrícula inicial y cuotas mensuales.");
            return response;
        }

        if (mensaje.contains("becas")) {
            response.setIntent("BECAS");
            response.setRespuesta("Sí, hay becas y descuentos disponibles.");
            return response;
        }

        // =========================
        // MODALIDAD
        // =========================
        if (mensaje.contains("modalidad") || mensaje.contains("virtual") || mensaje.contains("presencial")) {
            response.setIntent("MODALIDAD");
            response.setRespuesta("Las carreras pueden ser presenciales, virtuales o híbridas.");
            return response;
        }

        if (mensaje.contains("horarios")) {
            response.setIntent("HORARIOS");
            response.setRespuesta("Hay turnos mañana, tarde y noche.");
            return response;
        }

        if (mensaje.contains("noche")) {
            response.setIntent("NOCHE");
            response.setRespuesta("Sí, podés cursar en turno noche.");
            return response;
        }

        // =========================
        // UBICACIÓN
        // ========================
        if (mensaje.contains("donde queda")) {
            response.setIntent("UBICACION");
            response.setRespuesta("La facultad está en Mendoza.");
            return response;
        }

        if (mensaje.contains("biblioteca") || mensaje.contains("laboratorio")) {
            response.setIntent("INFRAESTRUCTURA");
            response.setRespuesta("Contamos con biblioteca y laboratorios.");
            return response;
        }

        // =========================
        // TÍTULO
        // =========================
        if (mensaje.contains("titulo")) {
            response.setIntent("TITULO");
            response.setRespuesta("El título es oficial y tiene validez nacional.");
            return response;
        }

        // =========================
        // TRABAJO
        // =========================
        if (mensaje.contains("trabajo") || mensaje.contains("salida laboral")) {
            response.setIntent("TRABAJO");
            response.setRespuesta("Las carreras tienen alta salida laboral en tecnología.");
            return response;
        }

        // fallback
        response.setIntent("UNKNOWN");
        response.setRespuesta("No entendí la pregunta 😅");

        return response;
    }

}