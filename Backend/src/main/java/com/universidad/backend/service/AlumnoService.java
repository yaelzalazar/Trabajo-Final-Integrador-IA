package com.universidad.backend.service;

import com.universidad.backend.model.Pago;
import com.universidad.backend.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class AlumnoService {

    @Autowired
    private PagoRepository pagoRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public String obtenerMateriasCursando(Integer alumnoId) {
        String url = "http://localhost:8080/alumnos/" + alumnoId + "/materias";

        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        List<Map> materias = (List<Map>) response.getBody().get("materias");
        StringBuilder resultado = new StringBuilder();

        for (Map m : materias) {
            String estado = m.get("estado").toString();

            if (estado.equalsIgnoreCase("cursando")) {
                Map materia = (Map) m.get("materia");
                resultado.append("- ")
                        .append(materia.get("nombre"))
                        .append("\n");
            }
        }

        if (resultado.length() == 0) {
            return "No estas cursando materias actualmente.";
        }

        return "Estas cursando:\n" + resultado;
    }

    public String obtenerMateriasPendientes(Integer alumnoId) {
        String url = "http://localhost:8080/alumnos/" + alumnoId + "/materias";

        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        List<Map> materias = (List<Map>) response.getBody().get("materias");
        StringBuilder resultado = new StringBuilder();

        for (Map m : materias) {
            String estado = m.get("estado").toString();

            if (estado.equalsIgnoreCase("pendiente")) {
                Map materia = (Map) m.get("materia");
                resultado.append("- ")
                        .append(materia.get("nombre"))
                        .append("\n");
            }
        }

        if (resultado.length() == 0) {
            return "No tenes materias pendientes.";
        }

        return "Materias pendientes:\n" + resultado;
    }

    public String obtenerMateriasAprobadas(Integer alumnoId) {
        String url = "http://localhost:8080/alumnos/" + alumnoId + "/materias";

        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        List<Map> materias = (List<Map>) response.getBody().get("materias");
        StringBuilder resultado = new StringBuilder();

        for (Map m : materias) {
            String estado = m.get("estado").toString();

            if (estado.equalsIgnoreCase("aprobado")) {
                Map materia = (Map) m.get("materia");
                resultado.append("- ")
                        .append(materia.get("nombre"))
                        .append("\n");
            }
        }

        if (resultado.length() == 0) {
            return "No tenes materias aprobadas todavia.";
        }

        return "Materias aprobadas:\n" + resultado;
    }

    public String obtenerMateriasRecursando(Integer alumnoId) {
        String url = "http://localhost:8080/alumnos/" + alumnoId + "/materias";

        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        List<Map> materias = (List<Map>) response.getBody().get("materias");
        StringBuilder resultado = new StringBuilder();

        for (Map m : materias) {
            String estado = m.get("estado").toString();

            if (estado.equalsIgnoreCase("recursando")) {
                Map materia = (Map) m.get("materia");
                resultado.append("- ")
                        .append(materia.get("nombre"))
                        .append("\n");
            }
        }

        if (resultado.length() == 0) {
            return "No estas recursando materias.";
        }

        return "Materias recursando:\n" + resultado;
    }

    public String obtenerAlertasPagos(Integer alumnoId) {
        List<Pago> pagos = pagoRepository.findByAlumnoId(alumnoId);
        StringBuilder alertas = new StringBuilder();
        LocalDate hoy = LocalDate.now();

        for (Pago p : pagos) {
            if (p.getFechaVencimiento() == null) {
                continue;
            }

            LocalDate vencimiento = p.getFechaVencimiento();

            if ("vencido".equalsIgnoreCase(p.getEstado())) {
                alertas.append("Tenes deuda: ")
                        .append(p.getDescripcion())
                        .append(" (vencio el ")
                        .append(vencimiento)
                        .append(")\n");
            } else if ("pendiente".equalsIgnoreCase(p.getEstado())) {
                long dias = java.time.temporal.ChronoUnit.DAYS.between(hoy, vencimiento);

                if (dias >= 0 && dias <= 3) {
                    alertas.append("Tu cuota ")
                            .append(p.getDescripcion())
                            .append(" vence en ")
                            .append(dias)
                            .append(" dia(s) (")
                            .append(vencimiento)
                            .append(")\n");
                }
            }
        }

        if (alertas.length() == 0) {
            return "No tenes alertas de pago";
        }

        return alertas.toString();
    }

    public String obtenerEstadoPagos(Integer alumnoId) {
        List<Pago> pagos = pagoRepository.findByAlumnoId(alumnoId);

        if (pagos.isEmpty()) {
            return "No tenes pagos registrados.";
        }

        StringBuilder resultado = new StringBuilder();

        for (Pago p : pagos) {
            if ("pagado".equalsIgnoreCase(p.getEstado())) {
                resultado.append("Pago de $")
                        .append(p.getMonto())
                        .append(" - Pagado el ")
                        .append(p.getFechaPago())
                        .append("\n");
            } else {
                resultado.append("Pago de $")
                        .append(p.getMonto())
                        .append(" - Vence el ")
                        .append(p.getFechaVencimiento())
                        .append("\n");
            }
        }

        return resultado.toString();
    }

    public void actualizarPagosVencidos() {
        List<Pago> pagos = pagoRepository.findAll();

        for (Pago p : pagos) {
            if ("pendiente".equalsIgnoreCase(p.getEstado())
                    && p.getFechaVencimiento() != null
                    && p.getFechaVencimiento().isBefore(LocalDate.now())) {
                p.setEstado("vencido");
                pagoRepository.save(p);
            }
        }
    }

    @Scheduled(fixedRate = 60000)
    public void ejecutarActualizacionPagos() {
        actualizarPagosVencidos();
    }
}
