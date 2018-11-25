---
layout: default
title:  "Create Simple GET Request"
excerpt: "Learn how create a simple GET request using BELLATRIX API library."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/create-simple-get-request/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
public class CreateSimpleRequestTests : APITest
{
    [TestMethod]
    public void GetAlbumById()
    {
        var request = new RestRequest("api/Albums/10");
        
        var client = App.GetApiClientService();

        var response = client.Get<Albums>(request);

        Assert.AreEqual(10, response.Data.AlbumId);
    }
}
```

Explanations
------------
```csharp
[TestClass]
```
This is the main attribute that you need to mark each class that contains MSTest tests.
```csharp
public class CreateSimpleRequestTests : APITest
```
All API BELLATRIX test classes should inherit from the **APItest** base class. This way you can use all built-in BELLATRIX tools and functionality.
```csharp
[TestMethod]
```
All MSTest tests should be marked with the **TestMethod** attribute.
```csharp
var request = new RestRequest("api/Albums/10");
```
The base URL of your application is set in **testFrameworkSettings.json** under **apiSettings** sections- **baseUrl**. For creating a request you need to point the second part of the URL.
```csharp
var client = App.GetApiClientService();
```
Use BELLATRIX App class to get a web client instance. We use it to make requests.
```csharp
var response = client.Get<Albums>(request);
```
Use generic **Get** method to make a GET request. In the **<> **brackets we place the type of the response. BELLATRIX will automatically convert the JSON or XML response to the specified type.
```csharp
Assert.AreEqual(10, response.Data.AlbumId);
```
After you have the response object, you can make all kinds of assertions.