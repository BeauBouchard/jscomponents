/*
 * RESTfulclient.js
 *    description: Implimentation of Representational State Transfer client for javascript
 *    Author: Beau Bouchard (@beaubouchard)
 */
var url = "http://host/path/to/resource";
//Representation of Desired State 
var rds= "information to send to the server with a PUT/POST request";

//client = xml http resource object which will be used for calls
var client = new XMLHttpRequest();
// code for IE7+, Firefox, Chrome, Opera, Safari
if (window.XMLHttpRequest){
  client = new XMLHttpRequest();
}
else  {// code for IE6, IE5
  client = new ActiveXObject("Microsoft.XMLHTTP");
}
  
//open(method,url,async)
//async: true (asynchronous) or false (synchronous)
//There are 4 verbs or rather opperators to use with a RESTful API
// Put 
client.open("PUT", url, false); 
// Get
client.open("GET", url, true);
// Post
client.open("POST", url, true);
// Delete
client.open("DELETE", url, false);

client.setRequestHeader("Content-Type", "text/plain");

client.send(); // client.send(rds);

if (client.readyState==4 && client.status == 200){
    alert("The request succeeded!\n\nThe response representation was:\n\n" + client.responseText);
}
else {
    alert("The request did not succeed!\n\nThe response status was: " + client.status + " " + client.statusText + ".");
}  
