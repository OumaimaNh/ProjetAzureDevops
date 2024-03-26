package daret.projetspringoob.Daret.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TourDto {
    private Long id_tour;
    private int nbTour;
    private int nbTourActuel;
    private String StatusTour;
    private ParticipationDto participantDto;
    private TontineDto tontineDto;
}
