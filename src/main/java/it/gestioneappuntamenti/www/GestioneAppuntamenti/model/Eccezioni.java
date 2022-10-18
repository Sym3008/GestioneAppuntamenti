package it.gestioneappuntamenti.www.GestioneAppuntamenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "eccezioni")
public class Eccezioni {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_eccezione")
    private Integer idEccezzione;

    @JoinColumn(name = "id_planner")
    @ManyToOne
    @JsonIgnoreProperties("eccezioni")
    private Planner plan;

    @Column(name = "descrizione")
    private String descrizione;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_inizio")
    private Date dataInizio;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_fine")
    private Date dataFine;

}
