package daret.projetspringoob.Daret.services.implementation;

import daret.projetspringoob.Daret.dto.ParticipationDto;
import daret.projetspringoob.Daret.dto.TourDto;
import daret.projetspringoob.Daret.dto.UtilisateurDto;
import daret.projetspringoob.Daret.entities.Participation;
import daret.projetspringoob.Daret.entities.Tontine;
import daret.projetspringoob.Daret.entities.Utilisateur;
import daret.projetspringoob.Daret.repositories.ParticipationRepo;
import daret.projetspringoob.Daret.repositories.TontineRepo;
import daret.projetspringoob.Daret.repositories.UtilisateurRepo;
import daret.projetspringoob.Daret.services.EmailService;
import daret.projetspringoob.Daret.services.ParticipationService;
import daret.projetspringoob.Daret.services.TourService;
import daret.projetspringoob.Daret.services.UtilisateurService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import daret.projetspringoob.Daret.response.LoginResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

import java.util.List;

import static daret.projetspringoob.Daret.services.implementation.TontineServiceImpl.convertToTontineDto;
import static daret.projetspringoob.Daret.services.implementation.UtilisateurServiceImpl.convertToUtilisateur;
import static daret.projetspringoob.Daret.services.implementation.TontineServiceImpl.convertToTontine;
import static daret.projetspringoob.Daret.services.implementation.UtilisateurServiceImpl.convertToUtilisateurDTO;


@Service
public class ParticipationServiceImpl implements ParticipationService {

    private final TontineServiceImpl tontineServiceImpl;
    private final UtilisateurService utilisateurService;
    private final UtilisateurServiceImpl utilisateurServiceImpl;
    private final ParticipationRepo participationRepo;
    private final UtilisateurRepo utilisateurRepo;
    private final TontineRepo tontineRepo;
    private final EmailService emailService;
    private final TourService tourService;

    @Autowired
    public ParticipationServiceImpl(UtilisateurServiceImpl utilisateurServiceImpl, TontineServiceImpl tontineServiceImpl, UtilisateurService utilisateurService,
                                    ParticipationRepo participationRepo, UtilisateurRepo utilisateurRepo, EmailService emailService,
                                    TourService tourService, TontineRepo tontineRepo, TontineRepo tontineRepo1) {
        this.tontineServiceImpl = tontineServiceImpl;
        this.utilisateurService = utilisateurService;
        this.utilisateurServiceImpl = utilisateurServiceImpl;
        this.participationRepo = participationRepo;
        this.utilisateurRepo = utilisateurRepo;
        this.emailService = emailService;
        this.tourService = tourService;
        this.tontineRepo = tontineRepo1;
    }

