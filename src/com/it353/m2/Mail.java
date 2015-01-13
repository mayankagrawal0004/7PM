package com.it353.m2;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
 

/**
 * Servlet implementation class Mail
 */
@WebServlet("/Mail")
public class Mail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Mail() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		final String username = "8pmcom@gmail.com";
		final String password = "eightpmcom";
 
		String name = request.getParameter("name");
		String requestEmail = request.getParameter("email");
		String requestMessage = request.getParameter("message");
		
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");
 
		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });
 
		try {
 
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("8pmcom@gmail.com"));
			message.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse(requestEmail));
			message.setSubject("Testing Subject");
			message.setText("Dear " +name
				+ ",\n\nThank you for contacting 7 pm!"
				+ "\n\nYour message will be shortly responded for your following request:"
				+ "\n\n'"+requestMessage+"'");
 
			Transport.send(message);
 
			System.out.println("Mail Sent");
 
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
		response.sendRedirect("http://localhost:8080/M2-S1-GB/7pm.html");
	}

}
