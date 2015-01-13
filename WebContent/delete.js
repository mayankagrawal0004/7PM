$( document ).ready(function() {
    $('#SignUp').click(function(){
    	var r=confirm("Do you really want to Delete account!");
    	if (r==true)
    	  {
        	testService();
    	  }
    });
});
function testService(){
  $.ajax({
  type: "DELETE",
  contentType: 'application/json',
  url: 'http://localhost:8080/M2-S1-GB/manageUser/action/delete',
  data: JSON.stringify({"usercredential": {
	    "username": $('#username').val(),
      "password": $('#password').val(), 
  }}),
  success: function(msg) {
	    // Do magic here
	    if(msg = true){
	   alert("" +  $('#username').val() +" account deleted !!");
	   window.location.href = "7pm.html";
	    }
	    else
	    	{
	    alert("Error in system Please try Again " );
	    	}
	  }
});
}




