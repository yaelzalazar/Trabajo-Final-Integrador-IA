package com.universidad.backend.controller;

import com.universidad.backend.model.Pago;
import com.universidad.backend.repository.PagoRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/pagos")
public class PagoController {

    private final PagoRepository pagoRepository;

    public PagoController(PagoRepository pagoRepository) {
        this.pagoRepository = pagoRepository;
    }

    @PostMapping("/pagar/{id}")
    public String pagarCuota(@PathVariable Integer id) {
        Pago pago = pagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));

        pago.setEstado("pagado");
        pago.setFechaPago(LocalDate.now());

        pagoRepository.save(pago);

        return "Pago realizado correctamente";
    }
}
