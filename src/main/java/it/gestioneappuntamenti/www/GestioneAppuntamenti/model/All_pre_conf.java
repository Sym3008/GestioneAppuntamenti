package it.gestioneappuntamenti.www.GestioneAppuntamenti.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Timer;

@Getter
@Setter
@Entity
@Table(name = "all_pre_conf")
public class All_pre_conf {
    @Id
    @Column(name = "id_pre")
    private Integer idPren;

    @Column(name = "name")
    private String name;

    @Column(name = "cognome")
    private String cognome;

    @Column(name = "cf")
    private String cf;

    @Column(name = "mail")
    private String mail;

    @Column (name = "cell")
    private Integer cell;

    @Temporal(TemporalType.DATE)
    @Column(name = "data")
    private Date dataPren;

//    @Temporal(TemporalType.TIME)
//    @Column(name = "ora")
//    private Timer oraPren;

    @Column(name = "descrizione_uff")
    private String uff;
}
