package daret.projetspringoob.Daret.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
public class Tontine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTontine;

    @Basic
    @Column
    @NonNull
    private String libelle;

    @Basic
    @Column
    @NonNull
    private String description;

    @Basic
    @Column
    @NonNull
    private Double montantTotal;

    @Basic
    @Column

    private Integer nbrParticipants;

    @Basic
    @Column
    @NonNull
    private Integer periode;

    @Basic
    @Column
    private String statutTontine;

    @Basic
    @Column

    private Date dateDebut;

    @Basic
    @Column
    private Double montant;

    @Column
    @Basic
    private int nbTourActuel;

    @OneToMany(mappedBy = "tontine")
    private List<Participation> participons;

    @ManyToOne
    private Utilisateur responsable;

    public void modifierMontantTotal(Double nouveauMontantTotal) {
        this.montantTotal = nouveauMontantTotal;
    }

    public Tontine(long idTontine, String libelle, String description, Double montantTotal, Integer nbrParticipants, Integer periode, String statutTontine,Date dateDebut,List<Participation> participons,Utilisateur responsable) {

    }


}
