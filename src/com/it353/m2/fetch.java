package com.it353.m2;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.DELETE;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

@Path("user/")
public class fetch {
	
	
	//class for getting info on a user, this will need to be edited to take in form data
	@POST
	@Path("getUser")
	@Consumes("application/json")
	public Response createEntry(student newStudent)
	{
		newStudent = helper.getStudent("atjulia@ilstu.edu");
		ResponseBuilder rb = null;
		if(newStudent != null)
		{
			rb = Response.status(Status.CREATED);
			rb.entity(newStudent);
		}
		else
		{
			rb = Response.status(Status.NO_CONTENT);
			
		}
		Response response = rb.build();
		return response;
	}
	
	//will manage deleting a student out of the DB
	@DELETE
	@Path("deleteUser")
	@Consumes("application/json")
	public Response deleteEntry(student deleteStudent){
		
		//code goes here to delete student from db
		ResponseBuilder rb = null;
		Response response = rb.build();
		return response;
	}
	
	//will manage adding a student to the db
	@PUT
	@Path("addUser")
	@Consumes("application/json")
	public Response addEntry(student addStudent){
		
		//code goes here to add entry to the DB
		ResponseBuilder rb = null;
		Response response = rb.build();
		return response;
	}
	
	//will manage updating a student
	@POST
	@Path("updateUser")
	@Consumes("application/json")
	public Response updateEntry(student updateStudent){
		
		//code goes here to add entry to the DB
		ResponseBuilder rb = null;
		Response response = rb.build();
		return response;
	}

}
