---
layout: default
title:  "Shadow DOM Automation"
excerpt: "Learn about automating Shadow DOM with BELLATRIX."
date:   2024-04-15 15:00:00 +0200
parent: web-automation
permalink: /web-automation/shadow-dom/
anchors:
  overview: Overview
  points-of-concern: Points of Concern
  bellatrix-solution: BELLATRIX Solution
  inner-logic: Inner Logic
---
Overview
--------
Shadow DOM has always been hard to test automatically. The elements are inside shadow root and they are not accessible from outside with Selenium. Also, another problem with testing elements inside the Shadow DOM is the inability to use XPath queries to locate the elements — they can be found only through CSS.
While this isn't usually a problem as the CSS queries are quite strong themselves, they have their shortcomings — the inability to search by inner text and to traverse the DOM easily.

Another technical issue is the process, when using Selenium:

```csharp
IWebElement element = driver.FindElement(By.XPath("//div[@id='myShadowHost']"));
ISearchContext shadowRoot = element.GetShadowRoot();
shadowRoot.FindElement(By.CssSelector("#simpleInput"));
```

One has to switch the search context. While this also isn't usually a problem, it becomes one when we have nested shadow roots. This may happen due to the concern for encapsulation and reusability during the website development. While automating, what if the element we want to get for our Selenium test is in the innermost nested shadow root?

While the example is for Selenium, similar problems may be encountered with Playwright as well. Although with Playwright one can pierce nested shadow roots without switching the context, one can still use only CSS.

Points of Concern
--------
- CSS Only Queries (No XPath)
- Nested Shadow Roots

BELLATRIX Solution
--------
We have optimized the process of automating the Shadow DOM with BELLATRIX Framework. Using BELLATRIX, you can easily locate elements inside the Shadow DOM using both XPath and CSS and even if the element to be located is in the innermost shadow root, BELLATRIX will automatically search for it and find it — you don't have to write additional code to go inside each individual shadow root.

```csharp
[TestMethod]
public void DirectlyFindingElementInNestedShadowRoot_WithXpath()
{
    var shadowRoot = App.Components.CreateById<ShadowRoot>("complexShadowHost");

    var firstEditAnchor = shadowRoot.CreateByXpath<Anchor>(".//a[@href='#edit']");
    Assert.AreEqual("edit", firstEditAnchor.InnerText);
}

[TestMethod]
public void DirectlyFindingElementInNestedShadowRoot_WithCss()
{
    var shadowRoot = App.Components.CreateById<ShadowRoot>("complexShadowHost");

    var firstEditAnchor = shadowRoot.CreateByCss<Anchor>("[href='#edit']");
    Assert.AreEqual("edit", firstEditAnchor.InnerText);
}
```

While, using native Selenium, this test would have been this complex:

```csharp
[TestMethod]
public void FindingElementInNestedShadowRoot() {
    IWebElement shadowHost = driver.FindElement(By.CssSelector("#complexShadowHost"));
    ISearchContext shadowRoot = shadowHost.GetShadowRoot();

    IWebElement innerShadowHost = shadowRoot.FindElement(By.CssSelector("table#shadowTable.tablesorter tbody tr td div"));
    ISearchContext nestedShadowRoot = innerShadowHost.GetShadowRoot();

    IWebElement editAnchor = nestedShadowRoot.FindElement(By.CssSelector("[href='#edit']"));

    Assert.AreEqual("edit", editAnchor.InnerText);
}
```

There are a 2 breaking points in this native Selenium test:
- What if the location of the nested shadow host changes?
- What if another nested shadow root is introduced?
- What if the edit anchor did not have any attributes and we could have found it only by inner text?

Inner Logic
--------
The logic of how BELLATRIX handles Shadow DOM is as follows:

- Get the inner HTML of the initial shadow root through JavaScript script which gets the inner HTML of any nested shadow root while marking it as a custom element ```<shadow-root>```
- Pass this inner HTML to a HTML parsing library (AngleSharp)
- Find the element through our locator (CSS or XPath)
- Build the absolute CSS location of the element
- Analyze if there are ```<shadow-root>``` elements between the found element and the outermost (initial) shadow root
- Create them as components, if necessary, and chain them as parent-child while also editing the absolute CSS locator (removing the redundant steps)
- Finally, pass the absolute CSS locator to Selenium, with SearchContext being the last shadow root.

The only prerequisite is to find the initial shadow host and create a ShadowRoot component from which searching will be done.