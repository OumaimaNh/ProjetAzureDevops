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
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idParticipation;

    @Basic
    @Column
    @NonNull
    private Double montantParticipant;

    @Basic
    @Column
    @NonNull
    private Double mensualite;

    @Basic
    @Column
    private String chequeParticipation;

    @Basic
    @Column

    private String nomBanque;

    @Basic
    @Column
    private String rib;

    @Basic
    @Column
    private Date dateParticipation;

    @Basic
    @Column
    private String statutParticipation;
    @Basic
    @Column
    private Date DatePaiement;
    @Basic
    @Column
    private Date DatePaiementEffectue;
    @Basic
    @Column
    private String statutPaiement;
    @ManyToOne
    @JoinColumn(name = "idParticipant")
    private Utilisateur participant;

    @Basic
    @Column
    private Date DateReceptionSoldeTontine;

    @ManyToOne
    @JoinColumn(name = "idCoparticipant")
    private Utilisateur Coparticipant;

    @ManyToOne
    @JoinColumn(name = "idTontine")
    private Tontine tontine;

}