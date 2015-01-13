package com.it353.m2;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("action/")
public class UserPortalResource
{	
	@GET
	@Path("signin/{uname}&&{pwd}")
	@Produces("application/json ; charset=UTF-8")
	public SignUpForm sign(@PathParam("uname") String username, @PathParam("pwd") String password){
		SignIn sinobj = new SignIn();
		System.out.println("calling SignIN now for user: "+username);
		return sinobj.getValidUser(username,password);
	}
		
	@POST
	@Path("signup/{uname}&&{pwd}&&{lat}&&{long}")
	@Consumes("application/json")
	public String signUpUser(@PathParam("uname") String username,
			@PathParam("pwd") String password,
			@PathParam("lat") String latitude,
			@PathParam("long") String longitude){
		System.out.println("calling Sign UP now for user: "+username);
		SignUp sp = new SignUp();
		if(sp.createUser(username, password, latitude, longitude)){
			return "New user is successfully created in our system !!";
		}
		else{
			return "User Name Already Exist, Please try another User Name!";
		}
	}
	
	@PUT
	@Path("update")
	@Consumes("application/json")
	public String updateUser(UpdatePassword data){
		System.out.println("calling update now for user: "+data.getUsername());
		UpdatePasswordDB updatedb = new UpdatePasswordDB();
		if(updatedb.UpdatePassword(data)){
			return "New Password is updated in  our system !! ";
		}
		else{
			return "Error in updating your New Password to database";
		}
	}
	
	@DELETE
	@Path("delete")
	@Consumes("application/json")
	public boolean deleteUser(Usercredential req){
		System.out.println("calling Delete now for user: "+req.getUsername());
		Delete del = new Delete();
		return del.deleteUser(req);
	}
	
	}
