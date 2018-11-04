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
