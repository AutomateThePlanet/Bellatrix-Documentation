---
layout: default
title:  "Load Testing"
excerpt: "Learn how to use the BELLATRIX API library to load test your API methods."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/load-testing/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
public class ApiLoadTests : APITest
{
    private ApiClientService _apiClientService;

    public override void TestInit()
    {
        FixtureFactory.Create();
        _apiClientService = App.GetApiClientService();
    }

    [TestMethod]
    public void LoadTest_ExecuteForTime()
    {
        var request = new RestRequest("api/Albums");
        
        App.LoadTestService.ExecuteForTime(
            numberOfProcesses: 10,
            pauseBetweenStartSeconds: 1,
            secondsToBeExecuted: 30,
            testBody: () =>
        {
            var response = _apiClientService.Get(request);

            response.AssertSuccessStatusCode();
            response.AssertExecutionTimeUnder(1);
        });
    }

    [TestMethod]
    public void LoadTest_ExecuteNumberOfTimes()
    {
        var request = new RestRequest("api/Albums");

        App.LoadTestService.ExecuteNumberOfTimes(5, 1, 5, () =>
        {
            var response = _apiClientService.Get(request);

            response.AssertSuccessStatusCode();
            response.AssertExecutionTimeUnder(1);
        });
    }
}
```

Explanations
------------
BELLATRIX offers a module for making load tests.
```csharp
App.LoadTestService.ExecuteForTime(
    numberOfProcesses: 10,
    pauseBetweenStartSeconds: 1,
    secondsToBeExecuted: 30,
    testBody: () =>
{
    var response = _apiClientService.Get(request);

    response.AssertSuccessStatusCode();
    response.AssertExecutionTimeUnder(1);
});
```
The first type of load tests is time-based. 10 parallel processes will run for 30 seconds, and the engine makes a pause of 1 sec between requests. As an anonymous method or existing method you can specify the code to be executed in each thread.
```csharp
App.LoadTestService.ExecuteNumberOfTimes(5, 1, 5, () =>
{
    var response = _apiClientService.Get(request);

    response.AssertSuccessStatusCode();
    response.AssertExecutionTimeUnder(1);
});
```
The second type of load tests is number-of-times-based. Your code executes the specified number of times between the specified number of processes.