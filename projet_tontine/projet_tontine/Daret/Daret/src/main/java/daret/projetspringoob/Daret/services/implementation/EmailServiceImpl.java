
package daret.projetspringoob.Daret.services.implementation;

// Java Program to Illustrate Creation Of
// Service implementation class


import daret.projetspringoob.Daret.entities.EmailDetails;
import daret.projetspringoob.Daret.repositories.ParticipationRepo;
import daret.projetspringoob.Daret.repositories.TontineRepo;
import daret.projetspringoob.Daret.repositories.UtilisateurRepo;
import daret.projetspringoob.Daret.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Date;
@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    private final ParticipationRepo participationRepo;
    private final TontineRepo tontineRepo;
    private final UtilisateurRepo utilisateurRepo;

    @Value("${spring.mail.username}")
    private String sender;

    @Autowired
    public EmailServiceImpl(
            JavaMailSender javaMailSender,
            ParticipationRepo participationRepo,
             TontineRepo tontineRepo,
            UtilisateurRepo utilisateurRepo
    ) {
        this.javaMailSender = javaMailSender;
        this.participationRepo = participationRepo;
        this.tontineRepo = tontineRepo;
        this.utilisateurRepo = utilisateurRepo;
    }

    // Method 1
    // To send a simple email
    public String sendSimpleMail() {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo("oumaimanicha02@gmail.com");
            mailMessage.setText("hello");
            mailMessage.setSubject("hello");

            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            return "Error while Sending Mail";
        }
    }
  /*  @Override
    public String sendMailDemandeAccepted(Long idParticipation, String nomRespo, String prenomRespo, String nomParticipant, String prenomParticipant,String emailParticipant, Date dateParticipation, String tontine, Double montant){

            try {
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setFrom(sender);
                mailMessage.setTo(emailParticipant);
                mailMessage.setText("Dear "
                        +nomParticipant+" "+prenomParticipant+","+
                        "\n" +
                        "\n We are pleased to inform you that your application to join our Tontine has been accepted. Welcome to our community!\n" +
                        "\n" +
                        "Your participation is a valuable addition, and we look forward to the contributions you will make to our Tontine. Please find the details of your acceptance below:" +
                        "\n\n" +
                        "* Tontine Name: "+tontine+
                        "\n" +
                        "* Responsible : "+nomRespo+" "+prenomRespo+
                        "\n" +
                        "* Contribution Amount: "+montant+
                        "\n" +
                        "* Inscription Date: "+dateParticipation
                );
                mailMessage.setSubject(" Confirmation of Tontine Membership");

                javaMailSender.send(mailMessage);
                return "Mail Sent Successfully...";
            } catch (Exception e) {
                return "Error while Sending Mail";
            }
        }
*/

    @Override
    public String sendMailRefusCoparticipation(EmailDetails details, Long id) {
        return null;
    }

    @Override
    public String sendMailWithAttachment(EmailDetails details) {
        return null;
    }

    @Override
    public String sendMailDemandeAccepted(Long idParticipation, String nomRespo, String prenomRespo, String nomParticipant, String prenomParticipant, String emailParticipant, Date dateParticipation, String tontine, Double montant) {

        // Creating a mime message
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(emailParticipant);
            mimeMessageHelper.setText("Dear " + nomParticipant + " " + prenomParticipant + "," +
                    "\n" +
                    "\n We are pleased to inform you that your application to join our Tontine has been accepted. Welcome to our community!\n" +
                    "\n" +
                    "Your participation is a valuable addition, and we look forward to the contributions you will make to our Tontine. Please find the details of your acceptance below:" +
                    "\n\n" +
                    "* Tontine Name: " + tontine +
                    "\n" +
                    "* Participation number: " + idParticipation +
                    "\n" +
                    "* Responsible : " + nomRespo + " " + prenomRespo+
                    "\n" +
                    "* Contribution Amount: "+montant+
                    "\n" +
                    "* Inscription Date: "+dateParticipation
            );
            mimeMessageHelper.setSubject("Confirmation of Tontine Membership");

            // Adding the fixed attachment
            FileSystemResource file = new FileSystemResource(new File("C:\\Users\\nouhaila\\projet_tontine\\Daret\\Daret\\img\\Accepted.jpg"));

            mimeMessageHelper.addAttachment(file.getFilename(), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";

        } catch (MessagingException e) {
            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }

    @Override
    public String sendMailDemandeRejected(String nomRespo, String prenomRespo, String tel, String emailRespo, String emailParticipant, String nomParticipant, String prenomParticipant, String tontine) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(emailParticipant);
            mimeMessageHelper.setText("Dear " + nomParticipant + " " + prenomParticipant + "," +
                    "\n" +
                    "\n I trust this email finds you well.\n" +
                    "\n" +
                    "Thank you for your interest in joining our tontine <<"+tontine+">>. After careful consideration, we regret to inform you that your membership request has been declined."+
                    "\n"+
                    "We appreciate your understanding and encourage you to explore other opportunities with us in the future.\nBest regards,"+
                    "\n\n" +
                     nomRespo + " " + prenomRespo+
                    "\n"+tel+
                    "\n"+emailRespo

            );
            mimeMessageHelper.setSubject("Confirmation of Tontine Membership");

             FileSystemResource file = new FileSystemResource(new File("C:\\Users\\nouhaila\\projet_tontine\\Daret\\Daret\\img\\Rejected.jpg"));

            mimeMessageHelper.addAttachment(file.getFilename(), file);

             javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";

        } catch (MessagingException e) {
            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }
    @Override
    public String sendMailDemandCoparticipation() {

        // Creating a mime message
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo("oumaimanicha02@gmail.com");
            mimeMessageHelper.setText("Dear " + "nomParticipant" + " " + "prenomParticipant" + "," +
                    "\n" +
                    "\n "+
                    "Hope you're well. I'm applying for a Tontine and thought it would be great if we co-participate. It'll halve the financial commitment, and any gains will be split equally.\n" +
                    "\n" +
                    "Details:" +
                    "\n\n" +
                    "* Tontine Name: " + "tontine" +
                    "\n" +
                    "* Participation number: " + "idParticipation" +
                    "\n" +
                    "* Responsible : " + "nomRespo" + " " + "prenomRespo"+
                    "\n" +
                    "* Contribution Amount: "+"montant"+
                    "\n" +
                    "* Inscription Date: "+"dateParticipation"
            );
            mimeMessageHelper.setSubject("Co-Participation Opportunity in Tontine");

            // Adding the fixed attachment
            FileSystemResource file = new FileSystemResource(new File("C:\\Users\\nouhaila\\projet_tontine\\Daret\\Daret\\img\\coparticipation.png"));

            mimeMessageHelper.addAttachment(file.getFilename(), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";

        } catch (MessagingException e) {
            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }


}









