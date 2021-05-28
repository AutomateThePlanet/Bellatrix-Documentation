---
layout: default
title:  "Angular Support"
excerpt: "Learn more about the BELLATRIX Angular support."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/angular/
anchors:
  example: Example
  explanations: Explanations
  explanations: Configuration
  available-create-methods: Available Create Methods
---
Example
-------
```csharp
[Test]
public void ShouldGreetUsingBinding()
{
    App.NavigationService.Navigate("http://www.angularjs.org");
    var textField = App.Components.CreateByNgModel<TextField>("yourName");

    textField.SetText("Julie");

    var heading = App.Components.CreateByNgBinding<Heading>("yourName");

    heading.ValidateInnerTextIs("Hello Julie!");
}

[Test]
public void ShouldListTodos()
{
    App.NavigationService.Navigate("http://www.angularjs.org");
    var labels = App.Components.CreateAllByNgRepeater<Label>("todo in todoList.todos");

    Assert.AreEqual("build an AngularJS app", labels[1].InnerText.Trim());
}

[Test]
public void Angular2Test()
{
    App.NavigationService.Navigate("https://material.angular.io/");
    App.BrowserService.WaitForAngular();

    var button = App.Components.CreateByXpath<Button>("//a[@routerlink='/guide/getting-started']");
    button.Click();

    Assert.AreEqual("https://material.angular.io/guide/getting-started", App.BrowserService.Url.ToString());
}
```

Explanations
-------
```csharp
var textField = App.Components.CreateByNgModel<TextField>("yourName");
```
```csharp
<input type="text" ng-model="yourName" placeholder="Enter a name here" class="ng-pristine ng-valid ng-empty ng-touched">
```
BELLATRIX can find elements through Angular locators, for example by the Angular ng-model attribute.
```csharp
var heading = App.Components.CreateByNgBinding<Heading>("yourName");
```
Find element by Angular ng-binding.
```csharp
var labels = App.Components.CreateAllByNgRepeater<Label>("todo in todoList.todos");
```
```csharp
<li ng-repeat="todo in todoList.todos" class="ng-scope">
```
Find element(s) by Angular ng-repeat.
```csharp
App.BrowserService.WaitForAngular();
```
If the automatic wait for Angular is turned off, you can tell the framework explicitly to wait.

Configuration
-------------
If you open the **testFrameworkSettings.json** file, you will find the property **shouldWaitForAngular**. If it is set to, **true** BELLATRIX automatically wait for Angular operations when a page is reloaded, or element is found.
```json
"webSettings": {
	"shouldScrollToVisibleOnElementFound": "true",
	"shouldWaitUntilReadyOnElementFound": "true",
	"shouldWaitForAngular": "true",
	"shouldHighlightElements": "false",
```

Available Create Methods
------------------------
On top of all BELLATRIX element selectors you can find the following supporting Angular. They work on both **ElementCreationService** and **Element** level.
### CreateByNgBinding ###
```csharp
App.Components.CreateByNgBinding<Anchor>("youName");
```
Searches the element by ng-binding locator.
### CreateByNgModel ###
```csharp
App.Components.CreateByNgModel<Anchor>("youName");
```
Searches the element by ng-model locator.
### CreateByNgRepeater ###
```csharp
App.Components.CreateByNgRepeater<Option>("youName");
```
Searches the element by ng-repeater locator.
### CreateByNgSelectedOption ###
```csharp
App.Components.CreateByNgSelectedOption<Option>("yourOption");
```
Searches the element by current selected Angular option.

You have similar methods for finding a list of elements.