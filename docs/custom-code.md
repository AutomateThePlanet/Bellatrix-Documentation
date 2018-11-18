---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


Speed Test Writing with Element Snippets
```csharp
public TextField UserName => Element.CreateByIdContaining<TextField>("edit");
```

API Usability- Locate Elements
WebDriver Example
```csharp
IWebElement agreeCheckBox = driver.FindElement(By.Id("agreeChB"));
agreeCheckBox.Click();
```

Bellatrix Example
```csharp
var textField = App.ElementCreateService.CreateByIdContaining<TextField>("edit");
```

API Usability- Wait for Elements
```csharp
var button = App.ElementCreateService.CreateByIdContaining<Button>("button").ToBeClickable().ToBeVisible();
button.Click();
```

API Usability- Wait for Elements
```csharp
var button = App.ElementCreateService.CreateByIdContaining<Button>("button").ToBeClickable().ToBeVisible();
button.Click();
```


150+ Additional Elements  Actions
```csharp
var button = App.ElementCreateService.CreateByName<Button>("E Button");
button.Click();

var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");
Assert.AreEqual(false, calendar.IsDisabled);

var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");
checkBox.Check();
Assert.IsTrue(checkBox.IsChecked);

var password = App.ElementCreateService.CreateByAutomationId<Password>("passwordBox");
password.SetPassword("topsecret");
```

Or we bring new useful methods to default controls such as Hover.
```csharp
var datePicker = App.ElementCreateService.CreateByAutomationId<Date>("DatePicker");
datePicker.Hover();
```

The most important attributes of each Android control are included, as well as their assertion alternatives.
```csharp
var label = App.ElementCreateService.CreateByName<Label>("Result Label");
Assert.IsTrue(label.IsPresent);
Assert.AreEqual("Meissa Is Beautiful!", textField.InnerText);
```

ACCELERATE TEST EXECUTION
Optimized Element Finding and Waiting
If you use global timeouts such as WebDriver implicit wait.
```csharp
AndroidDriver<AppiumWebElement> driver = new AndroidDriver<AppiumWebElement>(new Uri("http://127.0.0.1:4723/wd/hub", desiredCaps));
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
```

Another option is to use the global timeout and occasionally add hard-coded pauses in your tests where needed.
```csharp
Thread.Sleep(2000);
```

Optimized App Lifecycle Control
Reuse the app and configure it when to restart.
```csharp
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.RestartEveryTime)]
```


BOOTST TEST RLAIBILITY

Lazy Loading of Elements
WebDriver
```csharp
 var agreeCheckBox = driver.FindElementById("agreeChB"));
var confirmButton = driver.FindElementById("confirm"));
agreeCheckBox.Click(); // disables the button
confirmButton.Click();
```

WebDriver
```csharp
var agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
var confirmButton = App.ElementCreateService.CreateById<Button>("confirm");
agreeCheckBox.Uncheck();
confirmButton.Click();
```

Smart Wait Assertions
```csharp
Assert.AreEqual("Order Completed", successBox.Text);
```

Waits for the message alert to disappear.
```csharp
messageAlert.EnsureIsNotVisible();
```

Wait for message alert to disappear.
```csharp
updateCart.EnsureIsDisabled();
```

You can even fine-tune the timeouts.
```csharp
totalContentBox.EnsureInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);
```


EXTEND THE FRAMEFORK TO FIT YOUR NEED

Extended Test Execution Lifecycle and Plugins

```csharp
 [ExecutionTimeUnder(2)]
 public class MeasuredResponseTimesTests : AndroidTest

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
RadioButton.OverrideClickLocally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    e.ScrollToVisible();
    e.Click();
};
```

Element Action Hooks
```csharp
public void ClickingEventHandler(object sender, ElementActionEventArgs<AndroidElement> arg)
{
    Logger.LogInformation($"Click {arg.Element.ElementName}");
}

public void HoveringEventHandler(object sender, ElementActionEventArgs<AndroidElement> arg)
{
    Logger.LogInformation($"Hover {arg.Element.ElementName}");
}
```


Extend Existing UI Elements

Extension Methods
```csharp
public static class ButtonExtensions
{
   public static void SubmitButtonWithScroll(this Button button)
   {
      button.ToExists().ToBeClickable().WaitToBe();
      button.ScrollToVisible();
      button.Click();
   }
}
```

To use the new method, add a using statement to the extension methods’ namespace.
```csharp
button.SubmitButtonWithScroll();
```

