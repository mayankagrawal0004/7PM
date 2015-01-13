package com.it353.m2;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class CreateConneaction {

	public static final String DATABASE_URL = "jdbc:mysql://localhost:3306/m2db"; // database folder
	
	public Connection getDBConnection(){
		
		System.out.println("Initializing the database...");

		Connection databaseConnection = null;
		try
		{
			Class.forName("com.mysql.jdbc.Driver");
			

			databaseConnection = DriverManager.getConnection(DATABASE_URL, "root", "");
		}
		catch(Exception ex){
			ex.printStackTrace();
			System.out.println(ex.getCause());
		}
		
		return databaseConnection;
	}
	
}
