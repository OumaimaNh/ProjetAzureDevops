package daret.projetspringoob.Daret.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TontineDto {

    private Long idTontine;
    private String libelle;
    private String description;
    private Double montantTotal;
    private Integer nbrParticipants;
    private Integer periode;
    private Double montant;
    private int nbTourActuel;
    private String statutTontine;
    private Date dateDebut;
    private List<ParticipationDto> participons;
    private UtilisateurDto responsable;


}
