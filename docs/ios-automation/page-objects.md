---
layout: default
title:  "Page Objects"
excerpt: "Learn how to use the BELLATRIX page objects."
date:   2018-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/page-objects/
anchors:
  introduction: Introduction
  non-page-object-test-example: Non-page-object Test Example
  how-to-create-bellatrix-page-object: How to Create BELLATRIX Page Object
  page-object-example: Page Object Example
  page-object-example-explanations: Page Object Example Explanations
  page-object-test-example: Page Object Test Example
  page-object-test-example-explanations: Page Object Test Example Explanations
---

Introduction
------------
As you most probably noticed this is like the 4th time we use almost the same elements and logic inside our tests. Similar test writing approach leads to unreadable and hard to maintain tests. Because of that people use the so-called Page Object design pattern to reuse their elements and pages' logic. BELLATRIX comes with powerful built-in page objects which are much more readable and maintainable than regular vanilla WebDriver ones.

Non-page-object Test Example
----------------------------
```csharp
[TestMethod]
public void ActionsWithoutPageObjectsFirst()
{
    var numberOne = App.ElementCreateService.CreateById<TextField>("IntegerA");
    var numberTwo = App.ElementCreateService.CreateById<TextField>("IntegerB");
    var compute = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");
    var answer = App.ElementCreateService.CreateByName<Label>("Answer");

    numberOne.SetText("5");
    numberTwo.SetText("6");
    compute.Click();

    Assert.AreEqual("11", answer.GetText());
}
```

How to Create BELLATRIX Page Object
-----------------------------------
On most pages, you need to define elements. Placing them in a single place makes the changing of the locators easy. It is a matter of choice whether to have action methods or not. If you use the same combination of same actions against a group of elements then it may be a good idea to wrap them in a page object action method. In our example, we can wrap the transfer of an item in such a method.
In the assertions file, we may place some predefined ensure methods. For example, if you always check the same email or title of a screen, there is no need to hard-code the string in each test. Later if the title is changed, you can do it in a single place. The same is true about most of the things you can assert in your tests.

Page Object Example
-------------------
### Methods File ###
```csharp
public partial class CalculatorPage : AssertedPage
{
    public void Sum(int firstNumber, int secondNumber)
    {
        NumberOne.SetText(firstNumber.ToString());
        NumberTwo.SetText(secondNumber.ToString());
        Compute.Click();
    }
}
```
### Elements File ###
```csharp
public partial class CalculatorPage
{
    public Button Compute => Element.CreateByName<Button>("ComputeSumButton");
    public TextField NumberOne => Element.CreateById<TextField>("IntegerA");
    public TextField NumberTwo => Element.CreateById<TextField>("IntegerB");
    public Label Answer => Element.CreateByName<Label>("Answer");
}
```
### Assertions File ###
```csharp
public partial class CalculatorPage
{
    public void AssertAnswer(int answer)
    {
        Answer.ValidateTextIs(answer.ToString());
    }
}
```

Page Object Example Explanations
--------------------------------
```csharp
public partial class CalculatorPage : AssertedPage
```
All BELLATRIX page objects are implemented as partial classes which means that you have separate files for different parts of it- actions, elements, assertions but at the end, they are all built into a single type. This makes the maintainability and readability of these classes much better. Also, you can easier locate what you need. You can always create BELLATRIX page objects yourself inherit one of the 2 classes- Page, AssertedPage. We advise you to follow the convention with partial classes, but you are always free to put all pieces in a single file.
```csharp
public void Sum(int firstNumber, int secondNumber)
{
    NumberOne.SetText(firstNumber.ToString());
    NumberTwo.SetText(secondNumber.ToString());
    Compute.Click();
}
```
These elements are always used together when an item is transferred. There are many test cases where you need to transfer different items and so on. This way you reuse the code instead of copy-paste it. If there is a change in the way how the item is transferred, change the workflow only here. Even single line of code is changed in your tests.
```csharp
public Button Compute => Element.CreateByName<Button>("ComputeSumButton");
```
All elements are placed inside the file **PageName.Elements** so that the declarations of your elements to be in a single place. It is convenient since if there is a change in some of the locators or elements types you can apply the fix only here. All elements are implements as properties. Here we use the short syntax for declaring properties, but you can always use the old one. **Elements** property is actually a shorter version of **ElementCreateService**.
```csharp
public void AssertAnswer(int answer)
{
    Answer.ValidateTextIs(answer.ToString());
}
```
With this Assert, reuse the formatting of the currency and the timeout. Also, since the method is called from the page it makes your tests a little bit more readable. If there is a change what needs to be checked --> for example, not span but different element you can change it in a single place.

Page Object Test Example
------------------------
```csharp
[TestMethod]
public void ActionsWithPageObjectsSecond()
{
    var mainPage = App.Create<CalculatorPage>();

    mainPage.Sum(20, 30);

    mainPage.AssertAnswer(50);
}
```

Page Object Test Example Explanations
-------------------------------------
```csharp
var mainPage = App.Create<CalculatorPage>();
```
You can use the App Create method to get an instance of it.
```csharp
 mainPage.Sum(20, 30);
```
After you have the instance, you can directly start using the action methods of the page. As you can see the test became much shorter and more readable. The additional code pays off in future when changes are made to the page, or you need to reuse some of the methods.