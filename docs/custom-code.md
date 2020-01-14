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


Improved Example

```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Button>("Promotions").ToBeVisible().ToBeClickable().ToExists();
promotionsLink.Click();
promotionsLink.EnsureIsDisabled();
```

Different Timeouts Problem

```csharp
IWebDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
var wait15Seconds = new WebDriverWait(driver, TimeSpan.FromSeconds(15));
var wait30Seconds = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
var wait45Seconds = new WebDriverWait(driver, TimeSpan.FromSeconds(45));
var promotionsLocator = By.Id("Promotions");
wait15Seconds.Until(ExpectedConditions.ElementExists(promotionsLocator)); // same 30 seconds
var promotionsLink = wait30Seconds.Until(ExpectedConditions.ElementToBeClickable(promotionsLocator));
        
promotionsLink.Click();
```

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

```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Button>("Promotions").ToBeVisible(30).ToBeClickable(20, 2).ToExists(10, 1);
promotionsLink.Click();
promotionsLink.EnsureIsDisabled();
```
