package daret.projetspringoob.Daret.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_role;

    @Basic
    @Column
    @NonNull
    private String nom_role;


    @Basic
    @Column
    @NonNull
    private int code;


    @Basic
    @Column
    private String statut_role;

}