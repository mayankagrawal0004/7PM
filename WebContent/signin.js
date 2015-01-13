$( document ).ready(function() {
  // Handler for .ready() called.
	 $('#SignUp').click(function(){
	    testService();
	});
});


function testService()
{
  $.ajax({
  type: "GET",
  contentType: 'application/json',
  url: 'http://localhost:8080/M2-S1-GB/manageUser/action/signin/'+$('#username').val()+'&&'+$('#password').val(),
  success: function(data, textStatus, xhr) {
	    if(data){
	    	if (navigator.geolocation) {
	    		navigator.geolocation.getCurrentPosition(function(currentPosition) {
	    			if (data.signUpForm.username != null && data.signUpForm.username != "") {
	    				document.cookie="USERNAME=" + data.signUpForm.username;
		    			document.cookie="PWD=" + data.signUpForm.password;
		    			document.cookie="LATITUDE=" + data.signUpForm.lan;
		    			document.cookie="LONGITUDE=" + data.signUpForm.lon;
		    			alert("User " + data.signUpForm.username+ " login sucessfull page will be redirected to the restaurents search.");
		    			window.location.href = "7pm.html";
	    			} else {
	    				alert("Invalid user name and password please try again.");
	    			}
	    		});
	    	} 
	    }
	    else
	    	{
	    	document.writeln("Problem setting up the user please try later. " );
	    }
	  },
  error: function(data, textStatus, xhr) {
	    if(data){
	    	var user = JSON.parse(data);
	    	document.writeln(user.username);
	    	document.writeln(user.password);
	    	document.writeln(user.lan);
	    	document.writeln(user.lon);
	    }
	    else
	    	{
	    	document.writeln("Problem setting up the user please try later. " );
	    }
	  }
});
}


