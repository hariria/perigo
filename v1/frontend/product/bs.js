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
    document.getElementById("top").style.height = "100%";
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
        $('#temp').animate({width: "300px"}, 500);
    }
    
};



var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}
