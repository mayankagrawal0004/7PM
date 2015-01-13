package com.it353.m2;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SignIn {

	public SignUpForm getValidUser(String user, String pwd) {

		SignUpForm sf = new SignUpForm();
		try {

			CreateConneaction crcc = new CreateConneaction();
			Connection DBconnection = crcc.getDBConnection();

			Statement stat = DBconnection.createStatement();
			ResultSet rs;
			rs = stat.executeQuery("select * from Students where userid='"
					+ user + "' and password ='" + pwd + "'");

			if (rs.next()) {
				sf.setUsername(rs.getString("userID"));
				sf.setPassword(rs.getString("password"));
				sf.setLan(rs.getFloat("lat"));
				sf.setLon(rs.getFloat("lon"));
			}
			stat.close();
			DBconnection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return sf;
	}

}
