$(document).ready(function(){
	  $("#logoutbtn").click(function(){ 
		  var user = readCookie("USERNAME");  
		  var password = readCookie("PWD");
		  if(user!=null && password != null){
		  var delete_cookie = function(name) {
			    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			};
			delete_cookie('LATITUDE');
			delete_cookie('LONGITUDE');
			delete_cookie('USERNAME');
			delete_cookie('PWD');

			alert(user+" successfully Logged out!!!");
			location.reload();
		  }
		  else{
			  alert("You are currently a Guest User and have not signed in!!!");
		  }	  
	  });
	  
	  if(readCookie("USERNAME")!=null){
		  user = readCookie("USERNAME");
		  $("#signintab").remove();
		  $("#username").append("Welcome "+user);
	  }
	});


var zip = 61761;
var mapCanvas;
var infoWindows = [];
var weatherUtility = {
	"map":  null,

	"geocoder":  null,

	"weatherLocations":  [],

	"initializeMap":  function() {
		mapCanvas = document.querySelector("#mapCanvas");

		var mapOptions = {
			"mapTypeId":  google.maps.MapTypeId.ROADMAP,
			"zoom":  11
		};

		weatherUtility.map = new google.maps.Map(mapCanvas, mapOptions);
		
		if(navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(currentPosition) {
				// The current location was successfully identified.
				if (readCookie("LATITUDE") != null && readCookie("LONGITUDE") != null && getParameterByName('address') == "") {
					lat = readCookie("LATITUDE"); 
					lng = readCookie("LONGITUDE");
				} else {
					lat = currentPosition.coords.latitude;
					lng = currentPosition.coords.longitude;
				}
				
				var weatherLocation = weatherUtility.setMapPosition(lat, lng, true);
				weatherLocations[weatherLocations.length] = weatherLocation;

				weatherUtility.displayWeatherLocation(weatherLocation);
			}, function(error) {
				// The navigator failed to return the current position.
				var weatherLocation = weatherUtility.setDefaultMapPosition();
				weatherLocations[weatherLocations.length] = weatherLocation;

				weatherUtility.displayWeatherLocation(weatherLocation);
			});
		}
		else {
			// The browser does not support geolocation.
			var weatherLocation = weatherUtility.setDefaultMapPosition();
			weatherLocations[weatherLocations.length] = weatherLocation;

			weatherUtility.displayWeatherLocation(weatherLocation);
		}

		weatherUtility.geocoder = new google.maps.Geocoder();
		
		var latlng = callApi(process, weatherUtility);
		//weatherUtility.setMapPosition(42.4188941, -88.9892448, true);
	},

	"setDefaultMapPosition":  function() {
		// Illinois State University
		return weatherUtility.setMapPosition(40.511579, -88.993314, true);
	},

	"setMapPosition":  function(latitude, longitude, pan) {
		var weatherLocation = {
			"position":  null,
			"marker":  null,
			"markerInformationWindow":  null,
			"description":  null
		};

		weatherLocation.position = new google.maps.LatLng(latitude, longitude);

		var markerOptions = {
			"map":  weatherUtility.map,
			"position":  weatherLocation.position
		};

		weatherLocation.marker = new google.maps.Marker(markerOptions);
		weatherLocation.description = "[ " + latitude + ", " + longitude + " ]";

		weatherLocation.markerInformationWindow = new google.maps.InfoWindow();

		var markerInformation = "<span class=\"markerInformation\">[ " + latitude + ", " + longitude + " ]</span>";
		weatherLocation.markerInformationWindow.setContent(markerInformation);

		google.maps.event.addListener(weatherLocation.marker, "click", function() {
			weatherLocation.markerInformationWindow.open(weatherUtility.map, weatherLocation.marker);
		});

		if(pan) {
			weatherUtility.map.panTo(weatherLocation.position);
		}

		// Update the weather location marker when the reverse geocoder call returns.
		$(weatherLocation).bind("weatherLocationUpdated", function() {
			var markerInformation = "<div class=\"markerInformation\">" + weatherLocation.description + "</div>";
			weatherLocation.markerInformationWindow.setContent(markerInformation);
		});

		return weatherLocation;
	},

	"displayWeatherLocation":  function(weatherLocation) {

		var weatherLocationContainerTemplate = $("#weatherLocationContainerTemplate > div");
		var weatherLocationContainer = weatherLocationContainerTemplate.clone();

		var weatherLocationHeading = $(".weatherLocationHeading", weatherLocationContainer);
		weatherLocationHeading.html(weatherLocation.description);

		$(".closeIcon", weatherLocationContainer).click(function() {
			weatherLocationContainer.remove();

			weatherLocation.marker.setMap(null);
		});

		$("#weatherLocations").append(weatherLocationContainer);

		// Update the weather location heading when the reverse geocoder call returns.
		$(weatherLocation).bind("weatherLocationUpdated", function() {
			weatherLocationHeading.text(weatherLocation.description);
		});

		// Invoke the reverse geocoder.
		weatherUtility.reverseGeocode(weatherLocation);

		var latitude = weatherLocation.position.lat();
		var longitude = weatherLocation.position.lng();

		var forecastAPIKey = "d90cef13c02ee8d61cf99d677c1d988e";
		var forecastURL = "https://api.forecast.io/forecast/" + forecastAPIKey + "/" + latitude + "," + longitude;

		var forecastOptions = {
			"cache":  false,
			// Use JSONP to work around cross-site scripting limitations.
			"dataType":  "jsonp",
			"url":  forecastURL
		};

		var forecastRequest = $.ajax(forecastOptions);

		forecastRequest.done(function(forecastData) {
			var weatherIcon = $(".weatherIcon", weatherLocationContainer);
			weatherIcon.removeClass("loadingIcon");

			if(forecastData) {
				// Set the weather time.
				var weatherTime = new Date(0);
				weatherTime.setUTCSeconds(forecastData.currently.time);

				var weatherTimeString = weatherTime.toUTCString();
				$(".weatherTime", weatherLocationContainer).html(weatherTimeString);

				var formattedTimezone = forecastData.timezone.replace(/_/g, " ");
				$(".weatherTimezone", weatherLocationContainer).html(formattedTimezone);

				// Set the weather icon.
				var today = forecastData.daily.data[0];
				var weatherIconClass = weatherUtility.determineWeatherIconClass(forecastData.currently.icon, forecastData.currently.time, today.sunriseTime, today.sunsetTime);
				weatherIcon.addClass(weatherIconClass);

				// Set the temperature.
				var temperatureString = forecastData.currently.temperature + " &deg;F";
				$(".temperature", weatherLocationContainer).html(temperatureString);

				// Set the summary.
				$(".weatherSummary", weatherLocationContainer).html(forecastData.currently.summary);
			}
			else {
				weatherIcon.addClass("unknownIcon");
			}
		});
	},

	"determineWeatherIconClass":  function(weatherTypeHint, currentTime, sunriseTime, sunsetTime) {
		var weatherIconClass = "unknownIcon";

		var dayOrNight = null;

		if(currentTime < sunriseTime) {
			dayOrNight = "night";
		}
		else if(currentTime < sunsetTime) {
			dayOrNight = "day";
		}
		else {
			dayOrNight = "night";
		}

		if(dayOrNight === "day") {
			if(weatherTypeHint.indexOf("clear") > -1) {
				weatherIconClass = "clearDayIcon";
			}
			if(weatherTypeHint.indexOf("cloudy") > -1) {
				weatherIconClass = "cloudyDayIcon";
			}
			else if(weatherTypeHint == "fog") {
				weaterhIconClass = "cloudyDayIcon";
			}
			else if(weatherTypeHint == "rain") {
				weatherIconClass = "rainDayIcon";
			}
			else if(weatherTypeHint == "snow") {
				weatherIconClass = "snowDayIcon";
			}
			else if(weatherTypeHint == "sleet") {
				weatherIconClass = "sleetDayIcon";
			}
			else if(weatherTypeHint == "rain") {
				weatherIconClass = "rainDayIcon";
			}
			else if(weatherTypeHint == "wind") {
				weatherIconClass = "cloudyDayIcon";
			}
		}
		else if(dayOrNight === "night") {
			if(weatherTypeHint.indexOf("clear") > -1) {
				weatherIconClass = "clearNightIcon";
			}
			if(weatherTypeHint.indexOf("cloudy") > -1) {
				weatherIconClass = "cloudyNightIcon";
			}
			else if(weatherTypeHint == "fog") {
				weaterhIconClass = "cloudyNightIcon";
			}
			else if(weatherTypeHint == "rain") {
				weatherIconClass = "rainNightIcon";
			}
			else if(weatherTypeHint == "snow") {
				weatherIconClass = "snowNightIcon";
			}
			else if(weatherTypeHint == "sleet") {
				weatherIconClass = "sleetNightIcon";
			}
			else if(weatherTypeHint == "rain") {
				weatherIconClass = "rainNightIcon";
			}
			else if(weatherTypeHint == "wind") {
				weatherIconClass = "cloudyNightIcon";
			}
		}

		return weatherIconClass;
	},

	"reverseGeocode":  function(weatherLocation) {
		var reverseGeocoderArguments = {
			"latLng":  weatherLocation.position
		};

		weatherUtility.geocoder.geocode(reverseGeocoderArguments, function(results, status) {
			if(status == google.maps.GeocoderStatus.OK) {
				var city = null, state = null, country = null;
				var searching = true;

				for(var resultsIndex = 0; searching && resultsIndex < results.length; resultsIndex++) {
					var result = results[resultsIndex];

					if(result.address_components) {
						for(var addressComponentIndex = 0; searching && addressComponentIndex < result.address_components.length; addressComponentIndex++) {

							var addressComponent = result.address_components[addressComponentIndex];

							if(addressComponent.types) {

								for(var addressComponentTypeIndex = 0; searching && addressComponentTypeIndex < addressComponent.types.length; addressComponentTypeIndex++) {

									var addressComponentType = addressComponent.types[addressComponentTypeIndex];

									switch(addressComponentType) {
									case "locality": {
										city = addressComponent.long_name;
										break;
									}
									case "administrative_area_level_1": {
										state = addressComponent.long_name;
										break;
									}
									case "country": {
										country = addressComponent.long_name;
									}
									}

									searching = city === null || state === null || country === null;
								}
							}
						}
					}

					var formattedAddressComponents = [];

					if(city !== null) {
						formattedAddressComponents[formattedAddressComponents.length] = city;
					}

					if(state !== null) {
						formattedAddressComponents[formattedAddressComponents.length] = state;
					}

					if(country !== null) {
						formattedAddressComponents[formattedAddressComponents.length] = country;
					}

					if(formattedAddressComponents.length > 0) {
						var formattedAddress = formattedAddressComponents.join(", ");

						// Trigger an update to the weather location heading when the reverse geocoder call returns.
						weatherLocation.description = formattedAddress;
						$(weatherLocation).trigger("weatherLocationUpdated");
					}
				}
			}
		});
	}
};

