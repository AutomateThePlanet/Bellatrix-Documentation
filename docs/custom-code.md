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


Vanilla WebDriver Example

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    IWebDriver driver = new ChromeDriver();
    driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
    var promotionsLink = driver.FindElement(By.Id("Promotions"));
    promotionsLink.Click();
    Console.WriteLine(promotionsLink.TagName);
}
```

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    IWebDriver driver = new ChromeDriver();
    driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
    var promotionsLink = driver.FindElement(By.Id("Promotions"));
    promotionsLink.Click();
    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    wait.Until(ExpectedConditions.InvisibilityOfElementLocated(By.Id("Promotions")));
    Console.WriteLine(promotionsLink.TagName);
}
```

Improved Example

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
    var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
    promotionsLink.Click();
    
    Console.WriteLine(promotionsLink.By.Value);
    Console.WriteLine(promotionsLink.WrappedElement.TagName);
}
```


```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
    var promotionsLink = App.ElementCreateService.CreateById<Button>("Promotions");
    promotionsLink.Click();
    
    promotionsLink.EnsureIsNotVisible();
}
```
Vanilla WebDriver Example

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    IWebDriver driver = new ChromeDriver();
    driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
    var promotionsLink = driver.FindElement(By.Id("Promotions"));
        
    promotionsLink.Click();
     
    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("Promotions")));
}
```


```csharp
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
wait.Until(ExpectedConditions.ElementToBeSelected(By.Id("Promotions")));
```


```csharp
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));  
wait.Until(ExpectedConditions.TextToBePresentInElement(promotionsLink, "Bellatrix"));
```

Improved Example

```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Button>("Promotions");
promotionsLink.Click();
promotionsLink.EnsureIsDisabled();
```

Implicit VS Explicit Waits

```csharp
IWebDriver driver = new ChromeDriver();
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
```
Wait for Conditions Before First Element's Usage


```csharp
IWebDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
var promotionsLink = wait.Until(ExpectedConditions.ElementExists(By.Id("Promotions")));
        
promotionsLink.Click();
```

```csharp
IWebDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
var promotionsLocator = By.Id("Promotions");
wait.Until(ExpectedConditions.ElementExists(promotionsLocator));
var promotionsLink = wait.Until(ExpectedConditions.ElementToBeClickable(promotionsLocator));
        
promotionsLink.Click()
```
Improved Example
```csharp
"timeoutSettings": {
    "waitForAjaxTimeout": "30",
    "sleepInterval": "1",
    "elementToBeVisibleTimeout": "30",
    "elementToExistTimeout": "30",
    "elementToNotExistTimeout": "30",
    "elementToBeClickableTimeout": "30",
    "elementNotToBeVisibleTimeout": "30",
    "elementToHaveContentTimeout": "15"
},
```

Different Timeouts Problem
```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Button>("Promotions").ToBeVisible(30).ToBeClickable(20, 2).ToExists(10, 1);
promotionsLink.Click();
promotionsLink.EnsureIsDisabled();
```


```csharp
Code
```
