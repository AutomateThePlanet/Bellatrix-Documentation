---
layout: default
title:  "JavaScriptService"
excerpt: "Learn how to use BELLATRIX JavaScriptService."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/javascript-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
[Browser(BrowserType.Chrome, Lifecycle.RestartEveryTime)]
public class JavaScriptServiceTests : WebTest
{
    [Test]
    public void FillUpAllFields()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/my-account/");

        App.JavaScript.Execute("document.getComponentById('username').value = 'BELLATRIX';");

        App.Components.CreateById<Password>("password").SetPassword("Gorgeous");
        var button = App.Components.CreateByClassContaining<Button>("woocommerce-Button button");

        App.JavaScript.Execute("arguments[0].click();", button);
    }

    [Test]
    public void GetComponentStyle()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        var resultsCount = App.Components.CreateByClassContaining<Element>("woocommerce-result-count");

        string fontSize = App.JavaScript.Execute("return arguments[0].style.font-size", resultsCount.WrappedElement);

        Assert.AreEqual("14px", fontSize);
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier execution of JavaScript code using the JavaScriptService. You need to make sure that you have navigated to the desired web page.
```csharp
App.JavaScript.Execute("document.getComponentById('username').value = 'BELLATRIX';"); 
```
Execute a JavaScript code on the page. Here we find an element with id = 'firstName' and sets its value to 'BELLATRIX'.
```csharp
App.JavaScript.Execute("arguments[0].click();", button);
```
It is possible to pass an element, and the script executes on it.
```csharp
string fontSize = App.JavaScript.Execute("return arguments[0].style.font-size", resultsCount.WrappedElement);
```
Get the results from a script. After that, get the value for a specific style and assert it.