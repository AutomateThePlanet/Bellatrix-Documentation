---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------
iOS
ACCELERATE TEST CREATION


Android

```csharp
[AndroidSauceLabs("sauce-storage:ApiDemos.apk",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    AppBehavior.RestartEveryTime)]

[AndroidBrowserStack("pngG38y26LZ5muB1p46P",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    AppBehavior.RestartEveryTime,
    captureVideo: true,
    captureNetworkLogs: true,
    consoleLogType: BrowserStackConsoleLogType.Disable,
    debug: false,
    build: "CI Execution")]

[AndroidCrossBrowserTesting("crossBrowser-storage:ApiDemos.apk",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    AppBehavior.RestartEveryTime,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
```

iOS
```csharp
[IOSSauceLabs("sauce-storage:TestApp.app.zip",
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    AppBehavior.RestartEveryTime)]

[IOSBrowserStack("pngG38y26LZ5muB1p46P",
    "11.3",
    "iPhone 6",
    AppBehavior.RestartEveryTime,
    captureVideo: true,
    captureNetworkLogs: true,
    consoleLogType: BrowserStackConsoleLogType.Disable,
    debug: false,
    build: "CI Execution")]

[IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
    "11.3",
    "iPhone 6",
    AppBehavior.RestartEveryTime,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
```

API Usability- Locate Elements

Webdriver
```csharp
IWebElement agreeCheckBox = driver.FindElement(By.Id("agreeChB"));
agreeCheckBox.Click();
```

Bellatrix Example
```csharp
public TextField NumberOne => Element.CreateById<TextField>("IntegerA");
```

API Usability- Wait for Elements
Example
```csharp
var button = App.ElementCreateService.CreateByName<Button>("button").ToBeClickable().ToBeVisible();
button.Click();
```

150+ Additional Elements  Actions
```csharp
var button = App.ElementCreateService.CreateByName<Button>("button");
button.Click();

var seekBar = App.ElementCreateService.CreateByName<SeekBar>("seekBar);
Assert.AreEqual(false, seekBar.IsDisabled);

var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");
checkBox.Check();
Assert.IsTrue(checkBox.IsChecked);

var password = App.ElementCreateService.CreateById<Password>("passwordBox");
password.SetPassword("topsecret");
```

Or we bring new useful methods to default controls such as ScrollToVisible.
```csharp
var textField = App.ElementCreateService.CreateById<TextField>("IntegerA");
textField .ScrollToVisible(ScrollDirection.Down);
```
The most important attributes of each iOS control are included, as well as their assertion alternatives.

```csharp
var label = App.ElementCreateService.CreateByName<Label>("AnswerLabel");
Assert.IsTrue(label.IsPresent);
Assert.AreEqual("Meissa Is Beautiful!", textField.GetText());
```

ACCELERATE TEST EXECUTION

Optimized Element Finding and Waiting

```csharp
IOSDriver<IOSElement> driver = new IOSDriver<IOSElement>(new Uri("http://127.0.0.1:4723/wd/hub", desiredCaps));
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
```

Another option is to use the global timeout and occasionally add hard-coded pauses in your tests where needed.
```csharp
Thread.Sleep(2000);
```

Optimized App Lifecycle Control

```csharp
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    AppBehavior.ReuseIfStarted)]
public class BellatrixAppBehaviourTests : IOSTest
```

BOOST TEST REABILITY

Lazy Loading of Elements
WebDriver
```csharp
var agreeCheckBox = driver.FindElementById("agreeChB"));
var confirmButton = driver.FindElementById("confirm"));
agreeCheckBox.Click();
confirmButton.Click();
```

Bellatrix
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
Wait for message alert to be disabled

```csharp
updateCart.EnsureIsDisabled();
```
You can even fine-tune the timeouts.

```csharp
totalContentBox.EnsureInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);
```



EXTEND

Extended Test Execution Lifecycle and Plugins

```csharp
[ExecutionTimeUnder(2)]
 public class MeasuredResponseTimesTests : IOSTest

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
        e.ScrollToVisible(ScrollDirection.Down);
        e.Click();
    };
}
```


Locally Override Element Actions
```csharp
RadioButton.OverrideClickLocally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    e.ScrollToVisible(ScrollDirection.Down);
    e.Click();
};
```

Element Action Hooks
```csharp
public void ClickingEventHandler(object sender, ElementActionEventArgs<IOSElement> arg)
{
    Logger.LogInformation($"Click {arg.Element.ElementName}");
}

public void HoveringEventHandler(object sender, ElementActionEventArgs<IOSElement> arg)
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
      button.ScrollToVisible(ScrollDirection.Down);
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
         ScrollToVisible(ScrollDirection.Down);
         Click();
    }
}
```

