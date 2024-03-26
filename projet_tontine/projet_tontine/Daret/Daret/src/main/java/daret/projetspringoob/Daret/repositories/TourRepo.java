package daret.projetspringoob.Daret.repositories;

import daret.projetspringoob.Daret.entities.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories

@Repository
public interface TourRepo extends JpaRepository<Tour,Long> {

    Tour findByIdTour(Long idTour);
}
