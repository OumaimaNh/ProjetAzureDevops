package daret.projetspringoob.Daret.services;

import daret.projetspringoob.Daret.dto.TourDto;
import daret.projetspringoob.Daret.entities.Tour;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface TourService {
    TourDto addTour(TourDto tourDto);
    TourDto UpdateTour(TourDto tourDto);
    Boolean DeleteTour(Long idTour);

    List<TourDto> listTours();

    void affecterTontineAndParticipantToTour(Long idTour, Long idTontine, Long idParticipant) throws ChangeSetPersister.NotFoundException;


    TourDto ShowTourById(Long idTour);

}