Child Elements
```csharp
public class ExtendedButton : Button
{
    public void SubmitButtonWithScroll()
    {
         this.ToExists().ToBeClickable().WaitToBe();
         ScrollToVisible();
         Click();
    }
}
```

```csharp
ExtendedButton button = App.ElementCreateService.CreateByIdContaining<ExtendedButton>("button");
```

Extend Common Services
```csharp
public static class AppServiceExtensions
{
    public static void LoginToApp(this AndroidAppService appService, string userName, string password)
    {
        var elementCreateService = new ElementCreateService();
        var userNameField = elementCreateService.CreateByIdContaining<TextField>("textBox");
        var passwordField = elementCreateService.CreateByIdContaining<Password>("passwordBox");
        var loginButton = elementCreateService.CreateByIdContaining<Button>("loginButton");

        userNameField.SetText(userName);
        passwordField.SetPassword(password);
        loginButton.Click();
    }
}
```

To use the new method, add a using statement to the extension methods’ namespace.
```csharp
App.AppService.LoginToApp("bellatrix", "topSecret");
```


Add New Find Locators
```csharp
public class ByIdStartingWith : By<AndroidDriver<AndroidElement>, AndroidElement>
{
    private readonly string _locatorValue;

    public ByIdStartingWith(string name)
        : base(name) => _locatorValue = $"new UiSelector().resourceIdMatches(\"{Value}.*\");";

    public override AndroidElement FindElement(AndroidDriver<AndroidElement> searchContext) 
        => searchContext.FindElementByAndroidUIAutomator(_locatorValue);

    public override IEnumerable<AndroidElement> FindAllElements(AndroidDriver<AndroidElement> searchContext) 
        => searchContext.FindElementsByAndroidUIAutomator(_locatorValue);

    public override AppiumWebElement FindElement(AndroidElement element) 
        => element.FindElementByAndroidUIAutomator(_locatorValue);

    public override IEnumerable<AppiumWebElement> FindAllElements(AndroidElement element) 
        => element.FindElementsByAndroidUIAutomator(_locatorValue);

    public override string ToString() => $"ID starting with = {Value}";
}
```

To ease the usage of the locator, we need to create an extension method of ElementCreateService.
```csharp
public static TElement CreateByIdStartingWith<TElement>(this ElementCreateService repo, string id)
  where TElement : Element<AndroidDriver<AndroidElement>, AndroidElement>
{
    return repo.Create<TElement, ByIdStartingWith, AndroidDriver<AndroidElement>, AndroidElement>(new ByIdStartingWith(id));
}
```

Add New Element Wait Methods
```csharp
public class UntilHaveSpecificContent<TDriver, TDriverElement> : BaseUntil<TDriver, TDriverElement>
    where TDriver : AppiumDriver<TDriverElement>
    where TDriverElement : AppiumWebElement
{
    private readonly string _elementContent;

    public UntilHaveSpecificContent(string elementContent, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval)
    {
        _elementContent = elementContent;
        TimeoutInterval = timeoutInterval ?? ConfigurationService.Instance.GetMobileSettings().ElementToHaveContentTimeout;
    }

    public override void WaitUntil<TBy>(TBy by) 
        => WaitUntil(ElementHasSpecificContent(WrappedWebDriver, by), TimeoutInterval, SleepInterval);

    private Func<TDriver, bool> ElementHasSpecificContent<TBy>(TDriver searchContext, TBy by)
        where TBy : By<TDriver, TDriverElement>
    {
        return driver =>
        {
            try
            {
                var element = by.FindElement(searchContext);
                return element.Text == _elementContent;
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
}
```

The next and final step is to create an extension method for all UI elements.
```csharp
public static TElementType ToHaveSpecificContent<TElementType>(
	this TElementType element, 
	string content, 
	int? timeoutInterval = null, 
	int? sleepInterval = null)
where TElementType : Element
{
    var until = new UntilHaveSpecificContent<AndroidDriver<AndroidElement>, AndroidElement>(content, timeoutInterval, sleepInterval);
    element.EnsureState(until);
    return element;
}
```

HUMAN READABLE

WebDriver Example
```csharp
AppiumWebElement agreeCheckBox = driver.FindElementById("agreeChB"));
agreeCheckBox.Click();

AppiumWebElement firstNameTextField = driver.FindElementById("firstName"));
firstNameTextField.SendKeys("John");

AppiumWebElement saveBtn = driver.FindElementById("saveBtn"));
agreeCheckBox.SendKeys(Keys.Enter);
```

