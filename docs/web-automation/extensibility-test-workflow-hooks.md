---
layout: default
title:  "Extensibility- Plugin Hooks"
excerpt: "Learn how to extend the BELLATRIX plugins using hooks."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-test-workflow-hooks/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
public class TestWorkflowHooksTests : WebTest
{
    private static Select _sortDropDown;
    private static Anchor _protonRocketAnchor;

    public override void TestsArrange()
    {
        _sortDropDown = 
		App.Components.CreateByXpath<Select>("//*[@id='main']/div[1]/form/select");
        _protonRocketAnchor = 
		App.Components.CreateByXpath<Anchor>("//*[@id='main']/div[2]/ul/li[1]/a[1]");
    }

    public override void TestsAct()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        _sortDropDown.SelectByText("Sort by price: low to high");
    }

    public override void TestInit()
    {
        // Executes a logic before each test in the test class.
    }

    public override void TestCleanup()
    {
        // Executes a logic after each test in the test class.
    }

    [Test]
    public void SortDropDownIsAboveOfProtonRocketAnchor()
    {
        _sortDropDown.AssertAboveOf(_protonRocketAnchor);
    }

    [Test]
    public void SortDropDownIsAboveOfProtonRocketAnchor_41px()
    {
        _sortDropDown.AssertAboveOf(_protonRocketAnchor, 41);
    }

    [Test]
    public void SortDropDownIsAboveOfProtonRocketAnchor_GreaterThan40px()
    {
        _sortDropDown.AssertAboveOfGreaterThan(_protonRocketAnchor, 40);
    }

    [Test]
    public void SortDropDownIsAboveOfProtonRocketAnchor_GreaterThanOrEqual41px()
    {
        _sortDropDown.AssertAboveOfGreaterThanOrEqual(_protonRocketAnchor, 41);
    }

    [Test]
    public void SortDropDownIsNearTopOfProtonRocketAnchor_GreaterThan40px()
    {
        _sortDropDown.AssertNearTopOfGreaterThan(_protonRocketAnchor, 40);
    }
}
```

Explanations
------------
One of the greatest features of BELLATRIX is test workflow hooks. It gives you the possibility to execute your logic in every part of the test workflow. Also, as you can read in the next chapter write plug-ins that execute code in different places of the workflow every time. This is happening no matter what test framework you use- MSTest or NUnit. As you know, MSTest is not extension friendly.

**BELLATRIX Default Test Workflow.**

The following methods are called once for test class:

1. All plug-ins **PreTestsArrange** logic executes.
2. Current class **TestsArrange** method executes. By default it is empty, but you can override it in each class and execute your logic. This is the place where you can set up data for your tests, call internal API services, SQL scripts and so on.
3. All plug-ins **PostTestsArrange** logic executes.
4. All plug-ins **PreTestsAct** logic executes.
5. Current class **TestsAct** method executes. By default it is empty, but you can override it in each class and execute your logic. This is the place where you can execute the primary actions for your test case. This is useful if you want later include only assertions in the tests.
6. All plug-ins **PostTestsAct** logic executes.

The following methods are called once for each test in the class:

7. All plug-ins **PreTestInit** logic executes.
8. Current class **TestInit** method executes. By default it is empty, but you can override it in each class and execute your logic. You can add some logic that is executed for each test instead of copy pasting it for each test. For example; navigating to a specific Android activity.
8.1. In case there is an exception thrown in the TestInit phase **TestInitFailed**, the logic of all plug-ins is run.
9. All plug-ins **PostTestInit** logic executes.
10. All plug-ins **PreTestCleanup** logic executes.
11. Current class **TestCleanup** method executes. By default it is empty, but you can override it in each class and execute your logic.
You can add some logic that is executed after each test instead of copy pasting it. For example; deleting some entity from DB.
12. All plug-ins **PostTestCleanup** logic executes.

**Note**: ***TestsArrange** and **TestsAct** are similar to MSTest **TestClassInitialize** and **OneTimeSetup** in NUnit. We decided to split them into two methods to make the code more readable and two allow customization of the workflow.*

```csharp
public override void TestsArrange()
{
    _sortDropDown = 
    App.Components.CreateByXpath<Select>("//*[@id='main']/div[1]/form/select");
    _protonRocketAnchor = 
    App.Components.CreateByXpath<Anchor>("//*[@id='main']/div[2]/ul/li[1]/a[1]");
}

public override void TestsAct()
{
    App.Navigation.Navigate("http://demos.bellatrix.solutions/");

    _sortDropDown.SelectByText("Sort by price: low to high");
}
```
This is one of the ways you can use **TestsArrange** and **TestsAct**. You can create all elements in **TestsArrange** and create all necessary data for the tests. Then in **TestsAct**, execute the actual test logic without asserting anything. Then in each separate test execute single assert or ensure method. Following the best testing practices; having a single assertion in a test. If you execute multiple assertions and if one of them fails, the next ones are not executed which may lead to missing some major clue about a bug in your product. Anyhow, BELLATRIX allows you to write your tests the standard way of executing the primary logic in the tests or reuse some of it through the usage of **TestInit** and **TestCleanup** methods.
```csharp
public override void TestInit()
{
    // ...
}
```
Executes a logic before each test in the test class.
```csharp
public override void TestCleanup()
{
    // ...
}
```
Executes a logic after each test in the test class.