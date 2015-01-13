package com.it353.m2;
import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

public class helper {
	
	public static final String DATABASE_URL = "jdbc:derby:C:/Javawork/DB/M2/;create=true";
	
	 private helper() {
	        throw new AssertionError();
	    }
	 
	 public static student getStudent(String email)
	 {
		 student currentStudent = new student();
		 try
			{
			 	Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
				Connection databaseConnection = null;
			 	String databaseDirectoryPath = "C:\\Javawork\\DB\\M2";
				File databaseDirectory = verifyDatabaseDirectory(databaseDirectoryPath);
				databaseDirectoryPath = databaseDirectory.getCanonicalPath();
				System.setProperty("derby.system.home", databaseDirectoryPath);
				Properties databaseProperties = new Properties();
				databaseProperties.put("create", "true");
				databaseConnection = DriverManager.getConnection(DATABASE_URL, databaseProperties);
				Statement queryStatement = databaseConnection.createStatement();
				ResultSet resultSet = null;
				String querySQL = "SELECT * FROM Students WHERE USERID = 'atjulia'";
				resultSet = queryStatement.executeQuery(querySQL);
				while(resultSet.next())
				{
					currentStudent.setStudentName(resultSet.getString("PASSWORD"));
					double test2 = resultSet.getDouble("LAT");
					String test = String.valueOf(test2);
					currentStudent.setStudentZip(test);
					
				}
			}
			catch(Exception ex)
			{
				ex.printStackTrace();
				System.out.println("The database did not initalize correctly");
			}
		 return currentStudent;
	 }
	 private static File verifyDatabaseDirectory(String databaseDirectoryPath) throws Exception
		{
			if(databaseDirectoryPath != null && (databaseDirectoryPath = databaseDirectoryPath.trim()).length() > 0)
			{
				File databaseDirectory = new File(databaseDirectoryPath);
				if(databaseDirectory.exists())
				{
					if(databaseDirectory.isDirectory())
					{
						return databaseDirectory;
					}
					else
					{
						throw new Exception("The database directory path is not a valid directory path.");
					}
				}
				else
				{
					throw new Exception("The database directory does not exist.");
				}
			}
			else
			{
				throw new Exception("The database directory path is invalid.");
			}
		}
	 private static boolean tableExists(String tableName, Connection databaseConnection) throws Exception
		{
			boolean tableExists = false;
			PreparedStatement tableExistsStatement = null;
			ResultSet resultSet = null;
			try
			{
				String tableExistsSQL = "SELECT COUNT(TABLENAME) AS TABLE_EXISTS FROM SYS.SYSTABLES WHERE TABLENAME = '" + tableName + "'";
				tableExistsStatement = databaseConnection.prepareStatement(tableExistsSQL);
				resultSet = tableExistsStatement.executeQuery();
				if(resultSet != null && resultSet.next())
				{
					int result = resultSet.getInt("TABLE_EXISTS");

					if(result > 0)
					{
						tableExists = true;
					}
				}
			}
			finally
			{
				if(resultSet != null)
				{
					resultSet.close();
				}

				if(tableExistsStatement != null)
				{
					tableExistsStatement.close();
				}
			}
			return tableExists;
		}

}
