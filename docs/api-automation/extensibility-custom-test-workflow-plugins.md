---
layout: default
title:  "Extensibility- Plugins"
excerpt: "Learn how to plugin your logic in BELLATRIX test workflow using plugins."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/extensibility-custom-test-workflow-plugins/
anchors:
  example: Example
  explanations: Explanations
---
Introduction
------------
The test workflow plugins are way to execute your logic before each test. For example- log something in 3rd party system on test failures, creating custom logs and so on. In the example you can find a plugin that integrates a **ManualTestCase** attribute for the automated tests, containing the ID to the corresponding manual test case. The main purpose of the test workflow is to fail the test if the **ManualTestCase** attribute is not set.
 
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
public class CustomTestCaseExtensionTests : APITest
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
[AssemblyInitialize]
public static void AssemblyInitialize(TestContext testContext)
{
    App.AddTestWorkflowPlugin<AssociatedTestCaseExtension>();
}
```
It doesn't need to be added multiple times as will happen here with the **TestInit** method. Usually this is done in the **TestsInitialize** file in the **AssemblyInitialize** method.
