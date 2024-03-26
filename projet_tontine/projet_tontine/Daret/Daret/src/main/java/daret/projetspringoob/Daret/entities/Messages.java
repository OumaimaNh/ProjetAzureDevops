package daret.projetspringoob.Daret.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_message;

    @Basic
    @Column
    @NonNull
    private String message;


    @ManyToOne
    @JoinColumn(name = "idEmetteur")
    private Utilisateur emetteur;

    @ManyToOne
    @JoinColumn(name = "idRecepteur")
    private Tontine recepteur;


}
