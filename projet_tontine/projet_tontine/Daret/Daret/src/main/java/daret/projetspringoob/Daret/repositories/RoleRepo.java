package daret.projetspringoob.Daret.repositories;

import daret.projetspringoob.Daret.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

    Optional<Role> findByCode(int codeProfilUtilisateur);

}
