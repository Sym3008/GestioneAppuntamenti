package it.gestioneappuntamenti.www.GestioneAppuntamenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Timer;

@Getter
@Setter
@Entity
@Table(name = "giorni")
public class Giorni {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gg")
    private Integer idGg;

    @Column(name = "descrizione")
    private String descrizione;

//    @Temporal(TemporalType.TIME)
//    @Column(name = "ini_am")
//    private Timer iniAm;

//    @Temporal(TemporalType.TIME)
//    @Column(name = "fin_am")
//    private Timer finAm;

//    @Temporal(TemporalType.TIME)
//    @Column(name = "ini_pm")
//    private Timer iniPm;

//    @Temporal(TemporalType.TIME)
//    @Column(name = "fin_pm")
//    private Timer finPm;

    @Column(name = "festivo")
    private boolean festivo;

    @OneToMany (mappedBy = "lun")
    @JsonIgnore
    private List<Settimane> settL;

    @OneToMany (mappedBy = "mar")
    @JsonIgnore
    private List<Settimane> settM;

    @OneToMany (mappedBy = "mer")
    @JsonIgnore
    private List<Settimane> settMe;

    @OneToMany (mappedBy = "gio")
    @JsonIgnore
    private List<Settimane> settG;

    @OneToMany (mappedBy = "ven")
    @JsonIgnore
    private List<Settimane> settV;

    @OneToMany (mappedBy = "sab")
    @JsonIgnore
    private List<Settimane> settS;

    @OneToMany (mappedBy = "dom")
    @JsonIgnore
    private List<Settimane> settD;
}
