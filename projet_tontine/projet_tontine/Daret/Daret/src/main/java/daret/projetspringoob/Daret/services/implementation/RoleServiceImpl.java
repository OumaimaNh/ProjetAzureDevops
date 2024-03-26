package daret.projetspringoob.Daret.services.implementation;

import daret.projetspringoob.Daret.dto.RoleDto;
import daret.projetspringoob.Daret.entities.Role;
import daret.projetspringoob.Daret.repositories.RoleRepo;
import daret.projetspringoob.Daret.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepo roleRepo;

    @Override
    public RoleDto ajouterRole(RoleDto roleDto) {

        return null;
    }

    @Override
    public RoleDto lireRole(RoleDto roleDto) {
        return null;
    }

    @Override
    public RoleDto modifierRole(Long id, RoleDto roleDto) {
        return null;
    }

    @Override
    public Boolean supprimerRole(Long id) {
        return null;
    }

    public static RoleDto convertToRoleDTO(Role role) {
        RoleDto roleDto = new RoleDto();
        roleDto.setId_role(role.getId_role());
        roleDto.setNom_role(role.getNom_role());
        roleDto.setCode(role.getCode());
        roleDto.setStatut_role(role.getStatut_role());

        return roleDto;
    }
    public static Role convertToRole(RoleDto roleDto) {
        Role role = new Role();
        role.setId_role(roleDto.getId_role());
        role.setNom_role(roleDto.getNom_role());
        role.setCode(roleDto.getCode());
        role.setStatut_role(role.getStatut_role());

        return role;
    }

}
