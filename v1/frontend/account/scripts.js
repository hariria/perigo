function clickedHeart(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);

	if(element.innerHTML === "<i class=\"fas fa-heart\"></i>"){
		element.innerHTML = "<i class='far fa-heart'></i>";
		element.style.color = "white";

	}else{
		element.innerHTML = "<i class='fas fa-heart'></i>";
		element.style.color = "#FF4755";
	}
};

function getItem(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);
};

function unsaveItem(element){
	var elementID = element.getAttribute("data-itemID");
	console.log(elementID);
};

function showSavedItems(){
    var table = document.getElementById("saved-items");
    if (table.style.display === "block") {
         $('#saved-items').animate({width: "0px"}, 500);
         setTimeout(function(){
        	table.style.display = "none";
    	},450);
    } else {
    	table.style.display = "block";
        $('#saved-items').animate({width: "400px"}, 500);
    }
};

$(window).scroll(function() {
	var windowpos = $(window).scrollTop();
    $('#saved-items').css('top', windowpos + "px");
});



function resetSavedItems(){
    var choice = confirm("Are you sure you want to remove all saved items?");
    if (choice == true){
        var savedItems = document.getElementsByClassName("saved-item");
        Array.from(document.getElementsByClassName('saved-item')).forEach(v => {
            v.style.display = "none";
        });
    }
    else{
        console.log();
    }
}


function addAListing(){
    window.location.href = './newListing.html';
}

function previewFile() {

    var preview = document.createElement("div");
    var image = document.createElement("img");
    var str = '<i class="fas fa-times" style="color: #949494;" data-itemID="1" onClick="unsaveItem(this)"></i>';
    var icon = document.createElement("i");

    icon.classList.add('fas');
    icon.style.zIndex = "10";
    icon.classList.add('fa-times');
    icon.style.color = "#949494";
    icon.setAttribute('data-itemID', "1");
    icon.onclick = unsaveItem(icon);

    preview.appendChild(image);
    preview.appendChild(icon);
    image.classList.add('uploaded-image');
    document.getElementById("picture-container").prepend(preview);
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        image.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}


function getCityState(){
    zip = document.getElementById('zipcode').value
    zip = zip.toString();
    console.log("Zip: " + zip);
    var geoInfo = $.getJSON("http://www.geonames.org/postalCodeLookupJSON?&country=DE&callback=?", {postalcode: zip }, function(response) {
		console.log(response);
	});
    // console.log(geoInfo);
}
