---
layout: default
title:  "Logging"
excerpt: "Learn how to use the BELLATRIX logging library."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/logging/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestMethod]
public void GetAlbumById()
{
    var request = new RestRequest("api/Albums/10");

    var client = App.GetApiClientService();
    
    Logger.LogInformation("Before GET request. CUSTOM MESSAGE ###");
    var response = client.Get<Albums>(request);

    Assert.AreEqual(10, response.Data.AlbumId);
}
```

Explanations
------------
By default, you can see the logs in the output window of each test. Also, a file called logs.txt is generated in the folder with the DLLs of your tests. If you execute your tests in CI with some CLI test runner the logs are printed there as well. **outputTemplate** - controls how the message is formatted. You can add additional info such as timestamp and much more. For more info visit- [https://github.com/serilog/serilog/wiki/Formatting-Output](https://github.com/serilog/serilog/wiki/Formatting-Output)
```csharp
Logger.LogInformation("Before GET request. CUSTOM MESSAGE ###");
```
Sometimes is useful to add information to the generated test log. To do it you can use the BELLATRIX built-in logger through accessing it via static **Logger** class.

Generated Log, as you can see the above custom message is added to the log.

```
[11:14:08] Start Test
[11:14:08] Class = LoggingTests Name = GetAlbumById
[11:14:09] Before GET request. CUSTOM MESSAGE ###
[11:14:09] Making GET request against resource api/Albums/10
[11:14:09] Response of request GET against resource api/Albums/10 - Completed
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
In the **testFrameworkSettings.json** file find a section called **logging**, responsible for controlling the logs generation. You can disable the logs entirely. There are different places where the logs are populated.