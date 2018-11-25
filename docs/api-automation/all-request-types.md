---
layout: default
title:  "All Request Types"
excerpt: "Learn what are all BELLATRIX API request types and how to use them.."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/all-request-types/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
public class AllRequestTypesTests : APITest
{
    private ApiClientService _apiClientService;
    private Fixture _fixture;

    public override void TestInit()
    {
        _fixture = FixtureFactory.Create();
        _apiClientService = App.GetApiClientService();
    }

    [TestMethod]
    public void ContentPopulated_When_GetAlbums()
    {
        var request = new RestRequest("api/Albums");

        var response = _apiClientService.Get(request);

        Assert.IsNotNull(response.Content);
    }

    [TestMethod]
    public void DataPopulatedAsList_When_GetGenericAlbums()
    {
        var request = new RestRequest("api/Albums");

        var response = _apiClientService.Get<List<Albums>>(request);

        Assert.AreEqual(347, response.Data.Count);
    }

    [TestMethod]
    [TestCategory(Categories.CI)]
    [TestCategory(Categories.API)]
    public void DataPopulatedAsList_When_GetGenericAlbumsById()
    {
        var request = new RestRequest("api/Albums/10");

        var response = _apiClientService.Get<Albums>(request);

        Assert.AreEqual(10, response.Data.AlbumId);
    }

    [TestMethod]
    public void ContentPopulated_When_GetGenericAlbumsById()
    {
        var request = new RestRequest("api/Albums/10");

        var response = _apiClientService.Get<Albums>(request);

        Assert.IsNotNull(response.Content);
    }

    [TestMethod]
    public void DataPopulatedAsGenres_When_PutModifiedContent()
    {
        var request = new RestRequest("api/Albums/11");

        var getResponse = _apiClientService.Get<Albums>(request);

        var putRequest = new RestRequest("api/Albums/11");

        string updatedTitle = Guid.NewGuid().ToString();
        getResponse.Data.Title = updatedTitle;

        putRequest.AddJsonBody(getResponse.Data);

        _apiClientService.Put<Albums>(putRequest);

        var getUpdatedResponse = _apiClientService.Get<Albums>(request);

        Assert.AreEqual(updatedTitle, getUpdatedResponse.Data.Title);
    }

    [TestMethod]
    public void ContentPopulated_When_PutModifiedContent()
    {
        var request = new RestRequest("api/Albums/11");

        var getResponse = _apiClientService.Get<Albums>(request);

        var putRequest = new RestRequest("api/Albums/11");
        string updatedTitle = Guid.NewGuid().ToString();
        getResponse.Data.Title = updatedTitle;
        putRequest.AddJsonBody(getResponse.Data);

        _apiClientService.Put(putRequest);

        var getUpdatedResponse = _apiClientService.Get<Albums>(request);

        Assert.IsNotNull(getUpdatedResponse.Content);
    }

    [TestMethod]
    public void ContentPopulated_When_NewAlbumInsertedViaPost()
    {
        var newAlbum = CreateUniqueGeneres();

        var request = new RestRequest("api/Genres");
        request.AddJsonBody(newAlbum);

        var response = _apiClientService.Post(request);

        Assert.IsNotNull(response.Content);
    }

    [TestMethod]
    public void DataPopulatedAsGenres_When_NewAlbumInsertedViaPost()
    {
        var newAlbum = CreateUniqueGeneres();

        var request = new RestRequest("api/Genres");
        request.AddJsonBody(newAlbum);

        var response = _apiClientService.Post<Genres>(request);

        Assert.AreEqual(newAlbum.Name, response.Data.Name);
    }

    [TestMethod]
    public void ArtistsDeleted_When_PerformDeleteRequest()
    {
        var newArtist = CreateUniqueArtists();
        var request = new RestRequest("api/Artists");
        request.AddJsonBody(newArtist);
        _apiClientService.Post<Artists>(request);

        var deleteRequest = new RestRequest($"api/Artists/{newArtist.ArtistId}");
        var response = _apiClientService.Delete(deleteRequest);

        Assert.IsTrue(response.IsSuccessful);
    }

    [TestMethod]
    public void ArtistsDeleted_When_PerformGenericDeleteRequest()
    {
        var newArtist = CreateUniqueArtists();
        var request = new RestRequest("api/Artists");
        request.AddJsonBody(newArtist);
        _apiClientService.Post<Artists>(request);

        var deleteRequest = new RestRequest($"api/Artists/{newArtist.ArtistId}");
        var response = _apiClientService.Delete<Artists>(deleteRequest);

        Assert.IsNotNull(response.Data);
    }

    [TestMethod]
    public async void ArtistsDeleted_When_PerformGenericDeleteRequestAsync()
    {
        var newArtist = CreateUniqueArtists();
        var request = new RestRequest("api/Artists");
        request.AddJsonBody(newArtist);

        await _apiClientService.PostAsync<Artists>(request);

        var deleteRequest = new RestRequest($"api/Artists/{newArtist.ArtistId}");
        
        var response = await _apiClientService.DeleteAsync<Artists>(deleteRequest);

        Assert.IsNotNull(response.Data);
    }

