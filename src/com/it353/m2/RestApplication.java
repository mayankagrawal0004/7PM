package com.it353.m2;
import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/webservice/")
public class RestApplication extends Application {
	private final Set<Class<?>> classes;

	public RestApplication()
	{
		classes = new HashSet<>();
		classes.add(student.class);
	}

}