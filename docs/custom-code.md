---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


Retry Failed Requests
```csharp
[RetryFailedRequests(3, 200, TimeUnit.Milliseconds)]
public class RetryFailedRequestsTests : APITest
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
EXTEND

This is how we specify the maximal allowed time.
```csharp
 [ExecutionTimeUnder(2)]
 public class MeasuredResponseTimesTests : APITest
```


This is part of the plugin.
```csharp
public class ExecutionTimeUnderTestWorkflowPlugin : TestWorkflowPlugin
{
    protected override void PostTestInit(object sender, TestWorkflowPluginEventArgs e)
    {
        // get the start time
    }

    protected override void PostTestCleanup(object sender, TestWorkflowPluginEventArgs e)
    {
        // total time = start time - current time
        // IF total time > specified time ===> FAIL TEST
    }
}
```


API Client Hooks
```csharp
public class LogRequestTimeApiClientExecutionPlugin : ApiClientExecutionPlugin
{
    private Stopwatch _requestStopwatch = Stopwatch.StartNew();

    protected override void OnMakingRequest(object sender, RequestEventArgs client)
    {
	_requestStopwatch = Stopwatch.StartNew();
    }

    protected override void OnRequestMade(object sender, ResponseEventArgs client)
    {
        _requestStopwatch.Stop();
        Console.WriteLine($"Request made for {_requestStopwatch.ElapsedMilliseconds}");
    }
}
```

Assertion Hooks
```csharp
public override void AssertContentContainsEventHandler(object sender, ApiAssertEventArgs arg)
{
    Debug.WriteLine($"Assert response content contains {arg.ActionValue}.");
}

public override void AssertContentEncodingEventHandler(object sender, ApiAssertEventArgs arg)
{
    Debug.WriteLine($"Assert response content encoding is equal to {arg.ActionValue}.");
}
```

