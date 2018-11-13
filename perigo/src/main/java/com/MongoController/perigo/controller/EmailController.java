package com.MongoController.perigo.controller;

import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.MongoController.perigo.models.MessageSent;

@RestController
public class EmailController {

	@RequestMapping(value="/sendmessage", method=RequestMethod.POST)
	public String sendEmailToUser(@Valid @RequestBody MessageSent msg_sent) throws AddressException, MessagingException, IOException {
		sendmail(msg_sent);
		
		return "Email sent successfully";
	}   
	
	
	private void sendmail(MessageSent msg_sent) throws AddressException, MessagingException, IOException {
		   Properties props = new Properties();
		   props.put("mail.smtp.auth", "true");
		   props.put("mail.smtp.starttls.enable", "true");
		   props.put("mail.smtp.host", "smtp.gmail.com");
		   props.put("mail.smtp.port", "587");
		   
		   Session session = Session.getInstance(props, new javax.mail.Authenticator() {
		      protected PasswordAuthentication getPasswordAuthentication() {
		         return new PasswordAuthentication("perigo.donotreply@gmail.com", "letsgetthisbread");
		      }
		   });
		   Message msg = new MimeMessage(session);
		   msg.setFrom(new InternetAddress("perigo.donotreply@gmail.com", false));

		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(msg_sent.getReceiver()));
		   System.out.println(msg_sent.getReceiver());
		   msg.setSubject("Item Message");
		   msg.setContent("Item Message", "text/html");
		   msg.setSentDate(new Date());

		   MimeBodyPart messageBodyPart = new MimeBodyPart();
		   
		   String content = "Hello " + msg_sent.getSellerName() +  ", <br>"
				   + "You received a message from " + msg_sent.getSender() + ". <br>"
				   + "Subject: " + msg_sent.getSubject() + "<br>"
				   + "Content: " + msg_sent.getContent() + "<br>";
		   System.out.println(content);
		   
		   messageBodyPart.setContent(content, "text/html");

		   Multipart multipart = new MimeMultipart();
		   multipart.addBodyPart(messageBodyPart);

		   msg.setContent(multipart);
		   Transport.send(msg);   
		}
}
