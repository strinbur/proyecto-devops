package com.citt.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Despacho {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_despacho")
    private Long idDespacho;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "fecha_despacho", nullable = false)
    private LocalDate fechaDespacho;

    @Column(name = "patente_camion")
    private String patenteCamion;

    @Column(name = "intento")
    private int intento;

    @Column(name = "id_compra")
    private Long idCompra;

    @Column(name = "direccion_compra")
    private String direccionCompra;

    @Column(name = "valor_compra")
    private Long valorCompra;

    @Column(name = "despachado")
    private boolean despachado = false;
}