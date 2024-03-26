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
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTour;


    @Column
    @NonNull
    private int nbTour;

    @Column
    @Basic
    private String statusTour;


    @ManyToOne
    @JoinColumn(name = "idParticipant")
    private Participation participant;

    @ManyToOne
    @JoinColumn(name = "idTontine")
    private Tontine tontine;



}
