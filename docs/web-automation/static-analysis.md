---
layout: default
title:  "Static Analysis"
excerpt: "Learn how to use the BELLATRIX Static Analysis."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/static-analysis/
anchors:
  introduction: Introduction
  benefits: Benefits
  bellatrix-coding-standards-modules: BELLATRIX Coding Standards Modules
---
Introduction
------------
Coding standards define a programming style. A coding standard does not usually concern itself with wrong or right in a more abstract sense. It is merely a set of rules and guidelines for the formatting of source code.

Benefits
--------
- Seamless Code Integration
- Team Member Integration
- Easy to Debug and Maintain
- Readability
- Minimizes Communication
- Minimizes Performance Pitfalls
- Saves Money Due to Less Man Hours

BELLATRIX Coding Standards Modules
----------------------------------

BELLATRIX comes with two modules for helping you apply coding standards in your tests.

### .editorconfig  ###

**EditorConfig** helps developers define and maintain consistent coding styles between different editors and IDEs. The **EditorConfig** project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. 
**EditorConfig** files are easily readable, and they work nicely with version control systems.
You can override the global Visual Studio settings through a **.editorconfig **file placed on solution level.
All projects come with a predefined set of this rules that we advise you to use. You can always change them to follow your company's global coding standards.

You can read more about it [here](https://automatetheplanet.com/coding-styles-editorconfig/).

### StyleCop ###

**StyleCop** is an open source static code analysis tool from Microsoft that checks C# code for conformance to **StyleCop**'s recommended coding styles moreover, a subset of Microsoft's .NET Framework Design Guidelines.
The StyleCopAnalyzers open source project is similar to **EditorConfig**. It integrates with all versions of Visual Studio. It contains set of style and consistency rules. The code is checked on a build. If some of the rules are violated warning messaged are displayed. This way you can quickly locate the problems and fix them.

You can find more detailed information [here](https://automatetheplanet.com/style-consistency-rules-stylecop/).

All projects come with predefined StyleCop rules:
- **stylecop.json**
- **StyleCopeRules.ruleset**

**Note**:* You can reuse both **.editorconfig** and **StyleCop** files. Place them in a folder inside your solution and change their paths inside your projects' MSBuild files. As with **.editorconfig**, you can change the predefined rules to fit your company's standards.*