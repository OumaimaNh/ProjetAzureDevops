package daret.projetspringoob.Daret.controllers;
import daret.projetspringoob.Daret.dto.ParticipationDto;
import daret.projetspringoob.Daret.dto.TontineDto;
import daret.projetspringoob.Daret.dto.UtilisateurDto;
import daret.projetspringoob.Daret.repositories.TontineRepo;
import daret.projetspringoob.Daret.services.ParticipationService;
import daret.projetspringoob.Daret.services.implementation.TontineServiceImpl;
import daret.projetspringoob.Daret.services.implementation.UtilisateurServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import daret.projetspringoob.Daret.repositories.UtilisateurRepo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/Participation")
public class ParticipationController {

    private final ParticipationService participationService;
    private final UtilisateurRepo utilisateurRepo;
    private final TontineRepo tontineRepo;

    @Autowired
    public ParticipationController(ParticipationService participationService, UtilisateurRepo utilisateurRepo,TontineRepo tontineRepo) {
        this.participationService = participationService;
        this.utilisateurRepo = utilisateurRepo;
        this.tontineRepo =tontineRepo;
    }

    @PostMapping("/demande/{tontineId}/{participantId}")
    public ResponseEntity<ParticipationDto> demanderParticipation(
            @PathVariable Long tontineId,
            @PathVariable Long participantId,
            @RequestBody ParticipationDto participationDto) {

        TontineDto tontineDto = TontineServiceImpl.convertToTontineDto(tontineRepo.findByIdTontine(tontineId));
        participationDto.setTontine(tontineDto);

        UtilisateurDto participantDto = UtilisateurServiceImpl.convertToUtilisateurDTO(utilisateurRepo.findByIdUser(participantId));
        participationDto.setParticipant(participantDto);

        participationDto.setDateParticipation(java.sql.Date.valueOf(LocalDate.now()));

        ParticipationDto nouvelleParticipation = participationService.demanderParticipation(participationDto);

        return ResponseEntity.ok(nouvelleParticipation);
    }

    @PostMapping("/demanderDouble/{tontineId}/{participantId}")
    public ResponseEntity<ParticipationDto> demanderParticipationDouble(
            @PathVariable Long tontineId,
            @PathVariable Long participantId,
            @RequestBody ParticipationDto participationDto) {

        TontineDto tontineDto = TontineServiceImpl.convertToTontineDto(tontineRepo.findByIdTontine(tontineId));
        participationDto.setTontine(tontineDto);

        UtilisateurDto participantDto = UtilisateurServiceImpl.convertToUtilisateurDTO(utilisateurRepo.findByIdUser(participantId));
        participationDto.setParticipant(participantDto);

        participationDto.setDateParticipation(java.sql.Date.valueOf(LocalDate.now()));

        ParticipationDto nouvelleParticipation = participationService.demanderParticipationDouble(participationDto);

        return ResponseEntity.ok(nouvelleParticipation);
    }

