---
layout: default
title:  "Measure Response Times"
excerpt: "Learn how to measure response times using BELLATRIX API library."
date:   2018-06-22 06:50:17 +0200
parent: api-automation
permalink: /api-automation/measure-response-times/
anchors:
  example: Example
  explanations: Explanations
---
Example
--------
```csharp
[TestClass]
[ExecutionTimeUnder(2)]
public class MeasuredResponseTimesTests : APITest
{
    private ApiClientService _apiClientService;

    public override void TestInit()
    {
        _apiClientService = App.GetApiClientService();
    }

    [TestMethod]
    public void ContentPopulated_When_GetAlbums()
    {
        var request = new RestRequest("api/Albums");

        var response = _apiClientService.Get(request);

        Assert.IsNotNull(response.Content);
        
        response.AssertExecutionTimeUnder(2);
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
}
```

Explanations
------------
```csharp
[TestClass]
[ExecutionTimeUnder(2)]
public class MeasuredResponseTimesTests : APITest
```
Sometimes it is useful to use your functional tests to measure performance. Or to just make sure that your app is not slow. To do that BELLATRIX libraries offer the **ExecutionTimeUnder** attribute. You specify a timeout and if the test is executed over it the test will fail.
```csharp
response.AssertExecutionTimeUnder(2);
```
Another way to measure performance is to use the **AssertExecutionTimeUnder** method. If the request took longer to execute the test will fail again. You can use the method approach in case the speed of all request is not so important. In all other cases, you can use the global attribute.