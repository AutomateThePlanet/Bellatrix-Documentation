---
layout: default
title:  "Extensibility- API Client Hooks"
excerpt: "Learn how to extend the BELLATRIX API client using hooks."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/extensibility-api-client-hooks/
anchors:
  introduction: Introduction
  example: Example
  explanations: Explanations
---
Introduction
------------
Another way to execute BELLATRIX is to create an API client plugin. You can execute your logic in various points such as:
- **OnClientInitialized** - executed after the API client is initialized. Here you can fine-tune the client.
- **OnRequestTimeout** - executed if some of the requests timeout.
- **OnMakingRequest** - executed before making request.
- **OnRequestMade** - executed after the request is made.
- **OnRequestFailed** - executed in case of request failure.

To create a custom plugin, you need to derive the class- **ApiClientExecutionPlugin**. Then you can override some of its protected methods. You can create plugins for logging the request failures, modifying the requests. The possibilities are limitless.

Example
-------
```csharp
public class LogRequestTimeApiClientExecutionPlugin : ApiClientExecutionPlugin
{
    private Stopwatch _requestStopwatch = Stopwatch.StartNew();

    protected override void OnMakingRequest(object sender, RequestEventArgs client) => _requestStopwatch = Stopwatch.StartNew();

    protected override void OnRequestMade(object sender, ResponseEventArgs client)
    {
        _requestStopwatch.Stop();
        Console.WriteLine($"Request made for {_requestStopwatch.ElapsedMilliseconds}");
    }
}
```
```csharp
public class ApiClientHooksTests : APITest
{
    public override void TestsArrange() => App.AddApiClientExecutionPlugin<LogRequestTimeApiClientExecutionPlugin>();

    [TestMethod]
    public void GetAlbumById()
    {
        var request = new RestRequest("api/Albums/10");

        var client = App.GetApiClientService();

        var response = client.Get<Albums>(request);

        Assert.AreEqual(10, response.Data.AlbumId);
    }

    [TestMethod]
    public void SecondGetAlbumById()
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
public override void TestsArrange() => 
  App.AddApiClientExecutionPlugin<LogRequestTimeApiClientExecutionPlugin>();
```
The plugin needs to be registered through App service method **AddApiClientExecutionPlugin**.
```csharp
[AssemblyInitialize]
public static void AssemblyInitialize(TestContext testContext)
{
    App.AddApiClientExecutionPlugin<LogRequestTimeApiClientExecutionPlugin>();
}
```
Usually, this happens in the **AssemblyInitialize** method so that it is executed once before all tests.