    @PostMapping("/demandeDemi/{tontineId}/{participantId}")
    public ResponseEntity<ParticipationDto> demanderParticipationDemi(
            @PathVariable Long tontineId,
            @PathVariable Long participantId,
            @RequestBody ParticipationDto participationDto) {

        TontineDto tontineDto = TontineServiceImpl.convertToTontineDto(tontineRepo.findByIdTontine(tontineId));
        participationDto.setTontine(tontineDto);

        UtilisateurDto participantDto = UtilisateurServiceImpl.convertToUtilisateurDTO(utilisateurRepo.findByIdUser(participantId));
        participationDto.setParticipant(participantDto);

        participationDto.setDateParticipation(java.sql.Date.valueOf(LocalDate.now()));

        ParticipationDto nouvelleParticipation = participationService.demanderParticipationDemi(participationDto);

        return ResponseEntity.ok(nouvelleParticipation);
    }
    @PostMapping("/addParticipation/{idTontine}")
    public ResponseEntity<ParticipationDto> addParticipant(@PathVariable Long idTontine,
                                                           HttpSession session,
                                                           @RequestBody ParticipationDto participationDto) {
        try {
            Long participantId = (Long) session.getAttribute("userId");

            if (participantId == null || !utilisateurRepo.existsById(participantId)) {
                System.out.println("Erreur : L'ID de l'utilisateur est manquant ou non valide dans la session.");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            // Utilisez l'ID récupéré de la session
            participationDto.setParticipant(UtilisateurServiceImpl.convertToUtilisateurDTO(utilisateurRepo.getReferenceById(participantId)));
            participationDto.setTontine(TontineServiceImpl.convertToTontineDto(tontineRepo.getReferenceById(idTontine)));

            ParticipationDto savedParticipant = participationService.addParticipant(participationDto);
            return new ResponseEntity<>(savedParticipant, HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            System.out.println("Erreur : Tontine non trouvée.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/editParticipation/{id}")
    public ResponseEntity<ParticipationDto> editParticipant(@PathVariable long id, @RequestBody ParticipationDto participantDto) {
        ParticipationDto updatedParticipant = participationService.editParticipant(id, participantDto);
        if (updatedParticipant != null) {
            return new ResponseEntity<>(updatedParticipant, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteParticipation/{id}")
    public ResponseEntity<String> deleteParticipant(@PathVariable long id) {
        boolean deleted = participationService.deleteParticipant(id);
        if (deleted) {
            return new ResponseEntity<>("Participant deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Participant not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/showParticipation/{id}")
    public ResponseEntity<ParticipationDto> showParticipantById(@PathVariable long id) {
        ParticipationDto participantDto = participationService.showParticipantById(id);
        if (participantDto != null) {
            return new ResponseEntity<>(participantDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/demanderCoparticipation")
    public ResponseEntity<ParticipationDto> demanderCoparticipation(
            @RequestParam Long idParticipant,
            @RequestParam Long idParticipation,
            @RequestParam Long idCoparticipant) {
        ParticipationDto result = participationService.demanderCoparticipation(idParticipant, idParticipation, idCoparticipant);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/accepterDemandeCoParticipation/{idParticipation}")
    public ResponseEntity<ParticipationDto> accepterDemandeCoParticipation(

            @PathVariable Long idParticipation) {

        ParticipationDto participationDto = participationService.accepterDemandeCoParticipation(idParticipation);

        if (participationDto != null) {
            return ResponseEntity.ok(participationDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/refuserDemandeCoParticipation/{idParticipation}")
    public ResponseEntity<ParticipationDto> refuserDemandeCoParticipation(
            @PathVariable Long idParticipation) {

        ParticipationDto participationDto = participationService.refuserDemandeCoParticipation(idParticipation);

        if (participationDto != null) {
            return ResponseEntity.ok(participationDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/listParticipation")
    public ResponseEntity<List<ParticipationDto>> listParticipants() {
        List<ParticipationDto> participants = participationService.ListParticipants();
        return new ResponseEntity<>(participants, HttpStatus.OK);
    }

    @GetMapping("/lire/{id}")
    public ResponseEntity<ParticipationDto> lire(@PathVariable long id) {
        ParticipationDto participantDto = participationService.lire(id);
        if (participantDto != null) {
            return new ResponseEntity<>(participantDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/accepterDemandeParticipation/{idUtilisateur}/{idParticipation}")
    public ResponseEntity<ParticipationDto> accepterDemandeParticipation(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idParticipation) {

        ParticipationDto participationDto = participationService.accepterDemandeParticipation(idUtilisateur, idParticipation);

        if (participationDto != null) {
            return ResponseEntity.ok(participationDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping ("/PayerTontine/{idParticipant}/{idTontine}")
    public ResponseEntity<ParticipationDto> PayerTontine(
            @PathVariable Long idParticipant, @PathVariable Long idTontine) {
        ParticipationDto participationDto =
                participationService.PayerTontine(idParticipant,idTontine);

        if (participationDto != null) {
            return ResponseEntity.ok(participationDto);
        } else {
            return ResponseEntity.notFound().build();
        }}
    @PutMapping("/accepterDemandeDoubleParticipation/{idParticipation}")
    public ResponseEntity<ParticipationDto> accepterDemandeDoubleParticipation(
            @PathVariable Long idParticipation) {

        ParticipationDto participationDto = participationService.accepterDemandeDoubleParticipation(idParticipation);

        if (participationDto != null) {
            return ResponseEntity.ok(participationDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/refuserDemandeDoubleParticipation/{idParticipation}")
    public ResponseEntity<ParticipationDto> refuserDemandeDoubleParticipation(
            @PathVariable Long idParticipation) {

        ParticipationDto participationDto = participationService.refuserDemandeDoubleParticipation(idParticipation);

        if (participationDto != null) {
            return ResponseEntity.ok(participationDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/refuserDemandeParticipation/{idUtilisateur}/{idParticipation}")
    public ResponseEntity<ParticipationDto> refuserDemandeParticipation(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idParticipation) {

        ParticipationDto participationDto = participationService.refuserDemandeParticipation(idUtilisateur, idParticipation);

        if (participationDto != null) {
            return ResponseEntity.ok(participationDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

