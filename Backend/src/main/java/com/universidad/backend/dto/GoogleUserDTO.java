package com.universidad.backend.dto;

import lombok.Data;

@Data
public class GoogleUserDTO {

    private String sub;
    private String email;
    private String name;
}