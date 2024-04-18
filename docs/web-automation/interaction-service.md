---
layout: default
title:  "InteractionsService"
excerpt: "Learn how to use BELLATRIX InteractionService."
date:   2019-05-18 06:50:17 +0200
parent: web-automation
permalink: /web-automation/interactions-service/
anchors:
  example: Example
  explanations: Explanations
  playwright: Playwright
---
Example
-------
```csharp
[TestFixture]
[Browser(BrowserType.Chrome, Lifecycle.RestartEveryTime)]
public class InteractionsServiceTests : WebTest
{
    [Test]
    [Category(Categories.CI)]
    public void DragAndDrop()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        Anchor protonRocketAnchor = App.Components.CreateByAttributesContaining<Anchor>("href", "/proton-rocket/");
        Anchor protonMAnchor = App.Components.CreateByAttributesContaining<Anchor>("href", "/proton-m/");

        App.Interactions.MoveToElement(protonRocketAnchor).DragAndDrop(protonRocketAnchor, protonMAnchor).Perform();
    }

    [Test]
    [Category(Categories.CI)]
    public void KeyUp()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        Anchor protonRocketAnchor = App.Components.CreateByAttributesContaining<Anchor>("href", "/proton-rocket/");
        Anchor protonMAnchor = App.Components.CreateByAttributesContaining<Anchor>("href", "/proton-m/");

        App.Interactions.MoveToElement(protonRocketAnchor).KeyUp(Keys.LeftShift).ContextClick().Perform();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier execution of complex UI interactions such as drag & drop, move to element, double click, etc. BELLATRIX interaction APIs are simplified and made to be as user-friendly as possible. Their usage can eliminate lots of code duplication and boilerplate code. You can access the interaction methods through the **App** class.
```csharp
App.Interactions.MoveToElement(protonRocketAnchor).Perform();
```
You can chain more than one method. At the end of the method chain you need to call the Perform method.
```csharp
App.Interactions.MoveToElement(protonRocketAnchor).KeyUp(Keys.LeftShift).ContextClick().Perform();
```
All Available Interaction Methods
---------------------------------
- Release
- KeyDown
- KeyUp
- SendKeys
- Click
- ClickAndHold
- DoubleClick
- ContextClick
- DragAndDrop
- MoveToElement
- MoveByOffset

Playwright
------------
When using **KeyUp**, or **KeyDown** methods, you pass the key as a string.