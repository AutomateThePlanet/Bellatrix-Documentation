---
layout: default
title:  "Behaviour Driven Development BDD Logging"
excerpt: "Learn the BELLATRIX Behaviour Driven Development BDD Logging works and how to use it."
date:   2018-06-2s 06:50:17 +0200
parent: api-automation
permalink: /api-automation/bdd-logging/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
public class BDDLoggingTests : APITest
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
    public void ContentPopulated_When_NewAlbumInsertedViaPost()
    {
        var newAlbum = CreateUniqueGeneres();

        var request = new RestRequest("api/Genres");
        request.AddJsonBody(newAlbum);

        var response = _apiClientService.Post(request);

        Assert.IsNotNull(response.Content);
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
There cases when you need to show your colleagues or managers what tests do you have. Sometimes you may have manual test cases, but their maintenance and up-to-date state are questionable. Also, many times you need additional work to associate the tests with the test cases. Some frameworks give you a way to write human readable tests through the Gherkin language. The main idea is non-technical people to write these tests. However, we believe this approach is doomed. Or it is doable only for simple tests. This is why in BELLATRIX we built a feature that generates the test cases after the tests execution. After each action or assertion, a new entry is logged.

After the tests are executed the following log is created:

```
>Start Test
Class = BDDLoggingTests Name = ContentPopulated_When_GetAlbums
Making GET request against resource api/Albums
Response of request GET against resource api/Albums - Completed
Start Test
Class = BDDLoggingTests Name = ContentPopulated_When_NewAlbumInsertedViaPost
Making GET request against resource api/Genres
Response of request GET against resource api/Genres - Completed
Making POST request against resource api/Genres with parameters application/json={"GenreId":74,"Name":"b6f831d3-42c7-462c-9c8b-4bc0aeb870dc","Tracks":[]}
Response of request POST against resource api/Genres - Completed
Start Test
Class = BDDLoggingTests Name = ArtistsDeleted_When_PerformDeleteRequest
Making GET request against resource api/Artists
Response of request GET against resource api/Artists - Completed
Making POST request against resource api/Artists with parameters application/json={"ArtistId":276,"Name":"97062971-1fd0-4b73-9931-89d7d6c78b92","Albums":[]}
Response of request POST against resource api/Artists - Completed
Making DELETE request against resource api/Artists/276
Response of request DELETE against resource api/Artists/276 - Completed
Start Test
Class = BDDLoggingTests Name = DataPopulatedAsList_When_GetGenericAlbums
Making GET request against resource api/Albums
Response of request GET against resource api/Albums - Completed
Start Test
Class = BDDLoggingTests Name = DataPopulatedAsGenres_When_PutModifiedContent
Making GET request against resource api/Albums/11
Response of request GET against resource api/Albums/11 - Completed
Making PUT request against resource api/Albums/11 with parameters application/json={"AlbumId":11,"Title":"77cefc4a-2907-437c-ac2c-731e3ae11c9a","ArtistId":8,"Artist":null,"Tracks":[]}
Response of request PUT against resource api/Albums/11 - Completed
Making GET request against resource api/Albums/11 with parameters Accept=application/json, application/xml, text/json, text/x-json, text/javascript, text/xml
Response of request GET against resource api/Albums/11 - Completed
Similar logs are generated for all additional API assertion methods.
Start Test
Class = ApiAssertionsTests Name = AssertContentNotEqualsRammstein
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response content is not equal to Rammstein.
Start Test
Class = ApiAssertionsTests Name = AssertContentEquals
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response content is equal to {"albumId":10,"title":"Audioslave","artistId":8,"artist":null,"tracks":[]}.
Start Test
Class = ApiAssertionsTests Name = AssertContentNotContainsRammstein
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response content does not contain Rammstein.
Start Test
Class = ApiAssertionsTests Name = AssertResultEquals
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response content is equal to Bellatrix.API.GettingStarted.Models.Albums.
Start Test
Class = ApiAssertionsTests Name = AssertCookieExists
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response cookie whoIs exists.
Start Test
Class = ApiAssertionsTests Name = AssertResponseHeaderServerIsEqualToKestrel
Making GET request against resource api/Albums
Response of request GET against resource api/Albums - Completed
Assert response header is equal to server.
Start Test
Class = ApiAssertionsTests Name = AssertResultNotEquals
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response content is not equal to Bellatrix.API.GettingStarted.Models.Albums.
Start Test
Class = ApiAssertionsTests Name = AssertContentContainsAudioslave
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response content contains Audioslave.
Start Test
Class = ApiAssertionsTests Name = AssertContentTypeJson
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response Content-Type is equal to application/json; charset=utf-8.
Assert response header is equal to Content-Type.
Start Test
Class = ApiAssertionsTests Name = AssertExecutionTimeUnderIsUnderOneSecond
Making GET request against resource api/Albums
Response of request GET against resource api/Albums - Completed
Assert response execution time is under 1.
Start Test
Class = ApiAssertionsTests Name = AssertCookieWhoIsBella
Making GET request against resource api/Albums/10
Response of request GET against resource api/Albums/10 - Completed
Assert response cookie is equal to whoIs=Bella.
Assert response cookie whoIs exists.
Start Test
Class = ApiAssertionsTests Name = AssertSuccessStatusCode
Making GET request against resource api/Albums
Response of request GET against resource api/Albums - Completed
Assert response status code is successfull.
Start Test
Class = ApiAssertionsTests Name = AssertStatusCodeOk
Making GET request against resource api/Albums
Response of request GET against resource api/Albums - Completed
Assert response status code is equal to OK.
```

Configuration
-------------
```json
"logging": {
    "isEnabled": "true",
    "isConsoleLoggingEnabled": "true",
    "isDebugLoggingEnabled": "true",
    "isEventLoggingEnabled": "false",
    "isFileLoggingEnabled": "true",
    "outputTemplate":  "{Message:lj}{NewLine}",
    "addUrlToBddLogging": "false"
}
```
In the **testFrameworkSettings.json** file find a section called logging, responsible for controlling the BDD logs generation. You can disable the logs entirely. There are different places where the logs are populated. By default, you can see the logs in the output window of each test. Also, a file called logs.txt is generated in the folder with the DLLs of your tests. If you execute your tests in CI with some CLI test runner the logs are printed there as well. **outputTemplate** - controls how the message is formatted. You can add additional info such as timestamp and much more.
For more info visit- [https://github.com/serilog/serilog/wiki/Formatting-Output](https://github.com/serilog/serilog/wiki/Formatting-Output)