---
layout: default
title:  "JavaScriptService"
excerpt: "Learn how to use Bellatrix JavaScriptService."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/javascript-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class JavaScriptServiceTests : WebTest
{
    [TestMethod]
    public void FillUpAllFields()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/my-account/");

        App.JavaScriptService.Execute("document.getElementById('username').value = 'Bellatrix';");

        App.ElementCreateService.CreateById<Password>("password").SetPassword("Gorgeous");
        var button = App.ElementCreateService.CreateByClassContaining<Button>("woocommerce-Button button");

        App.JavaScriptService.Execute("arguments[0].click();", button);
    }

    [TestMethod]
    [Ignore]
    public void GetElementStyle()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var resultsCount = App.ElementCreateService.CreateByClassContaining<Element>("woocommerce-result-count");

        string fontSize = App.JavaScriptService.Execute("return arguments[0].style.font-size", resultsCount.WrappedElement);

        Assert.AreEqual("14px", fontSize);
    }
}
```
Explanations
------------
Bellatrix gives you an interface for easier execution of JavaScript code using the JavaScriptService. You need to make sure that you have navigated to the desired web page.
```
App.JavaScriptService.Execute("document.getElementById('username').value = 'Bellatrix';"); 
```
Execute a JavaScript code on the page. Here we find an element with id = 'firstName' and sets its value to 'Bellatrix'.
```
App.JavaScriptService.Execute("arguments[0].click();", button);
```
It is possible to pass an element, and the script executes on it.
```
string fontSize = App.JavaScriptService.Execute("return arguments[0].style.font-size", resultsCount.WrappedElement);
```
Get the results from a script. After that, get the value for a specific style and assert it.