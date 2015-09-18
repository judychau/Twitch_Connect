//GET request to api
var xhr = new XMLHttpRequest();
var url = "https://api.twitch.tv/kraken/search/streams?q=starcraft"

xhr.onreadystatechange=function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        myFunction(xhr.responseText);
    }
}
xhr.open("GET", url, true);
xhr.send();


//Grab text from search box for api query
function searchFunction() {
	var params = document.getElementById("search").value; 
	var query = params.split(" ").join("+"); 
	var baseUrl = "https://api.twitch.tv/kraken/search/streams?q="
	var newUrl = baseUrl + query; 

	xhr.open("GET", newUrl, true);
	xhr.send();
}


//JSON response from api
function myFunction(response) {
    var data = JSON.parse(response); console.log(data);
    var stream = data.streams;
    var total = "Total Results: " + data._total;
    var content = "<div id='content'>";

    for(var i = 0; i < stream.length; i++) {
        content += 
        "<div id='eachContent'><a href='" + data.streams[i].channel.url + "'><img src='" + data.streams[i].preview.medium + 
        "'alt='Stream Page Image'/></a>" + 
        "<h2>" + data.streams[i].channel.display_name +
        "</h2><p>" + data.streams[i].game + 
        " - " + data.streams[i].viewers + " viewers </p>" +
        "<p>" + data.streams[i].channel.status + "</p></div>";
        
    }
    content += "</div>"

    document.getElementById("results").innerHTML = total;
    document.getElementById("contentContainer").innerHTML = content;


    //Pagination
    if (data._links.next){
    	document.getElementById("next").addEventListener("click", nextFunction);
    }

    function nextFunction(){
    	var nextUrl = data._links.next
    	xhr.open("GET", nextUrl, true);
		xhr.send();
	}

	if (data._links.prev){
    	document.getElementById("next").addEventListener("click", prevFunction);
    }
    function prevFunction(){
    	var prevUrl = data._links.prev
    	xhr.open("GET", prevUrl, true);
		xhr.send();
	}
    
}