---
layout: default
title:  "Extensibility- Custom Test Workflow Plugins"
excerpt: "Learn how to plugin your logic in BELLATRIX test workflow using custom test workflow plugins."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-custom-test-workflow-plugins/
anchors:
  example: Example
  explanations: Explanations
  screenshot-and-video-generation-plug-ins: Screenshot and Video Generation Plugins
---
Introduction
------------
The test workflow plugins are way to execute your logic before each test. For example- taking screenshots or videos on test failures, creating custom logs and so on. In the example you can find a plugin that integrates a **ManualTestCase** attribute for the automated tests, containing the ID to the corresponding manual test case. The main purpose of the test workflow is to fail the test if the **ManualTestCase** attribute is not set.
 
Example
-------
```csharp
[AttributeUsage(AttributeTargets.Method)]
public class ManualTestCaseAttribute : Attribute
{
    public ManualTestCaseAttribute(int testCaseId) => TestCaseId = testCaseId;

    public int TestCaseId { get; set; }
}
```
```csharp
public class AssociatedTestWorkflowPlugin : TestWorkflowPlugin
{
    protected override void PreTestInit(object sender, TestWorkflowPluginEventArgs e)
    {
        base.PreTestInit(sender, e);
        ValidateManualTestCaseAttribute(e.TestMethodMemberInfo);
    }

    private void ValidateManualTestCaseAttribute(MemberInfo memberInfo)
    {
        if (memberInfo == null)
        {
            throw new ArgumentNullException();
        }

        var methodBrowserAttributes = memberInfo.GetCustomAttributes<ManualTestCaseAttribute>(true).ToList();
        if (methodBrowserAttributes.Count == 0)
        {
            throw new ArgumentException("No manual test case is associated with the BELLATRIX test.");
        }
        else if (methodBrowserAttributes.Count > 1)
        {
            throw new ArgumentException("You cannot associate two manual test cases with a single BELLATRIX test.");
        }
        else if (methodBrowserAttributes.First().TestCaseId <= 0)
        {
            throw new ArgumentException("The associated manual test case ID cannot be <= 0.");
        }
    }
}
```

Explanations
------------
```csharp
public class AssociatedTestWorkflowPlugin : TestWorkflowPlugin
```
To create a custom test workflow plugin:

- Create a new class that derives from the 'TestWorkflowPlugin' base class.
- Then override some of the workflow's protected methods adding there your logic.
- Register the workflow plugin using the AddTestWorkflowPlugin method of the App service.

```csharp
protected override void PreTestInit(object sender, TestWorkflowPluginEventArgs e)
{
    base.PreTestInit(sender, e);
    ValidateManualTestCaseAttribute(e.TestMethodMemberInfo);
}
```
You can override all mentioned test workflow method hooks in your custom handlers. The method uses reflection to find out if the ManualTestCase attribute is set to the run test. If the attribute is not set or is set more than once an exception is thrown. The logic executes before the actual test run, during the **PreTestInit** phase.
```csharp
[TestClass]
[Browser(BrowserType.Firefox, BrowserBehavior.RestartEveryTime)]
public class CustomTestCaseExtensionTests : WebTest
{
    public override void TestInit()
    {
        App.AddTestWorkflowPlugin<AssociatedTestCaseExtension>();
    }

    [TestMethod]
    [ManualTestCase(1532)]
    public void PurchaseRocketWithGloballyOverridenMethods()
    {
        // ...
    }
}
```
Once we created the test workflow plugin, we need to add it to the existing test workflow. It is done using the **App** service's method **AddTestWorkflowPlugin**.
```csharp
public static void AssemblyInitialize(TestContext testContext)
{
    App.AddTestWorkflowPlugin<AssociatedTestCaseExtension>();
}
```
It doesn't need to be added multiple times as will happen here with the **TestInit** method. Usually this is done in the **TestsInitialize** file in the **AssemblyInitialize** method.
Screenshot and Video Generation Plug-ins
---------------------------------------
Your plug-ins can plug in the screenshots and video generation on fail.
To do a post-screenshot generation action, implement the **IScreenshotPlugin** interface and add your logic to **ScreenshotGenerated** method.
To do a post-video generation action, implement the **IVideoPlugin** interface and add your logic to **VideoGenerated** method.
Bellow you can find a sample usage from BELLATRIX Allure plug-in.
```csharp
public class AllureWorkflowPlugin : TestWorkflowPlugin, IScreenshotPlugin, IVideoPlugin
{
    private static AllureLifecycle _allureLifecycle => AllureLifecycle.Instance;
    private string _testContainerId;
    private string _testResultId;
    private bool _hasStarted = false;

    public void SubscribeScreenshotPlugin(IScreenshotPluginProvider provider)
    {
        provider.ScreenshotGeneratedEvent += ScreenshotGenerated;
    }

    public void UnsubscribeScreenshotPlugin(IScreenshotPluginProvider provider)
    {
        provider.ScreenshotGeneratedEvent -= ScreenshotGenerated;
    }

    public void ScreenshotGenerated(object sender, ScreenshotPluginEventArgs e)
    {
        if (File.Exists(e.ScreenshotPath))
        {
            _allureLifecycle.AddAttachment("image on fail", "image/png", e.ScreenshotPath);
        }
    }

    public void SubscribeVideoPlugin(IVideoPluginProvider provider)
    {
        provider.VideoGeneratedEvent += VideoGenerated;
    }

    public void UnsubscribeVideoPlugin(IVideoPluginProvider provider)
    {
        provider.VideoGeneratedEvent -= VideoGenerated;
    }

    public void VideoGenerated(object sender, VideoPluginEventArgs e)
    {
        if (File.Exists(e.VideoPath))
        {
            _allureLifecycle.AddAttachment("video on fail", "video/mpg", e.VideoPath);
        }
    }

    // rest of the code...
}
```
