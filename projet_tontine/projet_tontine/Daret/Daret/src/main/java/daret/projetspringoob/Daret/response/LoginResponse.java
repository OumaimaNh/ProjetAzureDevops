package daret.projetspringoob.Daret.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class LoginResponse {
    Long id;
    String message;
    Boolean status;

}
