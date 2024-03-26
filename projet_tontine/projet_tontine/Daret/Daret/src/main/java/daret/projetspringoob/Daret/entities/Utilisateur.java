package daret.projetspringoob.Daret.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Data
@Entity
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    @Basic
    @Column
    @NonNull
    private String nomUser;

    @Basic
    @Column
    @NonNull
    private String prenom;

    @Basic
    @Column(unique = true)
    @NonNull
    private String email;

    @Basic
    @Column
    @NonNull
    private String password;

    @Basic
    @Column(unique = true)
    @NonNull
    private String cne;

    @Basic
    @Column
    @NonNull
    private String adresse;

    @Basic
    @Column
    @NonNull
    private String tel;

    @Basic
    @Column
    @NonNull
    private String statutUser;

    @Basic
    @Column
    private Double evaluation;

    @Basic
    @Column
    private String confidentialite;

    @Basic
    @Column
    private String photoProfile;


    @ManyToOne
    @JoinColumn(name = "id_role")
    private Role role;

    @OneToMany(mappedBy = "participant")
    private List<Participation> participations;

    @OneToMany(mappedBy = "Coparticipant")
    private List<Participation> Coparticipations;

    public Utilisateur(String nomUser, String prenom, String email, String password, String cne, String adresse, String tel, String statutUser, Double evaluation, String confidentialite, String photoProfile, Role role, List<Participation> participations) {
    }
}