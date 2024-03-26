package daret.projetspringoob.Daret.services;

import daret.projetspringoob.Daret.dto.RoleDto;

public interface RoleService {
    RoleDto ajouterRole(RoleDto roleDto);
    RoleDto lireRole(RoleDto roleDto);
    RoleDto modifierRole(Long id, RoleDto roleDto);
    Boolean supprimerRole(Long id);
}
