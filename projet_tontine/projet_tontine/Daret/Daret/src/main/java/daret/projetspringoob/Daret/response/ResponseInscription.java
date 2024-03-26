package daret.projetspringoob.Daret.response;



import daret.projetspringoob.Daret.dto.UtilisateurDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class ResponseInscription {
    private boolean success;
    private String message;
    private UtilisateurDto utilisateurDto;
}