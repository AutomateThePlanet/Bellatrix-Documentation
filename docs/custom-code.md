---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


Load Testing time based
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


The second type 
```csharp
App.LoadTestService.ExecuteNumberOfTimes(5, 1, 5, () =>
{
    var response = _apiClientService.Get(request);

    response.AssertSuccessStatusCode();
    response.AssertExecutionTimeUnder(1);
});
```

Measure Test Execution Times
```csharp
[ExecutionTimeUnder(2)]
public class MeasuredResponseTimesTests : APITest
```

Measure Test Execution Times
```csharp
[ExecutionTimeUnder(2)]
public class MeasuredResponseTimesTests : APITest
```


```csharp
response.AssertExecutionTimeUnder(2);
```


