package daret.projetspringoob.Daret.controllers;

import daret.projetspringoob.Daret.dto.LoginDto;
import daret.projetspringoob.Daret.dto.ParticipationDto;
import daret.projetspringoob.Daret.dto.UtilisateurDto;
import daret.projetspringoob.Daret.response.LoginResponse;
import daret.projetspringoob.Daret.response.ResponseInscription;
import daret.projetspringoob.Daret.services.ParticipationService;
import daret.projetspringoob.Daret.services.UtilisateurService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;


import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:8085")
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping(path = "/inscrire", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseInscription> inscrireUtilisateur(@RequestBody UtilisateurDto utilisateurDto) {
        ResponseInscription response = utilisateurService.addUtilisateur(utilisateurDto);
        HttpStatus httpStatus = response.isSuccess() ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(response, httpStatus);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<LoginResponse> loginUtilisateur(@RequestBody LoginDto loginDto, HttpSession session) {
        LoginResponse loginResponse = utilisateurService.login(loginDto, session);

        // Vérifier si l'authentification est réussie et stocker l'ID dans la session
        if (loginResponse.getId() != null) {
            session.setAttribute("userId", loginResponse.getId());
            return ResponseEntity.ok().body(loginResponse);

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
        }
    }



    @GetMapping("/infoUser/{id}")
    public ResponseEntity<UtilisateurDto> lireUtilisateur(@PathVariable Long id) {
        UtilisateurDto utilisateurDto = utilisateurService.lire(id);

        if (utilisateurDto != null) {
            return ResponseEntity.ok(utilisateurDto);
        } else {
            // L'utilisateur avec l'ID spécifié n'a pas été trouvé
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/tousUtilisateurs")
    public ResponseEntity<List<UtilisateurDto>> lireTousUtilisateurs() {
        List<UtilisateurDto> utilisateurs = utilisateurService.lireTous();

        if (!utilisateurs.isEmpty()) {
            return ResponseEntity.ok(utilisateurs);
        } else {
            // Aucun utilisateur n'a été trouvé
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/bloquer/{id}")
    public ResponseEntity<Boolean> bloquerUtilisateur(@PathVariable Long id) {
        Boolean success = utilisateurService.bloquerUtilisateur(id);

        if (success != null) {
            return ResponseEntity.ok(success);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/activer/{id}")
    public ResponseEntity<Boolean> activerCompte(@PathVariable Long id) {
        Boolean success = utilisateurService.activerCompte(id);

        if (success != null) {
            return ResponseEntity.ok(success);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<Boolean> supprimerUtilisateur(@PathVariable Long id) {
        Boolean success = utilisateurService.supprimerUtilisateur(id);

        if (success) {
            return ResponseEntity.ok(success);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/promouvoir/{id}")
    public ResponseEntity<Boolean> promouvoirToResponsable(@PathVariable Long id) {
        Boolean success = utilisateurService.promouvoirUserToManager(id);
        if (success != null) {
            return ResponseEntity.ok(success);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/rendreUser/{id}")
    public ResponseEntity<Boolean> rendreUser(@PathVariable Long id) {
        Boolean success = utilisateurService.rendreUser(id);
        if (success != null) {
            return ResponseEntity.ok(success);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/affecterResponsableTontine")
    public ResponseEntity<String> affecterResponsableTontine(@RequestBody Map<String, Long> request) {
        Long idUtilisateur = request.get("idUtilisateur");
        Long idTontine = request.get("idTontine");

        Boolean success = utilisateurService.affecterResponsableTontine(idUtilisateur, idTontine);

        if (success) {
            return ResponseEntity.ok("Responsable affecté avec succès à la tontine.");
        } else {
            return ResponseEntity.badRequest().body("Impossible d'affecter le responsable à la tontine.");
        }
    }

    @PostMapping("/telechargerDossierJudiciaire/{idUtilisateur}")
    public ResponseEntity<String> telechargerDossierJudiciaire(
            @PathVariable Long idUtilisateur,
            @RequestParam("dossierJudiciaire") MultipartFile dossierJudiciaire) {

        String cheminFichier = utilisateurService.telechargerDossierJudiciaire(idUtilisateur, dossierJudiciaire);
        return ResponseEntity.ok("Dossier judiciaire téléchargé avec succès : " + cheminFichier);
    }

    @PutMapping("/accepterDemandeParticipation/{idUtilisateur}/{idParticipation}")
    public ResponseEntity<ParticipationDto> accepterDemandeParticipation(
            @PathVariable Long idUtilisateur,
            @PathVariable Long idParticipation) {

        ParticipationDto participationDto = utilisateurService.accepterDemandeParticipation(idUtilisateur, idParticipation);

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

        ParticipationDto participationDto = utilisateurService.refuserDemandeParticipation(idUtilisateur, idParticipation);

        if (participationDto != null) {
            return ResponseEntity.ok(participationDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
