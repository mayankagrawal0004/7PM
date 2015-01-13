$( document ).ready(function() {
  // Handler for .ready() called.
	 $('#signUp').click(function(){
		 if($('#confpassword').val() == $('#password').val()) {
			 registerUser();
		 } else {
			 
			 alert("Passwords doesnt match please try again");
		 }
	});
});

function registerUser()
{
	var latitude = 0;
	var longitude = 0;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Failed to read the coordinates of the location");
	}

	function showPosition(position) {
	   latitude = position.coords.latitude;
	   longitude = position.coords.longitude;
	   
	   $.ajax({
			  type: "POST",
			  contentType: 'application/json',
			  url: 'http://localhost:8080/M2-S1-GB/manageUser/action/signup/'+$('#username').val()+'&&'+$('#password').val() + '&&' + latitude + '&&'+longitude,
			  success: function(data, textStatus, xhr) {
				  
			    if(data=="User Name Already Exist, Please try another User Name!"){
			    	alert(data);
			    }
			    else if(data=="New user is successfully created in our system !!")
			    	{
			    	alert(data);
			    	window.location.href = "7pm.html";
			    	}
			    else
			    	{
			    	document.writeln("Problem setting up the user please try later." );
			    	}
			  
			  }
			});
	}
}