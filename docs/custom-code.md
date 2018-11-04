---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


Making GET request and return a C# response object.
```csharp
var request = new RestRequest("api/Albums/10");
var response = _apiClientService.Get<Albums>(request);
```

Change the title and create a PUT request.
```csharp
var putRequest = new RestRequest("api/Albums/11");
getResponse.Data.Title = Guid.NewGuid().ToString();
putRequest.AddJsonBody(getResponse.Data);
_apiClientService.Put<Albums>(putRequest);
```

Create a new album. Create a POST request and add the new object as a JSON body. 
```csharp
var newAlbum = CreateUniqueGeneres();
var request = new RestRequest("api/Genres");
request.AddJsonBody(newAlbum);
var response = _apiClientService.Post(request);
```

Delete existing artist.
```csharp
var deleteRequest = new RestRequest($"api/Artists/{newArtist.ArtistId}");
var response = _apiClientService.Delete(deleteRequest);
```

All Bellatrix client API methods have an async version. Your test should be marked as async and you should use the await operator. 
```csharp
var deleteRequest = new RestRequest($"api/Artists/{newArtist.ArtistId}");
var response = await _apiClientService.DeleteAsync<Artists>(deleteRequest);
```

Responses as C# Objects

RestAssured Example Java
```csharp
given().when().get("/garage").then()
       .body("name",equalTo("Acme garage"))
       .body("info.slots",equalTo(150))
       .body("info.status",equalTo("open"))
       .statusCode(200);
```

To solve these problems, Bellatrix automatically converts any XML or JSON response to a predefined C# object. If there is a change in the response schema, you will see a meaningful error explanation and need to fix everything in one place.

```csharp
var getUpdatedResponse = _apiClientService.Get<Albums>(request);
Assert.AreEqual(updatedTitle, getUpdatedResponse.Data.Title);
``` 

RestAssured Example Java

```csharp
JSONObject requestParams = new JSONObject();
requestParams.put("AlbumId", 23);
requestParams.put("Title", "Open Your Eyes");
requestParams.put("ArtistId", 26);
requestParams.put("ArtistName", "Guano Apes");
requestParams.put("AlbumName",  "Proud Like a God");
request.body(requestParams.toJSONString());
Response response = request.post("api/Albums");
``` 

Bellatrix Example

```csharp
var newAlbum = new Albums
{ 
    Artist = guanoApesArtist,
    Title = "Open Your Eyes",
    Tracks = new List<Tracks>() { openYourEyesTrack },
};
var postRequest = new RestRequest("api/Albums");
postRequest.AddBody(newAlbum);
var response = _apiClientService.Get<Albums>(request);

We work with C# objects and there are no hard-coded, copy-pasted strings.
``` 