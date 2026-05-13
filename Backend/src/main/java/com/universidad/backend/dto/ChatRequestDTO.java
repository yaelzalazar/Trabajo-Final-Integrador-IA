package com.universidad.backend.dto;

import lombok.Data;

@Data
public class ChatRequestDTO {

    private String mensaje;
    private String legajo;

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getLegajo() {
        return legajo;
    }

    public void setLegajo(String legajo) {
        this.legajo = legajo;
    }
}