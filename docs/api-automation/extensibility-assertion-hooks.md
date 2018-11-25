---
layout: default
title:  "Extensibility- Assertion Hooks"
excerpt: "Learn how to extend the BELLATRIX built-in assertion methods using hooks."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/extensibility-assertion-hooks/
anchors:
  introduction: Introduction
  example: Example
  explanations: Explanations
---
Introduction
------------
Another way to extend BELLATRIX is to use the assertions hooks. This is how the BDD logging is implemented. For example, some of the available hooks are:
- **AssertExecutionTimeUnderEvent** - an event executed before **AssertExecutionTimeUnder** method
- **AssertContentContainsEvent** - an event executed before **AssertContentContains** method
- **AssertContentTypeEvent** - an event executed before **AssertContentType** method

You need to implement the event handlers for these events and subscribe them. BELLATRIX gives you again a shortcut- you need to create a class and inherit the **AssertExtensionsEventHandlers** class
In the example, **DebugLogger** is called for each assertion event printing to Debug window what the method is verifying. You can call external logging provider, modify the response, etc. The options are limitless.

Example
-------
```csharp
public class DebugLoggerAssertExtensions : AssertExtensionsEventHandlers
{
    protected override void AssertContentContainsEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response content contains {arg.ActionValue}.");

    protected override void AssertContentEncodingEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response Cache-Info header is equal to {arg.ActionValue}.");

    protected override void AssertContentEqualsEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response content is equal to {arg.ActionValue}.");

    protected override void AssertContentNotContainsEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response content does not contain {arg.ActionValue}.");

    protected override void AssertContentNotEqualsEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response content is not equal to {arg.ActionValue}.");

    protected override void AssertContentTypeEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response Content-Type is equal to {arg.ActionValue}.");

    protected override void AssertCookieEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response cookie is equal to {arg.ActionValue}.");

    protected override void AssertCookieExistsEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response cookie {arg.ActionValue} exists.");

    protected override void AssertExecutionTimeUnderEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response execution time is under {arg.ActionValue}.");

    protected override void AssertResponseHeaderEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response header is equal to {arg.ActionValue}.");

    protected override void AssertResultEqualsEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response content is equal to {arg.ActionValue}.");

    protected override void AssertResultNotEqualsEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response content is not equal to {arg.ActionValue}.");

    protected override void AssertStatusCodeEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response status code is equal to {arg.ActionValue}.");

    protected override void AssertSuccessStatusCodeEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response status code is successfull.");

    protected override void AssertSchemaEventHandler(object sender, ApiAssertEventArgs arg) => DebugLogger.LogInformation($"Assert response is compatible to specified schema.");
}
```

Explanations
------------
```csharp
public override void TestsArrange()
{
    App.AddAssertionsEventHandler<DebugLoggerAssertExtensions>();
}
```
Once you have created the EventHandlers class, you need to tell BELLATRIX to use it. To do so call the App service method **AddAssertionsEventHandler**.
```csharp
[AssemblyInitialize]
public static void AssemblyInitialize(TestContext testContext)
{
    App.AddAssertionsEventHandler<DebugLoggerAssertExtensions>();
}
```
Usually, we add the assertions event handlers in the **AssemblyInitialize** method which is called once for a test run.
```csharp
App.RemoveAssertionsEventHandler<DebugLoggerAssertExtensions>();
```
If you need to remove it during the run you can use the method **RemoveAssertionsEventHandler**.