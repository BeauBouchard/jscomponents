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

GET: retrieves information from the specified source (you just saw this one!)



// PUT: updates existing information of the specified source. 
client.open("PUT", url, false); 
// GET: retrieves information from the specified source.
client.open("GET", url, true);
// POST: sends new information to the specified source.
client.open("POST", url, true);
// DELETE: removes existing information from the specified source.
client.open("DELETE", url, false);

client.setRequestHeader("Content-Type", "text/plain");

client.send(); // client.send(rds);

client.onreadystatechange = function() {
  if (client.readyState==4 && client.status == 200){
    if(client.responseText != null) {
      // SUCESS! 
      //client.responseText
    } else {}// fail nothing sent back
  } else {
    //Fail
    // check client.status / client.statusText
  }  
};
