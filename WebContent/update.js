$( document ).ready(function() {
    $('#SignUp').click(function(){
        testService();     
    });
});

function testService()
                {
  $.ajax({
  type: "PUT",
  contentType: 'application/json',
  url: 'http://localhost:8080/M2-S1-GB/manageUser/action/update',
  data: JSON.stringify({"updatePassword": {
	    "username": $('#username').val(),
      "password": $('#password').val(),
      "newPassword": $('#newpassword').val()  
  }}),
  success: function(msg) {
	  if(msg=="New Password is updated in  our system !! "){
	    	alert(msg);
	    	window.location.href = "7pm.html";
	    }
	    else if(msg=="Error in updating your New Password to database")
	    	{
	    	alert(msg);
	    	}
	    else
	    	{
	    	alert("Problem setting up the user please try later." );
	    	}
  }
});
                }







