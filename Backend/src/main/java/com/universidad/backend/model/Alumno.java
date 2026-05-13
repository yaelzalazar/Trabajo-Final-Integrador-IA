package com.universidad.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Entity
@Table(name = "alumnos")
@Data
@JsonPropertyOrder({
        "id",
        "legajo",
        "dni",
        "nombre",
        "apellido",
        "email",
        "fechaCreacion",
        "proveedor"
})
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String legajo;
    private String dni;
    private String nombre;
    private String apellido;
    private String email;
    private String usuario;

    @JsonIgnore
    private String password;

    @Column(name = "google_id")
    private String googleId;

    private String proveedor; // LOCAL o GOOGLE

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
}

/*¿Que hace esto?
Conecta nuestro java con nuestra tabla postgreSQL
@Entity = tabla
@Table = alumnos
y los campos de nuestra base
*/