    private Artists CreateUniqueArtists()
    {
        var getResponse = _apiClientService.Get<List<Artists>>(new RestRequest("api/Artists"));
        var newArtists = new Artists
                         {
                             Name = _fixture.Create<string>(),
                             ArtistId = getResponse.Data.OrderBy(x => x.ArtistId).Last().ArtistId + 1,
                         };
        return newArtists;
    }

    private Genres CreateUniqueGeneres()
    {
        var getResponse = _apiClientService.Get<List<Genres>>(new RestRequest("api/Genres"));
        var newAlbum = new Genres
                       {
                           Name = _fixture.Create<string>(),
                           GenreId = getResponse.Data.OrderBy(x => x.GenreId).Last().GenreId + 1,
                       };
        return newAlbum;
    }
}
```

Explanations
------------
```csharp
[TestMethod]
public void ContentPopulated_When_GetAlbums()
{
    var request = new RestRequest("api/Albums");

    var response = _apiClientService.Get(request);

    Assert.IsNotNull(response.Content);
}
```
Make a Get request but not convert the response to C# object. The response is returned in its native format- JSON or XML.
```csharp
[TestMethod]
public void DataPopulatedAsList_When_GetGenericAlbums()
{
    var request = new RestRequest("api/Albums");

    var response = _apiClientService.Get<List<Albums>>(request);

    Assert.AreEqual(347, response.Data.Count);
}
```
BELLATRIX can return list of objects. You can access the response's list through Data property.
```csharp
var response = _apiClientService.Get<Albums>(request);
```
Making GET request and return C# response object.
```csharp
[TestMethod]
public void ContentPopulated_When_GetGenericAlbumsById()
{
    var request = new RestRequest("api/Albums/10");

    var response = _apiClientService.Get<Albums>(request);
    
    Assert.IsNotNull(response.Content);
}
```
Even when you use the generic methods you have access to the original text response through the Content property.
```csharp
[TestMethod]
public void DataPopulatedAsGenres_When_PutModifiedContent()
{
    var request = new RestRequest("api/Albums/11");

    var getResponse = _apiClientService.Get<Albums>(request);

    var putRequest = new RestRequest("api/Albums/11");

    string updatedTitle = Guid.NewGuid().ToString();
    getResponse.Data.Title = updatedTitle;

    putRequest.AddJsonBody(getResponse.Data);

    _apiClientService.Put<Albums>(putRequest);

    var getUpdatedResponse = _apiClientService.Get<Albums>(request);

    Assert.AreEqual(updatedTitle, getUpdatedResponse.Data.Title);
}
```
First we get an existing album. After that we change the Title and create a PUT request. You need to add the changes as JSON body. Use the generic Put method to create a PUT request.
```csharp
[TestMethod]
public void ContentPopulated_When_NewAlbumInsertedViaPost()
{
    var newAlbum = CreateUniqueGeneres();

    var request = new RestRequest("api/Genres");
    request.AddJsonBody(newAlbum);

    var response = _apiClientService.Post(request);

    Assert.IsNotNull(response.Content);
}
```
Create a new album. Create a POST request and add the new object as JSON body. Use the non-generic Post method to make the POST request. Access the native text response through Content property.
```csharp
var response = _apiClientService.Post<Genres>(request);
```
Use the generic Post version to get a converted response to C# object.
```csharp
[TestMethod]
public void ArtistsDeleted_When_PerformDeleteRequest()
{
    var newArtist = CreateUniqueArtists();
    var request = new RestRequest("api/Artists");
    request.AddJsonBody(newArtist);
    _apiClientService.Post<Artists>(request);
    
    var deleteRequest = new RestRequest($"api/Artists/{newArtist.ArtistId}");
    var response = _apiClientService.Delete(deleteRequest);

    Assert.IsTrue(response.IsSuccessful);
}
```
First create a new artist and post it. Create a delete request to remove it.
```csharp
var deleteRequest = new RestRequest($"api/Artists/{newArtist.ArtistId}");
var response = _apiClientService.Delete<Artists>(deleteRequest);
```
Use a generic version of the Delete to convert the response to C# object.
```csharp
[TestMethod]
public async void ArtistsDeleted_When_PerformGenericDeleteRequestAsync()
{
    var newArtist = CreateUniqueArtists();
    var request = new RestRequest("api/Artists");
    request.AddJsonBody(newArtist);

    await _apiClientService.PostAsync<Artists>(request);

    var deleteRequest = new RestRequest($"api/Artists/{newArtist.ArtistId}");

    var response = await _apiClientService.DeleteAsync<Artists>(deleteRequest);

    Assert.IsNotNull(response.Data);
}
```
All BELLATRIX client API methods have an async version. Your test should be marked as async. Use the PostAsync. Should use the await operator. Use the DeleteAsync. Should use the await operator.