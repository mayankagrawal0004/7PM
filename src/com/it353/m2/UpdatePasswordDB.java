package com.it353.m2;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class UpdatePasswordDB {

	public boolean UpdatePassword(UpdatePassword newPassword){
		
		
		boolean isValid =false;
		int val = 0;
			
			try {
				
				CreateConneaction crcc = new CreateConneaction();
				Connection DBconnection = crcc.getDBConnection();
			
				Statement stat = DBconnection.createStatement();
		
				val = stat.executeUpdate("UPDATE students SET password='"+newPassword.getNewPassword() +"' where userID='"+newPassword.getUsername() +"' and password ='"+newPassword.getPassword() +"'");
		
				stat.close();
				DBconnection.close();
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 if(val==1){
				 isValid= true;
			 }
			 
			return isValid;
		}
		
	
	
	
}
