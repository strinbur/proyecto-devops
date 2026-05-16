package com.citt.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "venta")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_venta")
    private Long idVenta;

    @NotBlank(message = "La dirección es obligatoria")
    @Column(name = "direccion_compra", nullable = false)
    private String direccionCompra;

    @Column(name = "valor_compra")
    private int valorCompra;

    @NotNull(message = "Fecha de compra es obligatoria")
    @Column(name = "fecha_compra", nullable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fechaCompra;

    @NotNull(message = "El campo de despacho debe ser proporcionado")
    @Column(name = "despacho_generado")
    private Boolean despachoGenerado = false;
}