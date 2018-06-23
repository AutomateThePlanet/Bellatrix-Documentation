---
layout: default
title:  "Elements Snippets"
excerpt: "Learn to generate Bellatrix desktop element properties using VS snippets."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/elements-snippets/
anchors:
  introduction: Introduction
  what-is-a-code-snippet: What is a Code Snippet?
  list-of-all-available-snippets: List of All Available Snippets
---
Introduction
-------
Instead of copy pasting the elements and modifying them by hand, you can use Bellatrix code snippets to do it lots faster.

What is a Code Snippet?
----------------------- 
Code snippets are small blocks of reusable code that can be inserted in a code file using a context menu command or a combination of hotkeys. They typically contain commonly-used code blocks such as try-finally or if-else blocks, but they can be used to insert entire classes or methods. In Visual Studio there are two kinds of code snippet: expansion snippets, which are added at a specified insertion point and may replace a snippet shortcut, and surround-with snippets, which are added to a selected block of code.
Bellatrix gives you expansion snippets. You can read more how you can write your snippets in the [following blog post](https://www.automatetheplanet.com/visual-studio-code-snippets/).
How to Use Bellatrix Code Snippets?
------------
```csharp
public TextField CouponCode => Element.CreateById<TextField>("coupon_code");
```
For each proxy element in Bellatrix, we give you a corresponding snippet. For example to generate a **TextField** property, you need to type somewhere in you class **wtextfield** and press Tab.
(w comes from web since you have snippets for other Bellatrix modules- desktop and mobile)
On the first press of tab, the below code is generated. The first placeholder that is selected is the name of the property. Once you change it, you can press Tab. Then, the second placeholder is chosen- the By locator's type, by default, it is set to Id, press again Tab and change the actual locator.

**Note**: *Snippets are available for Visual Studio installations only on Windows. You need to make sure you have used the Bellatrix installer to get them.*

List of All Available Snippets
------------------------------
Here is the list of all available snippets for Bellatrix Web module:
**wanchor** - generates Anchor
**wbutton** - generates Button
**wcheckbox** - generates CheckBox
**wcolor** - generates Color
**wdate** - generates Date
**wdatetimelocal** - generates DateTimeLocal
**wdiv** - generates Div
**welement** - generates Element
**wemail** - generates Email
**wheading** - generates Heading
**wimage** - generates Image
**winputfile** - generates InputFile
**wlabel** - generates Label
**wmonth** - generates Month
**wnumber** - generates Number
**woption** - generates Option
**woutput** - generates Output
**wpassword** - generates Password
**wphone** - generates Phone
**wprogress** - generates Progress
**wradiobutton** - generates RadioButton
**wrange** - generates Range
**wreset** - generates Reset
**wsearch** - generates Search
**wselect** - generates Select
**wspan** - generates Span
**wtextarea** - generates TextArea
**wtextfield** - generates TextField
**wtime** - generates Time
**wurl** - generates Url
**wweek** - generates Week
