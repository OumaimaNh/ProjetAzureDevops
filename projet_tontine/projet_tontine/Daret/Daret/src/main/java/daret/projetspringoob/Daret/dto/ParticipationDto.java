package daret.projetspringoob.Daret.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipationDto {

    private Long idParticipation;
    private Double montantParticipant;
    private String chequeParticipation;
    private String nomBanque;
    private String rib;
    private Date dateParticipation;
    private String statutParticipation;
    private String statutPaiement;
    private Date DatePaiement;
    private Date DatePaiementEffectue;
    private UtilisateurDto participant;
    private UtilisateurDto Coparticipant;
    private TontineDto tontine;
    private Date DateReceptionSoldeTontine;
}
