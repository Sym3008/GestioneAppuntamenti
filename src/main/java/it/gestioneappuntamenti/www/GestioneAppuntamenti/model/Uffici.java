package it.gestioneappuntamenti.www.GestioneAppuntamenti.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "uffici")
public class Uffici {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_uff")
    private Integer id_uff;

    @Column(name = "descrizione_uff")
    private String descrizioneUff;

    @Column(name = "riferimento_uff")
    private String riferimentoUff;

    @OneToMany(mappedBy = "uff")
    @JsonIgnore
    private List<Planner> plannerList;
}
