package it.gestioneappuntamenti.www.GestioneAppuntamenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table (name = "utenti")
public class Utenti {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_utn")
    private Integer idUnt;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cognome")
    private String cognome;

    @Column(name = "cf")
    private String cf;

    @Column(name = "mail")
    private String mail;

    @Column(name = "cell")
    private Integer cell;

    @Column (name = "password")
    private String password;

    @Column (name = "token")
    private String token;

    @Column (name = "ip")
    private String ip;

    @OneToMany (mappedBy = "unt")
    @JsonIgnore
    private List<Prenotaizoni> prenList;
}
