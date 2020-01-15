---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------

```csharp
public class ByIdEndingWith : By
{
    public ByIdEndingWith(string value)
        : base(value)
    {
    }
    public override OpenQA.Selenium.By Convert() 
    {
        return OpenQA.Selenium.By.CssSelector($"[id^='{Value}']");
    }
}
```

```csharp
public static TElement CreateByIdStartingWith<TElement>(this ElementCreateService repository, string idStarting)
    where TElement : Element
{
    repository.Create<TElement, ByIdStartingWith>(new ByIdStartingWith(idStarting));
}
```


Add New Element Wait Methods

```csharp
public class UntilHasStyle : BaseUntil
{
    private readonly string _elementStyle;
    public UntilHasStyle(string elementStyle, int? timeoutInterval = null, int? sleepInterval = null)
        : base(timeoutInterval, sleepInterval)
    {
        _elementStyle = elementStyle;
    }
    public override void WaitUntil<TBy>(TBy by)
    {
       WaitUntil(ElementHasStyle(WrappedWebDriver, by), TimeoutInterval, SleepInterval);
    }
    private Func<IWebDriver, bool> ElementHasStyle<TBy>(ISearchContext searchContext, TBy by)
        where TBy : By
     {
        return driver =>
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
}
```

```csharp
public static TElementType ToHasStyle<TElementType>(
    this TElementType element,
    string style, 
    int? timeoutInterval = null,
    int? sleepInterval = null)
    where TElementType : Element
{
    var until = new UntilHasStyle(style, timeoutInterval, sleepInterval);
    element.EnsureState(until);
    return element;
}
```

Typified Elements
```csharp
IWebElement agreeCheckBox = driver.FindElement(By.Id("agreeChB"));
agreeCheckBox.Click();
IWebElement firstNameTextField = driver.FindElement(By.Id("firstName"));
firstNameTextField.SendKeys("John");
IWebElement avatarUpload = driver.FindElement(By.Id("uploadAvatar"));
avatarUpload.SendKeys("pathTomyAvatar.jpg");
IWebElement saveBtn = driver.FindElement(By.Id("saveBtn"));
agreeCheckBox.SendKeys(Keys.Enter);
```

BELLATRIX Example
```csharp
CheckBox agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
agreeCheckBox.Check();
TextField firstNameTextField = App.ElementCreateService.CreateById<TextField>("firstName");
firstNameTextField.SetText("John");
InputFile avatarUpload = App.ElementCreateService.CreateById<InputFile>("uploadAvatar");
avatarUpload.Upload("pathTomyAvatar.jpg");
Button saveBtn = App.ElementCreateService.CreateById<Button>("saveBtn");
saveBtn.ClickByEnter();
```


BELLATRIX Example
```csharp
Select billingCountry = App.ElementCreateService.CreateById<Select>("billing_country");
billingCountry.SelectByText("Bulgaria");
```

Vanilla WebDriver Example

```csharp
IWebDriver driver;
IWebElement billingCountry = driver.FindElement(By.Id("billing_country"));
var billingCountrySelectElement = new SelectElement(billingCountry);
billingCountrySelectElement.SelectByText("Bulgaria");
```

Or we bring new useful methods to default controls such as Focus and Hover.
BELLATRIX Example


```csharp
var confirmBtn = App.ElementCreateService.CreateById<Button>("confirm");
confirmBtn.Hover();
confirmBtn.Focus();
```

To hover an element directly with WebDriver you can use the following code.

Vanilla WebDriver Example

```csharp
IWebDriver driver;
IJavaScriptExecutor jsDriver = (IJavaScriptExecutor)driver;
jsDriver.ExecuteScript("arguments[0].onmouseover();", element);
```

See a similar example how to focus an element with vanilla WebDriver.
Vanilla WebDriver Example
```csharp
IWebDriver driver;
IJavaScriptExecutor jsDriver = (IJavaScriptExecutor)driver;
jsDriver.ExecuteScript("arguments[0].focus();", element);
```

Most important attributes of each web control are included and their assertion alternatives.

BELLATRIX Example

```csharp
var confirmBtn = App.ElementCreateService.CreateById<Button>("confirm");
confirmBtn.EnsureAccessKeyIs(5);
var productQuantity = App.ElementCreateService.CreateById<Number>("qt_number");
productQuantity.EnsureMaxIs(5);
```

Automating HTML 5 Web Controls

BELLATRIX Example


```csharp
Phone billingPhone = App.ElementCreateService.CreateById<Phone>("billing_phone");
billingPhone.SetPhone("+00359894646464");
Color carColor = App.ElementCreateService.CreateById<Color>("car_color");
carColor.SetColor("#f00030");
Time timeElement = App.ElementCreateService.CreateById<Time>("time");
timeElement.SetTime(12, 12);
```

Vanilla WebDriver Example
```csharp
void SetTime(int hours, int minutes)
{
    IWebDriver driver;
    IJavaScriptExecutor jsDriver = (IJavaScriptExecutor)driver;
    jsDriver.ExecuteScript("arguments[0].setAttribute(value, arguments[1]);", element, $"{hours}:{minutes}:00");
}
```


```csharp
test
```



```csharp
test
```


```csharp
test
```



```csharp
test
```



```csharp
test
```



```csharp
test
```
