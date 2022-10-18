package it.gestioneappuntamenti.www.GestioneAppuntamenti.controller;

import com.sun.istack.NotNull;
import it.gestioneappuntamenti.www.GestioneAppuntamenti.model.Utenti;
import it.gestioneappuntamenti.www.GestioneAppuntamenti.service.UtentiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping
public class UtentiController {

    @Autowired
    private UtentiService untService;

    @GetMapping("/get-utenti")
    public List<Utenti> getUtenti(){
        return untService.getUtenti();
    }

    @GetMapping("/get-utente/{id}")
    public Utenti getUtenteById(@PathVariable("id") Integer id){
        return untService.getUtentiById(id);
    }

    @PostMapping("/save-utenti")
    public String saveUtenti(@RequestBody @NotNull Utenti unt){
        untService.saveOrUpdateUtenti(unt);
        return "salvato";
    }
}
