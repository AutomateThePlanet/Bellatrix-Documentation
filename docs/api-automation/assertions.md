---
layout: default
title:  "Assertions"
excerpt: "Learn how to use BELLATRIX API built-in response assertion methods."
date:   2018-06-22 06:50:17 +0200
parent: api-automation
permalink: /api-automation/assertions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
public class ApiAssertionsTests : APITest
{
    private ApiClientService _apiClientService;

    public override void TestInit()
    {
        _apiClientService = App.GetApiClientService();
    }

    [TestMethod]
    public void AssertSuccessStatusCode()
    {
        var request = new RestRequest("api/Albums");

        var response = _apiClientService.Get(request);

        response.AssertSuccessStatusCode();
    }

    [TestMethod]
    public void AssertStatusCodeOk()
    {
        var request = new RestRequest("api/Albums");

        var response = _apiClientService.Get(request);

        response.AssertStatusCode(HttpStatusCode.OK);
    }

    [TestMethod]
    public void AssertResponseHeaderServerIsEqualToKestrel()
    {
        var request = new RestRequest("api/Albums");

        var response = _apiClientService.Get(request);

        response.AssertResponseHeader("server", "Kestrel");
    }

    [TestMethod]
    public void AssertExecutionTimeUnderIsUnderOneSecond()
    {
        var request = new RestRequest("api/Albums");

        var response = _apiClientService.Get(request);

        response.AssertExecutionTimeUnder(1);
    }

    [TestMethod]
    public async Task AssertContentTypeJson()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertContentType("application/json; charset=utf-8");
    }

    [TestMethod]
    public async Task AssertContentContainsAudioslave()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertContentContains("Audioslave");
    }

    [TestMethod]
    public async Task AssertContentEncodingUtf8()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertContentEncoding("gzip");
    }

    [TestMethod]
    public async Task AssertContentEquals()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertContentEquals("{\"albumId\":10,\"title\":\"Audioslave\",\"artistId\":8,\"artist\":null,\"tracks\":[]}");
    }

    [TestMethod]
    public async Task AssertContentNotContainsRammstein()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertContentNotContains("Rammstein");
    }

    [TestMethod]
    public async Task AssertContentNotEqualsRammstein()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertContentNotEquals("Rammstein");
    }

    [TestMethod]
    public async Task AssertResultEquals()
    {
        var expectedAlbum = new Albums
                            {
                                AlbumId = 10,
                            };
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertResultEquals(expectedAlbum);
    }

    [TestMethod]
    public async Task AssertResultNotEquals()
    {
        var expectedAlbum = new Albums
                            {
                                AlbumId = 11,
                            };
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertResultNotEquals(expectedAlbum);
    }

    [TestMethod]
    public async Task AssertCookieExists()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertCookieExists("whoIs");
    }

    [TestMethod]
    public async Task AssertCookieWhoIsBella()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        response.AssertCookie("whoIs", "Bella");
    }

	[TestMethod]
    public async Task AssertMultiple()
    {
        var request = new RestRequest("api/Albums/10");

        var response = await _apiClientService.GetAsync<Albums>(request);

        Bellatrix.Assertions.Assert.Multiple(
            () => response.AssertCookie("whoIs", "Bella"),
            () => response.AssertCookieExists("whoIs"));
    }
}
```

Explanations
------------
BELLATRIX API library brings many convenient assertion methods on top of RestSharp. Of course, you can write similar methods yourself using MSTest or NUnit. All BELLATRIX assertions comes with full BDD logging and extensibility hooks.
```csharp
response.AssertSuccessStatusCode();
```
Assert that the status code is successful.
```csharp
response.AssertStatusCode(HttpStatusCode.OK);
```
Assert that the status code is OK.
```csharp
response.AssertResponseHeader("server", "Kestrel");
```
Assert that the header named 'server' has the value 'Kestrel'.
```csharp
response.AssertExecutionTimeUnder(1);
```
Assert that the execution time of the GET request is under 1 second.
```csharp
response.AssertContentType("application/json; charset=utf-8");
```
Assert that the content type is of the specified type.
```csharp
response.AssertContentContains("Audioslave");
```
Assert that the native text content (JSON or XML) contains the specified value.
```csharp
response.AssertContentEncoding("gzip");
```
Assert the response's content encoding.
```csharp
response.AssertContentEquals("{\"albumId\":10,\"title\":\"Audioslave\",\"artistId\":8,\"artist\":null,\"tracks\":[]}");
```
Assert the native text content.
```csharp
response.AssertContentNotContains("Rammstein");
```
Assert that the native text content doesn't contain specific text.
```csharp
response.AssertContentNotEquals("Rammstein");
```
Assert that the native text content is not equal to a specific text.
```csharp
response.AssertResultEquals(expectedAlbum);
```
Assert C# collections directly.
```csharp
response.AssertResultNotEquals(expectedAlbum);
```
Assert response is not equal to an object.
```csharp
response.AssertCookieExists("whoIs");
```
Assert that a specific cookie exists.
```csharp
response.AssertCookie("whoIs", "Bella");
```
Assert that a cookie's value is equal to a specific value.
```csharp
Bellatrix.Assertions.Assert.Multiple(
    () => response.AssertCookie("whoIs", "Bella"),
    () => response.AssertCookieExists("whoIs"));
```
You can execute multiple assertions failing only once viewing all results.