package daret.projetspringoob.Daret.services;

import daret.projetspringoob.Daret.dto.LoginDto;
import daret.projetspringoob.Daret.dto.UtilisateurDto;
import daret.projetspringoob.Daret.response.LoginResponse;
import daret.projetspringoob.Daret.response.ResponseInscription;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;
import daret.projetspringoob.Daret.dto.ParticipationDto;
public interface UtilisateurService {
      ResponseInscription addUtilisateur(UtilisateurDto utilisateurDto);
      UtilisateurDto lire(Long id);
      LoginResponse login(LoginDto loginDto, HttpSession session);
      java.util.List<UtilisateurDto> lireTous();

      UtilisateurDto modifier(Long id, UtilisateurDto utilisateurDto);

      Boolean bloquerUtilisateur(Long id);

      Boolean activerCompte(Long id);
      Boolean supprimerUtilisateur(Long id);
      void deconnecter(Long id, HttpSession session);

      Boolean promouvoirUserToManager(Long id);

      Boolean rendreUser(Long id);
      Boolean affecterResponsableTontine(Long idUtilisateur, Long idTontine);

      String telechargerDossierJudiciaire(Long idUtilisateur, MultipartFile dossierJudiciaire);

      ParticipationDto accepterDemandeParticipation(Long idUtilisateur, Long idParticipation);
      ParticipationDto refuserDemandeParticipation(Long idUtilisateur, Long idParticipation);
}