Bellatrix Example
```csharp
var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");
checkBox.Check();

var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("select");
comboBox.SelectByText("Item2");

var button = App.ElementCreateService.CreateByName<Button>("button");
button.Click();

var textField = App.ElementCreateService.CreateByAutomationId<TextField>("textBox");
textField.SetText("Meissa Is Beautiful!");
```

Hide Low-level Details with Page Objects
Bellatrix Example
```csharp
var homePage = App.GoTo<HomePage>();

homePage.FilterProducts(ProductFilter.Popularity);
homePage.AddProductById(28);
homePage.ViewCartButton.Click();

var cartPage = App.Create<CartPage>();

cartPage.ApplyCoupon("happybirthday");
cartPage.UpdateProductQuantity(1, 2);
cartPage.AssertTotalPrice("95.00");
cartPage.ProceedToCheckout.Click();
```


TEST RESPONSIVE
200+ Assertions Based on Coordinates
```csharp
[TestMethod]
public void TestPageLayout()
{
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");
    var secondButton = App.ElementCreateService.CreateByIdContaining<Button>("button_disabled");
    var checkBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check1");
    var secondCheckBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check2");
    var mainElement = App.ElementCreateService.CreateById<Element>("android:id/content");

    button.AssertAboveOf(checkBox);

    checkBox.AssertNearBottomRightOf(button);
    button.AssertNearTopLeftOf(checkBox);

    LayoutAssert.AssertAlignedHorizontallyAll(button, secondButton);

    LayoutAssert.AssertAlignedVerticallyAll(secondCheckBox, checkBox);

    button.AssertInsideOf(mainElement);

    button.AssertHeightLessThan(100);
    button.AssertWidthBetween(50, 80);
}
```

Depending on what you want to check, Bellatrix gives lots of options. You can test px perfect or just that some element is below another. Check that the purchase button is above the calendar.
```csharp
button.AssertAboveOf(checkBox);
```

Assert with the exact distance between them.
```csharp
button.AssertAboveOf(checkBox, 105);
```

For each available method, you have variations of it such as, >, >=, <, <=, between and approximate to some expected value by specified %.

```csharp
button.AssertAboveOfGreaterThan(checkBox, 100);
button.AssertAboveOfGreaterThanOrEqual(checkBox, 105);
button.AssertAboveOfLessThan(checkBox, 110);
button.AssertAboveOfLessThanOrEqual(checkBox, 105);
```

The expected distance is ~104px with 10% tolerance.
```csharp
button.AssertAboveOfApproximate(checkBox, 104, percent: 10);
```

The expected distance is ~104px with 10% tolerance.
```csharp
checkBox.AssertNearBottomRightOf(button);
button.AssertNearTopLeftOf(checkBox);
```

You can test whether different desktop elements are aligned correctly.
```csharp
LayoutAssert.AssertAlignedHorizontallyAll(button, secondButton);
LayoutAssert.AssertAlignedHorizontallyTop(button, secondButton);
LayoutAssert.AssertAlignedHorizontallyCentered(button, secondButton, secondButton);
LayoutAssert.AssertAlignedHorizontallyBottom(button, secondButton, secondButton);

LayoutAssert.AssertAlignedVerticallyAll(secondCheckBox, checkBox);
```

Verify the height and width of elements.
```csharp
button.AssertHeightLessThan(100);
button.AssertWidthBetween(50, 80);
```

Assert that the elements are aligned vertically only from the left side.
```csharp
button.AssertInsideOf(mainElement);
```

TROBLESHOOTING
Screenshot on Test Failure
```csharp
[TestClass]
[ScreenshotOnFail(true)]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls",
    AppBehavior.ReuseIfStarted)]
public class ScreenshotsOnFailTests : AndroidTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

        button.Click();
    }
}
```


Video on Test Failure
```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls",
    AppBehavior.ReuseIfStarted)]
public class VideoRecordingTests : AndroidTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

        button.Click();
    }
}
```

Measure Test Execution Times
```csharp
[TestClass]
[ExecutionTimeUnder(2000, TimeUnit.Milliseconds)]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.ReuseIfStarted)]
public class MeasureTestExecutionTimesTests : AndroidTest
```


UNIFID TEAM CONVETIONS
All Bellatrix projects come with predefined StyleCop and .editorconfig rules:

```csharp
StyleCopeRules.ruleset
.editorconfig
```