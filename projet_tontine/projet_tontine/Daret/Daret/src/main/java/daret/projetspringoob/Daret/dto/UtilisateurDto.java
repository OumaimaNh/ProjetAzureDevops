package daret.projetspringoob.Daret.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilisateurDto {

    private Long id_user;
    private String nom_user;
    private String prenom;
    private String email;
    private String password;
    private String cne;
    private String adresse;
    private String tel;
    private String statut_user;
    private Double evaluation;
    private String confidentialite;
    private String photo_profile;

    private RoleDto role;

    public UtilisateurDto(String id_user) {
        this.id_user = Long.parseLong(id_user);
    }
}
