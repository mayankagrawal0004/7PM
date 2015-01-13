package com.it353.m2;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class Delete {

	public boolean deleteUser(Usercredential user){
		boolean isValid =false;
		int val = 0;
		CreateConneaction crcc = new CreateConneaction();
		Connection DBconnection = crcc.getDBConnection();
	
		Statement deleteStatement;
			try {
				deleteStatement = DBconnection.createStatement();
				val = deleteStatement.executeUpdate("DELETE from students where userID='"+user.getUsername()+"' and password='"+user.getPassword()+"'");
				deleteStatement.close();
				DBconnection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			 if(val==1){
				 isValid= true;
			 }
			return isValid;
	}
}
