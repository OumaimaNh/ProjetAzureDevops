package daret.projetspringoob.Daret.services;


import daret.projetspringoob.Daret.entities.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Date;

public interface EmailService {
    String sendSimpleMail();

    String sendMailDemandeAccepted(Long idParticipation, String nomRespo, String prenomRespo,String emailParticipant, String nomParticipant, String prenomParticipant, Date dateParticipation, String tontine, Double montant);

    String sendMailRefusCoparticipation(EmailDetails details, Long id);

    String sendMailWithAttachment(EmailDetails details);

    String sendMailDemandeRejected(String nomRespo, String prenomRespo, String tel, String emailRespo, String emailParticipant, String nomParticipant, String prenomParticipant, String tontine);

    String sendMailDemandCoparticipation();
}