function callApi(callback, weatherutility){
	//event.preventDefault();
	var address = getParameterByName('address');
	var google = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&address=";
	if(address != "")
		google += address;
	else
		google += zip;
	var googleLatLong = {
  			"dataType" : "json",
  			"timeout" : 2000,
  			"url" : google
  	};
	var response = $.ajax(googleLatLong);
	var latlng = "";
	response.done(function(responseData, status, jqXHR){
		latlng = callback(responseData, weatherutility);
	});
	return latlng;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function process(responseData, weatherutility, restaurantName){
	if (readCookie("LATITUDE") != null && readCookie("LONGITUDE") != null && getParameterByName('address') == "") {
		lat = readCookie("LATITUDE"); 
		lng = readCookie("LONGITUDE");
	} else {
		lat = responseData.results[0].geometry.location.lat;
		lng = responseData.results[0].geometry.location.lng;
	}

	var weatherLocation = weatherutility.setMapPosition(lat, lng, true);
	weatherutility.displayWeatherLocation(weatherLocation);
	var yelp = "http://api.yelp.com/business_review_search?term=foodREPLACEME&radius=2&num_biz_requested=10&ywsid=JtKGEgBnFid0Fe1xrOGW1w&callback=?";
	var searchTerm = getParameterByName('search');
	if(searchTerm != "")
	{
		var search = (searchTerm).replace("?search=", "");
		yelp = yelp.replace("REPLACEME", "%20" + search);
	}
	else
		yelp = yelp.replace("REPLACEME", "");
	yelp += "&lat=" + lat + "&long=" + lng;
	var yelpResponse = $.getJSON(yelp);
	$("#restList").append("<div id='restaurants'>");
	yelpResponse.done(function(yelpData, status, jqXHR){
		for(var i=0; i< yelpData.businesses.length;i++)
		{
			$("#list").append("<div class='restaurant'><img src='" + yelpData.businesses[i].photo_url + "'><br /><b>Business Name:</b> " + yelpData.businesses[i].name + 
					"<br /><b>Yelp Rating: </b><img src='" + yelpData.businesses[i].rating_img_url + "'>" + 
					"<br /><b>Phone Number: </b>" + sanitizePhone(yelpData.businesses[i].phone) + "</div><br />");
			
			getCoordinates(getLatLong, yelpData.businesses[i].address1 + " " + yelpData.businesses[i].city + " " + yelpData.businesses[i].state_code + " " + yelpData.businesses[i].zip, weatherutility.map, yelpData.businesses[i].name);
		}
		$("#list").append("</div>");
	});
	
}

function getCoordinates(callback, address, map, restaurantName){
	var google = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&address=";
	google += address;
	var googleLatLong = {
  			"dataType" : "json",
  			"timeout" : 2000,
  			"url" : google
  	};
	var response = $.ajax(googleLatLong);
	var latlong = "";
	response.done(function(responseData, status, jqXHR){
		latlong = callback(responseData, map, restaurantName);
	});
	return latlong;
}

function getLatLong(responseData, map, restaurantName){
	lat = responseData.results[0].geometry.location.lat;
	lng = responseData.results[0].geometry.location.lng;
	var city = restaurantName;
	marker = new google.maps.Marker({ position: new google.maps.LatLng(lat,lng), map: map });
	var infowindow = new google.maps.InfoWindow({
	   	  content : city
	  });
	infoWindows.push(infowindow);

	  google.maps.event.addListener(marker, 'click', function() {
		  closeInfoWindows();
		    infowindow.open(map,this);});
	  
	return lat +"," + lng;
}

function closeInfoWindows(){
	for(var i=0;i<infoWindows.length;i++){
		infoWindows[i].close();
	}
}

function sanitizePhone(phone){
	var newPhone = "";
	newPhone = "(";
	newPhone += phone.substring(0,3) + ")";
	newPhone += phone.substring(3,6) + "-";
	newPhone += phone.substring(6,11);
	return newPhone;
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0){
			return c.substring(nameEQ.length,c.length);
		}
			
	}
	return null;
}

