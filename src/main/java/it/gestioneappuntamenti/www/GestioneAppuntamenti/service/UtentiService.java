package it.gestioneappuntamenti.www.GestioneAppuntamenti.service;

import it.gestioneappuntamenti.www.GestioneAppuntamenti.dao.UtentiDao;
import it.gestioneappuntamenti.www.GestioneAppuntamenti.model.Utenti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UtentiService {

    @Autowired
    private UtentiDao untDao;

    public List<Utenti> getUtenti(){
        return untDao.getUtenti();
    }

    public Utenti getUtentiById (Integer id){
        return untDao.getUtentiById(id);
    }

    public void saveOrUpdateUtenti(Utenti unt){
        untDao.saveOrUpDateUtenti(unt);
    }

    public void deleteUtenti(List<Utenti> unt){
        untDao.deleteUtenti(unt);
    }

    public void deleteUtentiById(Integer id){
        untDao.deleteUtentiById(id);
    }
}
