package daret.projetspringoob.Daret.repositories;

import daret.projetspringoob.Daret.entities.Participation;
import daret.projetspringoob.Daret.entities.Tontine;
import daret.projetspringoob.Daret.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface ParticipationRepo extends JpaRepository<Participation, Long> {
    Participation findById(long idParticipation);
    Participation findByParticipantAndTontine(Utilisateur Participant, Tontine tontine);

}
