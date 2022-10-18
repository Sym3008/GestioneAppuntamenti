package it.gestioneappuntamenti.www.GestioneAppuntamenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "settimane")
public class Settimane {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sett")
    private Integer idSett;

    @JoinColumn(name = "lun")
    @ManyToOne
    @JsonIgnoreProperties("settimane")
    private Giorni lun;

    @JoinColumn(name = "mar")
    @ManyToOne
    @JsonIgnoreProperties("settimane")
    private Giorni mar;

    @JoinColumn(name = "mer")
    @ManyToOne
    @JsonIgnoreProperties("settimane")
    private Giorni mer;

    @JoinColumn(name = "gio")
    @ManyToOne
    @JsonIgnoreProperties("settimane")
    private Giorni gio;

    @JoinColumn(name = "ven")
    @ManyToOne
    @JsonIgnoreProperties("settimane")
    private Giorni ven;

    @JoinColumn(name = "sab")
    @ManyToOne
    @JsonIgnoreProperties("settimane")
    private Giorni sab;

    @JoinColumn(name = "dom")
    @ManyToOne
    @JsonIgnoreProperties("settimane")
    private Giorni dom;

    @OneToMany (mappedBy = "sett")
    @JsonIgnore
    private List<Planner> plannerList;
}
