//Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

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
         $('#saved-items').animate({width: "0px"}, 275);
         setTimeout(function(){
        	table.style.display = "none";
    	},300);
    } else {
    	table.style.display = "block";
        $('#saved-items').animate({width: "275px"}, 275);
    }
    
    
};

function show(){
    document.getElementById("seller").style.height = "650px";
    document.getElementById("top").style.height = "650px";
    document.getElementById("saved-items").style.marginTop = "30px"
    document.getElementById("button").style.display = "none";

    var table = document.getElementById("temp");
    if (table.style.display === "block") {
         $('#temp').animate({width: "0px"}, 300);
         setTimeout(function(){
        	table.style.display = "none";
    	},450);
    } else {
    	table.style.display = "block";
        $('#temp').animate({width: "311px"}, 500);
    }
    
};


