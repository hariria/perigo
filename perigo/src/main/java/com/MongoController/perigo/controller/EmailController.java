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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.MongoController.perigo.models.BiddingComplete;
import com.MongoController.perigo.models.MessageSent;
import com.MongoController.perigo.models.User;
import com.MongoController.perigo.repositories.UserRepository;

@RestController
public class EmailController {

	@Autowired
	private UserRepository repository;
	
	
	@RequestMapping(value="/biddingcomplete", method=RequestMethod.GET)
	public void sendBiddingCompleteMsg(@Valid @RequestBody BiddingComplete msg) throws AddressException, MessagingException {
		sendEmailtoHighestBidder(msg.highestBidderEmail, msg.itemName);
		sendEmailtoSeller(msg.sellerEmail, msg.highestBidderEmail, msg.itemName);
	}
		
	@RequestMapping(value="/sendmessage", method=RequestMethod.POST)
	public String senditemMessagetouser(@Valid @RequestBody MessageSent msg_sent) throws AddressException, MessagingException, IOException {
		send_user_item(msg_sent);
		
		return "Email sent successfully";
	}   
	
	@RequestMapping(value="/forgotpassword", method=RequestMethod.POST)
	public void forgotpassword(@Valid @RequestBody String email) throws AddressException, MessagingException, IOException {
		User user = repository.findByEmail(email);
		
		if (user == null) return;
		
		MessageSent forgot = new MessageSent();
		
		forgot.setContent("Reset password link: http://localhost:9000/forgot_password/password.html");
		forgot.setReceiver(email);
		forgot.setSubject("Forgot Password");
		forgot.setSellerName(user.getFirstName() + " " + user.getLastName());
		
		send_forgot_password(forgot, user._id.toHexString());
	}
	
	private void send_forgot_password(MessageSent msg_sent, String userId) throws AddressException, MessagingException, IOException {
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
		   msg.setSubject(msg_sent.getSubject());
		   msg.setContent(msg_sent.getSubject(), "text/html");
		   msg.setSentDate(new Date());

		   MimeBodyPart messageBodyPart = new MimeBodyPart();
		   
		   String content = "Hello " + msg_sent.getSellerName() +  ", <br>"
				   + "It looks like you requested to change your password. Please use this link to reset your password <br>"
				   + "User ID: " + userId + "<br>" 
				   + msg_sent.getContent() + "<br>";
		   System.out.println(content);
		   
		   messageBodyPart.setContent(content, "text/html");

		   Multipart multipart = new MimeMultipart();
		   multipart.addBodyPart(messageBodyPart);

		   msg.setContent(multipart);
		   Transport.send(msg); 
	}
	
	private void send_user_item(MessageSent msg_sent) throws AddressException, MessagingException, IOException {
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
	
	private void sendEmailtoSeller(String sellerEmail, String highestBidderEmail, String itemName) throws AddressException, MessagingException {
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

		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(sellerEmail));
		   System.out.println(sellerEmail);
		   
		   String content = "";
		   MimeBodyPart messageBodyPart = new MimeBodyPart();

		   if (highestBidderEmail != null) {
			   msg.setSubject("Item Sold!");
			   msg.setContent("Item Sold!", "text/html");
			   msg.setSentDate(new Date());
			   
			   content = "Congratulations! <br>"
					   + "The following item you was sold: " + itemName + "<br>"
					   + "Please reach out to " + highestBidderEmail + " to arrange pickup. <br>";
		   }
		   else {
			   msg.setSubject("Item Not Sold");
			   msg.setContent("Item Not Sold", "text/html");
			   msg.setSentDate(new Date());

			   
			   content = "The following item was not sold: " + itemName + "<br>"
					   + "If you are still interested in selling the item, please relist it on Perigo. <br>";
			   
		   }

		   System.out.println(content);
		   
		   messageBodyPart.setContent(content, "text/html");

		   Multipart multipart = new MimeMultipart();
		   multipart.addBodyPart(messageBodyPart);

		   msg.setContent(multipart);
		   Transport.send(msg); 
	}
	
	private void sendEmailtoHighestBidder(String highestBidderEmail, String itemName) throws AddressException, MessagingException {
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

		   msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(highestBidderEmail));
		   System.out.println(highestBidderEmail);
		   msg.setSubject("You Won!");
		   msg.setContent("You Won!", "text/html");
		   msg.setSentDate(new Date());

		   MimeBodyPart messageBodyPart = new MimeBodyPart();
		   
		   String content = "Congratulations! <br>"
				   + "You won the following item: " + itemName + "<br>"
				   + "The seller will reach out to you with more information <br>";
		   System.out.println(content);
		   
		   messageBodyPart.setContent(content, "text/html");

		   Multipart multipart = new MimeMultipart();
		   multipart.addBodyPart(messageBodyPart);

		   msg.setContent(multipart);
		   Transport.send(msg); 
	}
}
