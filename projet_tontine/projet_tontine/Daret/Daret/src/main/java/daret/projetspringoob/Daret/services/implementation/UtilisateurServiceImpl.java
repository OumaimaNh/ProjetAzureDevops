package daret.projetspringoob.Daret.services.implementation;

import daret.projetspringoob.Daret.dto.LoginDto;
import daret.projetspringoob.Daret.dto.ParticipationDto;
import daret.projetspringoob.Daret.dto.UtilisateurDto;
import daret.projetspringoob.Daret.entities.Participation;
import daret.projetspringoob.Daret.entities.Role;
import daret.projetspringoob.Daret.entities.Tontine;
import daret.projetspringoob.Daret.entities.Utilisateur;
import daret.projetspringoob.Daret.repositories.ParticipationRepo;
import daret.projetspringoob.Daret.repositories.RoleRepo;
import daret.projetspringoob.Daret.repositories.TontineRepo;
import daret.projetspringoob.Daret.repositories.UtilisateurRepo;
import daret.projetspringoob.Daret.response.LoginResponse;
import daret.projetspringoob.Daret.response.ResponseInscription;
import daret.projetspringoob.Daret.services.UtilisateurService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException; // ajouté du code 1
import java.nio.file.Files; // ajouté du code 1
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static daret.projetspringoob.Daret.services.implementation.ParticipationServiceImpl.convertToPaticipationDto;
@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepo utilisateurRepo;

    private final RoleRepo roleRepo;
    private TontineRepo tontineRepo;
    private final ParticipationRepo participationRepo;
    public UtilisateurServiceImpl(/*PasswordEncoder passwordEncoder,*/ RoleRepo roleRepo, TontineRepo tontineRepo, ParticipationRepo participationRepo) {
       // this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;
        this.tontineRepo = tontineRepo;
        this.participationRepo = participationRepo;
    }


    @Override
    public ResponseInscription addUtilisateur(UtilisateurDto utilisateurDto) {
        ResponseInscription response = new ResponseInscription();

        String email = utilisateurDto.getEmail();
        if (utilisateurRepo.existsByEmail(email)) {
            response.setSuccess(false);
            response.setMessage("Adresse e-mail déjà utilisée. Veuillez en choisir une autre.");
            return response;
        }
        String cne = utilisateurDto.getCne();
        if (utilisateurRepo.existsByCne(cne)) {
            response.setSuccess(false);
            response.setMessage("CNE déjà utilisé. Veuillez en choisir un autre.");
            return response;
        }
        String tel = utilisateurDto.getTel();
        if (utilisateurRepo.existsByTel(tel)) {
            response.setSuccess(false);
            response.setMessage("Numéro de telephone déjà utilisé. Veuillez en choisir un autre.");
            return response;
        }
        int codeRoleUser = 1;
        Optional<Role> existingRole = roleRepo.findByCode(codeRoleUser);
        Role role = existingRole.orElseGet(() -> {
            Role newRole = new Role();
            newRole.setNom_role("utilisateur");
            newRole.setCode(codeRoleUser);
            newRole.setStatut_role("active");
            return roleRepo.save(newRole);
        });

        Utilisateur utilisateur = convertToUtilisateur(utilisateurDto);
        utilisateur.setRole(role);
        utilisateur.setStatutUser("active");
        utilisateurRepo.save(utilisateur);

        response.setSuccess(true);
        response.setMessage("Utilisateur ajouté avec succès.");
        response.setUtilisateurDto(convertToUtilisateurDTO(utilisateur));

        return response;
    }
    @Override
    public UtilisateurDto lire(Long id) {
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepo.findById(id);

        if(optionalUtilisateur.isPresent()){
            Utilisateur utilisateur = optionalUtilisateur.get();
            return convertToUtilisateurDTO(utilisateur);
        }else{
            System.out.println("Ce compte n'existe pas");
            return null;
        }
    }

    @Override
    public LoginResponse login(LoginDto loginDto, HttpSession session) {
        Utilisateur user = utilisateurRepo.findByEmailIgnoreCase(loginDto.getEmail());

        if (user != null) {
            String statut = user.getStatutUser();

            if (!statut.equals("bloque") && !statut.equals("supprime")) {
                Optional<Utilisateur> utilisateur = utilisateurRepo.findByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword());

                if (utilisateur.isPresent()) {
                    user = utilisateur.get();
                    String role = user.getRole().getNom_role();
                    Long id = user.getIdUser();

                    session.setAttribute("userId", id);
                    session.setAttribute("role", role);

                    return new LoginResponse(id, "Login Success (Administrator)", true);
                    /*switch (role) {
                        case "utilisateur":
                            return new LoginResponse(id, "Login Success (User)", true);
                        case "responsable":
                            return new LoginResponse(id, "Login Success (Manager)", true);
                        case "administrateur":
                            return new LoginResponse(id, "Login Success (Administrator)", true);
                        default:
                            return new LoginResponse(null, "Unknown Role", false);
                    }*/
                } else {
                    System.out.println("Mot de passe incorrect pour l'adresse email : " + loginDto.getEmail());
                    return new LoginResponse(null, "Mot de passe incorrect", false);
                }
            } else {
                System.out.println("Ce compte a été supprimé ou bloqué pour l'adresse email : " + loginDto.getEmail());
                return new LoginResponse(null, "Ce compte a été supprimé ou bloqué", false);
            }
        } else {
            System.out.println("Utilisateur introuvable pour l'adresse email : " + loginDto.getEmail());
            return new LoginResponse(null, "Utilisateur introuvable", false);
        }

    }



    @Override
    public java.util.List<UtilisateurDto> lireTous() {
        List<Utilisateur> utilisateurs = utilisateurRepo.findAll();

        if (!utilisateurs.isEmpty()) {
            List<UtilisateurDto> utilisateurDtos = new ArrayList<>();

            for (Utilisateur utilisateur : utilisateurs) {
                utilisateurDtos.add(convertToUtilisateurDTO(utilisateur));
            }

            return utilisateurDtos;
        } else {
            System.out.println("Aucun utilisateur trouvé.");
            return Collections.emptyList(); // Retourner une liste vide si aucun utilisateur n'est trouvé.
        }
    }

    @Override
    public UtilisateurDto modifier(Long id, UtilisateurDto utilisateurDto) {
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepo.findById(id);
        if(optionalUtilisateur.isPresent()){
            Utilisateur utilisateur = optionalUtilisateur.get();
            utilisateur.setNomUser(utilisateurDto.getNom_user());
            utilisateur.setPrenom(utilisateurDto.getPrenom());
            utilisateur.setEmail(utilisateurDto.getEmail());
            utilisateur.setPassword(utilisateurDto.getPassword());
            utilisateur.setCne(utilisateurDto.getCne());
            utilisateur.setTel(utilisateurDto.getTel());
            utilisateur.setStatutUser(utilisateurDto.getStatut_user());
            utilisateur.setEvaluation(utilisateurDto.getEvaluation());
            utilisateur.setConfidentialite(utilisateurDto.getConfidentialite());
            utilisateur.setPhotoProfile(utilisateurDto.getPhoto_profile());
            if(utilisateurDto.getRole() != null){
                utilisateur.setRole(RoleServiceImpl.convertToRole(utilisateurDto.getRole()));
            }
            Utilisateur updatedUser = utilisateurRepo.save(utilisateur);
            return convertToUtilisateurDTO(updatedUser);
        }
        return utilisateurDto;
    }

    @Override
    public Boolean bloquerUtilisateur(Long id) {
        UtilisateurDto utilisateurDto = lire(id);
        if(utilisateurDto == null){
            System.out.println("Le compte n'existe pas");
            return null;
        }
        if(utilisateurDto.getStatut_user().equals("bloque")){
            System.out.println("Ce compte est deja bloque");
            return false;
        }
        utilisateurDto.setStatut_user("bloque");
        modifier(id, utilisateurDto);
        return true;
    }

    @Override
    public Boolean activerCompte(Long id) {
        UtilisateurDto utilisateur = lire(id);
        if (utilisateur == null) {
            System.out.println("Le compte n'existe pas");
            return null;
        }
        if (utilisateur.getStatut_user().equals("active")) {
            System.out.println("Ce compte est déjà activé");
            return false;
        }
        utilisateur.setStatut_user("active");
        modifier(id, utilisateur);
        return true;
    }
    @Override
    public Boolean promouvoirUserToManager(Long id){
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepo.findById(id);

        if(optionalUtilisateur.isPresent()) {
            Utilisateur utilisateur = optionalUtilisateur.get();

            Optional<Role> optionalRole = roleRepo.findByCode(2);
            if (optionalRole.isPresent()) {
                Role role = optionalRole.get();

                utilisateur.setRole(role);
                utilisateurRepo.save(utilisateur);
                return true;
            } else {
                System.out.println("Le role du responsable n'existe pas, essayez de l'ajouter et s'assurer que son code sera 2");
                return false;
            }
        }else {
            System.out.println("Cet utilisateur n'existe pas !!");
            return false;
        }
    }

    @Override
    public Boolean rendreUser(Long id){
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepo.findById(id);

        if(optionalUtilisateur.isPresent()) {
            Utilisateur utilisateur = optionalUtilisateur.get();

            Optional<Role> optionalRole = roleRepo.findByCode(1);
            if (optionalRole.isPresent()) {
                Role role = optionalRole.get();

                utilisateur.setRole(role);
                utilisateurRepo.save(utilisateur);
                return true;
            } else {
                System.out.println("Le role utilisateur n'existe pas, essayez de l'ajouter et s'assurer que son code sera 1");
                return false;
            }
        }else {
            System.out.println("Cet utilisateur n'existe pas !!");
            return false;
        }
    }

    @Override
    public Boolean supprimerUtilisateur(Long id) {
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepo.findById(id);

        if (optionalUtilisateur.isPresent()) {
            Utilisateur user = optionalUtilisateur.get();

            user.setStatutUser("supprime");

            utilisateurRepo.save(user);
            return true;
        } else {
            System.out.println("Ce compte n'existe pas !!");
            return false;
        }
    }
    @Override
    public Boolean affecterResponsableTontine(Long idUtilisateur, Long idTontine) {
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepo.findById(idUtilisateur);
        Optional<Tontine> optionalTontine = tontineRepo.findById(idTontine);

        if (optionalUtilisateur.isPresent() && optionalTontine.isPresent()) {
            Utilisateur utilisateur = optionalUtilisateur.get();
            Tontine tontine = optionalTontine.get();

            if (utilisateur.getRole() != null && utilisateur.getRole().getCode() == 2) {
                tontine.setResponsable(utilisateur);
                tontineRepo.save(tontine);
                return true;
            } else {
                System.out.println("L'utilisateur n'a pas le rôle de responsable.");
                return false;
            }
        } else {
            System.out.println("Utilisateur ou tontine non trouvée.");
            return false;
        }
    }
    @Override
    public void deconnecter(Long id, HttpSession session) {
        Optional<Utilisateur> optionalUser = utilisateurRepo.findById(id);

        if (optionalUser.isPresent()) {
            Utilisateur user = optionalUser.get();

            utilisateurRepo.save(user);

            session.invalidate();
        } else {
            throw new EntityNotFoundException("La personne n'existe pas.");
        }
    }
    @Override
    public String telechargerDossierJudiciaire(Long idUtilisateur, MultipartFile dossierJudiciaire) {
        String uploadPath = "C:\\Users\\user\\OneDrive\\Bureau\\Tests\\";
        String fileName = "dossier_judiciaire_" + idUtilisateur + ".pdf";

        try {

            Files.write(Paths.get(uploadPath, fileName), dossierJudiciaire.getBytes());

            return uploadPath + "/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de l'enregistrement du dossier judiciaire.", e);
        }
    }

    @Override
    public ParticipationDto accepterDemandeParticipation(Long idUtilisateur, Long idParticipation) {
        UtilisateurDto responsable = lire(idUtilisateur);
        Participation participation = null;
        if (responsable == null || !isResponsable(responsable)) {
            throw new RuntimeException("Vous n'avez pas les autorisations nécessaires pour effectuer cette action.");
        } else {
            Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
            if (optionalParticipation.isPresent()) {
                participation = optionalParticipation.get();
                participation.setStatutParticipation("Acceptée");
                participationRepo.save(participation);
                System.out.println("La demande est acceptée avec succès !");
            } else {
                System.out.println("Une erreur s'est produite : participation non trouvée");
            }
        }
        return convertToPaticipationDto(participation);
    }

    private boolean isResponsable(UtilisateurDto utilisateur) {
        return utilisateur.getRole() != null && utilisateur.getRole().getCode() == 2;
    }

    @Override
    public ParticipationDto refuserDemandeParticipation(Long idUtilisateur, Long idParticipation){
        UtilisateurDto responsable = lire(idUtilisateur);
        Participation participation = null;
        if (responsable == null || !isResponsable(responsable)) {
            throw new RuntimeException("Vous n'avez pas les autorisations nécessaires pour effectuer cette action.");
        } else {
            Optional<Participation> optionalParticipation = participationRepo.findById(idParticipation);
            if (optionalParticipation.isPresent()) {
                participation = optionalParticipation.get();
                participation.setStatutParticipation("Rejetée");
                participationRepo.save(participation);
                System.out.println("La demande est refusée avec succès !");
            } else {
                System.out.println("Une erreur s'est produite : participation non trouvée");
            }
        }
        return convertToPaticipationDto(participation);
    }



    public static UtilisateurDto convertToUtilisateurDTO(Utilisateur utilisateur) {
        UtilisateurDto utilisateurDto = new UtilisateurDto();
        utilisateurDto.setId_user(utilisateur.getIdUser());
        utilisateurDto.setNom_user(utilisateur.getNomUser());
        utilisateurDto.setPrenom(utilisateur.getPrenom());
        utilisateurDto.setEmail(utilisateur.getEmail());
        utilisateurDto.setPassword(utilisateur.getPassword());
        utilisateurDto.setCne(utilisateur.getCne());
        utilisateurDto.setAdresse(utilisateur.getAdresse());
        utilisateurDto.setTel(utilisateur.getTel());
        utilisateurDto.setStatut_user(utilisateur.getStatutUser());
        utilisateurDto.setEvaluation(utilisateur.getEvaluation());
        utilisateurDto.setConfidentialite(utilisateur.getConfidentialite());
        utilisateurDto.setPhoto_profile(utilisateur.getPhotoProfile());

        if (utilisateur.getRole() != null) {
            utilisateurDto.setRole(RoleServiceImpl.convertToRoleDTO(utilisateur.getRole()));
        }

        return utilisateurDto;
    }

    public static Utilisateur convertToUtilisateur(UtilisateurDto utilisateurDto) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setIdUser(utilisateurDto.getId_user());
        utilisateur.setNomUser(utilisateurDto.getNom_user());
        utilisateur.setPrenom(utilisateurDto.getPrenom());
        utilisateur.setEmail(utilisateurDto.getEmail());
        utilisateur.setPassword(utilisateurDto.getPassword());
        utilisateur.setCne(utilisateurDto.getCne());
        utilisateur.setAdresse(utilisateurDto.getAdresse());
        utilisateur.setTel(utilisateurDto.getTel());
        utilisateur.setStatutUser(utilisateurDto.getStatut_user());
        utilisateur.setEvaluation(utilisateurDto.getEvaluation());
        utilisateur.setConfidentialite(utilisateurDto.getConfidentialite());
        utilisateur.setPhotoProfile(utilisateurDto.getPhoto_profile());

        if (utilisateurDto.getRole() != null) {
            utilisateur.setRole(RoleServiceImpl.convertToRole(utilisateurDto.getRole()));
        }

        return utilisateur;
    }


    public static java.util.List<UtilisateurDto> convertToUtilisateurDTOList(java.util.List<Utilisateur> users) {
        java.util.List<UtilisateurDto> utilisateurDtos = new ArrayList<>();
        for (Utilisateur utilisateur : users) {
            UtilisateurDto utilisateurDto = convertToUtilisateurDTO(utilisateur);
            utilisateurDtos.add(utilisateurDto);
        }
        return utilisateurDtos;
    }

    public static java.util.List<Utilisateur> convertToPersonneList(java.util.List<UtilisateurDto> utilisateurDtos) {
        java.util.List<Utilisateur> users = new ArrayList<>();
        for (UtilisateurDto utilisateurDto : utilisateurDtos) {
            Utilisateur utilisateur = convertToUtilisateur(utilisateurDto);
            users.add(utilisateur);
        }
        return users;
    }

}