Next in your tests, use the ExtendedButton instead of the regular Button to have access to these methods. 

```csharp
ExtendedButton button = App.ElementCreateService.CreateByIdContaining<ExtendedButton>("button");
```

Extend Common Services
```csharp
public static class AppServiceExtensions
{
    public static void LoginToApp(this IOSAppService appService, string userName, string password)
    {
        var elementCreateService = new ElementCreateService();
        var userNameField = elementCreateService.CreateById<TextField>("IntegerA");
        var passwordField = elementCreateService.CreateById<Password>("IntegerB");
        var loginButton = elementCreateService.CreateById<Button>("ComputeSumButton");

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
public class ByNameStartingWith : By<IOSDriver<IOSElement>, IOSElement>
{
    private readonly string _locatorValue;

    public ByNameStartingWith(string name)
        : base(name) => _locatorValue = $"//*[starts-with(@name, '{Value}')]";

    public override IOSElement FindElement(IOSDriver<IOSElement> searchContext) => searchContext.FindElementByXPath(_locatorValue);

    public override IEnumerable<IOSElement> FindAllElements(IOSDriver<IOSElement> searchContext) => searchContext.FindElementsByXPath(_locatorValue);

    public override AppiumWebElement FindElement(IOSElement element) => element.FindElementByXPath(_locatorValue);

    public override IEnumerable<AppiumWebElement> FindAllElements(IOSElement element) => element.FindElementsByXPath(_locatorValue);

    public override string ToString() => $"Name starting with = {Value}";
}
```

We override all available methods and use UIAutomator regular expression for finding an element with ID starting with.
To ease the usage of the locator, we need to create an extension method of ElementCreateService.
```csharp
public static TElement CreateByNameStartingWith<TElement>(this ElementCreateService repo, string id)
    where TElement : Element<IOSDriver<IOSElement>, IOSElement>
{
    return repo.Create<TElement, ByNameStartingWith, IOSDriver<IOSElement>, IOSElement>(new ByNameStartingWith(id));
}
```
Add New Element Wait Methods
```csharp
public class UntilHaveSpecificContent<TDriver, TDriverElement> : BaseUntil<TDriver, TDriverElement>
    where TDriver : IOSDriver<TDriverElement>
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


The important part is located in the ElementHasSpecificContent function. There we find the element and check the current value in the Text attribute. The internal WaitUntil will wait until the value changes in the specified time.
The next and final step is to create an extension method for all UI elements.

```csharp
public static TElementType ToHaveSpecificContent<TElementType>(
	this TElementType element, 
	string content, 
	int? timeoutInterval = null, 
	int? sleepInterval = null)
where TElementType : Element
{
    var until = new UntilHaveSpecificContent<IOSDriver<IOSElement>, IOSElement>(content, timeoutInterval, sleepInterval);
    element.EnsureState(until);
    return element;
}
```


HUMAN READABLE


18 UI Elements Ready to Use
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
var checkBox = App.ElementCreateService.CreateByName<CheckBox>("checkBox");
checkBox.Check();

var comboBox = App.ElementCreateService.CreateByName<ComboBox>("select");
comboBox.SelectByText("Jupiter");

var button = App.ElementCreateService.CreateById<Button>("button");
button.Click();

var textField = App.ElementCreateService.CreateByAutomationId<TextField>("textBox");
textField.SetText("Meissa Is Beautiful!");
```


Hide Low-level Details with Page Objects
Bellatrix Example

```csharp
var homePage = App.Get<HomePage>();

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
    var checkBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("checkBox");
    var secondCheckBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("secondsCheckBox");
    var mainElement = App.ElementCreateService.CreateById<Element>("mainView");

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

You can assert the position of elements again each other in all directions- above, below, right, left, top right, top left, below left, below right. Assert that the checkbox is positioned near the top right of the button.


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

TROUBULSHUTING
Screenshot on Test Failure

```csharp
[TestClass]
[ScreenshotOnFail(true)]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    AppBehavior.RestartEveryTime)]
public class ScreenshotsOnFailTests : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```
Video on Test Failure

```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    AppBehavior.RestartEveryTime)]
public class VideoRecordingTests : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Measure Test Execution Times

```csharp
[TestClass]
[ExecutionTimeUnder(5000, TimeUnit.Milliseconds)]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    AppBehavior.RestartEveryTime)]
public class MeasureTestExecutionTimesTests : IOSTest
```
