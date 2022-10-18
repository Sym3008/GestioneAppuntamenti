package it.gestioneappuntamenti.www.GestioneAppuntamenti.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Timer;

@Getter
@Setter
@Entity
@Table(name = "prenotazioni")
public class Prenotaizoni {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pren")
    private Integer idPren;

    @JoinColumn(name = "id_planner")
    @ManyToOne
    @JsonIgnoreProperties("prenotazioni")
    private Planner planne;

    @JoinColumn(name = "id_unt")
    @ManyToOne
    @JsonIgnoreProperties("prenotazioni")
    private Utenti unt;

    @Temporal(TemporalType.DATE)
    @Column(name = "data")
    private Date dataPren;

//    @Temporal(TemporalType.TIME)
//    @Column(name = "ora")
//    private Timer oraPren;

    @Column(name = "confermato")
    private boolean confermato;

}
