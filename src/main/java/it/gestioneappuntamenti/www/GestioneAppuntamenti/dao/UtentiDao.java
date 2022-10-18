package it.gestioneappuntamenti.www.GestioneAppuntamenti.dao;

import it.gestioneappuntamenti.www.GestioneAppuntamenti.model.Utenti;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class UtentiDao {
    @Autowired
    private EntityManager entityManager;

    public List<Utenti> getUtenti(){
        System.out.println("richieta get-utenti -> " + LocalDateTime.now());
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.createQuery("FROM Utenti", Utenti.class).getResultList();
    }

    public Utenti getUtentiById(Integer id){
        System.out.println("richieta get-utenti per id -> "+ LocalDateTime.now());
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.find(Utenti.class, id);
    }

    public void saveOrUpDateUtenti(Utenti utn){
        System.out.println("richiesta save or update utenti -> "+ LocalDateTime.now());
        Session currentSession=entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(utn);
    }

    public void deleteUtenti(List<Utenti> unt){
        Session currentSession = entityManager.unwrap(Session.class);
        for(Utenti u:unt){
            currentSession.delete(currentSession.find(Utenti.class, u.getIdUnt()));
        }
    }

    public void deleteUtentiById (Integer id){
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.delete(currentSession.find(Utenti.class, id));
    }

}
