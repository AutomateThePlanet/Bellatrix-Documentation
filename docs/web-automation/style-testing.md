---
layout: default
title:  "Style Testing"
excerpt: "Learn how to use the BELLATRIX style testing library."
date:   2019-12-19 06:50:17 +0200
parent: web-automation
permalink: /web-automation/style-testing/
anchors:
  example: Example
  explanations: Explanations
  advanced-usages: Advanced Usages
---
Example
-------
```csharp
[Browser(BrowserType.Chrome, DesktopWindowSize._1280_1024,  Lifecycle.RestartEveryTime)]
[TestClass]
public class StyleTestingTests : WebTest
{
    [TestMethod]
    [TestCategory(Categories.CI)]
    public void TestStyles()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonRocketAnchor = App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/proton-rocket/");
        Anchor saturnVAnchor = App.ElementCreateService.CreateByAttributesContaining<Anchor>("href", "/saturn-v/");

        sortDropDown.AssertFontSize("14px");
        sortDropDown.AssertFontWeight("400");
        sortDropDown.AssertFontFamily("Source Sans Pro");

        protonRocketAnchor.AssertColor("rgba(150, 88, 138, 1)");
        protonRocketAnchor.AssertBackgroundColor("rgba(0, 0, 0, 0)");
        protonRocketAnchor.AssertBorderColor("rgb(150, 88, 138)");

        protonRocketAnchor.AssertTextAlign("center");
        protonRocketAnchor.AssertVerticalAlign("baseline");
    }
}
```

Explanations
-------
Style testing is a module from BELLATRIX that allows you to test the CSS styles of your website, such as background, border, other colors, font size, size, weight, and many others.
```csharp
sortDropDown.AssertFontSize("14px");
```
Assert the font size of the drop-down.
```csharp
protonRocketAnchor.AssertBackgroundColor("rgba(0, 0, 0, 0)");
```
Assert the background color of the anchor.

Advanced Usages
------------
 In the case where you have a style guide for how different elements should look like consistently in your app, you can create a base class containing the tests for checking these styles. For example, you can have a base class for buttons, anchors, tables, and so on. After that, instead of copy-pasting these tests each time, you can derive from these base classes and navigate to the particular page, which should be checked.
```csharp
[Browser(BrowserType.Chrome, DesktopWindowSize._1280_1024,  Lifecycle.RestartEveryTime)]
public abstract class AnchorsStyleTests : WebTest
{
    protected virtual ElementsList<Anchor> Anchors =>
        App.ElementCreateService.CreateAllByTag<Anchor>("a");

    [Test]
    public void Anchors_Displayed_WithFontSize14()
    {
        Anchors.ForEach(c => c.AssertFontSize("14px"));
    }

    [Test]
    public void Anchors_Displayed_WithColor0971A1()
    {
        Anchors.ForEach(c => c.AssertColor("rgba(9, 113, 161, 1)"));
    }

    [Test]
    public void Anchors_Displayed_WithNoBackgroundColor()
    {
        Anchors.ForEach(c => c.AssertBackgroundColor("rgba(0, 0, 0, 0)"));
    }

    [Test]
    public void Anchors_Displayed_WithFontWeight400()
    {
        Anchors.ForEach(c => c.AssertFontWeight("400"));
    }

    [Test]
    public void Anchors_Displayed_WithFontFamilyHelvetica()
    {
        Anchors.ForEach(c => c.AssertFontFamily("Helvetica, Arial, sans-serif"));
    }
}
```
 The class is marked as abstract, and as you can see, we haven't placed the **TestClass** attribute on top of it. The reason is that we don't want to execute the tests in the abstract class but rather in the child classes. Also, we added a protected virtual property for locating all anchors on the page, which will be most probably overridden in the child class- e.g., the locator may be different.
```csharp
[TestFixture]
[ScreenshotOnFail(true)]
public class MultiPickerPopupAnchorStyleTests : AnchorsStyleTests
{
    private BasicPickersPage _basicPickersPage;
    protected override ElementsList<Anchor> Anchors
        => new ElementsList<Anchor>()
        {
            _basicPickersPage.MultiPicker.Popup.Footer.CancelLink,
            _basicPickersPage.MultiPicker.Popup.PopupSearch.CancelAdvancedSearchLink,
        };

    public override void TestsAct()
    {
        _basicPickersPage = App.GoTo<BasicPickersPage>();
        _basicPickersPage.MultiPicker.PickerButton.Click();
    }
}
```
Here we use the advanced feature of the BELLATRIX ElementList control, which allows you to initialize it with already found elements. In our case, we use the page object locators to find the anchors. Also, we override the Anchors property, which is used in our base style tests. The last thing we do is that in the TestsAct (executed only once for all tests in the class)- navigate to the particular area that we want to style check.
 The class is marked as **TestFixture**, and as you will see, the tests will be displayed separately for each child class. Moreover, since we use the inheritance, we reuse the style tests instead of copy-pasting them.