//Aca va toda la logica , para poder mostrar, eliminar, guardar, modificar
package com.universidad.backend.repository;

import com.universidad.backend.model.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlumnoRepository extends JpaRepository<Alumno, Integer> {

    boolean existsByLegajo(String legajo);

    Optional<Alumno> findByGoogleId(String googleId);

    Optional<Alumno> findByEmail(String email);

    Optional<Alumno> findByLegajo(String legajo);
}

//cuando llamemos findByGoogleId("123456"), spring va a ejecutar SELECT * FROM alumnos WHERE google_id = '123456';
//Usamos Optional<Alumno> para veriricar si el usuario existe o no, y evitamos errores de nullPointer