    @Override
    public String telechargerCheque(Long idUtilisateur, MultipartFile cheque) {

        String uploadPath = "C:\\Users\\user\\OneDrive\\Bureau\\Tests\\";
        String fileName = "cheque_" + idUtilisateur + ".pdf";
        try {

            Files.write(Paths.get(uploadPath, fileName), cheque.getBytes());

            return uploadPath + "/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de l'enregistrement du cheque.", e);
        }
    }
    @Override
    public ParticipationDto demanderParticipation(ParticipationDto participationDto) {
        Participation participation = new Participation();
        participation.setMontantParticipant(participationDto.getMontantParticipant());
        participation.setNomBanque(participationDto.getNomBanque());
        participation.setRib(participationDto.getRib());
        Long participantId = participationDto.getParticipant().getId_user();
        Utilisateur participant = utilisateurRepo.findByIdUser(participantId);

        Long tontineId = participationDto.getTontine().getIdTontine();
        Tontine tontine = tontineRepo.findByIdTontine(tontineId);

        if (participant == null || tontine == null) {
            throw new RuntimeException("Participant ou tontine introuvable.");
        }

        participation.setParticipant(participant);
        participation.setTontine(tontine);

        participation.setDateParticipation(java.sql.Date.valueOf(LocalDate.now()));
        participation.setStatutParticipation("Demande en attente");
        participation.setStatutPaiement("Non payé");

        try {
            Participation savedParticipation = participationRepo.save(participation);

            participationDto.setIdParticipation(savedParticipation.getIdParticipation());


            return participationDto;
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Une erreur s'est produite lors de la sauvegarde de la participation.", ex);
        }
    }

    @Override
    public ParticipationDto demanderParticipationDemi(ParticipationDto participationDto) {
        Participation participation = new Participation();
        participation.setMontantParticipant(participationDto.getMontantParticipant());
        participation.setNomBanque(participationDto.getNomBanque());
        participation.setRib(participationDto.getRib());
        Long participantId = participationDto.getParticipant().getId_user();
        Utilisateur participant = utilisateurRepo.findByIdUser(participantId);

        Long tontineId = participationDto.getTontine().getIdTontine();
        Tontine tontine = tontineRepo.findByIdTontine(tontineId);

        if (participant == null || tontine == null) {
            throw new RuntimeException("Participant ou tontine introuvable.");
        }

        participation.setParticipant(participant);
        participation.setTontine(tontine);

        participation.setDateParticipation(java.sql.Date.valueOf(LocalDate.now()));
        participation.setStatutParticipation("en attente de coparticipant");
        participation.setStatutPaiement("Non payé");

        try {
            Participation savedParticipation = participationRepo.save(participation);

            participationDto.setIdParticipation(savedParticipation.getIdParticipation());


            return participationDto;
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Une erreur s'est produite lors de la sauvegarde de la participation.", ex);
        }
    }
    @Override
    public ParticipationDto demanderParticipationDouble(ParticipationDto participationDto) {
        Participation participation = new Participation();
        participation.setMontantParticipant(participationDto.getMontantParticipant());
        participation.setNomBanque(participationDto.getNomBanque());
        participation.setRib(participationDto.getRib());
        Long participantId = participationDto.getParticipant().getId_user();
        Utilisateur participant = utilisateurRepo.findByIdUser(participantId);

        Long tontineId = participationDto.getTontine().getIdTontine();
        Tontine tontine = tontineRepo.findByIdTontine(tontineId);

        if (participant == null || tontine == null) {
            throw new RuntimeException("Participant ou tontine introuvable.");
        }

        participation.setParticipant(participant);
        participation.setTontine(tontine);

        participation.setDateParticipation(java.sql.Date.valueOf(LocalDate.now()));
        participation.setStatutParticipation("Demande double en attente");
        participation.setStatutPaiement("Non payé");

        try {
            Participation savedParticipation = participationRepo.save(participation);

            participationDto.setIdParticipation(savedParticipation.getIdParticipation());


            return participationDto;
        } catch (DataIntegrityViolationException ex) {
            throw new RuntimeException("Une erreur s'est produite lors de la sauvegarde de la participation.", ex);
        }
    }
    @Override
    public ParticipationDto addParticipant(ParticipationDto participationDto) {
        Participation participation = new Participation();

        Tontine tontine = tontineRepo.findById(participationDto.getTontine().getIdTontine()).orElse(null);
        Utilisateur participant = utilisateurRepo.findById(participationDto.getParticipant().getId_user()).orElse(null);

        if (tontine == null || participant == null) {
            throw new EntityNotFoundException("La tontine ou le participant n'a pas été trouvée.");
        }

        participation.setTontine(tontine);
        participation.setParticipant(participant);
        participation.setStatutParticipation("Demande en attente");
        participation.setDateParticipation(null);
        participation.setDatePaiement(null);
        participation.setDatePaiementEffectue(null);

        Participation savedParticipation = participationRepo.save(participation);
        return convertToPaticipationDto(savedParticipation);
    }

    @Override
    public ParticipationDto editParticipant(long idParticipant, ParticipationDto participantDto) {
        Optional<Participation> participantOptional = Optional.ofNullable(participationRepo.findById(idParticipant));

        if (participantOptional.isPresent()) {
            Participation participant = participantOptional.get();
            participant.setParticipant(convertToUtilisateur(participantDto.getParticipant()));
            participant.setChequeParticipation(participantDto.getChequeParticipation());
            participant.setMontantParticipant(participantDto.getMontantParticipant());
            participant.setDateParticipation(participantDto.getDateParticipation());
            participant.setStatutParticipation(participantDto.getStatutParticipation());
            participant.setRib(participantDto.getRib());
            participant.setDatePaiementEffectue(participantDto.getDatePaiementEffectue());
            participant.setDatePaiement(participantDto.getDateParticipation());
            participant.setTontine(convertToTontine(participantDto.getTontine()));
            participant.setNomBanque(participantDto.getNomBanque());
            participant.setStatutPaiement(participantDto.getStatutPaiement());
            participationRepo.save(participant);

            return convertToPaticipationDto(participant);
        } else {
            System.out.println("User or client not found");
            return null;
        }
    }

    @Override
    public Boolean deleteParticipant(long idParticipant) {
        if (participationRepo.existsById(idParticipant)) {
            Participation participant = participationRepo.findById(idParticipant);
            participant.setStatutParticipation("supprime"); // Assuming you have an enumeration for status values
            participationRepo.save(participant);
            return true;
        } else {
            System.out.println("Participant non trouvable :(");
            return false;
        }
    }

    @Override
    public ParticipationDto showParticipantById(long idParticipant) {
        Optional<Participation> optionalParticipation = Optional.ofNullable(participationRepo.findById(idParticipant));

        if (optionalParticipation.isPresent()) {
            Participation participation = optionalParticipation.get();
            return convertToPaticipationDto(participation);
        } else {
            System.out.println("Aucune Participation n'est trouvé :( ");
            return null;
        }
    }

    @Override
    public ParticipationDto lire(Long id) {
        Optional<Participation> optionalParticipation = participationRepo.findById(id);

        if (optionalParticipation.isPresent()) {
            Participation participation = optionalParticipation.get();
            return convertToPaticipationDto(participation);
        } else {
            System.out.println("Cette Participation n'existe pas");
            return null;
        }
    }

    /*@Override
    public ParticipationDto accepterDemandeParticipation(Long idUtilisateur, Long idParticipation) {
        UtilisateurDto responsable = utilisateurServiceImpl.lire(idUtilisateur);
        Participation participation = null;
        if (responsable == null ||
                !isResponsable(responsable)) {
            throw new RuntimeException("Vous n'avez pas les autorisations nécessaires pour effectuer cette action.");
        } else {
            Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
            LocalDate dateDuSysteme = LocalDate.now();
            if (optionalParticipation.isPresent()) {
                participation = optionalParticipation.get();
                participation.setStatutParticipation("Acceptée");
                participation.setDateParticipation(Date.valueOf(dateDuSysteme));

                participationRepo.save(participation);
                System.out.println("La demande est acceptée avec succès !");

               // emailService.sendMailDemandeAccepted(idParticipation, responsable.getNom_user(), responsable.getPrenom(), participation.getParticipant().getNomUser(), participation.getParticipant().getPrenom(), participation.getParticipant().getEmail(), participation.getDateParticipation(), participation.getTontine().getLibelle(), participation.getTontine().getMontant());
            } else {
                System.out.println("Une erreur s'est produite : participation non trouvée");
            }
        }
        return convertToPaticipationDto(participation);
    }
*/
    @Override
    public ParticipationDto accepterDemandeParticipation(Long idUtilisateur, Long idParticipation) {
        UtilisateurDto responsable = utilisateurServiceImpl.lire(idUtilisateur);
        Participation participation = null;

        if (responsable == null || !isResponsable(responsable)) {
            throw new RuntimeException("Vous n'avez pas les autorisations nécessaires pour effectuer cette action.");
        }

        Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
        LocalDate dateDuSysteme = LocalDate.now();

        if (optionalParticipation.isPresent()) {
            participation = optionalParticipation.get();

            if (participation.getTontine().getStatutTontine() != "Tontine Expiré") {
                participation = optionalParticipation.get();
                participation.setStatutParticipation("Acceptée");
                participation.setDateParticipation(Date.valueOf(dateDuSysteme));
                participation.setMontantParticipant(participation.getTontine().getMontant());
                participationRepo.save(participation);
                System.out.println("La demande est acceptée avec succès!");

                TourDto tourDto = new TourDto();
                tourDto.setNbTour(participation.getTontine().getNbTourActuel());
                participation.getTontine().setNbTourActuel(participation.getTontine().getNbTourActuel()+1);
                participation.setStatutPaiement("Non payé");
                participation.setDatePaiement(Date.valueOf(dateDuSysteme));
                participation.setDatePaiementEffectue(Date.valueOf(dateDuSysteme));
                if(participation.getTontine().getNbTourActuel() == participation.getTontine().getPeriode() )
                {
                    participation.getTontine().setStatutTontine("Activé");
                    tontineServiceImpl.ActiverTontine( participation.getTontine().getIdTontine());
                }
                if (participation.getTontine() != null) {
                    TourDto addedTour = tourService.addTour(tourDto);

                    if (addedTour != null) {
                        try {
                            tourService.affecterTontineAndParticipantToTour(addedTour.getId_tour(), participation.getTontine().getIdTontine(), participation.getIdParticipation());
                        } catch (ChangeSetPersister.NotFoundException e) {
                            e.printStackTrace();
                        }

                       emailService.sendMailDemandeAccepted(idParticipation, responsable.getNom_user(), responsable.getPrenom(), participation.getParticipant().getNomUser(), participation.getParticipant().getPrenom(), participation.getParticipant().getEmail(), participation.getDateParticipation(), participation.getTontine().getLibelle(), participation.getTontine().getMontant());
                    } else {
                        System.out.println("Erreur lors de la création du tour.");
                    }
                } else {
                    System.out.println("Erreur: La tontine de la participation est nulle.");
                }
            }
            else {
                System.out.println("Une erreur s'est produite: Tontine Expiré");
            }
        } else {
            System.out.println("Une erreur s'est produite: participation non trouvée");
        }

        return convertToPaticipationDto(participation);
    }
    private boolean isResponsable(UtilisateurDto utilisateur) {
        return utilisateur.getRole() != null && utilisateur.getRole().getCode() == 2;
    }

    @Override
    public ParticipationDto refuserDemandeParticipation(Long idUtilisateur, Long idParticipation) {
        UtilisateurDto responsable = utilisateurServiceImpl.lire(idUtilisateur);
        Participation participation = null;
        if (responsable == null || !isResponsable(responsable)) {
            throw new RuntimeException("Vous n'avez pas les autorisations nécessaires pour effectuer cette action.");
        } else {
            Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
            if (optionalParticipation.isPresent()) {
                participation = optionalParticipation.get();
                participation.setStatutParticipation("Refusée");
                participationRepo.save(participation);
                System.out.println("La demande est refusée avec succès !");
                /*emailService.sendMailDemandeRejected(responsable.getNom_user(),
                        responsable.getPrenom(),
                        responsable.getTel(),
                        responsable.getEmail(),
                        participation.getParticipant().getEmail(),
                        participation.getParticipant().getNomUser(),
                        participation.getParticipant().getPrenom(),
                        participation.getTontine().getLibelle());*/
            } else {
                System.out.println("Une erreur s'est produite : participation non trouvée");
            }
        }
        return convertToPaticipationDto(participation);
    }
    @Override
    public ParticipationDto accepterDemandeDoubleParticipation(Long idParticipation) {
        Participation participation = null;
        Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
        LocalDate dateDuSysteme = LocalDate.now();

        if (optionalParticipation.isPresent()) {
            participation = optionalParticipation.get();
            if ("Double demande en attente".equals(participation.getStatutParticipation())
                    ) {

                if(participation.getTontine().getNbTourActuel() == (participation.getTontine().getPeriode()-2)){
                    if (participation.getTontine().getStatutTontine() != "Activé") {
                        participation = optionalParticipation.get();
                        participation.setStatutParticipation("Acceptée");
                        participation.setDateParticipation(Date.valueOf(dateDuSysteme));
                        participation.setDatePaiement(Date.valueOf(dateDuSysteme));
                        participation.setDatePaiementEffectue(Date.valueOf(dateDuSysteme));
                        participation.setMontantParticipant(participation.getTontine().getMontant()*2);
                        participationRepo.save(participation);
                        System.out.println("La demande double est acceptée avec succès!");

                        TourDto tourDto = new TourDto();
                        TourDto tourDto1 = new TourDto();
                        tourDto.setNbTour(participation.getTontine().getNbTourActuel());
                        tourDto1.setNbTour(participation.getTontine().getNbTourActuel()+1);
                        participation.getTontine().setNbTourActuel(participation.getTontine().getNbTourActuel()+2);
                        participation.setStatutPaiement("Non payé");

                        participation.getTontine().setStatutTontine("Activé");
                        tontineServiceImpl.ActiverTontine( participation.getTontine().getIdTontine());

                        if (participation.getTontine() != null) {
                            TourDto addedTour = tourService.addTour(tourDto);
                            TourDto addedTour1 = tourService.addTour(tourDto1);

                            if (addedTour != null || addedTour1 != null) {
                                try {
                                    tourService.affecterTontineAndParticipantToTour(addedTour.getId_tour(), participation.getTontine().getIdTontine(), participation.getIdParticipation());
                                    tourService.affecterTontineAndParticipantToTour(addedTour1.getId_tour(), participation.getTontine().getIdTontine(), participation.getIdParticipation());
                                } catch (ChangeSetPersister.NotFoundException e) {
                                    e.printStackTrace();
                                }

                                emailService.sendMailDemandeAccepted(idParticipation,
                                        participation.getTontine().getResponsable().getNomUser(),
                                        participation.getTontine().getResponsable().getPrenom(),
                                        participation.getParticipant().getNomUser(),
                                        participation.getParticipant().getPrenom(),
                                        participation.getParticipant().getEmail(),
                                        participation.getDateParticipation(),
                                        participation.getTontine().getLibelle(),
                                        participation.getTontine().getMontant()*2);
                            } else {
                                System.out.println("Erreur lors de la création du tour.");
                            }
                        } else {
                            System.out.println("Erreur: La tontine de la participation est nulle.");
                        }
                    }
                    else {
                        System.out.println("Une erreur s'est produite: Tontine Expiré");
                    }
                }
else{
    System.out.println("reste une particpation simple pas double");

                }
            }
            else{
                System.out.println("La demande est deja traité");
            }
        } else {
            System.out.println("Une erreur s'est produite: participation non trouvée");
        }

        return convertToPaticipationDto(participation);
    }

    @Override
    public ParticipationDto refuserDemandeDoubleParticipation( Long idParticipation){
        Participation participation = null;

        Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
        if (optionalParticipation.isPresent()) {
            participation = optionalParticipation.get();
            if (!"Acceptée".equals(participation.getStatutParticipation())
                    && !"Refusée".equals(participation.getStatutParticipation())
                    && !"Tontine Expiré".equals(participation.getTontine().getStatutTontine())) {
                {
                    participation.setStatutParticipation("Refusée");
                    participationRepo.save(participation);
                    System.out.println("La demande est refusée avec succès !");
                       /* emailService.sendMailDemandeRejected(responsable.getNom_user(),
                                responsable.getPrenom(),
                                responsable.getTel(),
                                responsable.getEmail(),
                                participation.getParticipant().getEmail(),
                                participation.getParticipant().getNomUser(),
                                participation.getParticipant().getPrenom(),
                                participation.getTontine().getLibelle());*/
                }
            }
            else{
                System.out.println("La demande est déja traité");
            }

        }
        else {
            System.out.println("Une erreur s'est produite : participation non trouvée");
        }

        return convertToPaticipationDto(participation);
    }
    @Override
    public ParticipationDto demanderCoparticipation(Long idParticipant, Long idParticipation, Long idCoparticipant) {
        UtilisateurDto participant = utilisateurService.lire(idParticipant);
        Participation participation = null;

        if (participant != null) {
            Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);

            if (optionalParticipation.isPresent()) {
                participation = optionalParticipation.get();


                    UtilisateurDto coparticipant = utilisateurService.lire(idCoparticipant);

                    if (coparticipant != null) {
                        participation.setCoparticipant(UtilisateurServiceImpl.convertToUtilisateur(coparticipant));
                        participation.setStatutParticipation("En attente de coparticipation");
                        participationRepo.save(participation);
                        System.out.println("La demande de coparticipation est acceptée avec succès !");
                    } else {
                        System.out.println("Utilisateur coparticipant non trouvé.");
                    }

            } else {
                System.out.println("Une erreur s'est produite : participation non trouvée");
            }
        }

        return convertToPaticipationDto(participation);
    }

    @Override
    public ParticipationDto accepterDemandeCoParticipation(Long idParticipation) {

        Participation participation = null;

        Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
        LocalDate dateDuSysteme = LocalDate.now();

        if (optionalParticipation.isPresent()) {
            participation = optionalParticipation.get();
            if (!"Acceptée".equals(participation.getStatutParticipation())) {
                if (participation.getTontine().getStatutTontine() != "Tontine Expiré") {
                    participation = optionalParticipation.get();
                    participation.setStatutParticipation("Demande en attente");
                    participation.setDateParticipation(Date.valueOf(dateDuSysteme));
                    participation.setMontantParticipant(participation.getTontine().getMontant());
                    participationRepo.save(participation);
                    System.out.println("La demande demi est acceptée avec succès!");

                    TourDto tourDto = new TourDto();
                    TourDto tourDto1 = new TourDto();
                    tourDto.setNbTour(participation.getTontine().getNbTourActuel());
                    tourDto1.setNbTour(participation.getTontine().getNbTourActuel()+1);
                    participation.getTontine().setNbTourActuel(participation.getTontine().getNbTourActuel()+2);
                    participation.setStatutPaiement("Non payé");
                    if(participation.getTontine().getNbTourActuel() == participation.getTontine().getPeriode() )
                    {
                        participation.getTontine().setStatutTontine("Tontine Expiré");
                        tontineServiceImpl.ActiverTontine( participation.getTontine().getIdTontine());
                    }
                    if (participation.getTontine() != null) {
                        TourDto addedTour = tourService.addTour(tourDto);
                        TourDto addedTour1 = tourService.addTour(tourDto1);

                        if (addedTour != null || addedTour1 != null) {
                            try {
                                tourService.affecterTontineAndParticipantToTour(addedTour.getId_tour(), participation.getTontine().getIdTontine(), participation.getIdParticipation());
                                tourService.affecterTontineAndParticipantToTour(addedTour1.getId_tour(), participation.getTontine().getIdTontine(), participation.getIdParticipation());
                            } catch (ChangeSetPersister.NotFoundException e) {
                                e.printStackTrace();
                            }

                            /*emailService.sendMailDemandeAccepted(idParticipation,
                                    responsable.getNom_user(),
                                    responsable.getPrenom(),
                                    participation.getParticipant().getNomUser(),
                                    participation.getParticipant().getPrenom(),
                                    participation.getParticipant().getEmail(),
                                    participation.getDateParticipation(),
                                    participation.getTontine().getLibelle(),
                                    participation.getTontine().getMontant()*2);*/
                        } else {
                            System.out.println("Erreur lors de la création du tour.");
                        }
                    } else {
                        System.out.println("Erreur: La tontine de la participation est nulle.");
                    }
                }
                else {
                    System.out.println("Une erreur s'est produite: Tontine Expiré");
                }
            }
            else{
                System.out.println("La demande est deja traité");
            }
        } else {
            System.out.println("Une erreur s'est produite: participation non trouvée");
        }

        return convertToPaticipationDto(participation);
    }

    @Override
    public ParticipationDto refuserDemandeCoParticipation(Long idParticipation){

        Participation participation = null;

            Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
            if (optionalParticipation.isPresent()) {
                participation = optionalParticipation.get();
                if (!"Acceptée".equals(participation.getStatutParticipation())
                        && !"Refusée".equals(participation.getStatutParticipation())
                        && !"Tontine Expiré".equals(participation.getTontine().getStatutTontine())) {
                    {
                        participation.setStatutParticipation("Refusée par Coparticipant");
                        participationRepo.save(participation);
                        System.out.println("La demande est refusée avec succès !");
                        /*emailService.sendMailDemandeRejected(responsable.getNom_user(),
                                responsable.getPrenom(),
                                responsable.getTel(),
                                responsable.getEmail(),
                                participation.getParticipant().getEmail(),
                                participation.getParticipant().getNomUser(),
                                participation.getParticipant().getPrenom(),
                                participation.getTontine().getLibelle());*/
                    }
                }
                else{
                    System.out.println("La demande est déjà traitée");
                }

            }
            else {
                System.out.println("Une erreur s'est produite : participation non trouvée");
            }

        return convertToPaticipationDto(participation);
    }

    @Override
    public ParticipationDto PayerTontine(Long idParticipant, Long idTontine){
        Utilisateur participant = utilisateurRepo.findByIdUser(idParticipant);
        Tontine tontine = tontineRepo.findByIdTontine(idTontine);

        Optional<Participation> OptionalParticipation = Optional.ofNullable(participationRepo.findByParticipantAndTontine(participant, tontine));
        Participation participation = null;
        LocalDate dateDuSysteme = LocalDate.now();

        if (OptionalParticipation.isPresent()){
            participation = OptionalParticipation.get();
            if(participation.getCoparticipant() == null){
                if(dateDuSysteme.isAfter(participation.getDatePaiement().toLocalDate())) {
                    participation.getTontine().setMontantTotal(participation.getTontine().getMontantTotal()+participation.getMontantParticipant());
                    participation.setStatutPaiement("Paiement Totale Effectuer En retard");
                } else{
                    participation.getTontine().setMontantTotal(participation.getTontine().getMontantTotal()+participation.getMontantParticipant());
                    participation.setStatutPaiement("Paiement Totale Effectuer");
                }
                participation.setDatePaiementEffectue(Date.valueOf(dateDuSysteme));
                participationRepo.save(participation);

            }
            else{
                if(idParticipant == participation.getCoparticipant().getIdUser()){
                    if(dateDuSysteme.isAfter(participation.getDatePaiement().toLocalDate())) {
                        participation.setStatutPaiement("Paiement Effectuer Par Coparticipant En retard ");
                    }
                    else{
                        participation.setStatutPaiement("Paiement Effectuer Par Coparticipant");
                    }
                    participation.getTontine().setMontantTotal(participation.getTontine().getMontantTotal()+(participation.getMontantParticipant()/2));
                    participationRepo.save(participation);

                }
                if(idParticipant == participation.getParticipant().getIdUser() && participation.getStatutParticipation() == "Paiement Effectuer Par Coparticipant"){
                    if(dateDuSysteme.isAfter(participation.getDatePaiement().toLocalDate())) {
                        participation.setStatutPaiement("Paiement Totale Effectuer En retard");
                    }
                    else{
                        participation.setStatutPaiement("Paiement Totale Effectuer");

                    }                        participation.setDatePaiementEffectue(Date.valueOf(dateDuSysteme));
                    participation.getTontine().setMontantTotal(participation.getTontine().getMontantTotal()+(participation.getMontantParticipant()/2));
                    participationRepo.save(participation);

                }
            }
            /*ici il ya une fonction ta nzidha*/
            /*emailService.sendMailPaiementEffectuer(participation.getParticipant().getEmail(),
                    participation.getParticipant().getNomUser(),
                    participation.getParticipant().getPrenom(),
                    participation.getTontine().getLibelle(),
                    participation.getTontine().getMontant(),
                    participation.getDatePaiement(),
                    participation.getStatutPaiement());*/



        }else{
            System.out.println("vous n'etes pas participer ou tontine ! ");
        }
        return convertToPaticipationDto(participation);
    }
    @Override
    public List<ParticipationDto> ListParticipants() {
        List<Participation> participations = participationRepo.findAll();
        return convertToParticipationsDTOList(participations);
    }

    public static List<ParticipationDto> convertToParticipationsDTOList(List<Participation> participations) {
        List<ParticipationDto> participationDtos = new ArrayList<>();
        for (Participation participation : participations) {
            ParticipationDto participationDto = convertToPaticipationDto(participation);
            participationDtos.add(participationDto);
        }
        return participationDtos;
    }


    public static Participation convertToPaticipation(ParticipationDto participantDto) {
        Participation participation = new Participation();
        participation.setIdParticipation(participantDto.getIdParticipation());
        participation.setChequeParticipation(participantDto.getChequeParticipation());
        participation.setMontantParticipant(participantDto.getMontantParticipant());
        participation.setDateParticipation(participantDto.getDateParticipation());
        participation.setStatutParticipation(participantDto.getStatutParticipation());
        participation.setRib(participantDto.getRib());
        participation.setDatePaiementEffectue(participantDto.getDatePaiementEffectue());
        participation.setDatePaiement(participantDto.getDateParticipation());
        participation.setNomBanque(participantDto.getNomBanque());
        participation.setStatutPaiement(participantDto.getStatutPaiement());
        if (participantDto.getParticipant() != null) {
            participation.setParticipant(convertToUtilisateur(participantDto.getParticipant()));
        }
        if (participantDto.getTontine() != null) {
            participation.setTontine(convertToTontine(participantDto.getTontine()));
        }
        if (participantDto.getCoparticipant() != null) {
            participation.setCoparticipant(convertToUtilisateur(participantDto.getCoparticipant()));
        }
        return participation;
    }


    public static ParticipationDto convertToPaticipationDto(Participation participation) {
        ParticipationDto participantDto = new ParticipationDto();
        participantDto.setIdParticipation(participation.getIdParticipation());
        participantDto.setChequeParticipation(participation.getChequeParticipation());
        participantDto.setMontantParticipant(participation.getMontantParticipant());
        participantDto.setDateParticipation(participation.getDateParticipation());
        participantDto.setStatutParticipation(participation.getStatutParticipation());
        participantDto.setRib(participation.getRib());
        participantDto.setDatePaiementEffectue(participation.getDatePaiementEffectue());
        participantDto.setDatePaiement(participation.getDateParticipation());
        participantDto.setNomBanque(participation.getNomBanque());
        participantDto.setStatutPaiement(participation.getStatutPaiement());
        if (participation.getParticipant() != null) {
            participantDto.setParticipant(convertToUtilisateurDTO(participation.getParticipant()));
        }
        if (participation.getTontine() != null) {
            participantDto.setTontine(convertToTontineDto(participation.getTontine()));
        }
        if (participation.getCoparticipant() != null) {
            participantDto.setCoparticipant(convertToUtilisateurDTO(participation.getCoparticipant()));
        }

        return participantDto;
    }
}