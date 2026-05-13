package com.universidad.backend.controller;

import com.universidad.backend.dto.GoogleUserDTO;
import com.universidad.backend.model.Alumno;
import com.universidad.backend.repository.AlumnoRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AlumnoRepository alumnoRepository;

    public AuthController(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    @PostMapping("/google")
    public Alumno loginGoogle(@RequestBody GoogleUserDTO googleUser) {
        Optional<Alumno> alumnoPorGoogle =
                alumnoRepository.findByGoogleId(googleUser.getSub());

        if (alumnoPorGoogle.isPresent()) {
            return alumnoPorGoogle.get();
        }

        Optional<Alumno> alumnoPorEmail =
                alumnoRepository.findByEmail(googleUser.getEmail());

        if (alumnoPorEmail.isPresent()) {
            Alumno alumno = alumnoPorEmail.get();
            alumno.setGoogleId(googleUser.getSub());
            alumno.setProveedor("GOOGLE");
            return alumnoRepository.save(alumno);
        }

        Alumno nuevo = new Alumno();
        nuevo.setUsuario(googleUser.getName());

        String[] partes = googleUser.getName().split(" ");
        nuevo.setNombre(partes[0]);

        if (partes.length > 1) {
            nuevo.setApellido(partes[1]);
        }

        nuevo.setEmail(googleUser.getEmail());
        nuevo.setGoogleId(googleUser.getSub());
        nuevo.setProveedor("GOOGLE");
        nuevo.setFechaCreacion(LocalDateTime.now());
        nuevo.setLegajo(generarLegajo());

        return alumnoRepository.save(nuevo);
    }

    @PostMapping("/admin")
    public Alumno loginAdmin(@RequestBody Map<String, String> request) {
        String usuario = request.get("usuario");
        String password = request.get("password");

        if ("admin".equals(usuario) && "123456".equals(password)) {
            Alumno admin = new Alumno();
            admin.setNombre("Administrador");
            admin.setApellido("Sistema");
            admin.setEmail("admin@universidad.com");
            admin.setProveedor("ADMIN");
            admin.setLegajo("ADMIN");

            return admin;
        }

        throw new RuntimeException("Credenciales invalidas");
    }

    private String generarLegajo() {
        String legajo;

        do {
            int numero = (int) (Math.random() * 900000) + 100000;
            legajo = String.valueOf(numero);
        } while (alumnoRepository.existsByLegajo(legajo));

        return legajo;
    }
}
