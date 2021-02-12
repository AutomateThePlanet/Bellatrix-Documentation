---
layout: default
title:  "Folder and File Structure"
excerpt: "Learn what each BELLATRIX project templates includes."
date:   2018-02-20 06:50:17 +0200
parent: api-automation
permalink: /api-automation/folder-and-file-structure/
anchors:
  nuget-dependencies: NuGet Dependencies
  editorconfig: EditorConfig
  stylecop: StyleCop
  test-framework-settings: Test Framework Settings
  testsinitialize: TestsInitialize
  categories: Categories
---
Overview
--------
Find detailed information about what each empty project contains or should contain if you wish to create it manually.

NuGet Dependencies
------------------
```
<PackageReference Include="Bellatrix.API.MSTest" Version="1.1.0.15" />

<PackageReference Include="Microsoft.EntityFrameworkCore" Version="2.0.3" />
<PackageReference Include="Microsoft.Extensions.Configuration" Version="2.0.2" />
<PackageReference Include="Microsoft.Extensions.Configuration.Binder" Version="2.0.2" />
<PackageReference Include="Microsoft.Extensions.Configuration.Json" Version="2.0.2" />
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="15.7.2" />
<PackageReference Include="MSTest.TestAdapter" Version="1.3.0" />
<PackageReference Include="MSTest.TestFramework" Version="1.3.0" />
<PackageReference Include="NJsonSchema" Version="9.10.46" />
<PackageReference Include="System.Security.Permissions" Version="4.4.1" />
<PackageReference Include="Unity" Version="5.8.6" />
<PackageReference Include="StyleCop.Analyzers" Version="1.1.0-beta004"/>
<PackageReference Include="RestSharp" Version="106.2.2" />
```
**Microsoft.NET.Test.Sdk**, **MSTest.TestAdapter**,** MSTest.TestFramework** are prerequisites so that you can execute MSTest framework tests.
Since Bellatrix.API is a wrapper around RestSharp we install it.
Also, we use Unity inversion of control container inside BELLATRIX for many things.  You will not be able to use it directly, but there are a couple of ways that you will use it in your code for some more complex scenarios.
Lastly, we install StyleCop.Analyzers, we use it to enforce coding standards in the tests code.

EditorConfig
------------
**EditorConfig** helps developers define and maintain consistent coding styles between different editors and IDEs. The **EditorConfig** project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. **EditorConfig** files are easily readable, and they work nicely with version control systems. You can override the global Visual Studio settings through a **.editorconfig **file placed on solution level. All projects come with a predefined set of this rules that we advise you to use. You can always change them to follow your company's global coding standards.

**.editorconfig** You can read more about it [here](https://automatetheplanet.com/coding-styles-editorconfig/).


**Note**: *The version may vary if you install the template now.*

StyleCop
--------
**StyleCop** is an open source static code analysis tool from Microsoft that checks C# code for conformance to **StyleCop**'s recommended coding styles and a subset of Microsoft's .NET Framework Design Guidelines.
The **StyleCopAnalyzers** open source project is similar to **EditorConfig**. It integrates with all versions of Visual Studio. It contains set of style and consistency rules. The code is checked on a build. If some of the rules are violated warning messaged are displayed. This way you can quickly locate the problems and fix them.

You can find more detailed information [here](https://automatetheplanet.com/style-consistency-rules-stylecop/).

All projects come with predefined StyleCop rules:
- stylecop.json
- StyleCopeRules.ruleset

**Note**: *You can reuse both .editorconfig and StyleCop files. Place them in a folder inside your solution and change their paths inside your projects' MSBuild files. As with .editorconfig, you can change the predefined rules to fit your company's standards.*

Test Framework Settings
-----------------------
There are three files **testFrameworkSettings**. They are JSON files. These are the main settings files for .NET Core and .NET Standard libraries. Depending on your build configuration the different files are used. For example, if you run your tests in Debug the **testFrameworkSettings.Debug.json** file is used.

**Note**: *There isn't a way as in .NET Framework to reuse the content, so if you want to make changes you need to do it in each file separately. *

There is a separate more detailed section in the guide describing how to use the configuration files.

Categories
----------
Contains constants that we use to mark our tests for easier filtering.