package daret.projetspringoob.Daret.services.implementation;

import daret.projetspringoob.Daret.dto.ParticipationDto;
import daret.projetspringoob.Daret.dto.TourDto;
import daret.projetspringoob.Daret.entities.Participation;
import daret.projetspringoob.Daret.entities.Tontine;
import daret.projetspringoob.Daret.entities.Tour;
import daret.projetspringoob.Daret.repositories.ParticipationRepo;
import daret.projetspringoob.Daret.repositories.TontineRepo;
import daret.projetspringoob.Daret.repositories.TourRepo;
import daret.projetspringoob.Daret.repositories.UtilisateurRepo;
import daret.projetspringoob.Daret.services.TourService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static daret.projetspringoob.Daret.services.implementation.ParticipationServiceImpl.convertToPaticipationDto;

@Service
public class TourServiceImpl implements TourService {

    private final TourRepo tourRepo;
    private final UtilisateurRepo utilisateurRepo;
    private final TontineRepo tontineRepo;
    private final ParticipationRepo participationRepo;

    public TourServiceImpl(UtilisateurRepo utilisateurRepo, ParticipationRepo participationRepo,
                           TourRepo tourRepo, TontineRepo tontineRepo) {
        this.utilisateurRepo = utilisateurRepo;
        this.tourRepo = tourRepo;
        this.tontineRepo = tontineRepo;
        this.participationRepo = participationRepo;
    }

    @Override
    public TourDto addTour(TourDto tourDto) {
        Tour tour = convertToTour(tourDto);
        tour.setTontine(null);
        tour.setParticipant(null);
        return convertToTourDto(tourRepo.save(tour));
    }
    @Override
    public List<TourDto> listTours() {
        List<Tour> tours = tourRepo.findAll();
        return convertToTourDtoList(tours);
    }
    public static List<TourDto> convertToTourDtoList(List<Tour> tours) {
        List<TourDto> toursDtos = new ArrayList<>();
        for (Tour tour : tours) {
            TourDto tourDto = convertToTourDto(tour);
            toursDtos.add(tourDto);
        }
        return toursDtos;
    }
    public static List<Tour> convertToTourList(List<TourDto> tourDTOs) {
        List<Tour> tours = new ArrayList<>();
        for (TourDto tourDto : tourDTOs) {
            Tour tour = convertToTour(tourDto);
            tours.add(tour);
        }
        return tours;
    }
    @Override
    public void affecterTontineAndParticipantToTour(Long idTour, Long idTontine, Long idParticipant)
            throws ChangeSetPersister.NotFoundException {
        Tour tour = tourRepo.findById(idTour)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);

        Tontine tontine = tontineRepo.findById(idTontine)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);

        Participation participant = participationRepo.findById(idParticipant)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);

        tour.setTontine(tontine);
        tour.setParticipant(participant);

        tourRepo.save(tour);
    }

    @Override
    public TourDto ShowTourById(Long idTour) {
        Optional<Tour> optionalTour = tourRepo.findById(idTour);

        if (optionalTour.isPresent()) {
            Tour tour = optionalTour.get();
            return convertToTourDto(tour);
        } else {
            System.out.println("Aucune Tontine n'est trouvé :( ");
            return null;
        }
    }

    @Override
    public TourDto UpdateTour(TourDto tourDto) {
        // Add implementation for updating tour
        // Make sure to handle the update logic based on your requirements
        return null;
    }

    @Override
    public Boolean DeleteTour(Long idTour) {
        if (tourRepo.existsById(idTour)) {
            Tour tour = tourRepo.findById(idTour).orElse(null);
            if (tour != null) {
                tour.setStatusTour("supprime"); // Assuming you have an enumeration for status values
                tour.setParticipant(null);
                tour.setTontine(null);
                tourRepo.save(tour);
                return true;
            } else {
                System.out.println("Tour Not found");
                return false;
            }
        } else {
            System.out.println("Tour Not found");
            return false;
        }
    }

    public static TourDto convertToTourDto(Tour tour) {
        if (tour == null) {
            return null;
        } else {
            TourDto tourDto = new TourDto();
            tourDto.setId_tour(tour.getIdTour());
            tourDto.setNbTour(tour.getNbTour());
            tourDto.setStatusTour(tour.getStatusTour());
            Participation participant = tour.getParticipant();
            if (participant != null) {
                tourDto.setParticipantDto(convertToPaticipationDto(participant));
            }
            // Set other properties as needed
            return tourDto;
        }
    }

    public static Tour convertToTour(TourDto tourDto) {
        if (tourDto == null) {
            return null;
        } else {
            Tour tour = new Tour();
            tour.setIdTour(tourDto.getId_tour());
            tour.setNbTour(tourDto.getNbTour());
            tour.setStatusTour(tourDto.getStatusTour());
            ParticipationDto participationDto = tourDto.getParticipantDto();
            if (participationDto != null) {
                tour.setParticipant(ParticipationServiceImpl.convertToPaticipation(participationDto));
            }
            // Set other properties as needed
            return tour;
        }
    }
}
