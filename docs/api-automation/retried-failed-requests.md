---
layout: default
title:  "Retry Failed Requests"
excerpt: "Learn how to retry failed requests with Bellatrix API attributes."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/retry-failed-requests/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
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

Explanations
------------
```csharp
[RetryFailedRequests(3, 200, TimeUnit.Milliseconds)]
```
Bellatrix provides an easy way to retry failed request through the **RetryFailedRequests**. If you place it over you class the rules will be applied to all tests in it. Provide how many times your tests to be retried and what should be the pause between retries and the time unit.
