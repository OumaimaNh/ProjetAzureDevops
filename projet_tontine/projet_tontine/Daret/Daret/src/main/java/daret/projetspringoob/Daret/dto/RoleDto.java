package daret.projetspringoob.Daret.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {

    private Long id_role;

    private String nom_role;

    private int code;

    private String statut_role;
}
