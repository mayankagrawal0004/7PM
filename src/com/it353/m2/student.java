package com.it353.m2;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class student {
	
		private String studentName;
		private String studentZip;
		
		@XmlElement
		public String getStudentName()
		{
			return studentName;
		}
		@XmlElement
		public String getStudentZip()
		{
			return studentZip;
		}

		public void setStudentName(String name)
		{
			this.studentName = name;
		}
		public void setStudentZip(String zip)
		{
			this.studentZip = zip;
		}


}
