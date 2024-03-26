package daret.projetspringoob.Daret.services;

import daret.projetspringoob.Daret.dto.TontineDto;

import java.util.List;

public interface TontineService {

    public TontineDto addTontine(TontineDto tontineDto);
    TontineDto ShowTontineById(Long idTontine);
    TontineDto UpdateTontine(Long id, TontineDto tontineDto);
    Boolean DeleteTontine(Long id);
    Boolean ActiverTontine(Long id);


    public List<TontineDto> listTontines();


}
