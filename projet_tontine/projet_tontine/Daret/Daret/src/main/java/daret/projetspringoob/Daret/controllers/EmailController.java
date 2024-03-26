package daret.projetspringoob.Daret.controllers;


// Importing required classes
import daret.projetspringoob.Daret.entities.EmailDetails;
import daret.projetspringoob.Daret.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:8085")
@RequestMapping("Email/")
public class EmailController {

    @Autowired private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public String
    sendMail(@RequestBody EmailDetails details)
    {
        String status
                = emailService.sendSimpleMail();

        return status;
    }
    @GetMapping("/send-coparticipation-email")
    public String sendCoparticipationEmail() {
        return emailService.sendMailDemandCoparticipation();
    }
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody EmailDetails details)
    {
        String status
                = emailService.sendMailWithAttachment(details);

        return status;
    }
}