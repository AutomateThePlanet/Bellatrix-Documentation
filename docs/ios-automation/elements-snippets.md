---
layout: default
title:  "Elements Snippets"
excerpt: "Learn to generate BELLATRIX iOS element properties using VS snippets."
date:   2018-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/elements-snippets/
anchors:
  introduction: Introduction
  what-is-a-code-snippet: What is a Code Snippet?
  list-of-all-available-snippets: List of All Available Snippets
---
Introduction
-------
Instead of copy pasting the elements and modifying them by hand, you can use BELLATRIX code snippets to do it lots faster.

What is a Code Snippet?
----------------------- 
Code snippets are small blocks of reusable code that can be inserted in a code file using a context menu command or a combination of hotkeys. They typically contain commonly-used code blocks such as try-finally or if-else blocks, but they can be used to insert entire classes or methods. In Visual Studio there are two kinds of code snippet: expansion snippets, which are added at a specified insertion point and may replace a snippet shortcut, and surround-with snippets, which are added to a selected block of code.
BELLATRIX gives you expansion snippets. You can read more how you can write your snippets in the [following blog post](https://www.automatetheplanet.com/visual-studio-code-snippets/).

How to Use BELLATRIX Code Snippets?
-----------------------------------
```csharp
public TextField NumberOne => Element.CreateById<TextField>("IntegerA");
```
For each proxy element in BELLATRIX, we give you a corresponding snippet. For example to generate a **TextField** property, you need to type somewhere in you class **itextfield** and press Tab. (i comes from iOS since you have snippets for other BELLATRIX modules- web, desktop, Android) On the first press of tab, the below code is generated. The first placeholder that is selected is the name of the property. Once you change it, you can press Tab. Then, the second placeholder is chosen- the By locator's type, by default, it is set to Id, press again Tab and change the actual locator.

**Note**: *Snippets are available for Visual Studio installations only on Windows. You need to make sure you have used the BELLATRIX installer to get them.*

List of All Available Snippets
------------------------------
Here is the list of all available snippets for BELLATRIX iOS module:

Snippet | Generated Element
------------ | -------------
ibutton | Button
icheckbox | CheckBox
icombobox | ComboBox
ielement | Element
igrid | Grid
iimage | Image
iimagebutton | ImageButton
ilabel | Label
inumber | Number
ipassword | Password
iprogress | Progress
iradiobutton | RadioButton
iradiogroup | RadioGroup
iseekbar | SeekBar
itabs | Tabs
itextfield | TextField
itogglebutton | ToggleButton
