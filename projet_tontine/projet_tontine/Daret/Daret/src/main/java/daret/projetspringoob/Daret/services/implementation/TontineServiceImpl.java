package daret.projetspringoob.Daret.services.implementation;

import daret.projetspringoob.Daret.dto.TontineDto;
import daret.projetspringoob.Daret.dto.UtilisateurDto;
import daret.projetspringoob.Daret.entities.Participation;
import daret.projetspringoob.Daret.entities.Tontine;
import daret.projetspringoob.Daret.entities.Tour;
import daret.projetspringoob.Daret.entities.Utilisateur;
import daret.projetspringoob.Daret.repositories.ParticipationRepo;
import daret.projetspringoob.Daret.repositories.TontineRepo;
import daret.projetspringoob.Daret.repositories.UtilisateurRepo;
import daret.projetspringoob.Daret.services.TontineService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static daret.projetspringoob.Daret.services.implementation.UtilisateurServiceImpl.convertToUtilisateur;
import static daret.projetspringoob.Daret.services.implementation.UtilisateurServiceImpl.convertToUtilisateurDTO;

@Service
public class TontineServiceImpl implements TontineService {

    @Autowired
    private TontineRepo tontineRepo;
    private final UtilisateurRepo utilisateurRepo;
    private final TourServiceImpl tourServiceImpl;
    private ParticipationRepo participationRepo;
    public TontineServiceImpl(UtilisateurRepo utilisateurRepo,ParticipationRepo participationRepo,TourServiceImpl tourServiceImpl) {
        this.utilisateurRepo = utilisateurRepo;
        this.participationRepo = participationRepo;
        this.tourServiceImpl = tourServiceImpl;
    }

    @Override
    public TontineDto addTontine(TontineDto tontineDto) {
        Tontine tontine = convertToTontine(tontineDto);
        if(tontine.getResponsable() == null)
        {
            Optional<Utilisateur> optionalUtilisateur = utilisateurRepo.findById(5L);
            Utilisateur utilisateur = optionalUtilisateur.get();
            tontine.setResponsable(utilisateur);
        }

        tontine.setStatutTontine("En attente");
        tontine.setDateDebut(null);
        Tontine savedTontine = tontineRepo.save(tontine);
        return convertToTontineDto(savedTontine);
    }


    @Override
    public TontineDto ShowTontineById(Long idTontine) {
        Optional<Tontine> optionalTontine = tontineRepo.findById(idTontine);

        if (optionalTontine.isPresent()) {
            Tontine tontine = optionalTontine.get();
            return convertToTontineDto(tontine);
        } else {
            System.out.println("Aucune Tontine n'est trouvé :( ");
            return null;
        }
    }

    @Override
    public TontineDto UpdateTontine(Long id, TontineDto tontineDto) {
        Optional<Tontine> optionalTontine = tontineRepo.findById(id);
        if (optionalTontine.isPresent()) {
            Tontine tontine = optionalTontine.get();
            tontine.setLibelle(tontineDto.getLibelle());
            tontine.setDescription(tontineDto.getDescription());
            tontine.setStatutTontine("en attente");
            tontine.setPeriode(tontineDto.getPeriode());
            tontine.setMontant(tontineDto.getMontant());
            tontine.setNbrParticipants(tontineDto.getNbrParticipants());
            tontine.setDateDebut(tontineDto.getDateDebut());


            Tontine updatedTontine = tontineRepo.save(tontine);

             return convertToTontineDto(updatedTontine);
        } else {
             throw new EntityNotFoundException("Tontine not found with id: " + id);
        }
    }


    @Override
    public Boolean DeleteTontine(Long id) {
        if (tontineRepo.existsById(id)) {
            Tontine tontine = tontineRepo.findByIdTontine(id);
            tontine.setStatutTontine("supprime"); // Assuming you have an enumeration for status values
            tontineRepo.save(tontine);
            return true;
        } else {
            System.out.println("Tontine non trouvable :(");
            return false;
        }
    }



