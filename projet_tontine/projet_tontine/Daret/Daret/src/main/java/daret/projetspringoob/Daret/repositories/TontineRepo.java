package daret.projetspringoob.Daret.repositories;

 import daret.projetspringoob.Daret.entities.Tontine;
 import daret.projetspringoob.Daret.entities.Utilisateur;
 import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface TontineRepo extends JpaRepository<Tontine, Long> {
 Tontine findByLibelle(String libelle);
 Tontine findByIdTontine(long idTontine);
 Tontine findByResponsable(Utilisateur Responsable);
 Tontine findByNbrParticipants(int nbrParticipants);
 Tontine findByPeriode(int periode);

}
