---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------
WebDriver Example 
```csharp
 var agreeCheckBox = driver.FindElement(By.Id("agreeChB")); // checked by default
var confirmButton = driver.FindElement(By.Id("confirm"));
agreeCheckBox.Click(); // disables the button
confirmButton.Click();
```


Bellatrix example 
```csharp
var agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
var confirmButton = App.ElementCreateService.CreateById<Button>("confirm");
agreeCheckBox.Uncheck();
confirmButton.Click();
```


In most cases, if you just call the following code snippet, your test will fail because the DIV with a correct message might be displayed asynchronously with JS code.
```csharp
Assert.AreEqual("Order Completed", successDiv.Text);
```

Waits for the message alert to disappear.
```csharp
updateCart.EnsureIsDisabled();
```

Wait for message alert to disappear.
```csharp
messageAlert.EnsureIsNotVisible();
```

You can even fine-tune the timeouts.
```csharp
totalSpan.EnsureInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);
```

EXTEND

This is how we specify the maximal allowed time.
```csharp
 [ExecutionTimeUnder(2)]
 public class MeasuredResponseTimesTests : WebTest

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


For example, instead of using our button Click method, use JavaScript
```csharp
[AssemblyInitialize]
public static void AssemblyInitialize(TestContext testContext)
{
    Button.OverrideClickGlobally = (e) =>
    {
        e.ToExists().ToBeClickable().WaitToBe();
        App.JavaScriptService.Execute("arguments[0].click();", e);
    };
}
```


Locally Override Element Actions
```csharp
  Anchor.OverrideFocusLocally = (e) =>
  {
       App.JavaScriptService.Execute("window.focus();");
       App.JavaScriptService.Execute("arguments[0].focus();", anchor);
  };
```

You need to implement the event handlers for these events and subscribe to them.
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


Also, the base class for all web elements- Element provides a few special events as well:
```csharp
public static void OnElementNotFound(object sender, ExceptionEventArgs args)
{
    var exceptionAnalyser = new ExceptionAnalyser();
    exceptionAnalyser.Analyse(args.Exception);
    throw args.Exception;
}

```


One way to extend an existing element is to create an extension method for the additional action.
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


The second way of extending an existing element is to create a child element. Inherit the UI control you want to extend. 
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

Next in your tests, use the ExtendedButton instead of the regular Button to have access to these methods. 
```csharp
ExtendedButton proceedToCheckout = 
 App.ElementCreateService.CreateByClassContaining<ExtendedButton>("checkout-button button alt wc-forward");
```

Extend Common Services.
To extend the Bellatrix common services you can create an extension method for the additional action.
```csharp
public static class NavigationServiceExtensions
{
    public static void NavigateViaJavaScript(this NavigationService navigationService, string url)
    {
        var javaScriptService = new JavaScriptService();
        javaScriptService.Execute($"window.location.href = '{url}';");
    }
}
```
To use the new method, add a using statement to the extension methods’ namespace.
```csharp
App.NavigationService.NavigateViaJavaScript("http://demos.bellatrix.solutions/");
```


Add New Find Locators.
First, we need to create the By locator.
```csharp
public class ByIdEndingWith : By
{
    public ByIdEndingWith(string value)
        : base(value)
    {
    }

    public override OpenQA.Selenium.By Convert() => OpenQA.Selenium.By.CssSelector($"[id^='{Value}']");
}
```

To ease the usage of the locator, we need to create an extension method of ElementCreateService.
```csharp
public static TElement CreateByIdStartingWith<TElement>(this ElementCreateService repository, string idStarting)
    where TElement : Element
{
    repository.Create<TElement, ByIdStartingWith>(new ByIdStartingWith(idStarting));
}
```


Add New Element Wait Methods.
First, create a new class and inherit the BaseUntil class.
```csharp
public class UntilHasStyle : BaseUntil
{
    private readonly string _elementStyle;

    public UntilHasStyle(string elementStyle, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval)
    {
        _elementStyle = elementStyle;
    }

    public override void WaitUntil<TBy>(TBy by) => WaitUntil(ElementHasStyle(WrappedWebDriver, by), TimeoutInterval, SleepInterval);

    private Func<IWebDriver, bool> ElementHasStyle<TBy>(ISearchContext searchContext, TBy by)
        where TBy : By => driver =>
                                    {
                                        try
                                        {
                                            var element = FindElement(searchContext, by);
                                            return element != null && element.GetAttribute("style").Equals(_elementStyle);
                                        }
                                        catch (StaleElementReferenceException)
                                        {
                                            return false;
                                        }
                                    };
}

```

The next and final step is to create an extension method for all UI elements.
```csharp
public static TElementType ToHasStyle<TElementType>(this TElementType element, string style, int? timeoutInterval = null, int? sleepInterval = null)
    where TElementType : Element
{
    var until = new UntilHasStyle(style, timeoutInterval, sleepInterval);
    element.EnsureState(until);
    return element;
}
```
