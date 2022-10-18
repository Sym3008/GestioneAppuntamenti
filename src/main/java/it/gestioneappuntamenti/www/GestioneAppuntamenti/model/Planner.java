package it.gestioneappuntamenti.www.GestioneAppuntamenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "planner")
public class Planner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_planner")
    private Integer idPlanner;

    @JoinColumn(name = "id_uff")
    @ManyToOne
    @JsonIgnoreProperties("uffici")
    private Uffici uff;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_inizio")
    private Date dataInizio;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_fine")
    private Date dataFine;

    @Column(name = "n_pre_ora")
    private Integer nPreOra;

    @JoinColumn(name = "id_sett")
    @ManyToOne
    @JsonIgnoreProperties("planner")
    private Settimane sett;

    @OneToMany (mappedBy = "plan")
    @JsonIgnore
    private List<Eccezioni> eccezioniList;

    @OneToMany (mappedBy = "planne")
    @JsonIgnore
    private List<Prenotaizoni> prenotaizoniList;
}