    public static TontineDto convertToTontineDto(Tontine tontine){
        if (tontine == null) {
            return null;
        }

        TontineDto tontineDto = new TontineDto();
        tontineDto.setIdTontine(tontine.getIdTontine());
        tontineDto.setLibelle(tontine.getLibelle());
        tontineDto.setDescription(tontine.getDescription());
        tontineDto.setMontantTotal(tontine.getMontantTotal());
        tontineDto.setStatutTontine(tontine.getStatutTontine());
        tontineDto.setDateDebut(tontine.getDateDebut());

        tontineDto.setNbrParticipants(tontine.getNbrParticipants());
        tontineDto.setPeriode(tontine.getPeriode());
        tontineDto.setMontant(tontine.getMontant());
        tontineDto.setNbTourActuel(tontine.getNbTourActuel());
        Utilisateur responsable = tontine.getResponsable();
        if (responsable != null) {
            tontineDto.setResponsable(convertToUtilisateurDTO(responsable));
        }
        else {
            tontineDto.setResponsable(null);

        }

        return tontineDto;

    }
    public static Tontine convertToTontine(TontineDto tontineDto){
        if (tontineDto == null) {
            return null; // or throw an exception if appropriate
        }

        Tontine tontine = new Tontine();
        tontine.setIdTontine(tontineDto.getIdTontine());
        tontine.setLibelle(tontineDto.getLibelle());
        tontine.setDescription(tontineDto.getDescription());
        tontine.setMontantTotal(tontineDto.getMontantTotal());
        tontine.setStatutTontine(tontineDto.getStatutTontine());
        tontine.setDateDebut(tontineDto.getDateDebut());

        tontine.setNbrParticipants(tontineDto.getNbrParticipants());
        tontine.setPeriode(tontineDto.getPeriode());
        tontine.setMontant(tontineDto.getMontant());
        tontine.setNbTourActuel(tontineDto.getNbTourActuel());
        UtilisateurDto responsableDto = tontineDto.getResponsable();
        if (responsableDto != null) {
            tontine.setResponsable(convertToUtilisateur(responsableDto));
        }else{
            tontine.setResponsable(null);
        }
        return tontine;

    }

    @Override
    public List<TontineDto> listTontines() {
        List<Tontine> tontines = tontineRepo.findAll();
        return convertToTontineDTOList(tontines);
    }
    public static List<TontineDto> convertToTontineDTOList(List<Tontine> tontines) {
        List<TontineDto> tontineDtos = new ArrayList<>();
        for (Tontine tontine : tontines) {
            TontineDto tontineDto = convertToTontineDto(tontine);
            tontineDtos.add(tontineDto);
        }
        return tontineDtos;
    }

    @Override
    public Boolean ActiverTontine(Long idTontine) {
        Optional<Tontine> optionaltontine = tontineRepo.findById(idTontine);
        if (optionaltontine.isPresent())
        {
            Tontine tontine = optionaltontine.get();
            tontine.setStatutTontine("Activé");
            tontineRepo.save(tontine);

            List<Participation> participations = tontine.getParticipons();
            List<Tour> tours = TourServiceImpl.convertToTourList(tourServiceImpl.listTours());
            LocalDate today = LocalDate.now();

            for (Participation participation : participations) {
                for(Tour tour : tours ){
                    if (participation.getIdParticipation() == tour.getParticipant().getIdParticipation()) {
                        LocalDate newDatePaiement = today.plus(Period.ofMonths(tour.getNbTour()).plusDays(2));

                        if (participation.getDateReceptionSoldeTontine() == null) {
                            participation.setDateReceptionSoldeTontine(Date.valueOf(newDatePaiement));
                        }
                        participationRepo.save(participation);
                    }
                }
            }
            return true;
        }
        else {
            System.out.println("Tontine Not Found");
            return false;
        }

    }

}
