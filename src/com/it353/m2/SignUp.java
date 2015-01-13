package com.it353.m2;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class SignUp {

	public boolean createUser(String username, String password, String latitude, String longitude) {
		boolean isValid = false;
		int val = 0;

		try {
			CreateConneaction crcc = new CreateConneaction();
			Connection DBconnection = crcc.getDBConnection();
			Statement stat = DBconnection.createStatement();
			val = stat.executeUpdate("insert into Students values('" + username+ "','" + password + "'," + latitude + "," + longitude+ ")");
			stat.close();
			DBconnection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (val == 1) {
			isValid = true;
		}
		return isValid;
	}
}
