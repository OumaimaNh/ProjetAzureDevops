package daret.projetspringoob.Daret.repositories;

import daret.projetspringoob.Daret.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long> {


    Optional<Utilisateur> findByEmailAndPassword(String email, String password);

    Utilisateur findByEmailIgnoreCase(String email);
    Utilisateur findByIdUser(Long idUser);

    boolean existsByEmail(String email);
    boolean existsByCne(String cne);
    boolean existsByTel(String tel);

}
