---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------



This is how we specify the maximal allowed time.
```csharp
 [ExecutionTimeUnder(2)]
 public class MeasuredResponseTimesTests : DesktopTest

This is part of the plugin.

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

Override Globally Element Actions
Override{MethodName}Globally.
```csharp
[AssemblyInitialize]
public static void AssemblyInitialize(TestContext testContext)
{
    Button.OverrideClickGlobally = (e) =>
    {
        e.ToExists().ToBeClickable().WaitToBe();
        e.ScrollToVisible();
        e.Click();
    };
}
```

Locally Override Element Actions
```csharp
[AssemblyInitialize]
Expander.OverrideClickLocally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    e.ScrollToVisible();
    e.Click();
};
```

Element Action Hooks
```csharp
public void ClickingEventHandler(object sender, ElementActionEventArgs arg)
{
    Logger.LogInformation($"Click {arg.Element.ElementName}");
}

public void HoveringEventHandler(object sender, ElementActionEventArgs arg)
{
    Logger.LogInformation($"Hover {arg.Element.ElementName}");
}
```



Extend Existing UI Elements

Extension Methods
```csharp
public static class ButtonExtensions
{
    public static void SubmitButtonWithEnter(this Button button)
    {
        var action = new Actions(button.WrappedDriver);
        action.MoveToElement(button.WrappedElement).SendKeys(Keys.Enter).Perform();
    }
}
```

To use the new method, add a using statement to the extension methods’ namespace.
```csharp
proceedToCheckout.SubmitButtonWithEnter();
```

Child Elements
```csharp
public class ExtendedButton : Button
{
    public void SubmitButtonWithEnter()
    {
        var action = new Actions(WrappedDriver);
        action.MoveToElement(WrappedElement).SendKeys(Keys.Enter).Perform();
    }
}
```

```csharp
ExtendedButton proceedToCheckout = 
 App.ElementCreateService.CreateByName<ExtendedButton>("checkout-button");
```


Extend Common Services
```csharp
public static class NavigationServiceExtensions
{
    public static void LoginToApp(this Services.AppService appService, string userName, string password)
    {
        var elementCreateService = new ElementCreateService();
        var userNameField = elementCreateService.CreateByAutomationId<TextField>("textBox");
        var passwordField = elementCreateService.CreateByAutomationId<Password>("passwordBox");
        var loginButton = elementCreateService.CreateByName<Button>("loginButton");

        userNameField.SetText(userName);
        passwordField.SetPassword(password);
        loginButton.Click();
    }
}
```
```csharp
App.AppService.LoginToApp("bellatrix", "topSecret");
```

Add New Find Locators
```csharp
public class ByIdEndingWith : By
{
    private const string XpathEndingWithExpression = "//*[ends-with(@id, '{0}')]";

    public ByIdEndingWith(string value)
        : base(value)
    {
    }

    public override WindowsElement FindElement(WindowsDriver<WindowsElement> searchContext)
        => searchContext.FindElementByXPath(string.Format(XpathEndingWithExpression, Value));

    public override IEnumerable<WindowsElement> FindAllElements(WindowsDriver<WindowsElement> searchContext)
        => searchContext.FindElementsByXPath(string.Format(XpathEndingWithExpression, Value));

    public override AppiumWebElement FindElement(WindowsElement element)
        => element.FindElementByXPath(string.Format(XpathEndingWithExpression, Value));

    public override IEnumerable<AppiumWebElement> FindAllElements(WindowsElement element)
        => element.FindElementsByXPath(string.Format(XpathEndingWithExpression, Value));

    public override string ToString() => $"By ID ending with = {Value}";
}
```

To ease the usage of the locator, we need to create an extension method of ElementCreateService.

```csharp
public static TElement CreateByIdEndingWith<TElement>(this Element element, string idPart)
    where TElement : Element
{
    element.Create<TElement, ByIdEndingWith>(new ByIdEndingWith(idPart));
}
```

Add New Element Wait Methods
```csharp
public class UntilHasContent : BaseUntil
{
    private readonly string _elementStyle;

    public UntilHasContent(string elementStyle, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval)
    {
        _elementStyle = elementStyle;
    }

   public override void WaitUntil<TBy>(TBy by) => WaitUntil(ElementHasContent(WrappedWebDriver, by), TimeoutInterval, SleepInterval);

    private Func<IWebDriver, bool> ElementHasContent<TBy>(WindowsDriver<WindowsElement> searchContext, TBy by)
        where TBy : Locators.By => driver =>
    {
        try
        {
            var element = by.FindElement(searchContext);
            return !string.IsNullOrEmpty(element.Text);
        }
        catch (NoSuchElementException)
        {
            return false;
        }
        catch (InvalidOperationException)
        {
            return false;
        }
    };
}
```

The next and final step is to create an extension method for all UI elements.
```csharp
public static TElementType ToHasContent<TElementType>(this TElementType element, 
int? timeoutInterval = null, int? sleepInterval = null)
 where TElementType : Element
{
    var until = new UntilHaveContent(timeoutInterval, sleepInterval);
    element.EnsureState(until);
    return element;
}
```