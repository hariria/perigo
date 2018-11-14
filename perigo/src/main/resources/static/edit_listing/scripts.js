function formSubmission() {
	var title = document.getElementsByName('title')[0].value;
	var description = document.getElementsByName('description')[0].value;
	var keywords = document.getElementsByName('keywords')[0].value.split(',');
	var zipCode = document.getElementsByName('zipcode')[0].value;
	var location = sessionStorage.getItem('location');

	var toSendJson =
		{
			'title' : title,
			'description' : description,
			'keywords' : keywords,
			'zipCode' : zipCode,
			'location' : location
		}
	
	console.log(toSendJson);

	$.ajax({
		url: 'http://localhost:9000/item/editlisting/' + sessionStorage.getItem('itemToEdit'),
		type: 'PUT',
		contentType:'application/json',
		data : JSON.stringify(toSendJson),
		success : function(result) {

		},
		error: function(error) {
			console.log(error);
		}

	})

	window.location.href = "/account/account.html";
}

function searchResults(event) {
    if(event.keyCode === 13){
        event.preventDefault();

    	var query = document.getElementById("search").value;
    	const GetItemUrl = 'http://localhost:9000/search/' + query;
    	$.ajax({
    		url: GetItemUrl,
    		type: 'GET',
    		success: function(result) {
    			sessionStorage.setItem('search_results', JSON.stringify(result));
    			window.location.href = '/search_results/search.html';
    		}
    	})
    }
}


function onload() {
	var itemToEdit = sessionStorage.getItem('itemToEdit');
	
	$.ajax({
		url : 'http://localhost:9000/item/' + itemToEdit,
		method : 'get',
		success: function(success) {
			document.getElementsByName('title')[0].value = success['title'];
			document.getElementsByName('description')[0].value = success['description'];
			document.getElementsByName('keywords')[0].value = success['keywords'].join();
			document.getElementsByName('zipcode')[0].value = success['zipCode'];
			getCityState();
		}
	})
}


$(window).scroll(function() {
	var windowpos = $(window).scrollTop();
    $('#saved-items').css('top', windowpos + "px");
});

function getCityState(){
    zip = document.getElementById('zipcode').value
    zip = zip.toString();
    console.log("Zip: " + zip);

    const Url = "http://api.geonames.org/postalCodeLookupJSON?country=US&username=perigo&postalcode=" + zip;
    console.log(Url);
	$.ajax({
		url: Url,
		type: "GET",
		  dataType: 'jsonp',
		success: function(result) {
			var city = result['postalcodes'][0]['placeName'] + ", " + result['postalcodes'][0]['adminCode1'];
			sessionStorage.setItem('location', city);
		},
		error: function(error) {
			console.log('Error: ' + error);
		}
	})
}

function goToBrowse(){
	window.location.href = "../browse/browse.html";
}
