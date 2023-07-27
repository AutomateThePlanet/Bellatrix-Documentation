---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

# Web automation

## Most Complete Selenium WebDriver 4.0 Overview

```bash
java -jar selenium-server-4.0.0-alpha-1.jar hub

java -jar selenium-server-4.0.0-alpha-1.jar node --detect-drivers

java -jar selenium-server-4.0.0-alpha-1.jar distributor --sessions http://localhost:5556
```

```bash
java -jar selenium-server-4.0.0-alpha-1.jar standalone -D selenium/standalone-firefox:latest '{"browserName": "firefox"}' --detect-drivers false
```

## Execute Tests in Docker Containers Using Selenoid

```bash
./cm selenoid start --vnc
```

```bash
./cm selenoid-ui start
```

## Full Page Screenshots in WebDriver via Custom-built Browser Extension

```bash
rd /s /q "$(TargetDir)"
```

```bash
xcopy $(ProjectDir)FullPageScreenshotsExtension-Chrome* $(ProjectDir)$(OutDir)FullPageScreenshotsExtension-Chrome /Y /I /E
```

```bash
xcopy $(ProjectDir)FullPageScreenshotsExtension-Edge* $(ProjectDir)$(OutDir)FullPageScreenshotsExtension-Edge /Y /I /E
```

```bash
xcopy $(ProjectDir)FullPageScreenshotsExtension-Firefox* $(ProjectDir)$(OutDir)FullPageScreenshotsExtension-Firefox /Y /I /E
```

## Selenium WebDriver + .NET 5.0 – What Everyone Ought to Know

```bash
dotnet test --logger=trx
```

## Getting Started with SpecFlow in 10 Minutes

```csharp
public partial class HomePage : BasePage
{
    public HomePage(IWebDriver driver) : base(driver)
    {
    }
    public override string Url
    {
        get
        {
            return "http://www.metric-conversions.org/";
        }
    }
}
public partial class HomePage
{
    public IWebElement EnergyAndPowerAnchor
    {
        get
        {
            return this.driver.FindElement(By.XPath("//a[contains(@title,'Energy Conversion')]"));
        }
    }
    public IWebElement KilowattHours
    {
        get
        {
            return this.driver.FindElement(By.XPath("//a[contains(text(),'Kilowatt-hours')]"));
        }
    }
}
```

## Design Grid Control Automated Tests Part 2

```csharp
[TestMethod]
public void OrderDateIsBeforeOrEqualToFilter()
{
    this.driver.Navigate().GoToUrl(
    @"http://demos.telerik.com/kendo-ui/grid/remote-data-binding");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var allItems = this.GetAllItemsFromDb().OrderBy(x => x.OrderDate);
    var lastOrderDate = allItems.First().OrderDate;
    var newItem = this.CreateNewItemInDb();
    newItem.OrderDate = lastOrderDate.AddDays(-1);
    this.UpdateItemInDb(newItem);
    var secondNewItem = this.CreateNewItemInDb(newItem.ShipName);
    secondNewItem.OrderDate = lastOrderDate.AddDays(-2);
    this.UpdateItemInDb(secondNewItem);
    kendoGrid.Filter(
    new GridFilter(
    OrderDateColumnName,
    Enums.FilterOperator.IsBeforeOrEqualTo,
    newItem.OrderDate.ToString()),
    new GridFilter(
    ShipNameColumnName,
    Enums.FilterOperator.EqualTo,
    newItem.ShipName));
    this.WaitForGridToLoadAtLeast(2, kendoGrid);
    var results = kendoGrid.GetItems<Order>();
    Assert.IsTrue(results.Count() == 2);
    Assert.AreEqual(secondNewItem.ToString(), results[0].OrderDate);
    Assert.AreEqual(newItem.ToString(), results[1].OrderDate);
}
```

## Design Grid Control Automated Tests Part 1

```csharp
[TestMethod]
public void ShipNameNotEqualToFilter()
{
    this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/filter-row");
    var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
    var newItem = this.CreateNewItemInDb();
    kendoGrid.Filter(
    new GridFilter(ShipNameColumnName, Enums.FilterOperator.NotEqualTo, newItem.ShipName),
    new GridFilter(OrderIdColumnName, Enums.FilterOperator.EqualTo, newItem.OrderId));
    this.WaitForGridToLoad(0, kendoGrid);
    var items = kendoGrid.GetItems<GridItem>();
    Assert.AreEqual(0, items.Count);
}
```

## 10 Advanced WebDriver Tips and Tricks Part 3

```csharp
public void WaitForAjaxComplete(int maxSeconds)
{
    bool isAjaxCallComplete = false;
    for (int i = 1; i <= maxSeconds; i++)
    {
        isAjaxCallComplete = (bool)((IJavaScriptExecutor)driver).
        ExecuteScript("return window.jQuery != undefined && jQuery.active == 0");
        if (isAjaxCallComplete)
        {
            return;
        }
        Thread.Sleep(1000);
    }
    throw new Exception(string.Format("Timed out after {0} seconds", maxSeconds));
}
```

## 10 Advanced WebDriver Tips and Tricks Part 1

```csharp
public void TakeFullScreenshot(IWebDriver driver, String filename)
{
    Screenshot screenshot = ((ITakesScreenshot)driver).GetScreenshot();
    screenshot.SaveAsFile(filename, ImageFormat.Png);
}
```

```csharp
public void TakeScreenshotOfElement(IWebDriver driver, By by, string fileName)
{
    // 1. Make screenshot of all screen
    var screenshotDriver = driver as ITakesScreenshot;
    Screenshot screenshot = screenshotDriver.GetScreenshot();
    var bmpScreen = new Bitmap(new MemoryStream(screenshot.AsByteArray));
    // 2. Get screenshot of specific element
    IWebElement element = driver.FindElement(by);
    var cropArea = new Rectangle(element.Location, element.Size);
    var bitmap = bmpScreen.Clone(cropArea, bmpScreen.PixelFormat);
    bitmap.Save(fileName);
}
```

```csharp
this.driver.Manage().Timeouts().SetPageLoadTimeout(new TimeSpan(0, 0, 10));
```

```csharp
private void WaitUntilLoaded()
{
    WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    wait.Until((x) =>
    {
        return ((IJavaScriptExecutor)this.driver)
    .ExecuteScript("return document.readyState").Equals("complete");
    });
}
```

## Automate Telerik Kendo Grid with WebDriver and JavaScript

```csharp
public class KendoGrid
{
    private readonly string gridId;
    private readonly IJavaScriptExecutor driver;

    public KendoGrid(IWebDriver driver, IWebElement gridDiv)
    {
        this.gridId = gridDiv.GetAttribute("id");
        this.driver = (IJavaScriptExecutor)driver;
    }

    public void NavigateToPage(int pageNumber)
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.page(", pageNumber, ");");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    private string GetGridReference()
    {
        string initializeKendoGrid = string.Format("var grid = $('#{0}').data('kendoGrid');", this.gridId);

        return initializeKendoGrid;
    }
}
```

```csharp
var grid = $("#grid").data("kendoGrid");

```

```csharp
grid.dataSource.page("5");

```

```csharp
public void Sort(string columnName, SortType sortType)
{
    string jsToBeExecuted = this.GetGridReference();
    jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.sort({field: '", columnName, "', dir: '", sortType.ToString().ToLower(), "'});");
    this.driver.ExecuteScript(jsToBeExecuted);
}
```

```csharp
public void ChangePageSize(int newSize)
{
    string jsToBeExecuted = this.GetGridReference();
    jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.pageSize(", newSize, ");");
    this.driver.ExecuteScript(jsToBeExecuted);
}
```

```csharp
public List<T> GetItems<T>() where T : class
{
    string jsToBeExecuted = this.GetGridReference();
    jsToBeExecuted = string.Concat(jsToBeExecuted, "return JSON.stringify(grid.dataSource.data());");
    var jsResults = this.driver.ExecuteScript(jsToBeExecuted);
    var items = JsonConvert.DeserializeObject<List<T>>(jsResults.ToString());
    return items;
}
```

```csharp
public void Filter(string columnName, FilterOperator filterOperator, string filterValue)
{
    this.Filter(new GridFilter(columnName, filterOperator, filterValue));
}

public void Filter(params GridFilter[] gridFilters)
{
    string jsToBeExecuted = this.GetGridReference();
    StringBuilder sb = new StringBuilder();
    sb.Append(jsToBeExecuted);
    sb.Append("grid.dataSource.filter({ logic: \"and\", filters: [");
    foreach (var currentFilter in gridFilters)
    {
        DateTime filterDateTime;
        bool isFilterDateTime = DateTime.TryParse(currentFilter.FilterValue, out filterDateTime);
        string filterValueToBeApplied =
                                        isFilterDateTime ? string.Format("new Date({0}, {1}, {2})", filterDateTime.Year, filterDateTime.Month - 1, filterDateTime.Day) :
                                        string.Format("\"{0}\"", currentFilter.FilterValue);
        string kendoFilterOperator = this.ConvertFilterOperatorToKendoOperator(currentFilter.FilterOperator);
        sb.Append(string.Concat("{ field: \"", currentFilter.ColumnName, "\", operator: \"", kendoFilterOperator, "\", value: ", filterValueToBeApplied, " },"));
    }
    sb.Append("] });");
    jsToBeExecuted = sb.ToString().Replace(",]", "]");
    this.driver.ExecuteScript(jsToBeExecuted);
}

private string ConvertFilterOperatorToKendoOperator(FilterOperator filterOperator)
{
    string kendoFilterOperator = string.Empty;
    switch (filterOperator)
    {
        case FilterOperator.EqualTo:
            kendoFilterOperator = "eq";
            break;
        case FilterOperator.NotEqualTo:
            kendoFilterOperator = "neq";
            break;
        case FilterOperator.LessThan:
            kendoFilterOperator = "lt";
            break;
        case FilterOperator.LessThanOrEqualTo:
            kendoFilterOperator = "lte";
            break;
        case FilterOperator.GreaterThan:
            kendoFilterOperator = "gt";
            break;
        case FilterOperator.GreaterThanOrEqualTo:
            kendoFilterOperator = "gte";
            break;
        case FilterOperator.StartsWith:
            kendoFilterOperator = "startswith";
            break;
        case FilterOperator.EndsWith:
            kendoFilterOperator = "endswith";
            break;
        case FilterOperator.Contains:
            kendoFilterOperator = "contains";
            break;
        case FilterOperator.NotContains:
            kendoFilterOperator = "doesnotcontain";
            break;
        case FilterOperator.IsAfter:
            kendoFilterOperator = "gt";
            break;
        case FilterOperator.IsAfterOrEqualTo:
            kendoFilterOperator = "gte";
            break;
        case FilterOperator.IsBefore:
            kendoFilterOperator = "lt";
            break;
        case FilterOperator.IsBeforeOrEqualTo:
            kendoFilterOperator = "lte";
            break;
        default:
            throw new ArgumentException("The specified filter operator is not supported.");
    }

    return kendoFilterOperator;
}
```

```csharp
public enum FilterOperator
{
    EqualTo,
    NotEqualTo,
    LessThan,
    LessThanOrEqualTo,
    GreaterThan,
    GreaterThanOrEqualTo,
    StartsWith,
    EndsWith,
    Contains,
    NotContains,
    IsAfter,
    IsAfterOrEqualTo,
    IsBefore,
    IsBeforeOrEqualTo
}
```

```csharp
public class KendoGrid
{
    private readonly string gridId;
    private readonly IJavaScriptExecutor driver;

    public KendoGrid(IWebDriver driver, IWebElement gridDiv)
    {
        this.gridId = gridDiv.GetAttribute("id");
        this.driver = (IJavaScriptExecutor)driver;
    }

    public void RemoveFilters()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.filter([]);");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public int TotalNumberRows()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.total();");
        var jsResult = this.driver.ExecuteScript(jsToBeExecuted);
        return int.Parse(jsResult.ToString());
    }

    public void Reload()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.read();");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public int GetPageSize()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "return grid.dataSource.pageSize();");
        var currentResponse = this.driver.ExecuteScript(jsToBeExecuted);
        int pageSize = int.Parse(currentResponse.ToString());
        return pageSize;
    }

    public void ChangePageSize(int newSize)
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.pageSize(", newSize, ");");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public void NavigateToPage(int pageNumber)
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.page(", pageNumber, ");");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public void Sort(string columnName, SortType sortType)
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "grid.dataSource.sort({field: '", columnName, "', dir: '", sortType.ToString().ToLower(), "'});");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public List<T> GetItems<T>() where T : class
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "return JSON.stringify(grid.dataSource.data());");
        var jsResults = this.driver.ExecuteScript(jsToBeExecuted);
        var items = JsonConvert.DeserializeObject<List<T>>(jsResults.ToString());
        return items;
    }

    public void Filter(string columnName, FilterOperator filterOperator, string filterValue)
    {
        this.Filter(new GridFilter(columnName, filterOperator, filterValue));
    }

    public void Filter(params GridFilter[] gridFilters)
    {
        string jsToBeExecuted = this.GetGridReference();
        StringBuilder sb = new StringBuilder();
        sb.Append(jsToBeExecuted);
        sb.Append("grid.dataSource.filter({ logic: \"and\", filters: [");
        foreach (var currentFilter in gridFilters)
        {
            DateTime filterDateTime;
            bool isFilterDateTime = DateTime.TryParse(currentFilter.FilterValue, out filterDateTime);
            string filterValueToBeApplied =
                                            isFilterDateTime ? string.Format("new Date({0}, {1}, {2})", filterDateTime.Year, filterDateTime.Month - 1, filterDateTime.Day) :
                                            string.Format("\"{0}\"", currentFilter.FilterValue);
            string kendoFilterOperator = this.ConvertFilterOperatorToKendoOperator(currentFilter.FilterOperator);
            sb.Append(string.Concat("{ field: \"", currentFilter.ColumnName, "\", operator: \"", kendoFilterOperator, "\", value: ", filterValueToBeApplied, " },"));
        }
        sb.Append("] });");
        jsToBeExecuted = sb.ToString().Replace(",]", "]");
        this.driver.ExecuteScript(jsToBeExecuted);
    }

    public int GetCurrentPageNumber()
    {
        string jsToBeExecuted = this.GetGridReference();
        jsToBeExecuted = string.Concat(jsToBeExecuted, "return grid.dataSource.page();");
        var result = this.driver.ExecuteScript(jsToBeExecuted);
        int pageNumber = int.Parse(result.ToString());
        return pageNumber;
    }

    private string GetGridReference()
    {
        string initializeKendoGrid = string.Format("var grid = $('#{0}').data('kendoGrid');", this.gridId);

        return initializeKendoGrid;
    }

    private string ConvertFilterOperatorToKendoOperator(FilterOperator filterOperator)
    {
        string kendoFilterOperator = string.Empty;
        switch (filterOperator)
        {
            case FilterOperator.EqualTo:
                kendoFilterOperator = "eq";
                break;
            case FilterOperator.NotEqualTo:
                kendoFilterOperator = "neq";
                break;
            case FilterOperator.LessThan:
                kendoFilterOperator = "lt";
                break;
            case FilterOperator.LessThanOrEqualTo:
                kendoFilterOperator = "lte";
                break;
            case FilterOperator.GreaterThan:
                kendoFilterOperator = "gt";
                break;
            case FilterOperator.GreaterThanOrEqualTo:
                kendoFilterOperator = "gte";
                break;
            case FilterOperator.StartsWith:
                kendoFilterOperator = "startswith";
                break;
            case FilterOperator.EndsWith:
                kendoFilterOperator = "endswith";
                break;
            case FilterOperator.Contains:
                kendoFilterOperator = "contains";
                break;
            case FilterOperator.NotContains:
                kendoFilterOperator = "doesnotcontain";
                break;
            case FilterOperator.IsAfter:
                kendoFilterOperator = "gt";
                break;
            case FilterOperator.IsAfterOrEqualTo:
                kendoFilterOperator = "gte";
                break;
            case FilterOperator.IsBefore:
                kendoFilterOperator = "lt";
                break;
            case FilterOperator.IsBeforeOrEqualTo:
                kendoFilterOperator = "lte";
                break;
            default:
                throw new ArgumentException("The specified filter operator is not supported.");
        }

        return kendoFilterOperator;
    }
}
```

```csharp
[TestClass]
public class KendoGridTests
{
    private IWebDriver driver;

    [TestInitialize]
    public void SetupTest()
    {
        this.driver = new FirefoxDriver();
        this.driver.Manage().Timeouts().SetPageLoadTimeout(TimeSpan.FromSeconds(5));
    }

    [TestCleanup]
    public void TeardownTest()
    {
        this.driver.Quit();
    }

    [TestMethod]
    public void FilterContactName()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        kendoGrid.Filter("ContactName", Enums.FilterOperator.Contains, "Thomas");
        var items = kendoGrid.GetItems<GridItem>();
        Assert.AreEqual(1, items.Count);
    }

    [TestMethod]
    public void SortContactTitleDesc()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        kendoGrid.Sort("ContactTitle", SortType.Desc);
        var items = kendoGrid.GetItems<GridItem>();
        Assert.AreEqual("Sales Representative", items[0]);
        Assert.AreEqual("Sales Representative", items[1]);
    }

    [TestMethod]
    public void TestCurrentPage()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        var pageNumber = kendoGrid.GetCurrentPageNumber();
        Assert.AreEqual(1, pageNumber);
    }

    [TestMethod]
    public void GetPageSize()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));
        var pageNumber = kendoGrid.GetPageSize();
        Assert.AreEqual(20, pageNumber);
    }

    [TestMethod]
    public void GetAllItems()
    {
        this.driver.Navigate().GoToUrl(@"http://demos.telerik.com/kendo-ui/grid/index");
        var kendoGrid = new KendoGrid(this.driver, this.driver.FindElement(By.Id("grid")));

        var items = kendoGrid.GetItems<GridItem>();
        Assert.AreEqual(91, items.Count);
    }
}
```

## Test URL Redirects with WebDriver and HttpWebRequest

```xml
<?xml version="1.0" encoding="utf-8" ?>
<sites>
  <site url="http://automatetheplanet.com/" name="AutomateThePlanet">
    <redirects>
      <redirect from="http://automatetheplanet.com/singleton-design-pattern-design-patterns-in-automation-testing/" to="/singleton-design-pattern/" />
      <redirect from="/advanced-strategy-design-pattern-design-patterns-in-automation-testing/" to="/advanced-strategy-design-pattern/" />
    </redirects>
  </site>
</sites>
```

```csharp
[XmlRoot(ElementName = "sites")]
public class Sites
{
    [XmlElement(ElementName = "site")]
    public List<Site> Site { get; set; }
}

[XmlRoot(ElementName = "site")]
public class Site
{
    [XmlElement(ElementName = "redirects")]
    public Redirects Redirects { get; set; }

    [XmlAttribute(AttributeName = "url")]
    public string Url { get; set; }

    [XmlAttribute(AttributeName = "name")]
    public string Name { get; set; }
}

[XmlRoot(ElementName = "redirects")]
public class Redirects
{
    [XmlElement(ElementName = "redirect")]
    public List<Redirect> Redirect { get; set; }
}

[XmlRoot(ElementName = "redirect")]
public class Redirect
{
    [XmlAttribute(AttributeName = "from")]
    public string From { get; set; }

    [XmlAttribute(AttributeName = "to")]
    public string To { get; set; }
}
```

```csharp
public class RedirectService : IDisposable
{
    readonly IRedirectStrategy redirectEngine;
    private Sites sites;

    public RedirectService(IRedirectStrategy redirectEngine)
    {
        this.redirectEngine = redirectEngine;
        this.redirectEngine.Initialize();
        this.InitializeRedirectUrls();
    }

    public void TestRedirects()
    {
        bool shouldFail = false;

        foreach (var currentSite in this.sites.Site)
        {
            Uri baseUri = new Uri(currentSite.Url);

            foreach (var currentRedirect in currentSite.Redirects.Redirect)
            {
                Uri currentFromUrl = new Uri(baseUri, currentRedirect.From);
                Uri currentToUrl = new Uri(baseUri, currentRedirect.To);

                string currentSitesUrl = this.redirectEngine.NavigateToFromUrl(currentFromUrl.AbsoluteUri);
                try
                {
                    Assert.AreEqual<string>(currentToUrl.AbsoluteUri, currentSitesUrl);
                    Console.WriteLine(string.Format("{0} \n OK", currentFromUrl));
                }
                catch (Exception)
                {
                    shouldFail = true;
                    Console.WriteLine(string.Format("{0} \n was NOT redirected to \n {1}", currentFromUrl, currentToUrl));
                }
            }
        }
        if (shouldFail)
        {
            throw new Exception("There were incorrect redirects!");
        }
    }

    public void Dispose()
    {
        redirectEngine.Dispose();
    }

    private void InitializeRedirectUrls()
    {
        XmlSerializer deserializer = new XmlSerializer(typeof(Sites));
        TextReader reader = new StreamReader(@"redirect-URLs.xml");
        this.sites = (Sites)deserializer.Deserialize(reader);
        reader.Close();
    }
}
```

```csharp
public interface IRedirectStrategy : IDisposable
{
    void Initialize();

    string NavigateToFromUrl(string fromUrl);

    void Dispose();
}
```

```csharp
public class WebDriverRedirectStrategy : IRedirectStrategy
{
    private IWebDriver driver;

    public void Initialize()
    {
        this.driver = new FirefoxDriver();
    }

    public void Dispose()
    {
        this.driver.Quit();
    }

    public string NavigateToFromUrl(string fromUrl)
    {
        this.driver.Navigate().GoToUrl(fromUrl);
        string currentSitesUrl = this.driver.Url;

        return currentSitesUrl;
    }
}
```

```csharp
public class WebRequestRedirectStrategy : IRedirectStrategy
{
    public void Initialize()
    {
    }

    public string NavigateToFromUrl(string fromUrl)
    {
        HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(fromUrl);
        request.Method = "HEAD";
        request.Timeout = (int)TimeSpan.FromHours(1).TotalMilliseconds;
        string currentSitesUrl = string.Empty;
        try
        {
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {
                currentSitesUrl = response.ResponseUri.ToString();
            }
        }
        catch (WebException)
        {
            currentSitesUrl = null;
        }

        return currentSitesUrl;
    }
    public void Dispose()
    {
    }
}
```

```csharp
[TestClass]
public class RedirectsTester
{
    [TestMethod]
    public void TestRedirects()
    {
        var redirectService = new RedirectService(new WebRequestRedirectStrategy());
        using (redirectService)
        {
            redirectService.TestRedirects();
        }
    }
}
```

## Getting Started with WebDriver C# in 10 Minutes

```csharp
IWebDriver firefoxDriver = new FirefoxDriver();
IWebDriver ieDriver = new InternetExlorerDriver();
IWebDriver edgeDriver = new EdgeDriver();
IWebDriver chromeDriver = new ChromeDriver();
```

```csharp
new DriverManager().SetUpDriver(new ChromeConfig());
new DriverManager().SetUpDriver(new FirefoxConfig());
new DriverManager().SetUpDriver(new EdgeConfig());
new DriverManager().SetUpDriver(new OperaConfig());
```

```csharp
driverOne.Navigate().GoToUrl("http://automatetheplanet.com/");

```

```csharp
// By ID
IWebElement element = driverOne.FindElement(By.Id("myUniqueId"));
// By Class (Find more than one element on the page)
IList<IWebElement> elements = driverOne.FindElements(By.ClassName("green"));
// By Tag Name
IWebElement frame = driverOne.FindElement(By.TagName("iframe"));
// By Name
IWebElement cheese = driverOne.FindElement(By.Name("goran"));
// By Link Text
IWebElement link = driverOne.FindElement(By.LinkText("best features"));
// By XPath
IList<IWebElement> inputs = driverOne.FindElements(By.XPath("//input"));
// By CSS Selector
IWebElement css = driverOne.FindElement(By.CssSelector("#green span.dairy.baged"));
```

```csharp
IWebElement hardToFind = this.driverOne.FindElement(By.ClassName(“firstElementTable")).FindElement(By.Id(“secondElement"));
```

```csharp
IWebElement element = driverOne.FindElement(By.Name("search"));
element.Clear();
element.SendKeys("Automate The Planet!");
```

```csharp
SelectElement selectElement = new SelectElement(driver.FindElement(By.XPath("/html/body/select")));
selectElement.SelectByText("Planet");
```

# Development

## Embracing Non-Nullable Reference Types in C# 8

```csharp
static void Main(string[] args)
{
    PassNull(null);
}
public static void PassNull(string? text)
{
    Console.WriteLine("The first char is " + text?[0]);
}
```

```csharp
static void Main(string[] args)
{
    PassNull(null);
}
public static int? PassNull(string? text)
{
    return text?.Length;
}
```

```csharp
public class Cat
{
    public int Id { get; set; }
    public string? Name { get; set; }
}
```

```csharp
public static string PassNull(bool returnNullIfTrue)
{
    return returnNullIfTrue ? "Not null" : null;
}
```

```csharp
public static string? PassNull(bool returnNullIfTrue)
{
    return returnNullIfTrue ? "Not null" : null;
}
```

```csharp
static void Main(string[] args)
{
    var result = PassNull(true);
    string test = result!;
}
```

```csharp
static void Main(string[] args)
{
    var result = PassNull(true)!;
    string test = result;
}
```

```csharp
static void Main(string[] args)
{
    var result = PassNull(true);
    string test = null!;
}
```

```csharp
#nullable disable
static void Main(string[] args)
{
    var result = PassNull(true);
    string test = null;
}
#nullable restore
```

```csharp
static void Main(string[] args)
{
    PassNull(null);
}
public static void PassNull([AllowNull] string text)
{
    Console.WriteLine(text);
}
```

```csharp
[return: NotNullIfNotNull("parameter")]
public static string PassNull(string text)
{
    return text ?? "Test";
}
```

```csharp
static void Main(string[] args)
{
    string test = PassNull("Test");
}
```

```csharp
public static void GenericMethod<TKey>()
where TKey : notnull
{
}
```

```csharp
static void Main(string[] args)
{
    GenericMethod<int>();
}
```

## Dynamic – A Bad Practice Turned Great

```csharp
var assembly = Assembly.Load(new AssemblyName("Microsoft.AspNetCore.Hosting"));
var startUpLoader = assembly.GetType("Microsoft.AspNetCore.Hosting.StartupLoader");
var loadMethodsMethod = startUpLoader.GetMethod("LoadMethods", BindingFlags.NonPublic | BindingFlags.Static);
loadMethodsMethod.Invoke(null, new object[] {
serviceCollection.BuildServiceProviderFromFactory(),
StartupType,
TestWebServer.Environment.EnvironmentName});
```

```csharp
var startupLoader = WebFramework.Internals.StartupLoader.Exposed();
startupMethods = startupLoader.LoadMethods(
serviceCollection.BuildServiceProviderFromFactory(),
StartupType,
TestWebServer.Environment.EnvironmentName);
```

```csharp
using System;
namespace CoolLibrary
{
    internal static class SomeCoolClass
    {
        public static void CoolMethod()
        {
            Console.WriteLine(42);
        }
    }
}
```

```csharp
static void Main(string[] args)
{
    var assembly = Assembly.Load(new AssemblyName("CoolLibrary"));
}
```

```csharp
static void Main(string[] args)
{
    var assembly = Assembly.Load(new AssemblyName("CoolLibrary"));
    var type = assembly.GetType("CoolLibrary.SomeCoolClass");
    var method = type.GetMethod("CoolMethod");
}
```

```csharp
tatic void Main(string[] args)
{
    var assembly = Assembly.Load(new AssemblyName("CoolLibrary"));
    var type = assembly.GetType("CoolLibrary.SomeCoolClass");
    var method = type.GetMethod("CoolMethod");
}
```

```csharp
internal static class SomeCoolClass
{
    internal static void CoolMethod()
    {
        Console.WriteLine(42);
    }
}
```

```csharp
private readonly BindingFlags flags = BindingFlags.NonPublic | BindingFlags.Static;
var method = type.GetMethod("CoolMethod", flags);

```

```csharp
method.Invoke(null, new object[0]);

```

```csharp
internal static void CoolMethod(string text, int number)
{
    Console.WriteLine(text + number);
}
method.Invoke(null, new object[] { "some text", 42 });
```

```csharp
internal static string CoolMethod(string text, int number)
{
    Console.WriteLine(text);
    Console.WriteLine(number);
    return text + " " + number;
}
```

```csharp
var result = (string)method.Invoke(null, new object[] { "some text", 42 });
```

```csharp
namespace BeautifyReflectionCode
{
    public class ExposedObject
    {
    }
}
```

```csharp
dynamic someDynamic = 42;
someDynamic.WhateverILike();
```

```csharp
using System.Dynamic;
namespace BeautifyReflectionCode
{
    public class ExposedObject : DynamicObject
    {
    }
}
```

```csharp
dynamic myBlackHole = new object();
```

```csharp
myBlackHole.Name = "MyTested";
myBlackHole.LastName = "ASP.NET";
Console.WriteLine(myBlackHole.FirstName);
```

```csharp
using System.Dynamic;
namespace BeautifyReflectionCode
{
    public class ExposedObject : DynamicObject
    {
        public override bool TryInvokeMember(InvokeMemberBinder binder, object[] args, out object result)
        {
            return base.TryInvokeMember(binder, args, out result);
        }
    }
}
```

```csharp
static void Main(string[] args)
{
    dynamic someDynamic = new ExposedObject();
    someDynamic.WhateverILike();
}
```

```csharp
public override bool TryInvokeMember(InvokeMemberBinder binder, object[] args, out object result)
{
    Console.WriteLine(binder.Name);
    for (int i = 0; i < args.Length; i++)
    {
        Console.WriteLine(" " + args[i]);
    }
    result = "MyCoolResult";
    return true;
}
```

```csharp
var assembly = Assembly.Load(new AssemblyName("CoolLibrary"));
var type = assembly.GetType("CoolLibrary.SomeCoolClass");
var method = type.GetMethod("CoolMethod", BindingFlags.NonPublic | BindingFlags.Static);
var result = (string)method.Invoke(null, new object[] { "some text", 42 });
```

```csharp
static void Main(string[] args)
{
    var assembly = Assembly.Load(new AssemblyName("CoolLibrary"));
    var type = assembly.GetType("CoolLibrary.SomeCoolClass");
    dynamic someCoolClass = new ExposedObject(type);
    someCoolClass.CoolMethod("Something cool", 42);
}
```

```csharp
string result = someCoolClass.CoolMethod("Something cool", 42);
Console.WriteLine(result);
```

```csharp
internal static class SomeCoolClass
{
    internal static string Name { get; set; }
    internal static string CoolMethod(string text, int number)
    {
        return text + " " + number;
    }
}
static void Main(string[] args)
{
    var assembly = Assembly.Load(new AssemblyName("CoolLibrary"));
    var type = assembly.GetType("CoolLibrary.SomeCoolClass");
    dynamic someCoolClass = new ExposedObject(type);
    someCoolClass.Name = "My Tested ASP.NET";
}
```

```csharp
private readonly BindingFlags flags = BindingFlags.NonPublic | BindingFlags.Static;
public override bool TrySetMember(SetMemberBinder binder, object value)
{
    var property = this.type.GetProperty(binder.Name, flags);
    if (property == null)
    {
        return base.TrySetMember(binder, value);
    }
    property.SetValue(null, value);
    return true;
}
```

```csharp
static void Main(string[] args)
{
    var assembly = Assembly.Load(new AssemblyName("CoolLibrary"));
    var type = assembly.GetType("CoolLibrary.SomeCoolClass");
    dynamic someCoolClass = new ExposedObject(type);
    string result = someCoolClass.CoolMethod("Something cool", 42);
    string name = someCoolClass.Name = "My Tested ASP.NET";
    Console.WriteLine(name);
}
```

```csharp
public override bool TryGetMember(GetMemberBinder binder, out object result)
{
    var property = this.type.GetProperty(binder.Name, flags);
    if (property == null)
    {
        return base.TryGetMember(binder, out result);
    }
    result = property.GetValue(null);
    return true;
}
```

## Optimize C# Reflection Up to 10 Times by Using Delegates

```csharp
public class HomeController
{
    public IDictionary<string, object> Data { get; set; }
}
```

```csharp
var homeController = new HomeController();
var homeControllerType = homeController.GetType();
var property = homeControllerType.GetProperty(nameof(HomeController.Data));
var getMethod = property.GetMethod;
var dict = (IDictionary<string, object>)getMethod.Invoke(homeController, Array.Empty<object>());
```

```csharp
var getMethod = property.GetMethod;
var declaringClass = property.DeclaringType;
var typeOfResult = typeof(IDictionary<string, object>);
// Func<ControllerType, TResult>
var getMethodDelegateType = typeof(Func<,>).MakeGenericType(declaringClass, typeOfResult);
// c => c.Data
var getMethodDelegate = getMethod.CreateDelegate(getMethodDelegateType);
var finalDelegate = (Func < HomeController, IDictionary<string, object>)getMethodDelegate;
var dict = finalDelegate(homeController);
```

```csharp
public class PropertyHelper
{
    private static readonly ConcurrentDictionary<Type, PropertyHelper[]> Cache
    = new ConcurrentDictionary<Type, PropertyHelper[]>();
    private static readonly MethodInfo CallInnerDelegateMethod =
    typeof(PropertyHelper).GetMethod(nameof(CallInnerDelegate), BindingFlags.NonPublic | BindingFlags.Static);
    public string Name { get; set; }
    public Func<object, object> Getter { get; set; }
    public static PropertyHelper[] GetProperties(Type type)
    => Cache
    .GetOrAdd(type, _ => type
    .GetProperties()
    .Select(property =>
    {
        var getMethod = property.GetMethod;
        var declaringClass = property.DeclaringType;
        var typeOfResult = property.PropertyType;
        // Func<Type, TResult>
        var getMethodDelegateType = typeof(Func<,>).MakeGenericType(declaringClass, typeOfResult);
        // c => c.Data
        var getMethodDelegate = getMethod.CreateDelegate(getMethodDelegateType);
        // CallInnerDelegate<Type, TResult>
        var callInnerGenericMethodWithTypes = CallInnerDelegateMethod
    .MakeGenericMethod(declaringClass, typeOfResult);
        // Func<object, object>
        var result = (Func<object, object>)callInnerGenericMethodWithTypes.Invoke(null, new[] { getMethodDelegate });
        return new PropertyHelper
        {
            Name = property.Name,
            Getter = result
        };
    })
    .ToArray());
    // Called via reflection.
    private static Func<object, object> CallInnerDelegate<TClass, TResult>(
    Func<TClass, TResult> deleg)
    => instance => deleg((TClass)instance);
}
```

```csharp
var controller = new HomeController();
var properties = PropertyHelper.GetProperties(typeof(HomeController));
foreach (var property in properties)
{
    Console.WriteLine(property.Name);
    Console.WriteLine(property.Getter(controller));
}
```

## Most Complete NUnit Unit Testing Framework Cheat Sheet

```bash
Install-Package NUnit
Install-Package NUnit.TestAdapter
Install-Package Microsoft.NET.Test.Sdk
```

```csharp
using NUnit.Framework;
namespace NUnitUnitTests
{
    // A class that contains NUnit unit tests. (Required)
    [TestFixture]
    public class NonBellatrixTests
    {
        [OneTimeSetUp]
        public void ClassInit()
        {
            // Executes once for the test class. (Optional)
        }
        [SetUp]
        public void TestInit()
        {
            // Runs before each test. (Optional)
        }
        [Test]
        public void TestMethod()
        {
        }
        [TearDown]
        public void TestCleanup()
        {
            // Runs after each test. (Optional)
        }
        [OneTimeTearDown]
        public void ClassCleanup()
        {
            // Runs once after all tests in this class are executed. (Optional)
            // Not guaranteed that it executes instantly after all tests from the class.
        }
    }
}
// A SetUpFixture outside of any namespace provides SetUp and TearDown for the entire assembly.
[SetUpFixture]
public class MySetUpClass
{
    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        // Executes once before the test run. (Optional)
    }
    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
        // Executes once after the test run. (Optional)
    }
}
```

```csharp
Assert.AreEqual(28, _actualFuel); // Tests whether the specified values are equal.
Assert.AreNotEqual(28, _actualFuel); // Tests whether the specified values are unequal. Same as AreEqual for numeric values.
Assert.AreSame(_expectedRocket, _actualRocket); // Tests whether the specified objects both refer to the same object
Assert.AreNotSame(_expectedRocket, _actualRocket); // Tests whether the specified objects refer to different objects
Assert.IsTrue(_isThereEnoughFuel); // Tests whether the specified condition is true
Assert.IsFalse(_isThereEnoughFuel); // Tests whether the specified condition is false
Assert.IsNull(_actualRocket); // Tests whether the specified object is null
Assert.IsNotNull(_actualRocket); // Tests whether the specified object is non-null
Assert.IsInstanceOf(_actualRocket, typeof(Falcon9Rocket)); // Tests whether the specified object is an instance of the expected type
Assert.IsNotInstanceOf(_actualRocket, typeof(Falcon9Rocket)); // Tests whether the specified object is not an instance of type
StringAssert.AreEqualIgnoringCase(_expectedBellatrixTitle, "Bellatrix"); // Tests whether the specified strings are equal ignoring their casing
StringAssert.Contains(_expectedBellatrixTitle, "Bellatrix"); // Tests whether the specified string contains the specified substring
StringAssert.DoesNotContain(_expectedBellatrixTitle, "Bellatrix"); // Tests whether the specified string doesn't contain the specified substring
StringAssert.StartsWith(_expectedBellatrixTitle, "Bellatrix"); // Tests whether the specified string begins with the specified substring
StringAssert.StartsWith(_expectedBellatrixTitle, "Bellatrix"); // Tests whether the specified string begins with the specified substring
StringAssert.IsMatch("(281)388-0388", @"(?d{3})?-? *d{3}-? *-?d{4}"); // Tests whether the specified string matches a regular expression
StringAssert.DoesNotMatch("281)388-0388", @"(?d{3})?-? *d{3}-? *-?d{4}"); // Tests whether the specified string does not match a regular expression
CollectionAssert.AreEqual(_expectedRockets, _actualRockets); // Tests whether the specified collections have the same elements in the same order and quantity.
CollectionAssert.AreNotEqual(_expectedRockets, _actualRockets); // Tests whether the specified collections does not have the same elements or the elements are in a different order and quantity.
CollectionAssert.AreEquivalent(_expectedRockets, _actualRockets); // Tests whether two collections contain the same elements.
CollectionAssert.AreNotEquivalent(_expectedRockets, _actualRockets); // Tests whether two collections contain different elements.
CollectionAssert.AllItemsAreInstancesOfType(_expectedRockets, _actualRockets); // Tests whether all elements in the specified collection are instances of the expected type
CollectionAssert.AllItemsAreNotNull(_expectedRockets); // Tests whether all items in the specified collection are non-null
CollectionAssert.AllItemsAreUnique(_expectedRockets); // Tests whether all items in the specified collection are unique
CollectionAssert.Contains(_actualRockets, falcon9); // Tests whether the specified collection contains the specified element
CollectionAssert.DoesNotContain(_actualRockets, falcon9); // Tests whether the specified collection does not contain the specified element
CollectionAssert.IsSubsetOf(_expectedRockets, _actualRockets); // Tests whether one collection is a subset of another collection
CollectionAssert.IsNotSubsetOf(_expectedRockets, _actualRockets); // Tests whether one collection is not a subset of another collection
Assert.Throws<ArgumentNullException>(() => new Regex(null)); // Tests whether the code specified by delegate throws exact given exception of type T
```

```csharp
Assert.That(28, Is.EqualTo(_actualFuel)); // Tests whether the specified values are equal.
Assert.That(28, Is.Not.EqualTo(_actualFuel)); // Tests whether the specified values are unequal. Same as AreEqual for numeric values.
Assert.That(_expectedRocket, Is.SameAs(_actualRocket)); // Tests whether the specified objects both refer to the same object
Assert.That(_expectedRocket, Is.Not.SameAs(_actualRocket)); // Tests whether the specified objects refer to different objects
Assert.That(_isThereEnoughFuel, Is.True); // Tests whether the specified condition is true
Assert.That(_isThereEnoughFuel, Is.False); // Tests whether the specified condition is false
Assert.That(_actualRocket, Is.Null); // Tests whether the specified object is null
Assert.That(_actualRocket, Is.Not.Null); // Tests whether the specified object is non-null
Assert.That(_actualRocket, Is.InstanceOf<Falcon9Rocket>()); // Tests whether the specified object is an instance of the expected type
Assert.That(_actualRocket, Is.Not.InstanceOf<Falcon9Rocket>()); // Tests whether the specified object is not an instance of type
Assert.That(_actualFuel, Is.GreaterThan(20)); // Tests whether the specified object greater than the specified value
Assert.That(28, Is.EqualTo(_actualFuel).Within(0.50));
// Tests whether the specified values are nearly equal within the specified tolerance.
Assert.That(28, Is.EqualTo(_actualFuel).Within(2).Percent);
// Tests whether the specified values are nearly equal within the specified % tolerance.
Assert.That(_actualRocketParts, Has.Exactly(10).Items);
// Tests whether the specified collection has exactly the stated number of items in it.
Assert.That(_actualRocketParts, Is.Unique);
// Tests whether the items in the specified collections are unique.
Assert.That(_actualRocketParts, Does.Contain(_expectedRocketPart));
// Tests whether a given items is present in the specified list of items.
Assert.That(_actualRocketParts, Has.Exactly(1).Matches<RocketPart>(part => part.Name == "Door" && part.Height == "200"));
// Tests whether the specified collection has exactly the stated item in it.
```

```csharp
[TestFixture]
[Author("Joro Doev", "joro.doev@bellatrix.solutions")]
public class RocketFuelTests
{
    [Test]
    public void RocketFuelMeassuredCorrectly_When_Landing() { /* ... */ }
    [Test]
    [Author("Ivan Penchev")]
    public void RocketFuelMeassuredCorrectly_When_Flying() { /* ... */ }
}
```

```csharp
[Test]
[Repeat(10)]
public void RocketFuelMeassuredCorrectly_When_Flying()
{ /* ... */ }

```

```csharp
[Test, Combinatorial]
public void CorrectFuelMeassured_When_X_Site([Values(1, 2, 3)] int x, [Values("A", "B")] string s)
{
    ...
}
```

```csharp
[Test, Pairwise]
public void ValidateLandingSiteOfRover_When_GoingToMars
([Values("a", "b", "c")] string a, [Values("+", "-")] string b, [Values("x", "y")] string c)
{
    Debug.WriteLine("{0} {1} {2}", a, b, c);
}
```

```csharp
[Test]
public void GenerateRandomLandingSiteOnMoon([Values(1, 2, 3)] int x, [Random(-1.0, 1.0, 5)] double d)
{
    ...
}
```

```csharp
[Test]
public void CalculateJupiterBaseLandingPoint([Values(1, 2, 3)] int x, [Range(0.2, 0.6)] double y)
{
    //...
}
```

```csharp
[Test]
[Retry(3)]
public void CalculateJupiterBaseLandingPoint([Values(1, 2, 3)] int x, [Range(0.2, 0.6)] double y)
{
    //...
}
```

```csharp
[Test, Timeout(2000)]
public void FireRocketToProximaCentauri()
{
    ...
}
```

```csharp
[assembly: Parallelizable(ParallelScope.Fixtures)]
[assembly: LevelOfParallelism(3)]
```

```csharp
[TestFixture]
[Parallelizable(ParallelScope.Fixtures)]
public class TestFalcon9EngineLevels
{
    // ...
}
```

## Most Complete MSTest Unit Testing Framework Cheat Sheet

```bash
Install-Package MSTest.TestFramework
Install-Package MSTest.TestAdapter
Install-Package Microsoft.NET.Test.Sdk
```

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace MSTestUnitTests
{
    // A class that contains MSTest unit tests. (Required)
    [TestClass]
    public class YourUnitTests
    {
        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            // Executes once before the test run. (Optional)
        }
        [ClassInitialize]
        public static void TestFixtureSetup(TestContext context)
        {
            // Executes once for the test class. (Optional)
        }
        [TestInitialize]
        public void Setup()
        {
            // Runs before each test. (Optional)
        }
        [AssemblyCleanup]
        public static void AssemblyCleanup()
        {
            // Executes once after the test run. (Optional)
        }
        [ClassCleanup]
        public static void TestFixtureTearDown()
        {
            // Runs once after all tests in this class are executed. (Optional)
            // Not guaranteed that it executes instantly after all tests from the class.
        }
        [TestCleanup]
        public void TearDown()
        {
            // Runs after each test. (Optional)
        }
        // Mark that this is a unit test method. (Required)
        [TestMethod]
        public void YouTestMethod()
        {
            // Your test code goes here.
        }
    }
}
```

```csharp
[DataRow(0, 0)]
[DataRow(1, 1)]
[DataRow(2, 1)]
[DataRow(80, 23416728348467685)]
[DataTestMethod]
public void GivenDataFibonacciReturnsResultsOk(int number, int result)
{
    var fib = new Fib();
    var actual = fib.Fibonacci(number);
    Assert.AreEqual(result, actual);
}
```

```csharp
[DataSource("Microsoft.VisualStudio.TestTools.DataSource.CSV", "TestsData.csv", "TestsData#csv", DataAccessMethod.Sequential)]
[TestMethod]
public void DataDrivenTest()
{
    int valueA = Convert.ToInt32(this.TestContext.DataRow["valueA"]);
    int valueB = Convert.ToInt32(this.TestContext.DataRow["valueB"]);
    int expected = Convert.ToInt32(this.TestContext.DataRow["expectedResult"]);
}
```

```csharp
[DataTestMethod]
[DynamicData(nameof(GetData), DynamicDataSourceType.Method)]
public void TestAddDynamicDataMethod(int a, int b, int expected)
{
    var actual = _calculator.Add(a, b);
    Assert.AreEqual(expected, actual);
}
public static IEnumerable<object[]> GetData()
{
    yield return new object[] { 1, 1, 2 };
    yield return new object[] { 12, 30, 42 };
    yield return new object[] { 14, 1, 15 };
}
```

```csharp
Assert.AreEqual(28, _actualFuel); // Tests whether the specified values are equal.
Assert.AreNotEqual(28, _actualFuel); // Tests whether the specified values are unequal. Same as AreEqual for numeric values.
Assert.AreSame(_expectedRocket, _actualRocket); // Tests whether the specified objects both refer to the same object
Assert.AreNotSame(_expectedRocket, _actualRocket); // Tests whether the specified objects refer to different objects
Assert.IsTrue(_isThereEnoughFuel); // Tests whether the specified condition is true
Assert.IsFalse(_isThereEnoughFuel); // Tests whether the specified condition is false
Assert.IsNull(_actualRocket); // Tests whether the specified object is null
Assert.IsNotNull(_actualRocket); // Tests whether the specified object is non-null
Assert.IsInstanceOfType(_actualRocket, typeof(Falcon9Rocket)); // Tests whether the specified object is an instance of the expected type
Assert.IsNotInstanceOfType(_actualRocket, typeof(Falcon9Rocket)); // Tests whether the specified object is not an instance of type
StringAssert.Contains(_expectedBellatrixTitle, "Bellatrix"); // Tests whether the specified string contains the specified substring
StringAssert.StartsWith(_expectedBellatrixTitle, "Bellatrix"); // Tests whether the specified string begins with the specified substring
StringAssert.Matches("(281)388-0388", @"(?d{3})?-? *d{3}-? *-?d{4}"); // Tests whether the specified string matches a regular expression
StringAssert.DoesNotMatch("281)388-0388", @"(?d{3})?-? *d{3}-? *-?d{4}"); // Tests whether the specified string does not match a regular expression
CollectionAssert.AreEqual(_expectedRockets, _actualRockets); // Tests whether the specified collections have the same elements in the same order and quantity.
CollectionAssert.AreNotEqual(_expectedRockets, _actualRockets); // Tests whether the specified collections does not have the same elements or the elements are in a different order and quantity.
CollectionAssert.AreEquivalent(_expectedRockets, _actualRockets); // Tests whether two collections contain the same elements.
CollectionAssert.AreNotEquivalent(_expectedRockets, _actualRockets); // Tests whether two collections contain different elements.
CollectionAssert.AllItemsAreInstancesOfType(_expectedRockets, _actualRockets); // Tests whether all elements in the specified collection are instances of the expected type
CollectionAssert.AllItemsAreNotNull(_expectedRockets); // Tests whether all items in the specified collection are non-null
CollectionAssert.AllItemsAreUnique(_expectedRockets); // Tests whether all items in the specified collection are unique
CollectionAssert.Contains(_actualRockets, falcon9); // Tests whether the specified collection contains the specified element
CollectionAssert.DoesNotContain(_actualRockets, falcon9); // Tests whether the specified collection does not contain the specified element
CollectionAssert.IsSubsetOf(_expectedRockets, _actualRockets); // Tests whether one collection is a subset of another collection
CollectionAssert.IsNotSubsetOf(_expectedRockets, _actualRockets); // Tests whether one collection is not a subset of another collection
Assert.ThrowsException<ArgumentNullException>(() => new Regex(null)); // Tests whether the code specified by delegate throws exact given exception of type T
```

```csharp
[assembly: Parallelize(Workers = 0, Scope = ExecutionScope.MethodLevel)]
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
	<MSTest>
		<Parallelize>
			<Workers>8</Workers>
			<Scope>MethodLevel</Scope>
		</Parallelize>
	</MSTest>
</RunSettings>
```

## Get Property Names Using Lambda Expressions in C#

```csharp
public static string GetMemberName<T>(Expression<Func<T, object>> expression)
{
    return GetMemberName(expression.Body);
}
```

```csharp
private static string GetMemberName(Expression expression)
{
    if (expression == null)
    {
        throw new ArgumentException(expressionCannotBeNullMessage);
    }

    if (expression is MemberExpression)
    {
        // Reference type property or field
        var memberExpression = (MemberExpression)expression;
        return memberExpression.Member.Name;
    }

    if (expression is MethodCallExpression)
    {
        // Reference type method
        var methodCallExpression = (MethodCallExpression)expression;
        return methodCallExpression.Method.Name;
    }

    if (expression is UnaryExpression)
    {
        // Property, field of method returning value type
        var unaryExpression = (UnaryExpression)expression;
        return GetMemberName(unaryExpression);
    }

    throw new ArgumentException(invalidExpressionMessage);
}

private static string GetMemberName(UnaryExpression unaryExpression)
{
    if (unaryExpression.Operand is MethodCallExpression)
    {
        var methodExpression = (MethodCallExpression)unaryExpression.Operand;
        return methodExpression.Method.Name;
    }

    return ((MemberExpression)unaryExpression.Operand).Member.Name;
}
```

```csharp
public static class NameReaderExtensions
{
    private static readonly string expressionCannotBeNullMessage = "The expression cannot be null.";
    private static readonly string invalidExpressionMessage = "Invalid expression.";

    public static string GetMemberName<T>(this T instance, Expression<Func<T, object>> expression)
    {
        return GetMemberName(expression.Body);
    }

    public static List<string> GetMemberNames<T>(this T instance, params Expression<Func<T, object>>[] expressions)
    {
        List<string> memberNames = new List<string>();
        foreach (var cExpression in expressions)
        {
            memberNames.Add(GetMemberName(cExpression.Body));
        }

        return memberNames;
    }

    public static string GetMemberName<T>(this T instance, Expression<Action<T>> expression)
    {
        return GetMemberName(expression.Body);
    }

    private static string GetMemberName(Expression expression)
    {
        if (expression == null)
        {
            throw new ArgumentException(expressionCannotBeNullMessage);
        }

        if (expression is MemberExpression)
        {
            // Reference type property or field
            var memberExpression = (MemberExpression)expression;
            return memberExpression.Member.Name;
        }

        if (expression is MethodCallExpression)
        {
            // Reference type method
            var methodCallExpression = (MethodCallExpression)expression;
            return methodCallExpression.Method.Name;
        }

        if (expression is UnaryExpression)
        {
            // Property, field of method returning value type
            var unaryExpression = (UnaryExpression)expression;
            return GetMemberName(unaryExpression);
        }

        throw new ArgumentException(invalidExpressionMessage);
    }

    private static string GetMemberName(UnaryExpression unaryExpression)
    {
        if (unaryExpression.Operand is MethodCallExpression)
        {
            var methodExpression = (MethodCallExpression)unaryExpression.Operand;
            return methodExpression.Method.Name;
        }

        return ((MemberExpression)unaryExpression.Operand).Member.Name;
    }
}
```

```csharp
Client client = new Client();
var propertyNames = client.GetMemberNames(c => c.FistName, c => c.LastName, c => c.City);
foreach (var cPropertyName in propertyNames)
{
    Console.WriteLine(cPropertyName);
}
string nameOfTheMethod = client.GetMemberName(c => c.ToString());
Console.WriteLine(nameOfTheMethod);
```

```csharp
public class ObjectToAssertValidator : PropertiesValidator<ObjectToAssertValidator, ObjectToAssert>
{
    public void Validate(ObjectToAssert expected, ObjectToAssert actual)
    {
        this.Validate(expected, actual, "FirstName");
    }
}
```

```csharp
public void Assert<T>(T expectedObject, T realObject, params Expression<Func<T, object>>[] propertiesNotToCompareExpressions)
{
    PropertyInfo[] properties = realObject.GetType().GetProperties();
    List<string> propertiesNotToCompare = expectedObject.GetMemberNames(propertiesNotToCompareExpressions);
    foreach (PropertyInfo currentRealProperty in properties)
    {
        if (!propertiesNotToCompare.Contains(currentRealProperty.Name))
        {
            PropertyInfo currentExpectedProperty = expectedObject.GetType().GetProperty(currentRealProperty.Name);
            string exceptionMessage =
            string.Format("The property {0} of class {1} was not as expected.", currentRealProperty.Name, currentRealProperty.DeclaringType.Name);

            if (currentRealProperty.PropertyType != typeof(DateTime) && currentRealProperty.PropertyType != typeof(DateTime?))
            {
                MSU.Assert.AreEqual(currentExpectedProperty.GetValue(expectedObject, null), currentRealProperty.GetValue(realObject, null), exceptionMessage);
            }
            else
            {
                DateTimeAssert.AreEqual(
                currentExpectedProperty.GetValue(expectedObject, null) as DateTime?,
                currentRealProperty.GetValue(realObject, null) as DateTime?,
                DateTimeDeltaType.Minutes,
                5);
            }
        }
    }
}
```

```csharp
public class ObjectToAssertAsserter : PropertiesAsserter<ObjectToAssertAsserter, ObjectToAssert>
{
    public void Assert(ObjectToAssert expected, ObjectToAssert actual)
    {
        this.Assert(expected,
        actual,
        e => e.LastName,
        e => e.FirstName,
        e => e.PoNumber);
    }
}
```

## Specification-based Test Design Techniques for Enhancing Unit Tests

```csharp
public static class TransportSubscriptionCardPriceCalculator
{
    public static decimal CalculateSubscriptionPrice(string ageInput)
    {
        decimal subscriptionPrice = default(decimal);
        int age = default(int);
        bool isInteger = int.TryParse(ageInput, out age);

        if (!isInteger)
        {
            throw new ArgumentException("The age input should be an integer value between 0 - 122.");
        }

        if (age <= 0)
        {
            throw new ArgumentException("The age should be greater than zero.");
        }
        else if (age > 0 && age <= 5)
        {
            subscriptionPrice = 0;
        }
        else if (age > 5 && age <= 18)
        {
            subscriptionPrice = 20;
        }
        else if (age > 18 && age < 65)
        {
            subscriptionPrice = 40;
        }
        else if (age >= 65 && age <= 122)
        {
            subscriptionPrice = 5;
        }
        else
        {
            throw new ArgumentException("The age should be smaller than 123.");
        }

        return subscriptionPrice;
    }
}
```

```csharp
[TestFixture]
public class TransportSubscriptionCardPriceCalculatorTests
{
    private const string GreaterThanZeroExpectionMessage = "The age should be greater than zero.";
    private const string SmallerThan123ExpectionMessage = "The age should be smaller than 123.";
    private const string ShouldBeIntegerExpectionMessage = "The age input should be an integer value between 0 - 122.";

    [Test]
    public void ValidateCalculateSubscriptionPrice_Free([Random(min: 1, max: 5, count: 1)]
                                                                        int ageInput)
    {
        decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice(ageInput.ToString());

        Assert.AreEqual(0, actualPrice);
    }

    [Test]
    public void ValidateCalculateSubscriptionPrice_20lv([Random(min: 6, max: 18, count: 1)]
                                                                        int ageInput)
    {
        decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice(ageInput.ToString());

        Assert.AreEqual(20, actualPrice);
    }

    [Test]
    public void ValidateCalculateSubscriptionPrice_40lv([Random(min: 19, max: 64, count: 1)]
                                                                        int ageInput)
    {
        decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice(ageInput.ToString());

        Assert.AreEqual(40, actualPrice);
    }

    [Test]
    public void ValidateCalculateSubscriptionPrice_5lv([Random(min: 65, max: 122, count: 1)]
                                                                        int ageInput)
    {
        decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice(ageInput.ToString());

        Assert.AreEqual(5, actualPrice);
    }

    [Test]
    [ExpectedException(typeof(ArgumentException), ExpectedMessage = ShouldBeIntegerExpectionMessage)]
    public void ValidateCalculateSubscriptionPrice_NotInteger()
    {
        decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice("invalid");

        Assert.AreEqual(5, actualPrice);
    }

    [Test]
    [ExpectedException(typeof(ArgumentException), ExpectedMessage = GreaterThanZeroExpectionMessage)]
    public void ValidateCalculateSubscriptionPrice_InvalidZero()
    {
        decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice("0");

        Assert.AreEqual(5, actualPrice);
    }

    [Test]
    [ExpectedException(typeof(ArgumentException), ExpectedMessage = SmallerThan123ExpectionMessage)]
    public void ValidateCalculateSubscriptionPrice_InvalidGreater122()
    {
        decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice("1000");

        Assert.AreEqual(5, actualPrice);
    }
}
```

```csharp
else if (age > 0 && age <= 5)
{
    subscriptionPrice = 0;
}
```

```csharp
else if (age > 5 && age <= 18)
{
    subscriptionPrice = 20;
}
```

```csharp
еlse if (age > 18 && age < 65)
{
    subscriptionPrice = 40;
}
```

```csharp
else if (age >= 65 && age <= 122)
{
    subscriptionPrice = 5;
}
```

```csharp
if (!isInteger)
{
    throw new ArgumentException("The age input should be an integer value between 0 - 122.");
}
```

```csharp
if (age <= 0)
{
    throw new ArgumentException("The age should be greater than zero.");
}
```

```csharp
else
{
    throw new ArgumentException("The age should be smaller than 123.");
}
```

```csharp
private const string GreaterThanZeroExpectionMessage = "The age should be greater than zero.";
private const string SmallerThan123ExpectionMessage = "The age should be smaller than 123.";
private const string ShouldBeIntegerExpectionMessage = "The age input should be an integer value between 0 - 122.";

[TestCase("0", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = GreaterThanZeroExpectionMessage)]
[TestCase("5", 0)]
[TestCase("15", 20)]
[TestCase("25", 40)]
[TestCase("80", 5)]
[TestCase("1000", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = SmallerThan123ExpectionMessage)]
[TestCase("invalid", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = ShouldBeIntegerExpectionMessage)]
public void ValidateCalculateSubscriptionPrice(string ageInput, decimal expectedPrice)
{
    decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice(ageInput);

    Assert.AreEqual(expectedPrice, actualPrice);
}
```

```csharp
private const string GreaterThanZeroExpectionMessage = "The age should be greater than zero.";
private const string SmallerThan123ExpectionMessage = "The age should be smaller than 123.";
private const string ShouldBeIntegerExpectionMessage = "The age input should be an integer value between 0 - 122.";

[TestCase("-1", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = GreaterThanZeroExpectionMessage)]
[TestCase("0", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = GreaterThanZeroExpectionMessage)]
[TestCase("1", 0)]
[TestCase("4", 0)]
[TestCase("5", 0)]
[TestCase("6", 20)]
[TestCase("17", 20)]
[TestCase("18", 20)]
[TestCase("19", 40)]
[TestCase("64", 40)]
[TestCase("65", 5)]
[TestCase("66", 5)]
[TestCase("121", 5)]
[TestCase("122", 5)]
[TestCase("123", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = SmallerThan123ExpectionMessage)]
[TestCase("a", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = ShouldBeIntegerExpectionMessage)]
[TestCase("", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = ShouldBeIntegerExpectionMessage)]
[TestCase(null, 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = ShouldBeIntegerExpectionMessage)]
[TestCase("2147483648", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = ShouldBeIntegerExpectionMessage)]
[TestCase("–2147483649", 0, ExpectedException = typeof(ArgumentException), ExpectedMessage = ShouldBeIntegerExpectionMessage)]
public void ValidateCalculateSubscriptionPrice1(string ageInput, decimal expectedPrice)
{
    decimal actualPrice = TransportSubscriptionCardPriceCalculator.CalculateSubscriptionPrice(ageInput);

    Assert.AreEqual(expectedPrice, actualPrice);
}
```

## Which Works Faster- Null Coalescing Operator or GetValueOrDefault or Conditional

```csharp

int? x = null;
int y = x ?? –1;
Console.WriteLine("y now equals -1 because x was null => {0}", y);
int i = DefaultValueOperatorTest.GetNullableInt() ?? default(int);
Console.WriteLine("i equals now 0 because GetNullableInt() returned null => {0}", i);
string s = DefaultValueOperatorTest.GetStringValue();
Console.WriteLine("Returns 'Unspecified' because s is null => {0}", s ?? "Unspecified");
```

```csharp

float? yourSingle = –1.0f;
Console.WriteLine(yourSingle.GetValueOrDefault());
yourSingle = null;
Console.WriteLine(yourSingle.GetValueOrDefault());
// assign different default value
Console.WriteLine(yourSingle.GetValueOrDefault(–2.4f));
// returns the same result as the above statement
Console.WriteLine(yourSingle ?? –2.4f);
```

```csharp
int input = Convert.ToInt32(Console.ReadLine());
// ?: conditional operator.
string classify = (input > 0) ? "positive" : "negative";
```

```csharp
[System.Runtime.Versioning.NonVersionable]
public T GetValueOrDefault()
{
    return value;
}

[System.Runtime.Versioning.NonVersionable]
public T GetValueOrDefault(T defaultValue)
{
    return hasValue ? value : defaultValue;
}
```

```csharp
public class GetValueOrDefaultAndNullCoalescingOperatorInternals
{
    public void GetValueOrDefaultInternals()
    {
        int? a = null;
        var x = a.GetValueOrDefault(7);
    }

    public void NullCoalescingOperatorInternals()
    {
        int? a = null;
        var x = a ?? 7;
    }
}
```

```csharp
.method public hidebysig instance void GetValueOrDefaultInternals() cil managed
{
    .locals init (
        [0] valuetype[mscorlib]System.Nullable`1 < int32 > a
    )

    IL_0000: ldloca.s a
    IL_0002: initobj valuetype[mscorlib]System.Nullable`1 < int32 >
    IL_0008: ldloca.s a
    IL_000a: ldc.i4.7
    IL_000b: call instance int32 valuetype[mscorlib]System.Nullable`1 < int32 >::GetValueOrDefault(!0)
    IL_0010: pop
    IL_0011: ret
}
```

```csharp
.method public hidebysig instance void NullCoalescingOperatorInternals() cil managed
{
    .locals init (
        [0] valuetype[mscorlib]System.Nullable`1 < int32 > a,
        [1] valuetype[mscorlib]System.Nullable`1 < int32 > CS$0$0000
    )

    IL_0000: ldloca.s a
    IL_0002: initobj valuetype[mscorlib]System.Nullable`1 < int32 >
    IL_0008: ldloc.0
    IL_0009: stloc.1
    IL_000a: ldloca.s CS$0$0000
    IL_000c: call instance bool valuetype[mscorlib]System.Nullable`1 < int32 >::get_HasValue()
    IL_0011: brtrue.s IL_0014

    IL_0013: ret

    IL_0014: ldloca.s CS$0$0000
    IL_0016: call instance int32 valuetype[mscorlib]System.Nullable`1 < int32 >::GetValueOrDefault()
    IL_001b: pop
    IL_001c: ret
}
```

```csharp
public static class Profiler
{
    public static TimeSpan Profile(long iterations, Action actionToProfile)
    {
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();

        var watch = new Stopwatch();
        watch.Start();
        for (int i = 0; i < iterations; i++)
        {
            actionToProfile();
        }
        watch.Stop();

        return watch.Elapsed;
    }

    public static string FormatProfileResults(long iterations, TimeSpan profileResults)
    {
        StringBuilder sb = new StringBuilder();
        sb.AppendLine(string.Format("Total: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
            profileResults.TotalMilliseconds, profileResults.Ticks, iterations));
        var avgElapsedMillisecondsPerRun = profileResults.TotalMilliseconds / (double)iterations;
        var avgElapsedTicksPerRun = profileResults.Ticks / (double)iterations;
        sb.AppendLine(string.Format("AVG: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
            avgElapsedMillisecondsPerRun, avgElapsedTicksPerRun, iterations));

        return sb.ToString();
    }
}
```

```csharp
GC.Collect();
GC.WaitForPendingFinalizers();
```

```csharp
public static class GetValueOrDefaultVsNullCoalescingOperatorTest
{
    public static void ExecuteWithGetValueOrDefault()
    {
        int? a = null;
        int? b = 3;
        int? d = null;
        int? f = null;
        int? g = null;
        int? h = null;
        int? j = null;
        int? k = 7;

        var profileResult = Profiler.Profile(100000,
            () =>
            {
                var x = a.GetValueOrDefault(7);
                var y = b.GetValueOrDefault(7);
                var z = d.GetValueOrDefault(6) + f.GetValueOrDefault(3) + g.GetValueOrDefault(1) + h.GetValueOrDefault(1) + j.GetValueOrDefault(5) + k.GetValueOrDefault(8);
            });
        string formattedProfileResult = Profiler.FormatProfileResults(100000, profileResult);
        FileWriter.WriteToDesktop("ExecuteWithGetValueOrDefaultT", formattedProfileResult);
    }

    public static void ExecuteWithNullCoalescingOperator()
    {
        int? a = null;
        int? b = 3;
        int? d = null;
        int? f = null;
        int? g = null;
        int? h = null;
        int? j = null;
        int? k = 7;

        var profileResult = Profiler.Profile(100000,
            () =>
            {
                var x = a ?? 7;
                var y = b ?? 7;
                var z = (d ?? 6) + (f ?? 3) + (g ?? 1) + (h ?? 1) + (j ?? 5) + (k ?? 8);
            });
        string formattedProfileResult = Profiler.FormatProfileResults(100000, profileResult);
        FileWriter.WriteToDesktop("ExecuteWithNullCoalescingOperatorT", formattedProfileResult);
    }

    public static void ExecuteWithConditionalOperator()
    {
        int? a = null;
        int? b = 3;
        int? d = null;
        int? f = null;
        int? g = null;
        int? h = null;
        int? j = null;
        int? k = 7;

        var profileResult = Profiler.Profile(100000,
            () =>
            {
                var x = a.HasValue ? a : 7;
                var y = b.HasValue ? b : 7;
                var z = (d.HasValue ? d : 6) + (f.HasValue ? f : 3) + (g.HasValue ? g : 1) + (h.HasValue ? h : 1) + (j.HasValue ? j : 5) + (k.HasValue ? k : 8);
            });
        string formattedProfileResult = Profiler.FormatProfileResults(100000, profileResult);
        FileWriter.WriteToDesktop("ExecuteWithConditionalOperatorT", formattedProfileResult);
    }

    public static void ExecuteWithGetValueOrDefaultZero()
    {
        int? a = null;

        var profileResult = Profiler.Profile(100000,
            () =>
            {
                var x = a.GetValueOrDefault();
            });
        string formattedProfileResult = Profiler.FormatProfileResults(100000, profileResult);
        FileWriter.WriteToDesktop("ExecuteWithGetValueOrDefaultZeroT", formattedProfileResult);
    }

    public static void ExecuteWithNullCoalescingOperatorZero()
    {
        int? a = null;

        var profileResult = Profiler.Profile(100000,
            () =>
            {
                var x = a ?? 0;
            });
        string formattedProfileResult = Profiler.FormatProfileResults(100000, profileResult);
        FileWriter.WriteToDesktop("ExecuteWithNullCoalescingOperatorZeroT", formattedProfileResult);
    }

    public static void ExecuteWithConditionalOperatorZero()
    {
        int? a = null;

        var profileResult = Profiler.Profile(100000,
            () =>
            {
                var x = a.HasValue ? a : 0;
            });
        string formattedProfileResult = Profiler.FormatProfileResults(100000, profileResult);
        FileWriter.WriteToDesktop("ExecuteWithConditionalOperatorZeroT", formattedProfileResult);
    }
}
```

## Neat Tricks for Effortlessly Formatting Currency in C#

```csharp
[Flags]
public enum DigitsFormattingSettings
{
    None = 0,
    NoComma = 1,
    PrefixDollar = 2,
    PrefixMinus = 4,
    SufixDollar = 8
}
```

```csharp
[Flags]
public enum DigitsFormattingSettingsBitShifting
{
    None = 0,
    NoComma = 1 << 0,
    PrefixDollar = 1 << 1,
    PrefixMinus = 1 << 2,
    SufixDollar = 1 << 3
}
```

```csharp
public static class CurrencyDelimiterFormatter
{
    private static readonly CultureInfo usCultureInfo = CultureInfo.CreateSpecificCulture("en-US");

    public static string ToStringUsDigitsFormatting(
        this double number,
        DigitsFormattingSettings digitsFormattingSettings = DigitsFormattingSettings.None,
        int precesion = 2)
    {
        string result = ToStringUsDigitsFormattingInternal(number, digitsFormattingSettings, precesion);

        return result;
    }

    public static string ToStringUsDigitsFormatting(
        this decimal number,
        DigitsFormattingSettings digitsFormattingSettings = DigitsFormattingSettings.None,
        int precesion = 2)
    {
        string result = ToStringUsDigitsFormattingInternal(number, digitsFormattingSettings, precesion);

        return result;
    }

    private static string ToStringUsDigitsFormattingInternal(
        dynamic number,
        DigitsFormattingSettings digitsFormattingSettings = DigitsFormattingSettings.None,
        int precesion = 2)
    {
        string formattedDigits = string.Empty;
        string currentNoComaFormatSpecifier = string.Concat("#.", new string('0', precesion));
        string currentComaFormatSpecifier = string.Concat("##,#.", new string('0', precesion));
        formattedDigits =
                            digitsFormattingSettings.HasFlag(DigitsFormattingSettings.NoComma) ? number.ToString(currentNoComaFormatSpecifier, usCultureInfo) :
                            number.ToString(currentComaFormatSpecifier, usCultureInfo);
        if (digitsFormattingSettings.HasFlag(DigitsFormattingSettings.PrefixDollar))
        {
            formattedDigits = string.Concat("$", formattedDigits);
        }
        if (digitsFormattingSettings.HasFlag(DigitsFormattingSettings.PrefixMinus))
        {
            formattedDigits = string.Concat("-", formattedDigits);
        }
        if (digitsFormattingSettings.HasFlag(DigitsFormattingSettings.SufixDollar))
        {
            formattedDigits = string.Concat(formattedDigits, "$");
        }
        return formattedDigits;
    }
}
```

```csharp
private static string ToStringUsDigitsFormattingInternal<T>(
    T number,
    DigitsFormattingSettings digitsFormattingSettings = DigitsFormattingSettings.None,
    int precesion = 2)
    where T : struct,
                IComparable,
                IComparable<T>,
                IConvertible,
                IEquatable<T>,
                IFormattable
{
    string formattedDigits = string.Empty;
    string currentNoComaFormatSpecifier = string.Concat("#.", new string('0', precesion));
    string currentComaFormatSpecifier = string.Concat("##,#.", new string('0', precesion));
    formattedDigits =
                        digitsFormattingSettings.HasFlag(DigitsFormattingSettings.NoComma) ? number.ToString(currentNoComaFormatSpecifier, usCultureInfo) :
                        number.ToString(currentComaFormatSpecifier, usCultureInfo);
    if (digitsFormattingSettings.HasFlag(DigitsFormattingSettings.PrefixDollar))
    {
        formattedDigits = string.Concat("$", formattedDigits);
    }
    if (digitsFormattingSettings.HasFlag(DigitsFormattingSettings.PrefixMinus))
    {
        formattedDigits = string.Concat("-", formattedDigits);
    }
    if (digitsFormattingSettings.HasFlag(DigitsFormattingSettings.SufixDollar))
    {
        formattedDigits = string.Concat(formattedDigits, "$");
    }

    return formattedDigits;
}
```

```csharp
string currentNoComaFormatSpecifier = string.Concat("#.", new string('0', precesion));
string currentComaFormatSpecifier = string.Concat("##,#.", new string('0', precesion));
```

```csharp
public static unsafe void Main(string[] args)
{
    Console.WriteLine(1220.5.ToStringUsDigitsFormatting(DigitsFormattingSettings.PrefixDollar));
    // Result- $1,220.50
    Console.WriteLine(1220.5.ToStringUsDigitsFormatting(DigitsFormattingSettings.SufixDollar | DigitsFormattingSettings.NoComma));
    // Result- 1220.50$
    Console.WriteLine(1220.53645.ToStringUsDigitsFormatting(DigitsFormattingSettings.SufixDollar | DigitsFormattingSettings.NoComma | DigitsFormattingSettings.PrefixMinus, 4));
    // Result- -1220.5365$
}
```

## Top 15 Underutilized Features of .NET Part 2

```csharp
dynamic dynamicVariable;
int i = 20;
dynamicVariable = (dynamic)i;
Console.WriteLine(dynamicVariable);

string stringVariable = "Example string.";
dynamicVariable = (dynamic)stringVariable;
Console.WriteLine(dynamicVariable);

DateTime dateTimeVariable = DateTime.Today;
dynamicVariable = (dynamic)dateTimeVariable;
Console.WriteLine(dynamicVariable);

// The expression returns true unless dynamicVariable has the value null.
if (dynamicVariable is dynamic)
{
    Console.WriteLine("d variable is dynamic");
}

// dynamic and the as operator.
dynamicVariable = i as dynamic;

// throw RuntimeBinderException if the associated object doesn't have the specified method.
// The code is still compiling successfully.
Console.WriteLine(dynamicVariable.ToNow1);
```

```csharp
dynamic samplefootballLegendObject = new ExpandoObject();

samplefootballLegendObject.FirstName = "Joro";
samplefootballLegendObject.LastName = "Beckham-a";
samplefootballLegendObject.Team = "Loko Mezdra";
samplefootballLegendObject.Salary = 380.5m;
samplefootballLegendObject.AsString = new Action(
            () =>
            Console.WriteLine("{0} {1} {2} {3}",
            samplefootballLegendObject.FirstName,
            samplefootballLegendObject.LastName,
            samplefootballLegendObject.Team,
            samplefootballLegendObject.Salary)
            );
```

```csharp
float? yourSingle = –1.0f;
Console.WriteLine(yourSingle.GetValueOrDefault());
yourSingle = null;
Console.WriteLine(yourSingle.GetValueOrDefault());
// assign different default value
Console.WriteLine(yourSingle.GetValueOrDefault(–2.4f));
// returns the same result as the above statement
Console.WriteLine(yourSingle ?? –2.4f);
```

```csharp
public static class DictionaryExtensions
{
    public static TValue GetValueOrDefault<TKey, TValue>(this Dictionary<TKey, TValue> dic, TKey key)
    {
        TValue result;
        return dic.TryGetValue(key, out result) ? result : default(TValue);
    }
}
```

```csharp
Dictionary<int, string> names = new Dictionary<int, string>();
names.Add(0, "Willy");
Console.WriteLine(names.GetValueOrDefault(1));
```

```csharp
string startPath = Path.Combine(string.Concat(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "\\Start"));
string resultPath = Path.Combine(string.Concat(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "\\Result"));
Directory.CreateDirectory(startPath);
Directory.CreateDirectory(resultPath);
string zipPath = Path.Combine(string.Concat(resultPath, "\\", Guid.NewGuid().ToString(), ".zip"));
string extractPath = Path.Combine(string.Concat(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "\\Extract"));
Directory.CreateDirectory(extractPath);

ZipFile.CreateFromDirectory(startPath, zipPath);

ZipFile.ExtractToDirectory(zipPath, extractPath);
```

```csharp
#if LIVE
#warning A day without sunshine is like, you know, night.
#endif
```

```csharp
#error Deprecated code in this method.

```

```csharp
#line 100 "Pandiculation"
int i;    // CS0168 on line 101
int j;    // CS0168 on line 102
#line default
char c;   // CS0168 on line 288
float f;  // CS0168 on line 289
```

```csharp
#region Thomas Sowell Quote
Console.WriteLine("It takes considerable knowledge just to realize the extent of your own ignorance.");
#endregion
```

```csharp
static unsafe void Fibonacci()
{
    const int arraySize = 20;
    int* fib = stackalloc int[arraySize];
    int* p = fib;
    *p++ = *p++ = 1;
    for (int i = 2; i < arraySize; ++i, ++p)
    {
        *p = p[–1] + p[–2];
    }
    for (int i = 0; i < arraySize; ++i)
    {
        Console.WriteLine(fib[i]);
    }
}
```

```csharp
private static string GetMacro(int macroId, int row, int endCol)
{
    StringBuilder sb = new StringBuilder();
    string range = "ActiveSheet.Range(Cells(" + row + "," + 3 +
        "), Cells(" + row + "," + (endCol + 3) + ")).Select";
    sb.AppendLine("Sub Macro" + macroId + "()");
    sb.AppendLine("On Error Resume Next");
    sb.AppendLine(range);
    sb.AppendLine("ActiveSheet.Shapes.AddChart.Select");
    sb.AppendLine("ActiveChart.ChartType = xlLine");
    sb.AppendLine("ActiveChart.SetSourceData Source:=" + range);
    sb.AppendLine("On Error GoTo 0");
    sb.AppendLine("End Sub");

    return sb.ToString();
}

private static void AddChartButton(MSExcel.Workbook workBook, MSExcel.Worksheet xlWorkSheetNew,
    MSExcel.Range currentRange, int macroId, int currentRow, int endCol, string buttonImagePath)
{
    MSExcel.Range cell = currentRange.Next;
    var width = cell.Width;
    var height = 15;
    var left = cell.Left;
    var top = Math.Max(cell.Top + cell.Height – height, 0);
    MSExcel.Shape button = xlWorkSheetNew.Shapes.AddPicture(@buttonImagePath, MsoTriState.msoFalse,
        MsoTriState.msoCTrue, left, top, width, height);

    VBIDE.VBComponent module = workBook.VBProject.VBComponents.Add(VBIDE.vbext_ComponentType.vbext_ct_StdModule);
    module.CodeModule.AddFromString(GetMacro(macroId, currentRow, endCol));
    button.OnAction = "Macro" + macroId;

}
```

```csharp
volatile bool shouldPartyContinue = true;

public static unsafe void Main(string[] args)
{
    Program firstDimension = new Program();
    Thread secondDimension = new Thread(firstDimension.StartPartyInAnotherDimension);
    secondDimension.Start(firstDimension);
    Thread.Sleep(5000);
    firstDimension.shouldPartyContinue = false;
    Console.WriteLine("Party Grand Finish");
}

private void StartPartyInAnotherDimension(object input)
{
    Program currentDimensionInput = (Program)input;
    Console.WriteLine("let the party begin");
    while (currentDimensionInput.shouldPartyContinue)
    {
    }
    Console.WriteLine("Party ends :(");
}
```

```csharp
public static unsafe void Main(string[] args)
{
    global::System.Console.WriteLine("Wine is constant proof that God loves us and loves to see us happy. -Benjamin Franklin");
}

public class System { }

// Define a constant called 'Console' to cause more problems.
const int Console = 7;
const int number = 66;
```

```csharp
[DebuggerDisplay("{DebuggerDisplay}")]
public class DebuggerDisplayTest
{
    private string squirrelFirstNameName;
    private string squirrelLastNameName;

    public string SquirrelFirstNameName
    {
        get
        {
            return squirrelFirstNameName;
        }
        set
        {
            squirrelFirstNameName = value;
        }
    }

    [DebuggerBrowsable(DebuggerBrowsableState.Collapsed)]
    public string SquirrelLastNameName
    {
        get
        {
            return squirrelLastNameName;
        }
        set
        {
            squirrelLastNameName = value;
        }
    }

    public int Age { get; set; }

    private string DebuggerDisplay
    {
        get { return string.Format("{0} de {1}", SquirrelFirstNameName, SquirrelLastNameName); }
    }
}
```

```csharp
[DebuggerDisplay("Age {Age > 0 ? Age : 5}")]
public class DebuggerDisplayTest
{
    private string squirrelFirstNameName;
    private string squirrelLastNameName;

    public string SquirrelFirstNameName
    {
        get
        {
            return squirrelFirstNameName;
        }
        set
        {
            squirrelFirstNameName = value;
        }
    }

    [DebuggerBrowsable(DebuggerBrowsableState.Collapsed)]
    public string SquirrelLastNameName
    {
        get
        {
            return squirrelLastNameName;
        }
        set
        {
            squirrelLastNameName = value;
        }
    }

    public int Age { get; set; }

    private string DebuggerDisplay
    {
        get { return string.Format("{0} de {1}", SquirrelFirstNameName, SquirrelLastNameName); }
    }
}
```

```csharp
[DebuggerStepThroughAttribute]
public class DebuggerDisplayTest
{
    private string squirrelFirstNameName;
    private string squirrelLastNameName;

    public string SquirrelFirstNameName
    {
        get
        {
            return squirrelFirstNameName;
        }
        set
        {
            squirrelFirstNameName = value;
        }
    }

    [DebuggerBrowsable(DebuggerBrowsableState.Collapsed)]
    public string SquirrelLastNameName
    {
        get
        {
            return squirrelLastNameName;
        }
        set
        {
            squirrelLastNameName = value;
        }
    }

    public int Age { get; set; }

    private string DebuggerDisplay
    {
        get { return string.Format("{0} de {1}", SquirrelFirstNameName, SquirrelLastNameName); }
    }
}
```

```csharp
public static unsafe void Main(string[] args)
{
    StartBugsParty();
}

[Conditional("LIVE")]
public static void StartBugsParty()
{
    Console.WriteLine("Let the bugs free. Start the Party.");
}
```

```csharp
using static System.Math;
using static System.Console;

```

```csharp
WriteLine(Sqrt(42563));

```

```csharp
using IntList = System.Collections.Generic.List<int>;

```

```csharp
IntList intList = new IntList();
intList.Add(1);
intList.Add(2);
intList.Add(3);
intList.ForEach(x => WriteLine(x));
```

## Types Of Code Coverage- Examples In C#

```csharp
private void PeformAction(int x, int y)
{
    this.DoSomething();
    if (x > 3 && y < 6)
    {
        this.DoSomethingElse();
    }
    this.DoSomething();
}

```

```csharp
private void PeformAction(int x, int y)
{
    this.DoSomething();
    if (x > 3 && y < 6)
    {
        this.DoSomethingElse();
    }
    else
    {
        System.Console.WriteLine(x + y);
    }
    this.DoSomething();
}
```

```csharp
private void PeformAction(int x, int y, bool shouldExecute)
{
    if (shouldExecute)
    {
        this.DoSomething();
        if (x > 3 && y < 6)
        {
            this.DoSomethingElse();
        }
        else
        {
            System.Console.WriteLine(x + y);
        }
        this.DoSomething();
    }
}
```

```csharp
private void PeformAction(int x, int y, int z)
{
    this.DoSomething();
    if ((x > 3 && y < 6) || z == 20)
    {
        this.DoSomethingElse();
    }
    else
    {
        System.Console.WriteLine(x + y);
    }
    this.DoSomething();
}
```

```csharp
private void PeformAction(int x, int y)
{
    this.DoSomething();
    if (x > 3 && y < 6)
    {
        this.DoSomethingElse();
    }
    else
    {
        System.Console.WriteLine(x + y);
    }
    this.DoSomething();
}
```

```csharp
private void PeformAction(int x, int y)
{
    this.DoSomething();
    if (3 <= x && x < 5)
    {
        this.DoSomethingElse();
    }
    else
    {
        System.Console.WriteLine(x + y);
    }
    this.DoSomething();
}
```

```csharp
private void PeformAction(int x, int y)
{
    this.DoSomething();
    if (4 <= x || y < 6)
    {
        this.DoSomethingElse();
    }
    else
    {
        System.Console.WriteLine(x + y);
    }
    this.DoSomething();
}
```

## Reduced AutoMapper- Auto-Map Objects 180% Faster

```csharp
public class FirstObject
{
    public FirstObject()
    {
    }

    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string PoNumber { get; set; }
    public decimal Price { get; set; }
    public DateTime SkipDateTime { get; set; }
    public SecondObject SecondObjectEntity { get; set; }
    public List<SecondObject> SecondObjects { get; set; }
    public List<int> IntCollection { get; set; }
    public int[] IntArr { get; set; }
    public SecondObject[] SecondObjectArr { get; set; }
}
```

```csharp
[DataContract]
public class MapFirstObject
{
    [DataMember]
    public string FirstName { get; set; }
    [DataMember]
    public string SecondName { get; set; }
    [DataMember]
    public string PoNumber { get; set; }
    [DataMember]
    public decimal Price { get; set; }
    [DataMember]
    public MapSecondObject SecondObjectEntity { get; set; }

    public MapFirstObject()
    {
    }
}
```

```csharp
private Dictionary<object, object> mappingTypes;
public Dictionary<object, object> MappingTypes
{
    get
    {
        return this.mappingTypes;
    }
    set
    {
        this.mappingTypes = value;
    }
}

public void CreateMap<TSource, TDestination>()
    where TSource : new()
    where TDestination : new()
{
    if (!this.MappingTypes.ContainsKey(typeof(TSource)))
    {
        this.MappingTypes.Add(typeof(TSource), typeof(TDestination));
    }
}
```

```csharp
ReducedAutoMapper.Instance.CreateMap<FirstObject, MapFirstObject>();

```

```csharp
public TDestination Map<TSource, TDestination>(
    TSource realObject,
    TDestination dtoObject = default(TDestination),
    Dictionary<object, object> alreadyInitializedObjects = null,
    bool shouldMapInnerEntities = true)
    where TSource : class, new()
    where TDestination : class, new()
{
    if (realObject == null)
    {
        return null;
    }
    if (alreadyInitializedObjects == null)
    {
        alreadyInitializedObjects = new Dictionary<object, object>();
    }
    if (dtoObject == null)
    {
        dtoObject = new TDestination();
    }

    var realObjectType = realObject.GetType();
    PropertyInfo[] properties = realObjectType.GetProperties();
    foreach (PropertyInfo currentRealProperty in properties)
    {
        PropertyInfo currentDtoProperty = dtoObject.GetType().GetProperty(currentRealProperty.Name);
        if (currentDtoProperty == null)
        {
            ////Debug.WriteLine("The property {0} was not found in the DTO object in order to be mapped. Because of that we skip to map it.", currentRealProperty.Name);
        }
        else
        {
            if (this.MappingTypes.ContainsKey(currentRealProperty.PropertyType) && shouldMapInnerEntities)
            {
                object mapToObject = this.mappingTypes[currentRealProperty.PropertyType];
                var types = new Type[] { currentRealProperty.PropertyType, (Type)mapToObject };
                MethodInfo method = GetType().GetMethod("Map").MakeGenericMethod(types);
                var realObjectPropertyValue = currentRealProperty.GetValue(realObject, null);
                var objects = new object[]
                {
                    realObjectPropertyValue,
                    null,
                    alreadyInitializedObjects,
                    shouldMapInnerEntities
                };
                if (objects != null && realObjectPropertyValue != null)
                {
                    if (alreadyInitializedObjects.ContainsKey(realObjectPropertyValue) && currentDtoProperty.CanWrite)
                    {
                        // Set the cached version of the same object (optimization)
                        currentDtoProperty.SetValue(dtoObject, alreadyInitializedObjects[realObjectPropertyValue]);
                    }
                    else
                    {
                        // Add the object to cached objects collection.
                        alreadyInitializedObjects.Add(realObjectPropertyValue, null);
                        // Recursively call Map method again to get the new proxy object.
                        var newProxyProperty = method.Invoke(this, objects);
                        if (currentDtoProperty.CanWrite)
                        {
                            currentDtoProperty.SetValue(dtoObject, newProxyProperty);
                        }

                        if (alreadyInitializedObjects.ContainsKey(realObjectPropertyValue) && alreadyInitializedObjects[realObjectPropertyValue] == null)
                        {
                            alreadyInitializedObjects[realObjectPropertyValue] = newProxyProperty;
                        }
                    }
                }
                else if (realObjectPropertyValue == null && currentDtoProperty.CanWrite)
                {
                    // If the original value of the object was null set null to the destination property.
                    currentDtoProperty.SetValue(dtoObject, null);
                }
            }
            else if (!this.MappingTypes.ContainsKey(currentRealProperty.PropertyType))
            {
                // If the property is not custom type just set normally the value.
                if (currentDtoProperty.CanWrite)
                {
                    currentDtoProperty.SetValue(dtoObject, currentRealProperty.GetValue(realObject, null));
                }
            }
        }
    }

    return dtoObject;
}
```

```csharp
var realObjectType = realObject.GetType();
PropertyInfo[] properties = realObjectType.GetProperties();
```

```csharp
else if (!this.MappingTypes.ContainsKey(currentRealProperty.PropertyType))
{
    // If the property is not custom type just set normally the value.
    if (currentDtoProperty.CanWrite)
    {
        currentDtoProperty.SetValue(dtoObject, currentRealProperty.GetValue(realObject, null));
    }
}
```

```csharp
public List<TDestination> MapList<TSource, TDestination>(List<TSource> realObjects, Dictionary<object, object> alreadyInitializedObjects = null)
    where TSource : class, new()
    where TDestination : class, new()
{
    List<TDestination> mappedEntities = new List<TDestination>();
    foreach (var currentRealObject in realObjects)
    {
        TDestination currentMappedItem = this.Map<TSource, TDestination>(currentRealObject, alreadyInitializedObjects: alreadyInitializedObjects);
        mappedEntities.Add(currentMappedItem);
    }

    return mappedEntities;
}
```

```csharp
public class SecondObject
{
    public SecondObject(string firstNameS, string secondNameS, string poNumberS, decimal priceS)
    {
        this.FirstNameS = firstNameS;
        this.SecondNameS = secondNameS;
        this.PoNumberS = poNumberS;
        this.PriceS = priceS;
        ThirdObject1 = new ThirdObject();
        ThirdObject2 = new ThirdObject();
        ThirdObject3 = new ThirdObject();
        ThirdObject4 = new ThirdObject();
        ThirdObject5 = new ThirdObject();
        ThirdObject6 = new ThirdObject();
    }

    public SecondObject()
    {
    }

    public string FirstNameS { get; set; }
    public string SecondNameS { get; set; }
    public string PoNumberS { get; set; }
    public decimal PriceS { get; set; }
    public ThirdObject ThirdObject1 { get; set; }
    public ThirdObject ThirdObject2 { get; set; }
    public ThirdObject ThirdObject3 { get; set; }
    public ThirdObject ThirdObject4 { get; set; }
    public ThirdObject ThirdObject5 { get; set; }
    public ThirdObject ThirdObject6 { get; set; }
}
```

```csharp
ublic class ThirdObject
{
    public ThirdObject()
    {
    }

    public DateTime DateTime1 { get; set; }
    public DateTime DateTime2 { get; set; }
    public DateTime DateTime3 { get; set; }
    //.. it contains 996 properties more
    public DateTime DateTime1000 { get; set; }
}
```

```csharp
public class Program
{
    static void Main(string[] args)
    {
        Profile("Test Reduced AutoMapper 10 Runs 10k Objects", 10, () => MapObjectsReduceAutoMapper());
        System.Console.ReadLine();
    }

    static void Profile(string description, int iterations, Action actionToProfile)
    {
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();

        var watch = new Stopwatch();
        watch.Start();
        for (int i = 0; i < iterations; i++)
        {
            actionToProfile();
        }
        watch.Stop();
        System.Console.WriteLine(description);
        System.Console.WriteLine("Total: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
            watch.ElapsedMilliseconds, watch.ElapsedTicks, iterations);
        var avgElapsedMillisecondsPerRun = watch.ElapsedMilliseconds / iterations;
        var avgElapsedTicksPerRun = watch.ElapsedMilliseconds / iterations;
        System.Console.WriteLine("AVG: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
            avgElapsedMillisecondsPerRun, avgElapsedTicksPerRun, iterations);
    }

    static void MapObjectsReduceAutoMapper()
    {
        List<FirstObject> firstObjects = new List<FirstObject>();
        List<MapFirstObject> mapFirstObjects = new List<MapFirstObject>();

        ReducedAutoMapper.Instance.CreateMap<FirstObject, MapFirstObject>();
        ReducedAutoMapper.Instance.CreateMap<SecondObject, MapSecondObject>();
        ReducedAutoMapper.Instance.CreateMap<ThirdObject, MapThirdObject>();
        for (int i = 0; i < 10000; i++)
        {
            FirstObject firstObject =
                new FirstObject(Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), (decimal)12.2, DateTime.Now,
                    new SecondObject(Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), (decimal)11.2));
            firstObjects.Add(firstObject);
        }
        foreach (var currentObject in firstObjects)
        {
            MapFirstObject mapSecObj = ReducedAutoMapper.Instance.Map<FirstObject, MapFirstObject>(currentObject);
            mapFirstObjects.Add(mapSecObj);
        }
    }
}
```

```csharp
public class Program
{
    static void Main(string[] args)
    {
        Profile("Test Original AutoMapper 10 Runs 10k Objects", 10, () => MapObjectsAutoMapper());
        System.Console.ReadLine();
    }

    static void Profile(string description, int iterations, Action actionToProfile)
    {
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();

        var watch = new Stopwatch();
        watch.Start();
        for (int i = 0; i < iterations; i++)
        {
            actionToProfile();
        }
        watch.Stop();
        System.Console.WriteLine(description);
        System.Console.WriteLine("Total: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
            watch.ElapsedMilliseconds, watch.ElapsedTicks, iterations);
        var avgElapsedMillisecondsPerRun = watch.ElapsedMilliseconds / iterations;
        var avgElapsedTicksPerRun = watch.ElapsedMilliseconds / iterations;
        System.Console.WriteLine("AVG: {0:0.00} ms ({1:N0} ticks) (over {2:N0} iterations)",
            avgElapsedMillisecondsPerRun, avgElapsedTicksPerRun, iterations);
    }

    static void MapObjectsAutoMapper()
    {
        List<FirstObject> firstObjects = new List<FirstObject>();
        List<MapFirstObject> mapFirstObjects = new List<MapFirstObject>();

        AutoMapper.Mapper.CreateMap<FirstObject, MapFirstObject>();
        AutoMapper.Mapper.CreateMap<SecondObject, MapSecondObject>();
        AutoMapper.Mapper.CreateMap<ThirdObject, MapThirdObject>();
        for (int i = 0; i < 10000; i++)
        {
            FirstObject firstObject =
                new FirstObject(Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), (decimal)12.2, DateTime.Now,
                    new SecondObject(Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), (decimal)11.2));
            firstObjects.Add(firstObject);
        }
        foreach (var currentObject in firstObjects)
        {
            MapFirstObject mapSecObj = AutoMapper.Mapper.Map<FirstObject, MapFirstObject>(currentObject);
            mapFirstObjects.Add(mapSecObj);
        }
    }
}
```

## Hints For Arranging Usings in Visual Studio Efficiently

```csharp
using System;
using System.IO;
using Microsoft.TeamFoundation.TestManagement.Client;
using Microsoft.TeamFoundation.Client;
using System.Collections.Generic;
using System.Dynamic;
```

## 7 New Cool Features in C# 6.0

```csharp
public class Person
{
    public string FirstName { get; set; } = "Anton";
    public string LastName { get; set; } = "Angelov";
}
```

```csharp
public class Person(string firstName, string lastName)
{
    public string FirstName { get; set; } = firstName;
    public string LastName { get; set; } = lastName;
}
```

```csharp
public class Person(string firstName, string lastName)
{
 {
    if (firstName == null)
     throw new ArgumentNullException("firstName");
    if (lastName == null)
     throw new ArgumentNullException("lastName");
}
public string FirstName { get; } = firstName;
public string LastName { get; } = lastName;
}
```

```csharp
using System.Console;

namespace ConsoleApplicationTest
{
    class Program
    {
        static void Main(string[] args)
        {
            //Use writeLine method of Console class
            //Without specifying the class name
            WriteLine("Hellow World");
        }
    }
}

```

```csharp
try
{
    throw new Exception("C#");
}
catch (Exception ex) if (ex.Message == "C#")
{
    // this one will execute.
}
catch (Exception ex) if (ex.Message == "VB.NET")
{
    // this one will not execute
}
```

```csharp
int? length = animals?.Length; //null if animals is null
Animal first = animals?[0]; //null if animals is null

```

```csharp
int length = animals?.Length ?? 0; // 0 if animals null

```

```csharp
var animals = new Dictionary<int, string> {
   { 5, "cat" },
   { 9, "dog" },
   { 8, "rat" }
};
```

```csharp
var animals = new Dictionary<int, string>
{
    [5] = "cat",
    [9] = "dog",
    [8] = "rat"
};
```

```csharp
var names = new Dictionary<string, string>()
{
   // using inside the intializer
   $first = "Anton"
};

//Assign value to member
//the old way:
names["first"] = "Anton";

// the new way
names.$first = "Anton";
```

## 19 Must-Know Visual Studio Keyboard Shortcuts – Part 2

## Generic Properties Validator C# Code

```csharp
public class ObjectToAssert
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PoNumber { get; set; }
    public decimal Price { get; set; }
    public DateTime SkipDateTime { get; set; }
}
```

```csharp
ObjectToAssert expectedObject = new ObjectToAssert()
{
    FirstName = "Anton",
    PoNumber = "TestPONumber",
    LastName = "Angelov",
    Price = 12.3M,
    SkipDateTime = new DateTime(1989, 10, 28)
};

ObjectToAssert actualObject = new ObjectToAssert()
{
    FirstName = "AntonE",
    PoNumber = "TestPONumber",
    LastName = "Angelov",
    Price = 12.3M,
    SkipDateTime = new DateTime(1989, 10, 28)
};

Assert.AreEqual<string>(expectedObject.FirstName, actualObject.FirstName, "The first name was not as expected.");
Assert.AreEqual<string>(expectedObject.LastName, actualObject.LastName, "The last name was not as expected.");
Assert.AreEqual<string>(expectedObject.PoNumber, actualObject.PoNumber, "The PO Number was not as expected.");
Assert.AreEqual<decimal>(expectedObject.Price, actualObject.Price, "The price was not as expected.");
DateTimeAssert.Validate(
expectedObject.SkipDateTime,
actualObject.SkipDateTime,
DateTimeDeltaType.Days,
1);
```

```csharp
public class PropertiesValidator<K, T> where T : new() where K : new()
{
    private static K instance;
    public static K Instance
    {
        get
        {
            if (instance == null)
            {
                instance = new K();
            }
            return instance;
        }
    }

    public void Validate(T expectedObject, T realObject, params string[] propertiesNotToCompare)
    {
        PropertyInfo[] properties = realObject.GetType().GetProperties();
        foreach (PropertyInfo currentRealProperty in properties)
        {
            if (!propertiesNotToCompare.Contains(currentRealProperty.Name))
            {
                PropertyInfo currentExpectedProperty = expectedObject.GetType().GetProperty(currentRealProperty.Name);
                string exceptionMessage =
                    string.Format("The property {0} of class {1} was not as expected.", currentRealProperty.Name, currentRealProperty.DeclaringType.Name);

                if (currentRealProperty.PropertyType != typeof(DateTime) && currentRealProperty.PropertyType != typeof(DateTime?))
                {
                    Assert.AreEqual(currentExpectedProperty.GetValue(expectedObject, null), currentRealProperty.GetValue(realObject, null), exceptionMessage);
                }
                else
                {
                    DateTimeAssert.Validate(
                    currentExpectedProperty.GetValue(expectedObject, null) as DateTime?,
                    currentRealProperty.GetValue(realObject, null) as DateTime?,
                    DateTimeDeltaType.Minutes,
                    5);
                }
            }
        }
    }
}
```

```csharp
public class ObjectToAssertValidator : PropertiesValidator<ObjectToAssertValidator, ObjectToAssert>
{
    public void Validate(ObjectToAssert expected, ObjectToAssert actual)
    {
        this.Validate(expected, actual, "FirstName");
    }
}
```

```csharp
ObjectToAssertValidator.Instance.Validate(expectedObject, actualObject);

```

## Assert DateTime the Right Way MSTest NUnit C# Code

```csharp
DateTime now = DateTime.Now;
DateTime later = now + TimeSpan.FromHours(1.0);

Assert.That(later.Is.EqualTo(now).Within(TimeSpan.FromHours(3.0));
Assert.That(later, Is.EqualTo(now).Within(3).Hours;
```

```csharp
public enum DateTimeDeltaType
{
    Days,
    Minutes
}
```

```csharp
public static class DateTimeAssert
{
    public static void AreEqual(DateTime? expectedDate, DateTime? actualDate, DateTimeDeltaType deltaType, int count)
    {
        if (expectedDate == null && actualDate == null)
        {
            return;
        }
        else if (expectedDate == null)
        {
            throw new NullReferenceException("The expected date was null");
        }
        else if (actualDate == null)
        {
            throw new NullReferenceException("The actual date was null");
        }
        TimeSpan expectedDelta = GetTimeSpanDeltaByType(deltaType, count);
        double totalSecondsDifference = Math.Abs(((DateTime)actualDate – (DateTime)expectedDate).TotalSeconds);

        if (totalSecondsDifference > expectedDelta.TotalSeconds)
        {
            throw new Exception(string.Format("Expected Date: {0}, Actual Date: {1} \nExpected Delta: {2}, Actual Delta in seconds- {3} (Delta Type: {4})",
                                            expectedDate,
                                            actualDate,
                                            expectedDelta,
                                            totalSecondsDifference,
                                            deltaType));
        }
    }

    private static TimeSpan GetTimeSpanDeltaByType(DateTimeDeltaType type, int count)
    {
        TimeSpan result = default(TimeSpan);

        switch (type)
        {
            case DateTimeDeltaType.Days:
                result = new TimeSpan(count, 0, 0, 0);
                break;
            case DateTimeDeltaType.Minutes:
                result = new TimeSpan(0, count, 0);
                break;
            default: throw new NotImplementedException("The delta type is not implemented.");
        }

        return result;
    }
}
```

```csharp
DateTimeAssert.AreEqual(
    new DateTime(2014, 10, 10, 20, 22, 16),
    new DateTime(2014, 10, 11, 20, 22, 16),
    DateTimeDeltaType.Days,
    1);
```

```csharp
public static class DateTimeAssert
{
    public static void AreEqual(DateTime? expectedDate, DateTime? actualDate, TimeSpan maximumDelta)
    {
        if (expectedDate == null && actualDate == null)
        {
            return;
        }
        else if (expectedDate == null)
        {
            throw new NullReferenceException("The expected date was null");
        }
        else if (actualDate == null)
        {
            throw new NullReferenceException("The actual date was null");
        }
        double totalSecondsDifference = Math.Abs(((DateTime)actualDate – (DateTime)expectedDate).TotalSeconds);

        if (totalSecondsDifference > maximumDelta.TotalSeconds)
        {
            throw new Exception(string.Format("Expected Date: {0}, Actual Date: {1} \nExpected Delta: {2}, Actual Delta in seconds- {3}",
                                            expectedDate,
                                            actualDate,
                                            maximumDelta,
                                            totalSecondsDifference));
        }
    }
}
```

```csharp
DateTimeAssert.AreEqual(
    new DateTime(2014, 10, 10, 20, 22, 16),
    new DateTime(2014, 10, 11, 20, 22, 16),
    TimeSpan.FromMilliSeconds(500);
DateTimeAssert.AreEqual(
    new DateTime(2014, 10, 10, 20, 22, 16),
    new DateTime(2014, 10, 11, 20, 22, 16),
    TimeSpan.FromMinutes(0.5); // half a minute = 30s
```

## Windows Registry Read Write C# Code

```csharp
RegistryKey key;
key = Registry.CurrentUser.CreateSubKey("Names");
key.SetValue("Name", "Isabella");
key.Close();
```

```csharp
public abstract class BaseRegistryService
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

    protected string MainRegistrySubKey;

    protected void Write(string subKeys, Object value)
    {
        string[] subKeyNames = subKeys.Split('/');
        List<RegistryKey> registryKeys = new List<RegistryKey>();
        for (int i = 0; i < subKeyNames.Length; i++)
        {
            RegistryKey currentRegistryKey = default(RegistryKey);
            if (i == 0)
            {
                currentRegistryKey = Registry.CurrentUser.CreateSubKey(subKeyNames[i]);
            }
            else if (i < subKeyNames.Length – 1)
            {
            currentRegistryKey = registryKeys[i – 1].CreateSubKey(subKeyNames[i]);
        }
            else
        {
            registryKeys.Last().SetValue(subKeyNames.Last(), value);
        }
        registryKeys.Add(currentRegistryKey);
    }

        this.CloseAllRegistryKeys(registryKeys);
}

protected Object Read(string subKeys)
{
    Object result = default(Object);

    try
    {
        string[] subKeyNames = subKeys.Split('/');
        List<RegistryKey> registryKeys = new List<RegistryKey>();
        for (int i = 0; i < subKeyNames.Length – 1; i++)
            {
    RegistryKey currentRegistryKey = default(RegistryKey);
    if (i == 0)
    {
        currentRegistryKey = Registry.CurrentUser.OpenSubKey(subKeyNames[i]);
    }
    else
    {
        currentRegistryKey = registryKeys[i – 1].OpenSubKey(subKeyNames[i]);
    }
    registryKeys.Add(currentRegistryKey);
    if (registryKeys.Last() != null && subKeyNames.Last() != null)
    {
        result = registryKeys.Last().GetValue(subKeyNames.Last());
    }
}
        }
        catch (Exception ex)
        {
    log.Error(ex);
}

return result;
    }

    protected int ReadInt(string subKeys)
{
    int result = (int)this.Read(subKeys);

    return result;
}

protected double? ReadDouble(string subKeys)
{
    object obj = this.Read(subKeys);
    double? result = null;
    if (obj != null)
    {
        result = double.Parse(obj.ToString());
    }

    return result;
}

protected bool ReadBool(string subKeys)
{
    bool result = default(bool);
    string resultStr = (string)this.Read(subKeys);
    if (!string.IsNullOrEmpty(resultStr))
    {
        result = bool.Parse(resultStr);
    }

    return result;
}

protected string ReadStr(string subKeys)
{
    string result = string.Empty;
    string resultStr = (string)this.Read(subKeys);
    if (!string.IsNullOrEmpty(resultStr))
    {
        result = resultStr;
    }

    return result;
}

protected string GenerateMergedKey(params string[] keys)
{
    string result = this.MainRegistrySubKey;
    foreach (var currentKey in keys)
    {
        result = string.Join("/", result, currentKey);
    }

    return result;
}

private void CloseAllRegistryKeys(List<RegistryKey> registryKeys)
{
    for (int i = 0; i < registryKeys.Count – 1; i++)
        {
    registryKeys[i].Close();
}
    }
}
```

```csharp
public class UIRegistryManager : BaseRegistryManager
{
    private static UIRegistryManager instance;

    private readonly string themeRegistrySubKeyName = "theme";

    private readonly string shouldOpenDropDownOnHoverRegistrySubKeyName = "shouldOpenDropDrownOnHover";

    private readonly string titlePromptDialogRegistrySubKeyName = "titlePromptDialog";

    public UIRegistryManager(string mainRegistrySubKey)
    {
        this.MainRegistrySubKey = mainRegistrySubKey;
    }

    public static UIRegistryManager Instance
    {
        get
        {
            if (instance == null)
            {
                string mainRegistrySubKey = ConfigurationManager.AppSettings["mainUIRegistrySubKey"];
                instance = new UIRegistryManager(mainRegistrySubKey);
            }
            return instance;
        }
    }

    public void WriteCurrentTheme(string theme)
    {
        this.Write(this.GenerateMergedKey(this.themeRegistrySubKeyName), theme);
    }

    public void WriteTitleTitlePromtDialog(string title)
    {
        this.Write(this.GenerateMergedKey(this.titlePromptDialogRegistrySubKeyName, this.titleTitlePromptDialogIsCanceledRegistrySubKeyName), title);
    }

    public bool ReadIsCheckboxDialogSubmitted()
    {
        return this.ReadBool(this.GenerateMergedKey(this.checkboxPromptDialogIsSubmittedRegistrySubKeyName));
    }

    public string ReadTheme()
    {
        return this.ReadStr(this.GenerateMergedKey(this.themeRegistrySubKeyName));
    }
}
```

## Specify Assembly References Based On Build Configuration in Visual Studio

```xml
<Reference Include="Microsoft.TeamFoundation.Client, Version=11.0.0.0, Culture=neutral,
PublicKeyToken=b03f5f7f11d50a3a, processorArchitecture=MSIL"/>
```

```xml
<Reference Include="Microsoft.TeamFoundation.Client, Version=11.0.0.0, Culture=neutral,
PublicKeyToken=b03f5f7f11d50a3a, processorArchitecture=MSIL"
Condition="'$(Configuration)' == 'VisualStudio_2012'
OR '$(Configuration)' == 'Debug' OR '$(Configuration)' == 'Release'"/>
```

```xml
<Reference Include="Microsoft.TeamFoundation.Client, Version=12.0.0.0,
Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a, processorArchitecture=MSIL"
Condition="'$(Configuration)' == 'VisualStudio_2013'"/>
```

## Fidely Open Source .NET Search Query Compiler

```csharp
public IEnumerable<TestCase> Search()
{
    var setting = SearchQueryCompilerBuilder.Instance.BuildUpDefaultObjectCompilerSetting<TestCase>();
    SearchQueryCompiler<TestCase> compiler = SearchQueryCompilerBuilder.Instance.BuildUpCompiler<TestCase>(setting);
    Expression<Func<TestCase, bool>> filter = compiler.Compile(this.InitialViewFilters.AdvancedSearchFilter);
    IEnumerable<TestCase> result = this.InitialTestCaseCollection.AsQueryable().Where(filter);
    return result;
}
```

```csharp
[Alias("title", Description = "The title of item")]
public string Title
{
    get
    {
        return this.title;
    }

    set
    {
        if (this.isInitialized)
        {
            UndoRedoManager.Instance().Push(t => this.Title = t, this.title, "Change the test case title");
        }
        this.title = value;
        this.NotifyPropertyChanged();
    }
}

[Alias("createdOn", Description = "The creation date of item")]
public DateTime DateCreated
{
    get
    {
        return this.dateCreated;
    }

    set
    {
        this.dateCreated = value;
        this.NotifyPropertyChanged();
    }
}
```

```csharp
[SuppressMessage("Microsoft.Usage", "CA1801", Justification = "To make the extension method for SearchQueryCompilerBuilder, the instance parameter is needed.")]
public static ObjectCompilerSetting BuildUpDefaultObjectCompilerSetting<T>(this SearchQueryCompilerBuilder instance)
{
    var setting = new ObjectCompilerSetting();

    RegisterDynamicVariableEvaluatorForYearTimeSpan(setting.DynamicVariableEvaluator);
    RegisterDynamicVariableEvaluatorForMonthTimeSpan(setting.DynamicVariableEvaluator);
    RegisterDynamicVariableEvaluatorForDayTimeSpan(setting.DynamicVariableEvaluator);

    setting.StaticVariableEvaluator.RegisterVariable("Now", () => DateTime.Now, "Now");
    setting.StaticVariableEvaluator.RegisterVariable("Today", () => DateTime.Today, "Today");

    setting.Evaluators.Add(new PropertyEvaluator<T>());
    setting.Evaluators.Add(setting.DynamicVariableEvaluator);
    setting.Evaluators.Add(setting.StaticVariableEvaluator);
    setting.Evaluators.Add(new TypeConversionEvaluator());

    setting.Operators.Add(new NotPartialMatch<T>("!:", true, OperatorIndependency.Strong, "Not Partial matching operator"));
    setting.Operators.Add(new PartialMatch<T>(":", true, OperatorIndependency.Strong, "Partial matching operator"));
    setting.Operators.Add(new PrefixSearch<T>("=:", true, OperatorIndependency.Strong, "Prefix search operator"));
    setting.Operators.Add(new SuffixSearch<T>(":=", true, OperatorIndependency.Strong, "Suffix search operator"));
    setting.Operators.Add(new Equal<T>("=", true, OperatorIndependency.Strong, "Equal operator"));
    setting.Operators.Add(new NotEqual<T>("!=", true, OperatorIndependency.Strong, "Not equal operator"));
    setting.Operators.Add(new LessThan<T>("<", OperatorIndependency.Strong, "Less than operator"));
    setting.Operators.Add(new LessThanOrEqual<T>("<=", OperatorIndependency.Strong, "Less than or equal operator"));
    setting.Operators.Add(new GreaterThan<T>(">", OperatorIndependency.Strong, "Greater than operator"));
    setting.Operators.Add(new GreaterThanOrEqual<T>(">=", OperatorIndependency.Strong, "Greater than or equal operator"));
    setting.Operators.Add(new Add("+", 1, OperatorIndependency.Strong, "Add operator"));
    setting.Operators.Add(new Subtract("–", 1, OperatorIndependency.Strong, "Subtract operator"));
    setting.Operators.Add(new Multiply("*", 0, OperatorIndependency.Strong, "Multiply operator"));
    setting.Operators.Add(new Divide("/", 0, OperatorIndependency.Strong, "Divide operator"));

    return setting;
}
```

```csharp
protected internal override Expression Compare(Operand left, Operand right)
{
    Logger.Info("Comparing operands (left = '{0}', right = '{1}').", left.OperandType.FullName, right.OperandType.FullName);

    var l = Expression.Call(null, typeof(Convert).GetMethod("ToString", new Type[] { typeof(object) }), Expression.Convert(left.Expression, typeof(object)));
    var r = Expression.Call(null, typeof(Convert).GetMethod("ToString", new Type[] { typeof(object) }), Expression.Convert(right.Expression, typeof(object)));

    if (ignoreCase)
    {
        var contains = typeof(string).GetMethod("Contains");
        var toLower = typeof(string).GetMethod("ToLower", BindingFlags.Instance | BindingFlags.Public, null, new Type[] { }, null);
        return Expression.Not(Expression.Call(Expression.Call(l, toLower), contains, Expression.Call(r, toLower)));
    }
    else
    {
        var contains = typeof(string).GetMethod("Contains");
        return Expression.Not(Expression.Call(l, contains, r));
    }
}
```

## MSBuild TCP IP Logger C# Code

```csharp

using Microsoft.Build.Utilities;
using Microsoft.Build.Framework;
```

```csharp
protected virtual void InitializeParameters()
{
    try
    {
        this.paramaterBag = new Dictionary<string, string>();
        log.Info("Initialize Logger params");
        if (!string.IsNullOrEmpty(Parameters))
        {
            foreach (string paramString in this.Parameters.Split(";".ToCharArray()))
            {
                string[] keyValue = paramString.Split("=".ToCharArray());
                if (keyValue == null || keyValue.Length < 2)
                {
                    continue;
                }
                this.ProcessParam(keyValue[0].ToLower(), keyValue[1]);
            }
        }
    }
    catch (Exception e)
    {
        throw new LoggerException("Unable to initialize parameters; message=" + e.Message, e);
    }
}
```

```csharp
clientSocketWriter = new System.Net.Sockets.TcpClient();
clientSocketWriter.Connect(ipServer, port);
networkStream = clientSocketWriter.GetStream();

```

```csharp
private void SubscribeToEvents(IEventSource eventSource)
{
    eventSource.BuildStarted += new BuildStartedEventHandler(this.BuildStarted);
    eventSource.BuildFinished += new BuildFinishedEventHandler(this.BuildFinished);
    eventSource.ProjectStarted += new ProjectStartedEventHandler(this.ProjectStarted);
    eventSource.ProjectFinished += new ProjectFinishedEventHandler(this.ProjectFinished);
    eventSource.TargetStarted += new TargetStartedEventHandler(this.TargetStarted);
    eventSource.TargetFinished += new TargetFinishedEventHandler(this.TargetFinished);
    eventSource.TaskStarted += new TaskStartedEventHandler(this.TaskStarted);
    eventSource.TaskFinished += new TaskFinishedEventHandler(this.TaskFinished);
    eventSource.ErrorRaised += new BuildErrorEventHandler(this.BuildError);
    eventSource.WarningRaised += new BuildWarningEventHandler(this.BuildWarning);
    eventSource.MessageRaised += new BuildMessageEventHandler(this.BuildMessage);
}
```

```csharp
private void ProjectStarted(object sender, ProjectStartedEventArgs e)
{
    SendMessage(FormatMessage(e));
}

private void SendMessage(string line)
{
    Byte[] sendBytes = Encoding.ASCII.GetBytes(line);
    networkStream.Write(sendBytes, 0, sendBytes.Length);
    networkStream.Flush();
    log.InfoFormat("MS Build logger send to server the message {0}", line);
}

private static string FormatMessage(BuildStatusEventArgs e)
{
    return string.Format("{0}:{1}$$", e.HelpKeyword, e.Message);
}
```

```csharp
public override void Shutdown()
{
    clientSocketWriter.GetStream().Close();
    clientSocketWriter.Close();
}
```

```csharp
public const string MSBUILD_PATH = @"C:\Windows\Microsoft.NET\Framework\v4.0.30319\MsBuild.exe";

public Process ExecuteMsbuildProject(string msbuildProjPath, IpAddressSettings ipAddressSettings, string additionalArgs = "")
{
    string currentAssemblyLocation = System.Reflection.Assembly.GetExecutingAssembly().Location;
    string currentAssemblyFullpath = String.Format(currentAssemblyLocation, "\\YourDll.dll");
    string additionalArguments =
    BuildMsBuildAdditionalArguments(msbuildProjPath, ipAddressSettings, additionalArgs, currentAssemblyFullpath);
    ProcessStartInfo procStartInfo = new ProcessStartInfo(MSBUILD_PATH, additionalArguments);
    procStartInfo.RedirectStandardOutput = false;
    //procStartInfo.UseShellExecute = true;
    //procStartInfo.CreateNoWindow = false;
    procStartInfo.UseShellExecute = false;
    procStartInfo.CreateNoWindow = true;
    Process proc = new Process();
    proc.StartInfo = procStartInfo;
    proc.Start();
    return proc;
}

private string BuildMsBuildAdditionalArguments(string msbuildProjPath, IpAddressSettings ipAddressSettings,
string additionalArgs, string currentAssemblyFullpath)
{
    string additionalArguments = String.Concat(msbuildProjPath, " ", additionalArgs, " ",
    "/fileLoggerParameters:LogFile=MsBuildLog.txt;append=true;Verbosity=normal;Encoding=UTF-8 /l:YourDll.MsBuildLogger.TcpIpLogger,",
    currentAssemblyFullpath, ";Ip=", ipAddressSettings.GetIPAddress(), ";Port=", ipAddressSettings.Port, ";");

    return additionalArguments;
}
```

# Mobile Automation

## Develop ADB Shell Commands Library Appium C#

```bash
npm install -g appium
```

```bash
appium --relaxed-security
```

## Most Complete ADB Cheat Sheet

```bash
adb devices (lists connected devices)
adb root (restarts adbd with root permissions)
adb start-server (starts the adb server)
adb kill-server (kills the adb server)
adb reboot (reboots the device)
adb devices -l (list of devices by product/model)
adb shell (starts the backround terminal)
exit (exits the background terminal)
adb help (list all commands)
adb -s <deviceName> <command> (redirect command to specific device)
adb –d <command> (directs command to only attached USB device)
adb –e <command> (directs command to only attached emulator)
```

```bash
adb shell install <apk> (install app)
adb shell install <path> (install app from phone path)
adb shell install -r <path> (install app from phone path)
adb shell uninstall <name> (remove the app)
```

```bash
/data/data/<package>/databases (app databases)
/data/data/<package>/shared_prefs/ (shared preferences)
/data/app (apk installed by user)
/system/app (pre-installed APK files)
/mmt/asec (encrypted apps) (App2SD)
/mmt/emmc (internal SD Card)
/mmt/adcard (external/Internal SD Card)
/mmt/adcard/external_sd (external SD Card)

adb shell ls (list directory contents)
adb shell ls -s (print size of each file)
adb shell ls -R (list subdirectories recursively)
```

```bash
adb push <local> <remote> (copy file/dir to device)
adb pull <remote> <local> (copy file/dir from device)
run-as <package> cat <file> (access the private package files)
```

```bash
adb get-statе (print device state)
adb get-serialno (get the serial number)
adb shell dumpsys iphonesybinfo (get the IMEI)
adb shell netstat (list TCP connectivity)
adb shell pwd (print current working directory)
adb shell dumpsys battery (battery status)
adb shell pm list features (list phone features)
adb shell service list (list all services)
adb shell dumpsys activity <package>/<activity> (activity info)
adb shell ps (print process status)
adb shell wm size (displays the current screen resolution)
dumpsys window windows | grep -E 'mCurrentFocus|mFocusedApp' (print current app's opened activity)


```

```bash
adb shell list packages (list package names)
adb shell list packages -r (list package name + path to apks)
adb shell list packages -3 (list third party package names)
adb shell list packages -s (list only system packages)
adb shell list packages -u (list package names + uninstalled)
adb shell dumpsys package packages (list info on all apps)
adb shell dump <name> (list info on one package)
adb shell path <package> (path to the apk file)
```

```bash
adb shell dumpsys battery set level <n> (change the level from 0 to 100)
adb shell dumpsys battery set status<n> (change the level to unknown, charging, discharging, not charging or full)
adb shell dumpsys battery reset (reset the battery)
adb shell dumpsys battery set usb <n> (change the status of USB connection. ON or OFF)
adb shell wm size WxH (sets the resolution to WxH)
```

```bash
adb reboot-recovery (reboot device into recovery mode)
adb reboot fastboot (reboot device into recovery mode)
adb shell screencap -p "/path/to/screenshot.png" (capture screenshot)
adb shell screenrecord "/path/to/record.mp4" (record device screen)
adb backup -apk -all -f backup.ab (backup settings and apps)
adb backup -apk -shared -all -f backup.ab (backup settings, apps and shared storage)
adb backup -apk -nosystem -all -f backup.ab (backup only non-system apps)
adb restore backup.ab (restore a previous backup)
adb shell am start|startservice|broadcast <INTENT>[<COMPONENT>]
-a <ACTION> e.g. android.intent.action.VIEW
-c <CATEGORY> e.g. android.intent.category.LAUNCHER (start activity intent)

adb shell am start -a android.intent.action.VIEW -d URL (open URL)
adb shell am start -t image/* -a android.intent.action.VIEW (opens gallery)
```

```bash
adb logcat [options] [filter] [filter] (view device log)
adb bugreport (print bug reports)
```

```bash
adb shell permissions groups (list permission groups definitions)
adb shell list permissions -g -r (list permissions details)
```

## Getting Started with Appium for Android C# on Mac in 10 Minutes

```bash
npm install -g appium
```

```bash
echo "export PATH=\$PATH:/Users/${USER}/Library/Android/sdk/platform-tools/" >> ~/.bash_profile && source ~/.bash_profile
```

```bash
adb shell
```

```bash
adb install pathToYourApk/yourTestApp.apk
```

```bash
dumpsys window windows | grep -E 'mCurrentFocus|mFocusedApp'
```

```csharp
private static AndroidDriver<AndroidElement> _driver;
[ClassInitialize]
public static void ClassInitialize(TestContext context)
{
    string testAppPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Resources", "ApiDemos-debug.apk");
    var desiredCaps = new AppiumOptions();
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.DeviceName, "Android_Accelerated_x86_Oreo");
    desiredCaps.AddAdditionalCapability(AndroidMobileCapabilityType.AppPackage, "io.appium.android.apis");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.PlatformName, "Android");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.PlatformVersion, "7.1");
    desiredCaps.AddAdditionalCapability(AndroidMobileCapabilityType.AppActivity, ".ApiDemos");
    desiredCaps.AddAdditionalCapability(MobileCapabilityType.App, testAppPath);
    _driver = new AndroidDriver<AndroidElement>(new Uri("http://127.0.0.1:4723/wd/hub"), desiredCaps);
    _driver.CloseApp();
}
[TestInitialize]
public void TestInitialize()
{
    if (_driver != null)
    {
        _driver.LaunchApp();
        _driver.StartActivity("io.appium.android.apis", ".ApiDemos");
    }
}
[TestCleanup]
public void TestCleanup()
{
    _driver?.CloseApp();
}
```

## Getting Started with Appium for iOS C# in 10 Minutes

```bash
npm install -g appium
```

```bash
bash brew install carthage
```

## Getting Started with Appium for Android C# on Windows in 10 Minutes

```bash
npm install -g appium
```

```bash
adb shell
```

```bash
adb install pathToYourApk/yourTestApp.apk
```

```bash
dumpsys window windows | grep -E 'mCurrentFocus|mFocusedApp'
```

# Desktop Automation

## Automate Windows Desktop Apps with WebDriver- WinAppDriver VB.NET

```powershell
function listAumids( $userAccount ) {
        if ($userAccount -eq "allusers")
        {
        # Find installed packages for all accounts. Must be run as an administrator in order to use this option.
        $installedapps = Get-AppxPackage -allusers
        }
elseif ($userAccount)
        {
        # Find installed packages for the specified account. Must be run as an administrator in order to use this option.
        $installedapps = get-AppxPackage -user $userAccount
        }
else
        {
        # Find installed packages for the current account.
        $installedapps = get-AppxPackage
        }
        $aumidList = @()
        foreach ($app in $installedapps)
        {
        foreach ($id in (Get-AppxPackageManifest $app).package.applications.application.id)
        {
        $aumidList += $app.packagefamilyname + "!" + $id
        }
        }
        return $aumidList
        }
```

## Automate Windows Desktop Apps with WebDriver- WinAppDriver C#

```powershell
function listAumids( $userAccount )
{
    if ($userAccount - eq "allusers")
{
# Find installed packages for all accounts. Must be run as an administrator in order to use this option.
$installedapps = Get - AppxPackage - allusers
}
elseif($userAccount)
{
# Find installed packages for the specified account. Must be run as an administrator in order to use this option.
$installedapps = get - AppxPackage - user $userAccount
}
else
{
# Find installed packages for the current account.
$installedapps = get - AppxPackage
}
$aumidList = @()
foreach ($app in $installedapps)
{
    foreach ($id in (Get - AppxPackageManifest $app).package.applications.application.id)
{
$aumidList += $app.packagefamilyname + "!" + $id
}
}
return $aumidList
}
```

# Design and Architecture

## How to Test the Test Automation Framework- Types of Tests

```csharp
[TestMethod]
[TestCategory(Categories.Chrome)]
public void DateSet_When_UseSetDateMethodWithDayBiggerThan9_Chrome()
{
    var dateElement = App.ElementCreateService.CreateById<Date>("myDate");
    dateElement.SetDate(2017, 11, 15);
    Assert.AreEqual("2017-11-15", dateElement.GetDate());
}
```

```csharp
[TestMethod]
public void DateSetThrowsArgumentException_When_Month0_Edge()
{
    var dateElement = App.ElementCreateService.CreateById<Date>("myDate");
    Assert.ThrowsException<ArgumentException>(() => dateElement.SetDate(2017, 0, 1));
}
```

```csharp
[TestMethod]
public void SettingDateCalled_BeforeActuallySetDate()
{
    Date.SettingDate += AssertValueAttributeEmpty;
    var dateElement = App.ElementCreateService.CreateById<Date>("myDate");
    dateElement.SetDate(2017, 7, 6);
    Assert.AreEqual("2017-07-06", dateElement.GetDate());
    Date.SettingDate -= AssertValueAttributeEmpty;
    void AssertValueAttributeEmpty(object sender, ElementActionEventArgs args)
    {
        Assert.AreEqual(string.Empty, args.Element.WrappedElement.GetAttribute("value"));
    }
}
```

```csharp
[TestMethod]
public void LocallyOverriddenActionCalled_When_OverrideGetDateGloballyNotNull()
{
    Date.OverrideGetDateGlobally = (u) => "2017-06-01";
    var dateElement = App.ElementCreateService.CreateById<Date>("myDate");
    Date.OverrideGetDateLocally = (u) => "2017-07-01";
    Assert.AreEqual("2017-07-01", dateElement.GetDate());
    Date.OverrideGetDateGlobally = null;
}
```

```csharp

private Mock<IBellaLogger> _mockedLogger;
public override void TestInit()
{
    _mockedLogger = new Mock<IBellaLogger>();
    App.RegisterInstance(_mockedLogger.Object);
}
[TestMethod]
public void CreatesBDDLog_When_ClickButton()
{
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");
    button.Click();
    _mockedLogger.Verify(x => x.LogInformation(
    It.Is<string>(t => t.Contains("Click control (ID = button)"))), Times.Once());
}
```

```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
Constants.AndroidDefaultAndroidVersion,
Constants.AndroidRealDeviceName,
Constants.AndroidNativeAppAppExamplePackage,
".view.ControlsMaterialDark",
AppBehavior.RestartEveryTime)]
public class ElementCreateSingleElementTests : AndroidTest
{
    [TestMethod]
    public void ElementFound_When_CreateByText_And_ElementIsNotOnScreen()
    {
        var textField = _mainElement.CreateByText<TextField>("Text appearances");
        textField.EnsureIsVisible();
    }
}

```

```csharp
[VideoRecording(VideoRecordingMode.OnlyFail)]
[Android(Constants.AndroidNativeAppPath,
Constants.AndroidDefaultAndroidVersion,
Constants.AndroidDefaultDeviceName,
Constants.AndroidNativeAppAppExamplePackage,
".view.Controls1",
AppBehavior.ReuseIfStarted)]
public class VideoRecordingTests : AndroidTest
```

```csharp

public interface ITimeouts
{
    TimeSpan ImplicitWait { get; set; }
    [Obsolete("This method will be removed in a future version. Please set the ImplicitWait property instead.")]
    ITimeouts ImplicitlyWait(TimeSpan timeToWait);
}

```

```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
Constants.AndroidDefaultAndroidVersion,
Constants.AndroidGalaxyDeviceName,
Constants.AndroidNativeAppAppExamplePackage,
".view.Controls1",
AppBehavior.ReuseIfStarted)]
public class ButtonControlTests : AndroidTest
[TestClass]
[Android(Constants.AndroidNativeAppPath,
Constants.AndroidDefaultAndroidVersion,
Constants.AndroidNokiaDeviceName,
Constants.AndroidNativeAppAppExamplePackage,
".view.Controls1",
AppBehavior.ReuseIfStarted)]
public class ButtonControlTests : AndroidTest
```

```csharp
[TestClass]
[IOS(Constants.IOSNativeAppPath,
Constants.IOSDefaultVersion,
Constants.IOSDefaultDeviceName,
AppBehavior.RestartEveryTime)]
public class ButtonControlTests : IOSTest
{
    [TestMethod]
    [Timeout(30000)]
    public void ZeroReturnForButtonText_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");
        button.Click();
        var answerLabel = App.ElementCreateService.CreateByName<Label>("Answer");
        answerLabel.EnsureTextIs("0");
    }
}
```

## Full-Stack Test Automation Frameworks- API Usability Part 1

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    IWebDriver driver = new ChromeDriver();
    driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
    var promotionsLink = driver.FindElement(By.Id("Promotions"));
    promotionsLink.Click();
    Console.WriteLine(promotionsLink.TagName);
}
```

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    IWebDriver driver = new ChromeDriver();
    driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
    var promotionsLink = driver.FindElement(By.Id("Promotions"));
    promotionsLink.Click();
    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    wait.Until(ExpectedConditions.InvisibilityOfElementLocated(By.Id("Promotions")));
    Console.WriteLine(promotionsLink.TagName);
}
```

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
    var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
    promotionsLink.Click();
    Console.WriteLine(promotionsLink.By.Value);
    Console.WriteLine(promotionsLink.WrappedElement.TagName);
}
```

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
    var promotionsLink = App.ElementCreateService.CreateById<Button>("Promotions");
    promotionsLink.Click();
    promotionsLink.EnsureIsNotVisible();
}
```

```csharp
[TestMethod]
public void OpenBellatrixDemoPromotions()
{
    IWebDriver driver = new ChromeDriver();
    driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
    var promotionsLink = driver.FindElement(By.Id("Promotions"));
    promotionsLink.Click();
    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
    wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("Promotions")));
}
```

```csharp
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
wait.Until(ExpectedConditions.ElementToBeSelected(By.Id("Promotions")));
```

```csharp
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
wait.Until(ExpectedConditions.TextToBePresentInElement(promotionsLink, "Bellatrix"));
```

```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Button>("Promotions");
promotionsLink.Click();
promotionsLink.ValidateIsDisabled();
```

```csharp
IWebDriver driver = new ChromeDriver();
driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
```

```csharp
IWebDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
var promotionsLink = wait.Until(ExpectedConditions.ElementExists(By.Id("Promotions")));
promotionsLink.Click();
```

```csharp
IWebDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
var promotionsLocator = By.Id("Promotions");
wait.Until(ExpectedConditions.ElementExists(promotionsLocator));
var promotionsLink = wait.Until(ExpectedConditions.ElementToBeClickable(promotionsLocator));
promotionsLink.Click();
```

```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Button>("Promotions").ToBeVisible().ToBeClickable().ToExists();
promotionsLink.Click();
promotionsLink.EnsureIsDisabled();

```

```csharp
IWebDriver driver = new ChromeDriver();
driver.Navigate().GoToUrl("http://demos.bellatrix.solutions/");
var wait15Seconds = new WebDriverWait(driver, TimeSpan.FromSeconds(15));
var wait30Seconds = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
var wait45Seconds = new WebDriverWait(driver, TimeSpan.FromSeconds(45));
var promotionsLocator = By.Id("Promotions");
wait15Seconds.Until(ExpectedConditions.ElementExists(promotionsLocator)); // same 30 seconds
var promotionsLink = wait30Seconds.Until(ExpectedConditions.ElementToBeClickable(promotionsLocator));
promotionsLink.Click();
```

```json
"timeoutSettings": {
    "waitForAjaxTimeout": "30",
    "sleepInterval": "1",
    "elementToBeVisibleTimeout": "30",
    "elementToExistTimeout": "30",
    "elementToNotExistTimeout": "30",
    "elementToBeClickableTimeout": "30",
    "elementNotToBeVisibleTimeout": "30",
    "elementToHaveContentTimeout": "15"
},
```

```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Button>("Promotions").ToBeVisible(30).ToBeClickable(20, 2).ToExists(10, 1);
promotionsLink.Click();
promotionsLink.EnsureIsDisabled();
```

## Advanced Behaviours Design Pattern in Automated Testing Part 1

```csharp
public interface IBehaviour
{
    void Execute();
}
```

```csharp
public abstract class ActionBehaviour : IBehaviour
{
    public void Execute()
    {
        this.PerformAct();
    }
    protected abstract void PerformAct();
}
```

```csharp
public abstract class AssertBehaviour : IBehaviour
{
    public void Execute()
    {
        this.Assert();
    }
    protected abstract void Assert();
}
```

```csharp
public abstract class WaitableActionBehaviour : IBehaviour
{
    public void Execute()
    {
        this.PerformAct();
        this.PerformPostActWait();
    }
    protected abstract void PerformAct();
    protected abstract void PerformPostActWait();
}
```

```csharp
public class WaitableAssertableActionBehaviour : IBehaviour
{
    public void Execute()
    {
        this.PerformPreActWait();
        this.PerformPreActAssert();
        this.PerformAct();
        this.PerformPostActAssert();
        this.PerformPostActWait();
        this.PerformPostActWaitAssert();
    }
    protected virtual void PerformPreActWait()
    {
    }
    protected virtual void PerformPreActAssert()
    {
    }
    protected virtual void PerformAct()
    {
    }
    protected virtual void PerformPostActAssert()
    {
    }
    protected virtual void PerformPostActWait()
    {
    }
    protected virtual void PerformPostActWaitAssert()
    {
    }
}
```

```csharp
public class ItemPageNavigationBehaviour : ActionBehaviour
{
    private readonly ItemPage itemPage;
    private readonly string itemUrl;
    public ItemPageNavigationBehaviour(string itemUrl)
    {
        this.itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
        this.itemUrl = itemUrl;
    }
    protected override void PerformAct()
    {
        this.itemPage.Navigate(this.itemUrl);
    }
}
```

```csharp
public static class UnityContainerFactory
{
    private static IUnityContainer unityContainer;
    static UnityContainerFactory()
    {
        unityContainer = new UnityContainer();
    }
    public static IUnityContainer GetContainer()
    {
        return unityContainer;
    }
}
```

```csharp
public class SignInPageLoginBehaviour : WaitableActionBehaviour
{
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ClientLoginInfo clientLoginInfo;
    public SignInPageLoginBehaviour(ClientLoginInfo clientLoginInfo)
    {
        this.signInPage =
        UnityContainerFactory.GetContainer().Resolve<SignInPage>();
        this.shippingAddressPage =
        UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        this.clientLoginInfo = clientLoginInfo;
    }
    protected override void PerformPostActWait()
    {
        this.shippingAddressPage.WaitForPageToLoad();
    }
    protected override void PerformAct()
    {
        this.signInPage.Login(this.clientLoginInfo.Email, this.clientLoginInfo.Password);
    }
}
```

```csharp
public static class BehaviourExecutor
{
    public static void Execute(params IBehaviour[] behaviours)
    {
        foreach (var behaviour in behaviours)
        {
            behaviour.Execute();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_SimpleBehaviourEngine()
{
    var itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    var itemPrice = "40.49";
    var clientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    var clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    BehaviourExecutor.Execute(
    new ItemPageNavigationBehaviour(itemUrl),
    new ItemPageBuyBehaviour(),
    new PreviewShoppingCartPageProceedBehaviour(),
    new SignInPageLoginBehaviour(clientLoginInfo),
    new ShippingAddressPageFillShippingBehaviour(clientPurchaseInfo),
    new ShippingAddressPageFillDifferentBillingBehaviour(clientPurchaseInfo),
    new ShippingAddressPageContinueBehaviour(),
    new ShippingPaymentPageContinueBehaviour(),
    new PlaceOrderPageAssertFinalAmountsBehaviour(itemPrice));
}
```

```csharp
public interface IPurchasePromotionalCodeStrategy
{
    void AssertPromotionalCodeDiscount();
    double GetPromotionalCodeDiscountAmount();
    void ApplyPromotionalCode(string couponCode);
}
```

```csharp
public class PurchaseContextNoNullObjects
{
    private readonly IPurchasePromotionalCodeStrategy purchasePromotionalCodeStrategy;
    private readonly ItemPage itemPage;
    private readonly PreviewShoppingCartPage previewShoppingCartPage;
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ShippingPaymentPage shippingPaymentPage;
    private readonly PlaceOrderPage placeOrderPage;
    public PurchaseContextNoNullObjects(
    IPurchasePromotionalCodeStrategy purchasePromotionalCodeStrategy,
    ItemPage itemPage,
    PreviewShoppingCartPage previewShoppingCartPage,
    SignInPage signInPage,
    ShippingAddressPage shippingAddressPage,
    ShippingPaymentPage shippingPaymentPage,
    PlaceOrderPage placeOrderPage)
    {
        this.purchasePromotionalCodeStrategy = purchasePromotionalCodeStrategy;
        this.itemPage = itemPage;
        this.previewShoppingCartPage = previewShoppingCartPage;
        this.signInPage = signInPage;
        this.shippingAddressPage = shippingAddressPage;
        this.shippingPaymentPage = shippingPaymentPage;
        this.placeOrderPage = placeOrderPage;
    }
    public void PurchaseItem(
    string itemUrl,
    string itemPrice,
    ClientLoginInfo clientLoginInfo,
    ClientPurchaseInfo clientPurchaseInfo)
    {
        this.itemPage.Navigate(itemUrl);
        this.itemPage.ClickBuyNowButton();
        this.previewShoppingCartPage.ClickProceedToCheckoutButton();
        this.signInPage.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        this.shippingAddressPage.FillShippingInfo(clientPurchaseInfo);
        this.shippingAddressPage.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickBottomContinueButton();
        this.shippingAddressPage.FillBillingInfo(clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickTopContinueButton();
        double couponDiscount = 0;
        if (purchasePromotionalCodeStrategy != null)
        {
            this.purchasePromotionalCodeStrategy.AssertPromotionalCodeDiscount();
            couponDiscount =
            this.purchasePromotionalCodeStrategy.GetPromotionalCodeDiscountAmount();
        }
        double totalPrice = double.Parse(itemPrice);
        this.placeOrderPage.AssertOrderTotalPrice(totalPrice, couponDiscount);
        // Some other actions...
        if (purchasePromotionalCodeStrategy != null)
        {
            this.purchasePromotionalCodeStrategy.AssertPromotionalCodeDiscount();
        }
    }
}
```

```csharp
public class UiPurchasePromotionalCodeStrategy : IPurchasePromotionalCodeStrategy
{
    private readonly PlaceOrderPage placeOrderPage;
    private readonly double couponDiscountAmount;
    public UiPurchasePromotionalCodeStrategy(
    PlaceOrderPage placeOrderPage,
    double couponDiscountAmount)
    {
        this.placeOrderPage = placeOrderPage;
        this.couponDiscountAmount = couponDiscountAmount;
    }
    public void AssertPromotionalCodeDiscount()
    {
        Assert.AreEqual(
        this.couponDiscountAmount.ToString(),
        this.placeOrderPage.PromotionalDiscountPrice.Text);
    }
    public double GetPromotionalCodeDiscountAmount()
    {
        return this.couponDiscountAmount;
    }
    public void ApplyPromotionalCode(string couponCode)
    {
        this.placeOrderPage.PromotionalCode.SendKeys(couponCode);
    }
}
```

```csharp
public class NullPurchasePromotionalCodeStrategy : IPurchasePromotionalCodeStrategy
{
    public void AssertPromotionalCodeDiscount()
    {
    }
    public double GetPromotionalCodeDiscountAmount()
    {
        return 0;
    }
    public void ApplyPromotionalCode(string couponCode)
    {
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly IPurchasePromotionalCodeStrategy purchasePromotionalCodeStrategy;
    private readonly ItemPage itemPage;
    private readonly PreviewShoppingCartPage previewShoppingCartPage;
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ShippingPaymentPage shippingPaymentPage;
    private readonly PlaceOrderPage placeOrderPage;
    public PurchaseContext(
    IPurchasePromotionalCodeStrategy purchasePromotionalCodeStrategy,
    ItemPage itemPage,
    PreviewShoppingCartPage previewShoppingCartPage,
    SignInPage signInPage,
    ShippingAddressPage shippingAddressPage,
    ShippingPaymentPage shippingPaymentPage,
    PlaceOrderPage placeOrderPage)
    {
        this.purchasePromotionalCodeStrategy = purchasePromotionalCodeStrategy;
        this.itemPage = itemPage;
        this.previewShoppingCartPage = previewShoppingCartPage;
        this.signInPage = signInPage;
        this.shippingAddressPage = shippingAddressPage;
        this.shippingPaymentPage = shippingPaymentPage;
        this.placeOrderPage = placeOrderPage;
    }
    public void PurchaseItem(
    string itemUrl,
    string itemPrice,
    ClientLoginInfo clientLoginInfo,
    ClientPurchaseInfo clientPurchaseInfo)
    {
        this.itemPage.Navigate(itemUrl);
        this.itemPage.ClickBuyNowButton();
        this.previewShoppingCartPage.ClickProceedToCheckoutButton();
        this.signInPage.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        this.shippingAddressPage.FillShippingInfo(clientPurchaseInfo);
        this.shippingAddressPage.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickBottomContinueButton();
        this.shippingAddressPage.FillBillingInfo(clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickTopContinueButton();
        this.purchasePromotionalCodeStrategy.AssertPromotionalCodeDiscount();
        var couponDiscount =
        this.purchasePromotionalCodeStrategy.GetPromotionalCodeDiscountAmount();
        double totalPrice = double.Parse(itemPrice);
        this.placeOrderPage.AssertOrderTotalPrice(totalPrice, couponDiscount);
        this.purchasePromotionalCodeStrategy.AssertPromotionalCodeDiscount();
    }
}
```

```csharp
[TestClass]
public class Online StorePurchaseNullObjectTests
{
[TestInitialize]
public void SetupTest()
{
    Driver.StartBrowser();
}
[TestCleanup]
public void TeardownTest()
{
    Driver.StopBrowser();
}
[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    string itemPrice = "40.49";
    ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(
    new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "New York",
        City = "New York City",
        Zip = "10001-2121",
        Phone = "00164644885569"
    });
    clientPurchaseInfo.CouponCode = "99PERDIS";
    ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var purchaseContext = new PurchaseContext(
    new NullPurchasePromotionalCodeStrategy(),
    new ItemPage(Driver.Browser),
    new PreviewShoppingCartPage(Driver.Browser),
    new SignInPage(Driver.Browser),
    new ShippingAddressPage(Driver.Browser),
    new ShippingPaymentPage(Driver.Browser),
    new PlaceOrderPage(Driver.Browser));
    ////var purchaseContext = new PurchaseContext(
    ////new UiPurchasePromotionalCodeStrategy(
    ////new PlaceOrderPage(Driver.Browser), 20),
    //// new ItemPage(Driver.Browser),
    //// new PreviewShoppingCartPage(Driver.Browser),
    //// new SignInPage(Driver.Browser),
    //// new ShippingAddressPage(Driver.Browser),
    //// new ShippingPaymentPage(Driver.Browser),
    //// new PlaceOrderPage(Driver.Browser));
    purchaseContext.PurchaseItem(
    itemUrl,
    itemPrice,
    clientLoginInfo,
    clientPurchaseInfo);
}
}
```

## Advanced Specification Design Pattern in Automated Testing

```csharp
public static class SpecificationsExtensionMethods
{
    public static ISpecification<TEntity> And<TEntity>(this ISpecification<TEntity> leftSpecification, ISpecification<TEntity> rightSpecification)
    {
        return new AndSpecification<TEntity>(leftSpecification, rightSpecification);
    }

    public static ISpecification<TEntity> Or<TEntity>(this ISpecification<TEntity> leftSpecification, ISpecification<TEntity> rightSpecification)
    {
        return new OrSpecification<TEntity>(leftSpecification, rightSpecification);
    }

    public static ISpecification<TEntity> Not<TEntity>(this ISpecification<TEntity> specification)
    {
        return new NotSpecification<TEntity>(specification);
    }
}
```

```csharp
public class ExpressionSpecification<TEntity> : Specification<TEntity>
{
    private readonly Func<TEntity, bool> expression;

    public ExpressionSpecification(Func<TEntity, bool> expression)
    {
        if (expression == null)
        {
            throw new ArgumentNullException();
        }
        this.expression = expression;
    }

    public override bool IsSatisfiedBy(TEntity entity)
    {
        return this.expression(entity);
    }
}
```

```csharp
public partial class PlaceOrderPage : BasePage
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly ISpecification<PurchaseTestInput> promotionalPurchaseSpecification;
    private readonly ISpecification<PurchaseTestInput> creditCardSpecification;
    private readonly ISpecification<PurchaseTestInput> wiretransferSpecification;
    private readonly ISpecification<PurchaseTestInput> freePurchaseSpecification;

    public PlaceOrderPage(IWebDriver driver, PurchaseTestInput purchaseTestInput)
        : base(driver)
    {
        this.purchaseTestInput = purchaseTestInput;
        this.creditCardSpecification = new ExpressionSpecification<PurchaseTestInput>(x => !string.IsNullOrEmpty(x.CreditCardNumber));
        this.freePurchaseSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.TotalPrice == 0);
        this.wiretransferSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.IsWiretransfer);
        this.promotionalPurchaseSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.IsPromotionalPurchase && x.TotalPrice < 5);
    }

    public override string Url
    {
        get
        {
            return @"http://www.bing.com/";
        }
    }

    public void ChoosePaymentMethod()
    {
        if (this.creditCardSpecification.
        And(this.wiretransferSpecification.Not()).
        And(this.freePurchaseSpecification.Not()).
        And(this.promotionalPurchaseSpecification.Not()).
        IsSatisfiedBy(this.purchaseTestInput))
        {
            this.CreditCard.SendKeys("371449635398431");
            this.SecurityNumber.SendKeys("1234");
        }
        else
        {
            this.Wiretransfer.SendKeys("pathToFile");
        }
    }
}
```

```csharp
public class OrderTestContextConfigurator
{
    public OrderTestContextConfigurator()
    {
        this.CreditCardSpecification = new ExpressionSpecification<PurchaseTestInput>(x => !string.IsNullOrEmpty(x.CreditCardNumber));
        this.FreePurchaseSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.TotalPrice == 0);
        this.WiretransferSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.IsWiretransfer);
        this.PromotionalPurchaseSpecification = new ExpressionSpecification<PurchaseTestInput>(x => x.IsPromotionalPurchase && x.TotalPrice < 5);
    }

    public ISpecification<PurchaseTestInput> PromotionalPurchaseSpecification { get; private set; }

    public ISpecification<PurchaseTestInput> CreditCardSpecification { get; private set; }

    public ISpecification<PurchaseTestInput> WiretransferSpecification { get; private set; }

    public ISpecification<PurchaseTestInput> FreePurchaseSpecification { get; private set; }
}
```

```csharp
public class OrderTestContext
{
    public OrderTestContext(PurchaseTestInput purchaseTestInput, OrderTestContextConfigurator orderTestContextConfigurator)
    {
        this.PurchaseTestInput = purchaseTestInput;
        this.IsPromoCodePurchase = orderTestContextConfigurator.FreePurchaseSpecification.
            Or(orderTestContextConfigurator.PromotionalPurchaseSpecification).
            IsSatisfiedBy(purchaseTestInput);
        this.IsCreditCardPurchase =
            orderTestContextConfigurator.CreditCardSpecification.
            And(orderTestContextConfigurator.WiretransferSpecification.Not()).
            And(orderTestContextConfigurator.FreePurchaseSpecification.Not()).
            And(orderTestContextConfigurator.PromotionalPurchaseSpecification.Not()).
            IsSatisfiedBy(purchaseTestInput);
    }

    public PurchaseTestInput PurchaseTestInput { get; private set; }

    public bool IsPromoCodePurchase { get; private set; }

    public bool IsCreditCardPurchase { get; private set; }
}
```

## Specification Design Pattern in Automated Testing

```csharp
public class PurchaseTestInput
{
    public bool IsWiretransfer { get; set; }

    public bool IsPromotionalPurchase { get; set; }

    public string CreditCardNumber { get; set; }

    public decimal TotalPrice { get; set; }
}
```

```csharp
public partial class PlaceOrderPage : BasePage
{
    private readonly PurchaseTestInput purchaseTestInput;

    public PlaceOrderPage(IWebDriver driver, PurchaseTestInput purchaseTestInput) : base(driver)
    {
        this.purchaseTestInput = purchaseTestInput;
    }

    public override string Url
    {
        get
        {
            return @"http://www.bing.com/";
        }
    }

    public void ChoosePaymentMethod()
    {
        if (!string.IsNullOrEmpty(this.purchaseTestInput.CreditCardNumber)
            && !this.purchaseTestInput.IsWiretransfer
            && !(this.purchaseTestInput.IsPromotionalPurchase && this.purchaseTestInput.TotalPrice < 5)
            && !(this.purchaseTestInput.TotalPrice == 0))
        {
            this.CreditCard.SendKeys("371449635398431");
            this.SecurityNumber.SendKeys("1234");
        }
        else
        {
            this.Wiretransfer.SendKeys("pathToFile");
        }
    }
}
```

```csharp
public interface ISpecification<TEntity>
{
    bool IsSatisfiedBy(TEntity entity);

    ISpecification<TEntity> And(ISpecification<TEntity> other);

    ISpecification<TEntity> Or(ISpecification<TEntity> other);

    ISpecification<TEntity> Not();
}
```

```csharp
public abstract class Specification<TEntity> : ISpecification<TEntity>
{
    public abstract bool IsSatisfiedBy(TEntity entity);

    public ISpecification<TEntity> And(ISpecification<TEntity> other)
    {
        return new AndSpecification<TEntity>(this, other);
    }

    public ISpecification<TEntity> Or(ISpecification<TEntity> other)
    {
        return new OrSpecification<TEntity>(this, other);
    }

    public ISpecification<TEntity> Not()
    {
        return new NotSpecification<TEntity>(this);
    }
}
```

```csharp
public class AndSpecification<TEntity> : Specification<TEntity>
{
    private readonly ISpecification<TEntity> leftSpecification;
    private readonly ISpecification<TEntity> rightSpecification;

    public AndSpecification(ISpecification<TEntity> leftSpecification, ISpecification<TEntity> rightSpecification)
    {
        this.leftSpecification = leftSpecification;
        this.rightSpecification = rightSpecification;
    }

    public override bool IsSatisfiedBy(TEntity entity)
    {
        return this.leftSpecification.IsSatisfiedBy(entity) && this.rightSpecification.IsSatisfiedBy(entity);
    }
}
```

```csharp
public class OrSpecification<TEntity> : Specification<TEntity>
{
    private readonly ISpecification<TEntity> leftSpecification;
    private readonly ISpecification<TEntity> rightSpecification;

    public OrSpecification(ISpecification<TEntity> leftSpecification, ISpecification<TEntity> rightSpecification)
    {
        this.leftSpecification = leftSpecification;
        this.rightSpecification = rightSpecification;
    }

    public override bool IsSatisfiedBy(TEntity entity)
    {
        return this.leftSpecification.IsSatisfiedBy(entity) || this.rightSpecification.IsSatisfiedBy(entity);
    }
}
```

```csharp
public class NotSpecification<TEntity> : Specification<TEntity>
{
    private readonly ISpecification<TEntity> specification;

    public NotSpecification(ISpecification<TEntity> specification)
    {
        this.specification = specification;
    }

    public override bool IsSatisfiedBy(TEntity entity)
    {
        return !this.specification.IsSatisfiedBy(entity);
    }
}
```

```csharp
public class CreditCardSpecification : Specification<PurchaseTestInput>
{
    private readonly PurchaseTestInput purchaseTestInput;

    public CreditCardSpecification(PurchaseTestInput purchaseTestInput)
    {
        this.purchaseTestInput = purchaseTestInput;
    }

    public override bool IsSatisfiedBy(PurchaseTestInput entity)
    {
        return !string.IsNullOrEmpty(this.purchaseTestInput.CreditCardNumber);
    }
}
```

```csharp
public class PromotionalPurchaseSpecification : Specification<PurchaseTestInput>
{
    private readonly PurchaseTestInput purchaseTestInput;

    public PromotionalPurchaseSpecification(PurchaseTestInput purchaseTestInput)
    {
        this.purchaseTestInput = purchaseTestInput;
    }

    public override bool IsSatisfiedBy(PurchaseTestInput entity)
    {
        return this.purchaseTestInput.IsPromotionalPurchase && this.purchaseTestInput.TotalPrice < 5;
    }
}
```

```csharp
public partial class PlaceOrderPage : BasePage
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly PromotionalPurchaseSpecification promotionalPurchaseSpecification;
    private readonly CreditCardSpecification creditCardSpecification;
    private readonly WiretransferSpecification wiretransferSpecification;
    private readonly FreePurchaseSpecification freePurchaseSpecification;

    public PlaceOrderPage(IWebDriver driver, PurchaseTestInput purchaseTestInput) : base(driver)
    {
        this.purchaseTestInput = purchaseTestInput;
        this.promotionalPurchaseSpecification = new PromotionalPurchaseSpecification(purchaseTestInput);
        this.wiretransferSpecification = new WiretransferSpecification(purchaseTestInput);
        this.creditCardSpecification = new CreditCardSpecification(purchaseTestInput);
        this.freePurchaseSpecification = new FreePurchaseSpecification();
    }

    public override string Url
    {
        get
        {
            return @"yourSiteUrl";
        }
    }

    public void ChoosePaymentMethod()
    {
        if (this.creditCardSpecification.
        And(this.wiretransferSpecification.Not()).
        And(this.freePurchaseSpecification.Not()).
        And(this.promotionalPurchaseSpecification.Not()).
        IsSatisfiedBy(this.purchaseTestInput))
        {
            this.CreditCard.SendKeys("371449635398431");
            this.SecurityNumber.SendKeys("1234");
        }
        else
        {
            this.Wiretransfer.SendKeys("pathToFile");
        }
    }
}
```

```csharp
public partial class PlaceOrderPage : BasePage
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly PromotionalPurchaseSpecification promotionalPurchaseSpecification;
    private readonly CreditCardSpecification creditCardSpecification;
    private readonly WiretransferSpecification wiretransferSpecification;
    private readonly FreePurchaseSpecification freePurchaseSpecification;

    public PlaceOrderPage(IWebDriver driver, PurchaseTestInput purchaseTestInput) : base(driver)
    {
        this.purchaseTestInput = purchaseTestInput;
        this.promotionalPurchaseSpecification = new PromotionalPurchaseSpecification(purchaseTestInput);
        this.wiretransferSpecification = new WiretransferSpecification(purchaseTestInput);
        this.creditCardSpecification = new CreditCardSpecification(purchaseTestInput);
        this.freePurchaseSpecification = new FreePurchaseSpecification();
        this.IsPromoCodePurchase = this.freePurchaseSpecification.Or(this.promotionalPurchaseSpecification).IsSatisfiedBy(this.purchaseTestInput);
        this.IsCreditCardPurchase = this.creditCardSpecification.
        And(this.wiretransferSpecification.Not()).
        And(this.freePurchaseSpecification.Not()).
        And(this.promotionalPurchaseSpecification.Not()).
        IsSatisfiedBy(this.purchaseTestInput);
    }

    public bool IsPromoCodePurchase { get; private set; }

    public bool IsCreditCardPurchase { get; private set; }

    public override string Url
    {
        get
        {
            return @"pathToYourSite";
        }
    }

    public void ChoosePaymentMethod()
    {
        if (this.IsCreditCardPurchase)
        {
            this.CreditCard.SendKeys("371449635398431");
            this.SecurityNumber.SendKeys("1234");
        }
        else
        {
            this.Wiretransfer.SendKeys("pathToFile");
        }
    }

    public void TypePromotionalCode(string promoCode)
    {
        if (this.IsPromoCodePurchase)
        {
            this.PromotionalCode.SendKeys(promoCode);
        }
    }
}
```

```csharp
public static class PlaceOrderPageAsserter
{
    public static void AssertPromoCodeLabel(this PlaceOrderPage page, string promoCode)
    {
        if (!string.IsNullOrEmpty(promoCode) && page.IsPromoCodePurchase)
        {
            Assert.AreEqual<string>(page.PromotionalCode.Text, promoCode);
        }
    }
}
```

## Rules Design Pattern in Automated Testing

```csharp
public class PurchaseTestInput
{
    public bool IsWiretransfer { get; set; }

    public bool IsPromotionalPurchase { get; set; }

    public string CreditCardNumber { get; set; }

    public decimal TotalPrice { get; set; }
}
```

```csharp
PurchaseTestInput purchaseTestInput = new PurchaseTestInput()
{
    IsWiretransfer = false,
    IsPromotionalPurchase = false,
    TotalPrice = 100,
    CreditCardNumber = "378734493671000"
};
if (string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
    !purchaseTestInput.IsWiretransfer &&
    purchaseTestInput.IsPromotionalPurchase &&
    purchaseTestInput.TotalPrice == 0)
{
    this.PerformUIAssert("Assert volume discount promotion amount. + additional UI actions");
}
if (!string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
    !purchaseTestInput.IsWiretransfer &&
    !purchaseTestInput.IsPromotionalPurchase &&
    purchaseTestInput.TotalPrice > 20)
{
    this.PerformUIAssert("Assert that total amount label is over 20$ + additional UI actions");
}
else if (!string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
            !purchaseTestInput.IsWiretransfer &&
            !purchaseTestInput.IsPromotionalPurchase &&
            purchaseTestInput.TotalPrice > 30)
{
    Console.WriteLine("Assert that total amount label is over 30$ + additional UI actions");
}
else if (!string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
            !purchaseTestInput.IsWiretransfer &&
            !purchaseTestInput.IsPromotionalPurchase &&
            purchaseTestInput.TotalPrice > 40)
{
    Console.WriteLine("Assert that total amount label is over 40$ + additional UI actions");
}
else if (!string.IsNullOrEmpty(purchaseTestInput.CreditCardNumber) &&
    !purchaseTestInput.IsWiretransfer &&
    !purchaseTestInput.IsPromotionalPurchase &&
    purchaseTestInput.TotalPrice > 50)
{
    this.PerformUIAssert("Assert that total amount label is over 50$ + additional UI actions");
}
else
{
    Debug.WriteLine("Perform other UI actions");
}
```

```csharp
PurchaseTestInput purchaseTestInput = new PurchaseTestInput()
{
    IsWiretransfer = false,
    IsPromotionalPurchase = false,
    TotalPrice = 100,
    CreditCardNumber = "378734493671000"
};

RulesEvaluator rulesEvaluator = new RulesEvaluator();

rulesEvaluator.Eval(new PromotionalPurchaseRule(purchaseTestInput, this.PerformUIAssert));
rulesEvaluator.Eval(new CreditCardChargeRule(purchaseTestInput, 20, this.PerformUIAssert));
rulesEvaluator.OtherwiseEval(new PromotionalPurchaseRule(purchaseTestInput, this.PerformUIAssert));
rulesEvaluator.OtherwiseEval(new CreditCardChargeRule<CreditCardChargeRuleRuleResult>(purchaseTestInput, 30));
rulesEvaluator.OtherwiseEval(new CreditCardChargeRule<CreditCardChargeRuleAssertResult>(purchaseTestInput, 40));
rulesEvaluator.OtherwiseEval(new CreditCardChargeRule(purchaseTestInput, 50, this.PerformUIAssert));
rulesEvaluator.OtherwiseDo(() => Debug.WriteLine("Perform other UI actions"));

rulesEvaluator.EvaluateRulesChains();
```

```csharp
public abstract class BaseRule : IRule
{
    private readonly Action actionToBeExecuted;
    protected readonly RuleResult ruleResult;

    public BaseRule(Action actionToBeExecuted)
    {
        this.actionToBeExecuted = actionToBeExecuted;
        if (actionToBeExecuted != null)
        {
            this.ruleResult = new RuleResult(this.actionToBeExecuted);
        }
        else
        {
            this.ruleResult = new RuleResult();
        }
    }

    public BaseRule()
    {
        ruleResult = new RuleResult();
    }

    public abstract IRuleResult Eval();
}
```

```csharp
public class CreditCardChargeRule : BaseRule
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly decimal totalPriceLowerBoundary;

    public CreditCardChargeRule(PurchaseTestInput purchaseTestInput, decimal totalPriceLowerBoundary, Action actionToBeExecuted)
        : base(actionToBeExecuted)
    {
        this.purchaseTestInput = purchaseTestInput;
        this.totalPriceLowerBoundary = totalPriceLowerBoundary;
    }

    public override IRuleResult Eval()
    {
        if (!string.IsNullOrEmpty(this.purchaseTestInput.CreditCardNumber) &&
            !this.purchaseTestInput.IsWiretransfer &&
            !this.purchaseTestInput.IsPromotionalPurchase &&
            this.purchaseTestInput.TotalPrice > this.totalPriceLowerBoundary)
        {
            this.ruleResult.IsSuccess = true;
            return this.ruleResult;
        }
        return new RuleResult();
    }
}
```

```csharp
public class RulesEvaluator
{
    private readonly List<RulesChain> rules;

    public RulesEvaluator()
    {
        this.rules = new List<RulesChain>();
    }

    public RulesChain Eval(IRule rule)
    {
        var rulesChain = new RulesChain(rule);
        this.rules.Add(rulesChain);
        return rulesChain;
    }

    public void OtherwiseEval(IRule alternativeRule)
    {
        if (this.rules.Count == 0)
        {
            throw new ArgumentException("You cannot add ElseIf clause without If!");
        }
        this.rules.Last().ElseRules.Add(new RulesChain(alternativeRule));
    }

    public void OtherwiseDo(Action otherwiseAction)
    {
        if (this.rules.Count == 0)
        {
            throw new ArgumentException("You cannot add Else clause without If!");
        }
        this.rules.Last().ElseRules.Add(new RulesChain(new NullRule(otherwiseAction), true));
    }

    public void EvaluateRulesChains()
    {
        this.Evaluate(this.rules, false);
    }

    private void Evaluate(List<RulesChain> rulesToBeEvaluated, bool isAlternativeChain = false)
    {
        foreach (var currentRuleChain in rulesToBeEvaluated)
        {
            var currentRulesChainResult = currentRuleChain.Rule.Eval();
            if (currentRulesChainResult.IsSuccess)
            {
                currentRulesChainResult.Execute();
                if (isAlternativeChain)
                {
                    break;
                }
            }
            else
            {
                this.Evaluate(currentRuleChain.ElseRules, true);
            }
        }
    }
}
```

```csharp
public class RulesChain
{
    public IRule Rule { get; set; }

    public List<RulesChain> ElseRules { get; set; }

    public bool IsLastInChain { get; set; }

    public RulesChain(IRule mainRule, bool isLastInChain = false)
    {
        this.IsLastInChain = isLastInChain;
        this.ElseRules = new List<RulesChain>();
        this.Rule = mainRule;
    }
}
```

## Improved Facade Design Pattern in Automated Testing v.2.0`

```csharp
public class PurchaseFacade
{
    private ItemPage itemPage;
    private CheckoutPage checkoutPage;
    private ShippingAddressPage shippingAddressPage;
    private SignInPage signInPage;

    public ItemPage ItemPage
    {
        get
        {
            if (itemPage == null)
            {
                itemPage = new ItemPage();
            }
            return itemPage;
        }
    }

    public SignInPage SignInPage
    {
        get
        {
            if (signInPage == null)
            {
                signInPage = new SignInPage();
            }
            return signInPage;
        }
    }

    public CheckoutPage CheckoutPage
    {
        get
        {
            if (checkoutPage == null)
            {
                checkoutPage = new CheckoutPage();
            }
            return checkoutPage;
        }
    }

    public ShippingAddressPage ShippingAddressPage
    {
        get
        {
            if (shippingAddressPage == null)
            {
                shippingAddressPage = new ShippingAddressPage();
            }
            return shippingAddressPage;
        }
    }

    public void PurchaseItem(string item, string itemPrice, ClientInfo clientInfo)
    {
        this.ItemPage.Navigate(item);
        this.ItemPage.Validate().Price(itemPrice);
        this.ItemPage.ClickBuyNowButton();
        this.SignInPage.ClickContinueAsGuestButton();
        this.ShippingAddressPage.FillShippingInfo(clientInfo);
        this.ShippingAddressPage.Validate().Subtotal(itemPrice);
        this.ShippingAddressPage.ClickContinueButton();
        this.CheckoutPage.Validate().Subtotal(itemPrice);
    }
}
```

```csharp
public class ShoppingCart
{
    private readonly IItemPage itemPage;

    private readonly ISignInPage signInPage;

    private readonly ICheckoutPage checkoutPage;

    private readonly IShippingAddressPage shippingAddressPage;

    public ShoppingCart(IItemPage itemPage, ISignInPage signInPage, ICheckoutPage checkoutPage, IShippingAddressPage shippingAddressPage)
    {
        this.itemPage = itemPage;
        this.signInPage = signInPage;
        this.checkoutPage = checkoutPage;
        this.shippingAddressPage = shippingAddressPage;
    }

    public void PurchaseItem(string item, double itemPrice, ClientInfo clientInfo)
    {
        this.itemPage.Open(item);
        this.itemPage.AssertPrice(itemPrice);
        this.itemPage.ClickBuyNowButton();
        this.signInPage.ClickContinueAsGuestButton();
        this.shippingAddressPage.FillShippingInfo(clientInfo);
        this.shippingAddressPage.AssertSubtotalAmount(itemPrice);
        this.shippingAddressPage.ClickContinueButton();
        this.checkoutPage.AssertSubtotal(itemPrice);
    }
}
```

## Page Objects That Make Code More Maintainable

```csharp
public class BasePage<M>
    where M : BasePageElementMap, new()
{
    protected readonly string url;

    public BasePage(string url)
    {
        this.url = url;
    }

    public BasePage()
    {
        this.url = null;
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string part = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url, part));
    }
}

public class BasePage<M, V> : BasePage<M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    public BasePage(string url) : base(url)
    {
    }

    public BasePage()
    {
    }

    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class SearchEngineMainPage : BasePage<SearchEngineMainPageMap>, ISearchEngineMainPage
{
    public SearchEngineMainPage(IWebDriver driver)
        : base(driver, new SearchEngineMainPageMap(driver))
    {
    }

    public override string Url
    {
        get
        {
            return @"searchEngineUrl";
        }
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }
}
```

```csharp
public interface ISearchEngineMainPage : IPage
{
    void Search(string textToType);
}
```

```csharp
public static class SearchEngineMainPageAsserter
{
    public static void AssertResultsCountIsAsExpected(this ISearchEngineMainPage page, int expectedCount)
    {
        Assert.AreEqual(page.GetResultsCount(), expectedCount, "The results count is not as expected.");
    }
}
```

```csharp
public abstract class BasePage<TMap>
    where TMap : BaseElementMap
{
    private readonly TMap map;
    protected IWebDriver driver;

    public BasePage(IWebDriver driver, TMap map)
    {
        this.driver = driver;
        this.map = map;
    }

    internal TMap Map
    {
        get
        {
            return this.map;
        }
    }

    public abstract string Url { get; }

    public virtual void Open(string part = "")
    {
        this.driver.Navigate().GoToUrl(string.Concat(this.Url, part));
    }
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private ISearchEngineMainPage searchEngineMainPage;
    private IWebDriver driver;

    [TestInitialize]
    public void SetupTest()
    {
        driver = new FirefoxDriver();
        searchEngineMainPage = new SearchEngineMainPage(driver);
    }

    [TestCleanup]
    public void TeardownTest()
    {
        driver.Quit();
    }

    [TestMethod]
    public void SearchForAutomateThePlanet()
    {
        this.searchEngineMainPage.Open();
        this.searchEngineMainPage.Search("Automate The Planet");
        this.searchEngineMainPage.AssertResultsCountIsAsExpected(264);
    }
}
```

```csharp
public abstract class BasePage<TMap>
    where TMap : BaseElementMap
{
    private readonly TMap map;
    protected IWebDriver driver;

    public BasePage(IWebDriver driver, TMap map)
    {
        this.driver = driver;
        this.map = map;
    }

    public TMap Map
    {
        get
        {
            return this.map;
        }
    }

    public abstract string Url { get; }

    public virtual void Open(string part = "")
    {
        this.driver.Navigate().GoToUrl(string.Concat(this.Url, part));
    }
}
```

```csharp
public static class SearchEngineMainPageAsserter
{
    public static void AssertResultsCountIsAsExpected(this SearchEngineMainPage page, int expectedCount)
    {
        Assert.AreEqual(page.Map.ResultsCountDiv.Text, expectedCount, "The results count is not as expected.");
    }
}
```

```csharp
[TestMethod]
public void SearchForAutomateThePlanet()
{
    this.searchEngineMainPage.Open();
    this.searchEngineMainPage.Map.FeelingLuckyButton.Click();
    this.driver.Navigate().Back();
    this.searchEngineMainPage.Search("Automate The Planet");
    this.searchEngineMainPage.AssertResultsCountIsAsExpected(264);
}
```

```csharp
public partial class SearchEngineMainPage : BasePage
{
    public IWebElement SearchBox
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_q"));
        }
    }

    public IWebElement GoButton
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_go"));
        }
    }

    public IWebElement ResultsCountDiv
    {
        get
        {
            return this.driver.FindElement(By.Id("b_tween"));
        }
    }
}
```

```csharp
public partial class SearchEngineMainPage : BasePage
{
    public SearchEngineMainPage(IWebDriver driver) : base(driver)
    {
    }

    public override string Url
    {
        get
        {
            return @"http://searchEngineUrl/";
        }
    }

    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }
}
```

```csharp
[TestMethod]
public void SearchForAutomateThePlanet_Second()
{
    this.searchEngineMainPage.Open();
    this.searchEngineMainPage.SearchBox.Clear();
    this.searchEngineMainPage.SearchBox.SendKeys("Automate The Planet");
    this.searchEngineMainPage.GoButton.Click();
    this.searchEngineMainPage.AssertResultsCountIsAsExpected(264);
}
```

## Decorator Design Pattern in Automated Testing

```csharp
public class PurchaseContext
{
    private readonly IOrderValidationStrategy orderValidationStrategy;

    public PurchaseContext(IOrderValidationStrategy orderValidationStrategy)
    {
        this.orderValidationStrategy = orderValidationStrategy;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
        this.orderValidationStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly IOrderPurchaseStrategy[] orderpurchaseStrategies;

    public PurchaseContext(params IOrderPurchaseStrategy[] orderpurchaseStrategies)
    {
        this.orderpurchaseStrategies = orderpurchaseStrategies;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        this.ValidateClientPurchaseInfo(clientPurchaseInfo);

        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingAddressPage.Instance.FillBillingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();

        this.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }

    public void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo)
    {
        foreach (var currentStrategy in orderpurchaseStrategies)
        {
            currentStrategy.ValidateClientPurchaseInfo(clientPurchaseInfo);
        }
    }

    public void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        foreach (var currentStrategy in orderpurchaseStrategies)
        {
            currentStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
        }
    }
}
```

```csharp
new PurchaseContext(new SalesTaxOrderPurchaseStrategy(), new VatTaxOrderPurchaseStrategy(), new GiftOrderPurchaseStrategy())
        .PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
```

```csharp
public abstract class OrderPurchaseStrategy
{
    public abstract decimal CalculateTotalPrice();

    public abstract void ValidateOrderSummary(decimal totalPrice);
}
```

```csharp
public class TotalPriceOrderPurchaseStrategy : OrderPurchaseStrategy
{
    private readonly decimal itemsPrice;

    public TotalPriceOrderPurchaseStrategy(decimal itemsPrice)
    {
        this.itemsPrice = itemsPrice;
    }

    public override decimal CalculateTotalPrice()
    {
        return itemsPrice;
    }

    public override void ValidateOrderSummary(decimal totalPrice)
    {
        PlaceOrderPage.Instance.Validate().OrderTotalPrice(totalPrice.ToString());
    }
}
```

```csharp
public abstract class OrderPurchaseStrategyDecorator : OrderPurchaseStrategy
{
    protected readonly OrderPurchaseStrategy orderPurchaseStrategy;
    protected readonly ClientPurchaseInfo clientPurchaseInfo;
    protected readonly decimal itemsPrice;

    public OrderPurchaseStrategyDecorator(OrderPurchaseStrategy orderPurchaseStrategy, decimal itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        this.orderPurchaseStrategy = orderPurchaseStrategy;
        this.itemsPrice = itemsPrice;
        this.clientPurchaseInfo = clientPurchaseInfo;
    }

    public override decimal CalculateTotalPrice()
    {
        this.ValidateOrderStrategy();

        return this.orderPurchaseStrategy.CalculateTotalPrice();
    }

    public override void ValidateOrderSummary(decimal totalPrice)
    {
        this.ValidateOrderStrategy();
        this.orderPurchaseStrategy.ValidateOrderSummary(totalPrice);
    }

    private void ValidateOrderStrategy()
    {
        if (this.orderPurchaseStrategy == null)
        {
            throw new Exception("The OrderPurchaseStrategy should be first initialized.");
        }
    }
}
```

```csharp
public class VatTaxOrderPurchaseStrategy : OrderPurchaseStrategyDecorator
{
    private readonly VatTaxCalculationService vatTaxCalculationService;
    private decimal vatTax;

    public VatTaxOrderPurchaseStrategy(OrderPurchaseStrategy orderPurchaseStrategy, decimal itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
        : base(orderPurchaseStrategy, itemsPrice, clientPurchaseInfo)
    {
        this.vatTaxCalculationService = new VatTaxCalculationService();
    }

    public override decimal CalculateTotalPrice()
    {
        Countries currentCountry = (Countries)Enum.Parse(typeof(Countries), clientPurchaseInfo.BillingInfo.Country);
        this.vatTax = this.vatTaxCalculationService.Calculate(this.itemsPrice, currentCountry);
        return this.orderPurchaseStrategy.CalculateTotalPrice() + this.vatTax;
    }

    public override void ValidateOrderSummary(decimal totalPrice)
    {
        base.orderPurchaseStrategy.ValidateOrderSummary(totalPrice);
        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(vatTax.ToString());
    }
}
```

```csharp
public class SalesTaxOrderPurchaseStrategy : OrderPurchaseStrategyDecorator
{
    private readonly SalesTaxCalculationService salesTaxCalculationService;
    private decimal salesTax;

    public SalesTaxOrderPurchaseStrategy(OrderPurchaseStrategy orderPurchaseStrategy, decimal itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
        : base(orderPurchaseStrategy, itemsPrice, clientPurchaseInfo)
    {
        this.salesTaxCalculationService = new SalesTaxCalculationService();
    }

    public SalesTaxCalculationService SalesTaxCalculationService { get; set; }

    public override decimal CalculateTotalPrice()
    {
        States currentState = (States)Enum.Parse(typeof(States), clientPurchaseInfo.ShippingInfo.State);
        this.salesTax = this.salesTaxCalculationService.Calculate(this.itemsPrice, currentState, clientPurchaseInfo.ShippingInfo.Zip);
        return this.orderPurchaseStrategy.CalculateTotalPrice() + this.salesTax;
    }

    public override void ValidateOrderSummary(decimal totalPrice)
    {
        base.orderPurchaseStrategy.ValidateOrderSummary(totalPrice);
        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(salesTax.ToString());
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly OrderPurchaseStrategy orderPurchaseStrategy;

    public PurchaseContext(OrderPurchaseStrategy orderPurchaseStrategy)
    {
        this.orderPurchaseStrategy = orderPurchaseStrategy;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingAddressPage.Instance.FillBillingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
        decimal expectedTotalPrice = this.orderPurchaseStrategy.CalculateTotalPrice();
        this.orderPurchaseStrategy.ValidateOrderSummary(expectedTotalPrice);
    }
}
```

```csharp
public void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo)
{
    foreach (var currentStrategy in orderpurchaseStrategies)
    {
        currentStrategy.ValidateClientPurchaseInfo(clientPurchaseInfo);
    }
}

public void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo)
{
    foreach (var currentStrategy in orderpurchaseStrategies)
    {
        currentStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }
}
```

```csharp
[TestClass]
public class Online StorePurchase_DecoratedStrategies_Tests
{
    [TestInitialize]
public void SetupTest()
{
    Driver.StartBrowser();
}

[TestCleanup]
public void TeardownTest()
{
    Driver.StopBrowser();
}

[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook_DecoratedStrategies()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    decimal itemPrice = 40.49m;
    var shippingInfo = new ClientAddressInfo()
    {
        FullName = "John Smith",
        Country = "United States",
        Address1 = "950 Avenue of the Americas",
        State = "Texas",
        City = "Houston",
        Zip = "77001",
        Phone = "00164644885569"
    };
    var billingInfo = new ClientAddressInfo()
    {
        FullName = "Anton Angelov",
        Country = "Bulgaria",
        Address1 = "950 Avenue of the Americas",
        City = "Sofia",
        Zip = "1672",
        Phone = "0894464647"
    };
    ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(billingInfo, shippingInfo)
    {
        GiftWrapping = GiftWrappingStyles.Fancy
    };
    ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    OrderPurchaseStrategy orderPurchaseStrategy = new TotalPriceOrderPurchaseStrategy(itemPrice);
    orderPurchaseStrategy = new SalesTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, clientPurchaseInfo);
    orderPurchaseStrategy = new VatTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, clientPurchaseInfo);

    new PurchaseContext(orderPurchaseStrategy).PurchaseItem(itemUrl, itemPrice.ToString(), clientLoginInfo, clientPurchaseInfo);
}
}
```

```csharp
OrderPurchaseStrategy orderPurchaseStrategy = new TotalPriceOrderPurchaseStrategy(itemPrice);
orderPurchaseStrategy = new SalesTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, clientPurchaseInfo);
orderPurchaseStrategy = new VatTaxOrderPurchaseStrategy(orderPurchaseStrategy, itemPrice, clientPurchaseInfo);
new PurchaseContext(orderPurchaseStrategy).PurchaseItem(itemUrl, itemPrice.ToString(), clientLoginInfo, clientPurchaseInfo);
```

## Advanced Observer Design Pattern via IObservable and IObserver in Automated Testing

```csharp

public class MSTestExecutionProvider : IObservable<ExecutionStatus>, IDisposable, ITestExecutionProvider
{
    private readonly List<IObserver<ExecutionStatus>> testBehaviorObservers;

    public MSTestExecutionProvider()
    {
        this.testBehaviorObservers = new List<IObserver<ExecutionStatus>>();
    }

    public void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PreTestInit);
    }

    public void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PostTestInit);
    }

    public void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PreTestCleanup);
    }

    public void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PostTestCleanup);
    }

    public void TestInstantiated(MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(null, memberInfo, ExecutionPhases.TestInstantiated);
    }

    public IDisposable Subscribe(IObserver<ExecutionStatus> observer)
    {
        if (!testBehaviorObservers.Contains(observer))
        {
            testBehaviorObservers.Add(observer);
        }
        return new Unsubscriber<ExecutionStatus>(testBehaviorObservers, observer);
    }

    private void NotifyObserversExecutionPhase(TestContext context, MemberInfo memberInfo, ExecutionPhases executionPhase)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.OnNext(new ExecutionStatus(context, memberInfo, executionPhase));
        }
    }

    public void Dispose()
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.OnCompleted();
        }

        this.testBehaviorObservers.Clear();
    }
}
```

```csharp
internal class Unsubscriber<T> : IDisposable
{
    private List<IObserver<T>> observers;
    private IObserver<T> observer;

    internal Unsubscriber(List<IObserver<T>> observers, IObserver<T> observer)
    {
        this.observers = observers;
        this.observer = observer;
    }

    public void Dispose()
    {
        if (observers.Contains(observer))
            observers.Remove(observer);
    }
}
```

```csharp
public class ExecutionStatus
{
    public TestContext TestContext { get; set; }

    public MemberInfo MemberInfo { get; set; }

    public ExecutionPhases ExecutionPhase { get; set; }

    public ExecutionStatus(TestContext testContext, ExecutionPhases executionPhase) : this(testContext, null, executionPhase)
    {
    }

    public ExecutionStatus(TestContext testContext, MemberInfo memberInfo, ExecutionPhases executionPhase)
    {
        this.TestContext = testContext;
        this.MemberInfo = memberInfo;
        this.ExecutionPhase = executionPhase;
    }
}
```

```csharp
public enum ExecutionPhases
{
    TestInstantiated,
    PreTestInit,
    PostTestInit,
    PreTestCleanup,
    PostTestCleanup
}
```

```csharp
private void NotifyObserversExecutionPhase(TestContext context, MemberInfo memberInfo, ExecutionPhases executionPhase)
{
    foreach (var currentObserver in this.testBehaviorObservers)
    {
        currentObserver.OnNext(new ExecutionStatus(context, memberInfo, executionPhase));
    }
}
```

```csharp
public class BaseTestBehaviorObserver : IObserver<ExecutionStatus>
{
    private IDisposable cancellation;

    public virtual void Subscribe(IObservable<ExecutionStatus> provider)
    {
        cancellation = provider.Subscribe(this);
    }

    public virtual void Unsubscribe()
    {
        cancellation.Dispose();
    }

    public void OnNext(ExecutionStatus currentExecutionStatus)
    {
        switch (currentExecutionStatus.ExecutionPhase)
        {
            case ExecutionPhases.TestInstantiated:
                this.TestInstantiated(currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PreTestInit:
                this.PreTestInit(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PostTestInit:
                this.PostTestInit(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PreTestCleanup:
                this.PreTestCleanup(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PostTestCleanup:
                this.PostTestCleanup(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            default:
                break;
        }
    }

    public virtual void OnError(Exception e)
    {
        Console.WriteLine("The following exception occurred: {0}", e.Message);
    }

    public virtual void OnCompleted()
    {
    }

    protected virtual void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void TestInstantiated(MemberInfo memberInfo)
    {
    }
}
```

```csharp
public class OwnerTestBehaviorObserver : BaseTestBehaviorObserver
{
    protected override void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.ThrowExceptionIfOwnerAttributeNotSet(memberInfo);
    }

    private void ThrowExceptionIfOwnerAttributeNotSet(MemberInfo memberInfo)
    {
        try
        {
            memberInfo.GetCustomAttribute<OwnerAttribute>(true);
        }
        catch
        {
            throw new Exception("You have to set Owner of your test before you run it");
        }
    }
}
```

```csharp
[TestClass]
public class BaseTest
{
    private readonly MSTestExecutionProvider currentTestExecutionProvider;
    private TestContext testContextInstance;

    public BaseTest()
    {
        this.currentTestExecutionProvider = new MSTestExecutionProvider();
        this.InitializeTestExecutionBehaviorObservers(this.currentTestExecutionProvider);
        var memberInfo = MethodInfo.GetCurrentMethod();
        this.currentTestExecutionProvider.TestInstantiated(memberInfo);
    }

    public string BaseUrl { get; set; }

    public IWebDriver Browser { get; set; }

    public TestContext TestContext
    {
        get
        {
            return testContextInstance;
        }
        set
        {
            testContextInstance = value;
        }
    }

    public string TestName
    {
        get
        {
            return this.TestContext.TestName;
        }
    }

    [ClassInitialize]
    public static void OnClassInitialize(TestContext context)
    {
    }

    [ClassCleanup]
    public static void OnClassCleanup()
    {
    }

    [TestInitialize]
    public void CoreTestInit()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestInit(this.TestContext, memberInfo);
        this.TestInit();
        this.currentTestExecutionProvider.PostTestInit(this.TestContext, memberInfo);
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestCleanup(this.TestContext, memberInfo);
        this.TestCleanup();
        this.currentTestExecutionProvider.PostTestCleanup(this.TestContext, memberInfo);
    }

    public virtual void TestInit()
    {
    }

    public virtual void TestCleanup()
    {
    }

    private MethodInfo GetCurrentExecutionMethodInfo()
    {
        var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);
        return memberInfo;
    }

    private void InitializeTestExecutionBehaviorObservers(MSTestExecutionProvider currentTestExecutionProvider)
    {
        new AssociatedBugTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new BrowserLaunchTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new OwnerTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
    }
}
```

## Advanced Observer Design Pattern via IObservable and IObserver in Automated Testing

```csharp
public class MSTestExecutionProvider : IObservable<ExecutionStatus>, IDisposable, ITestExecutionProvider
{
    private readonly List<IObserver<ExecutionStatus>> testBehaviorObservers;

    public MSTestExecutionProvider()
    {
        this.testBehaviorObservers = new List<IObserver<ExecutionStatus>>();
    }

    public void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PreTestInit);
    }

    public void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PostTestInit);
    }

    public void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PreTestCleanup);
    }

    public void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(context, memberInfo, ExecutionPhases.PostTestCleanup);
    }

    public void TestInstantiated(MemberInfo memberInfo)
    {
        this.NotifyObserversExecutionPhase(null, memberInfo, ExecutionPhases.TestInstantiated);
    }

    public IDisposable Subscribe(IObserver<ExecutionStatus> observer)
    {
        if (!testBehaviorObservers.Contains(observer))
        {
            testBehaviorObservers.Add(observer);
        }
        return new Unsubscriber<ExecutionStatus>(testBehaviorObservers, observer);
    }

    private void NotifyObserversExecutionPhase(TestContext context, MemberInfo memberInfo, ExecutionPhases executionPhase)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.OnNext(new ExecutionStatus(context, memberInfo, executionPhase));
        }
    }

    public void Dispose()
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.OnCompleted();
        }

        this.testBehaviorObservers.Clear();
    }
}
```

```csharp
internal class Unsubscriber<T> : IDisposable
{
    private List<IObserver<T>> observers;
    private IObserver<T> observer;

    internal Unsubscriber(List<IObserver<T>> observers, IObserver<T> observer)
    {
        this.observers = observers;
        this.observer = observer;
    }

    public void Dispose()
    {
        if (observers.Contains(observer))
            observers.Remove(observer);
    }
}
```

```csharp
public class ExecutionStatus
{
    public TestContext TestContext { get; set; }

    public MemberInfo MemberInfo { get; set; }

    public ExecutionPhases ExecutionPhase { get; set; }

    public ExecutionStatus(TestContext testContext, ExecutionPhases executionPhase) : this(testContext, null, executionPhase)
    {
    }

    public ExecutionStatus(TestContext testContext, MemberInfo memberInfo, ExecutionPhases executionPhase)
    {
        this.TestContext = testContext;
        this.MemberInfo = memberInfo;
        this.ExecutionPhase = executionPhase;
    }
}
```

```csharp
public enum ExecutionPhases
{
    TestInstantiated,
    PreTestInit,
    PostTestInit,
    PreTestCleanup,
    PostTestCleanup
}
```

```csharp
private void NotifyObserversExecutionPhase(TestContext context, MemberInfo memberInfo, ExecutionPhases executionPhase)
{
    foreach (var currentObserver in this.testBehaviorObservers)
    {
        currentObserver.OnNext(new ExecutionStatus(context, memberInfo, executionPhase));
    }
}
```

```csharp
public class BaseTestBehaviorObserver : IObserver<ExecutionStatus>
{
    private IDisposable cancellation;

    public virtual void Subscribe(IObservable<ExecutionStatus> provider)
    {
        cancellation = provider.Subscribe(this);
    }

    public virtual void Unsubscribe()
    {
        cancellation.Dispose();
    }

    public void OnNext(ExecutionStatus currentExecutionStatus)
    {
        switch (currentExecutionStatus.ExecutionPhase)
        {
            case ExecutionPhases.TestInstantiated:
                this.TestInstantiated(currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PreTestInit:
                this.PreTestInit(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PostTestInit:
                this.PostTestInit(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PreTestCleanup:
                this.PreTestCleanup(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            case ExecutionPhases.PostTestCleanup:
                this.PostTestCleanup(currentExecutionStatus.TestContext, currentExecutionStatus.MemberInfo);
                break;
            default:
                break;
        }
    }

    public virtual void OnError(Exception e)
    {
        Console.WriteLine("The following exception occurred: {0}", e.Message);
    }

    public virtual void OnCompleted()
    {
    }

    protected virtual void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    protected virtual void TestInstantiated(MemberInfo memberInfo)
    {
    }
}
```

```csharp
public class OwnerTestBehaviorObserver : BaseTestBehaviorObserver
{
    protected override void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.ThrowExceptionIfOwnerAttributeNotSet(memberInfo);
    }

    private void ThrowExceptionIfOwnerAttributeNotSet(MemberInfo memberInfo)
    {
        try
        {
            memberInfo.GetCustomAttribute<OwnerAttribute>(true);
        }
        catch
        {
            throw new Exception("You have to set Owner of your test before you run it");
        }
    }
}
```

```csharp
[TestClass]
public class BaseTest
{
    private readonly MSTestExecutionProvider currentTestExecutionProvider;
    private TestContext testContextInstance;

    public BaseTest()
    {
        this.currentTestExecutionProvider = new MSTestExecutionProvider();
        this.InitializeTestExecutionBehaviorObservers(this.currentTestExecutionProvider);
        var memberInfo = MethodInfo.GetCurrentMethod();
        this.currentTestExecutionProvider.TestInstantiated(memberInfo);
    }

    public string BaseUrl { get; set; }

    public IWebDriver Browser { get; set; }

    public TestContext TestContext
    {
        get
        {
            return testContextInstance;
        }
        set
        {
            testContextInstance = value;
        }
    }

    public string TestName
    {
        get
        {
            return this.TestContext.TestName;
        }
    }

    [ClassInitialize]
    public static void OnClassInitialize(TestContext context)
    {
    }

    [ClassCleanup]
    public static void OnClassCleanup()
    {
    }

    [TestInitialize]
    public void CoreTestInit()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestInit(this.TestContext, memberInfo);
        this.TestInit();
        this.currentTestExecutionProvider.PostTestInit(this.TestContext, memberInfo);
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestCleanup(this.TestContext, memberInfo);
        this.TestCleanup();
        this.currentTestExecutionProvider.PostTestCleanup(this.TestContext, memberInfo);
    }

    public virtual void TestInit()
    {
    }

    public virtual void TestCleanup()
    {
    }

    private MethodInfo GetCurrentExecutionMethodInfo()
    {
        var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);
        return memberInfo;
    }

    private void InitializeTestExecutionBehaviorObservers(MSTestExecutionProvider currentTestExecutionProvider)
    {
        new AssociatedBugTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new BrowserLaunchTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new OwnerTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
    }
}
```

## Observer Design Pattern Classic Implementation in Automated Testing

```csharp
public interface IExecutionProvider
{
    event EventHandler<TestExecutionEventArgs> TestInstantiatedEvent;

    event EventHandler<TestExecutionEventArgs> PreTestInitEvent;

    event EventHandler<TestExecutionEventArgs> PostTestInitEvent;

    event EventHandler<TestExecutionEventArgs> PreTestCleanupEvent;

    event EventHandler<TestExecutionEventArgs> PostTestCleanupEvent;
}
```

```csharp
public class MSTestExecutionProvider : IExecutionProvider
{
    public event EventHandler<TestExecutionEventArgs> TestInstantiatedEvent;

    public event EventHandler<TestExecutionEventArgs> PreTestInitEvent;

    public event EventHandler<TestExecutionEventArgs> PostTestInitEvent;

    public event EventHandler<TestExecutionEventArgs> PreTestCleanupEvent;

    public event EventHandler<TestExecutionEventArgs> PostTestCleanupEvent;

    public void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.PreTestInitEvent, context, memberInfo);
    }

    public void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.PostTestInitEvent, context, memberInfo);
    }

    public void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.PreTestCleanupEvent, context, memberInfo);
    }

    public void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.PostTestCleanupEvent, context, memberInfo);
    }

    public void TestInstantiated(MemberInfo memberInfo)
    {
        this.RaiseTestEvent(this.TestInstantiatedEvent, null, memberInfo);
    }

    private void RaiseTestEvent(EventHandler<TestExecutionEventArgs> eventHandler, TestContext testContext, MemberInfo memberInfo)
    {
        if (eventHandler != null)
        {
            eventHandler(this, new TestExecutionEventArgs(testContext, memberInfo));
        }
    }
}
```

```csharp
public class TestExecutionEventArgs : EventArgs
{
    private readonly TestContext testContext;
    private readonly MemberInfo memberInfo;

    public TestExecutionEventArgs(TestContext context, MemberInfo memberInfo)
    {
        this.testContext = context;
        this.memberInfo = memberInfo;
    }

    public MemberInfo MemberInfo
    {
        get
        {
            return this.memberInfo;
        }
    }

    public TestContext TestContext
    {
        get
        {
            return this.testContext;
        }
    }
}
```

```csharp
[TestClass]
[ExecutionBrowser(BrowserTypes.Chrome)]
public class SearchEngineTestsDotNetEvents : BaseTest
{
    [TestMethod]
    [ExecutionBrowser(BrowserTypes.Firefox)]
    public void SearchTextInSearchEngine_First_Observer()
    {
        B.SearchEngineMainPage searchEngineMainPage = new B.SearchEngineMainPage(Driver.Browser);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.ValidateResultsCount("RESULTS");
    }
}
```

```csharp
public class BrowserLaunchTestBehaviorObserver : BaseTestBehaviorObserver
{
    protected override void PreTestInit(object sender, TestExecutionEventArgs e)
    {
        var browserType = this.GetExecutionBrowser(e.MemberInfo);
        Driver.StartBrowser(browserType);
    }

    protected override void PostTestCleanup(object sender, TestExecutionEventArgs e)
    {
        Driver.StopBrowser();
    }

    private BrowserTypes GetExecutionBrowser(MemberInfo memberInfo)
    {
        BrowserTypes result = BrowserTypes.Firefox;
        BrowserTypes classBrowserType = this.GetExecutionBrowserClassLevel(memberInfo.DeclaringType);
        BrowserTypes methodBrowserType = this.GetExecutionBrowserMethodLevel(memberInfo);
        if (methodBrowserType != BrowserTypes.NotSet)
        {
            result = methodBrowserType;
        }
        else if (classBrowserType != BrowserTypes.NotSet)
        {
            result = classBrowserType;
        }
        return result;
    }

    private BrowserTypes GetExecutionBrowserMethodLevel(MemberInfo memberInfo)
    {
        var executionBrowserAttribute = memberInfo.GetCustomAttribute<ExecutionBrowserAttribute>(true);
        if (executionBrowserAttribute != null)
        {
            return executionBrowserAttribute.BrowserType;
        }
        return BrowserTypes.NotSet;
    }

    private BrowserTypes GetExecutionBrowserClassLevel(Type type)
    {
        var executionBrowserAttribute = type.GetCustomAttribute<ExecutionBrowserAttribute>(true);
        if (executionBrowserAttribute != null)
        {
            return executionBrowserAttribute.BrowserType;
        }
        return BrowserTypes.NotSet;
    }
}
```

```csharp
public class BaseTest
{
    private readonly MSTestExecutionProvider currentTestExecutionProvider;
    private TestContext testContextInstance;

    public BaseTest()
    {
        this.currentTestExecutionProvider = new MSTestExecutionProvider();
        this.InitializeTestExecutionBehaviorObservers(this.currentTestExecutionProvider);
        var memberInfo = MethodInfo.GetCurrentMethod();
        this.currentTestExecutionProvider.TestInstantiated(memberInfo);
    }

    public string BaseUrl { get; set; }

    public IWebDriver Browser { get; set; }

    public TestContext TestContext
    {
        get
        {
            return testContextInstance;
        }
        set
        {
            testContextInstance = value;
        }
    }

    public string TestName
    {
        get
        {
            return this.TestContext.TestName;
        }
    }

    [TestInitialize]
    public void CoreTestInit()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestInit(this.TestContext, memberInfo);
        this.TestInit();
        this.currentTestExecutionProvider.PostTestInit(this.TestContext, memberInfo);
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionProvider.PreTestCleanup(this.TestContext, memberInfo);
        this.TestCleanup();
        this.currentTestExecutionProvider.PostTestCleanup(this.TestContext, memberInfo);
    }

    public virtual void TestInit()
    {
    }

    public virtual void TestCleanup()
    {
    }

    private MethodInfo GetCurrentExecutionMethodInfo()
    {
        var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);
        return memberInfo;
    }

    private void InitializeTestExecutionBehaviorObservers(MSTestExecutionProvider currentTestExecutionProvider)
    {
        new AssociatedBugTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new BrowserLaunchTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
        new OwnerTestBehaviorObserver().Subscribe(currentTestExecutionProvider);
    }
}
```

## Observer Design Pattern Classic Implementation in Automated Testing

```csharp
public interface ITestBehaviorObserver
{
    void PreTestInit(TestContext context, MemberInfo memberInfo);

    void PostTestInit(TestContext context, MemberInfo memberInfo);

    void PreTestCleanup(TestContext context, MemberInfo memberInfo);

    void PostTestCleanup(TestContext context, MemberInfo memberInfo);

    void TestInstantiated(MemberInfo memberInfo);
}
```

```csharp
public class MSTestExecutionSubject : ITestExecutionSubject
{
    private readonly List<ITestBehaviorObserver> testBehaviorObservers;

    public MSTestExecutionSubject()
    {
        this.testBehaviorObservers = new List<ITestBehaviorObserver>();
    }

    public void Attach(ITestBehaviorObserver observer)
    {
        testBehaviorObservers.Add(observer);
    }

    public void Detach(ITestBehaviorObserver observer)
    {
        testBehaviorObservers.Remove(observer);
    }

    public void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.PreTestInit(context, memberInfo);
        }
    }
    public void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.PostTestInit(context, memberInfo);
        }
    }

    public void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.PreTestCleanup(context, memberInfo);
        }
    }

    public void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.PostTestCleanup(context, memberInfo);
        }
    }

    public void TestInstantiated(MemberInfo memberInfo)
    {
        foreach (var currentObserver in this.testBehaviorObservers)
        {
            currentObserver.TestInstantiated(memberInfo);
        }
    }
}
```

```csharp
public class BaseTestBehaviorObserver : ITestBehaviorObserver
{
    private readonly ITestExecutionSubject testExecutionSubject;

    public BaseTestBehaviorObserver(ITestExecutionSubject testExecutionSubject)
    {
        this.testExecutionSubject = testExecutionSubject;
        testExecutionSubject.Attach(this);
    }

    public virtual void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    public virtual void PostTestInit(TestContext context, MemberInfo memberInfo)
    {
    }

    public virtual void PreTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    public virtual void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
    }

    public virtual void TestInstantiated(MemberInfo memberInfo)
    {
    }
}
```

```csharp
[TestClass]
[ExecutionBrowser(BrowserType = BrowserTypes.Firefox)]
public class SearchEngineTestsClassicObserver : BaseTest
{
    [TestMethod]
    [ExecutionBrowser(BrowserType = BrowserTypes.Chrome)]
    public void SearchTextInSearchEngine_First_Observer()
    {
        B.SearchEngineMainPage searchEngineMainPage = new B.SearchEngineMainPage(Driver.Browser);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.ValidateResultsCount("RESULTS");
    }
}
```

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
public class ExecutionBrowserAttribute : Attribute
{
    public ExecutionBrowserAttribute(BrowserTypes browser)
    {
        this.BrowserType = browser;
    }

    public BrowserTypes BrowserType { get; set; }
}
```

```csharp
public class BrowserLaunchTestBehaviorObserver : BaseTestBehaviorObserver
{
    public BrowserLaunchTestBehaviorObserver(ITestExecutionSubject testExecutionSubject)
        : base(testExecutionSubject)
    {
    }

    public override void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        var browserType = this.GetExecutionBrowser(memberInfo);
        Driver.StartBrowser(browserType);
    }

    public override void PostTestCleanup(TestContext context, MemberInfo memberInfo)
    {
        Driver.StopBrowser();
    }

    private BrowserTypes GetExecutionBrowser(MemberInfo memberInfo)
    {
        BrowserTypes result = BrowserTypes.Firefox;
        BrowserTypes classBrowserType = this.GetExecutionBrowserClassLevel(memberInfo.DeclaringType);
        BrowserTypes methodBrowserType = this.GetExecutionBrowserMethodLevel(memberInfo);
        if (methodBrowserType != BrowserTypes.NotSet)
        {
            result = methodBrowserType;
        }
        else if (classBrowserType != BrowserTypes.NotSet)
        {
            result = classBrowserType;
        }
        return result;
    }

    private BrowserTypes GetExecutionBrowserMethodLevel(MemberInfo memberInfo)
    {
        var executionBrowserAttribute = memberInfo.GetCustomAttribute<ExecutionBrowserAttribute>(true);
        if (executionBrowserAttribute != null)
        {
            return executionBrowserAttribute.BrowserType;
        }
        return BrowserTypes.NotSet;
    }

    private BrowserTypes GetExecutionBrowserClassLevel(Type type)
    {
        var executionBrowserAttribute = type.GetCustomAttribute<ExecutionBrowserAttribute>(true);
        if (executionBrowserAttribute != null)
        {
            return executionBrowserAttribute.BrowserType;
        }
        return BrowserTypes.NotSet;
    }
}
```

```csharp
var executionBrowserAttribute = memberInfo.GetCustomAttribute<ExecutionBrowserAttribute>(true);

```

```csharp
public class OwnerTestBehaviorObserver : BaseTestBehaviorObserver
{
    public OwnerTestBehaviorObserver(ITestExecutionSubject testExecutionSubject)
        : base(testExecutionSubject)
    {
    }

    public override void PreTestInit(TestContext context, MemberInfo memberInfo)
    {
        this.ThrowExceptionIfOwnerAttributeNotSet(memberInfo);
    }

    private void ThrowExceptionIfOwnerAttributeNotSet(MemberInfo memberInfo)
    {
        try
        {
            var ownerAttribute = memberInfo.GetCustomAttribute<OwnerAttribute>(true);
        }
        catch
        {
            throw new Exception("You have to set Owner of your test before you run it");
        }
    }
}
```

```csharp
[TestClass]
public class BaseTest
{
    private readonly ITestExecutionSubject currentTestExecutionSubject;
    private TestContext testContextInstance;

    public BaseTest()
    {
        this.currentTestExecutionSubject = new MSTestExecutionSubject();
        this.InitializeTestExecutionBehaviorObservers(this.currentTestExecutionSubject);
        var memberInfo = MethodInfo.GetCurrentMethod();
        this.currentTestExecutionSubject.TestInstantiated(memberInfo);
    }

    public string BaseUrl { get; set; }

    public IWebDriver Browser { get; set; }

    public TestContext TestContext
    {
        get
        {
            return testContextInstance;
        }
        set
        {
            testContextInstance = value;
        }
    }

    public string TestName
    {
        get
        {
            return this.TestContext.TestName;
        }
    }

    [ClassInitialize]
    public static void OnClassInitialize(TestContext context)
    {
    }

    [ClassCleanup]
    public static void OnClassCleanup()
    {
    }

    [TestInitialize]
    public void CoreTestInit()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionSubject.PreTestInit(this.TestContext, memberInfo);
        this.TestInit();
        this.currentTestExecutionSubject.PostTestInit(this.TestContext, memberInfo);
    }

    [TestCleanup]
    public void CoreTestCleanup()
    {
        var memberInfo = GetCurrentExecutionMethodInfo();
        this.currentTestExecutionSubject.PreTestCleanup(this.TestContext, memberInfo);
        this.TestCleanup();
        this.currentTestExecutionSubject.PostTestCleanup(this.TestContext, memberInfo);

    }

    public virtual void TestInit()
    {
    }

    public virtual void TestCleanup()
    {
    }

    private MethodInfo GetCurrentExecutionMethodInfo()
    {
        var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);
        return memberInfo;
    }

    private void InitializeTestExecutionBehaviorObservers(ITestExecutionSubject currentTestExecutionSubject)
    {
        new AssociatedBugTestBehaviorObserver(currentTestExecutionSubject);
        new BrowserLaunchTestBehaviorObserver(currentTestExecutionSubject);
        new OwnerTestBehaviorObserver(currentTestExecutionSubject);
    }
}
```

```csharp
var memberInfo = this.GetType().GetMethod(this.TestContext.TestName);

```

## Advanced Strategy Design Pattern in Automated Testing

```csharp
public interface IOrderPurchaseStrategy
{
    void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo);

    void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo);
}
```

```csharp
public class SalesTaxOrderPurchaseStrategy : IOrderPurchaseStrategy
{
    public SalesTaxOrderPurchaseStrategy()
    {
        this.SalesTaxCalculationService = new SalesTaxCalculationService();
    }

    public SalesTaxCalculationService SalesTaxCalculationService { get; set; }

    public void ValidateOrderSummary(string itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        States currentState = (States)Enum.Parse(typeof(States), clientPurchaseInfo.ShippingInfo.State);
        decimal currentItemPrice = decimal.Parse(itemsPrice);
        decimal salesTax = this.SalesTaxCalculationService.Calculate(currentItemPrice, currentState, clientPurchaseInfo.ShippingInfo.Zip);

        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(salesTax.ToString());
    }

    public void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo)
    {
        if (!clientPurchaseInfo.ShippingInfo.Country.Equals("United States"))
        {
            throw new ArgumentException("If the NoTaxesOrderPurchaseStrategy is used, the country should be set to United States because otherwise no sales tax is going to be applied.");
        }
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly IOrderValidationStrategy orderValidationStrategy;

    public PurchaseContext(IOrderValidationStrategy orderValidationStrategy)
    {
        this.orderValidationStrategy = orderValidationStrategy;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
        this.orderValidationStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }
}
```

```csharp
public class PurchaseContext
{
    private readonly IOrderPurchaseStrategy[] orderpurchaseStrategies;

    public PurchaseContext(params IOrderPurchaseStrategy[] orderpurchaseStrategies)
    {
        this.orderpurchaseStrategies = orderpurchaseStrategies;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        this.ValidateClientPurchaseInfo(clientPurchaseInfo);

        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingAddressPage.Instance.FillBillingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();

        this.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }

    public void ValidateClientPurchaseInfo(ClientPurchaseInfo clientPurchaseInfo)
    {
        foreach (var currentStrategy in orderpurchaseStrategies)
        {
            currentStrategy.ValidateClientPurchaseInfo(clientPurchaseInfo);
        }
    }

    public void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        foreach (var currentStrategy in orderpurchaseStrategies)
        {
            currentStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
        }
    }
}
```

```csharp
public PurchaseContext(params IOrderPurchaseStrategy[] orderpurchaseStrategies)
{
    this.orderpurchaseStrategies = orderpurchaseStrategies;
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_PurchaseStrategy_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_SeleniumTestingToolsCookbook()
    {
        string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
        string itemPrice = "40.49";
        ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = "John Smith",
            Country = "United States",
            Address1 = "950 Avenue of the Americas",
            State = "New York",
            City = "New York City",
            Zip = "10001-2121",
            Phone = "00164644885569"
        })
        {
            GiftWrapping = Enums.GiftWrappingStyles.None
        };
        ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
        {
            Email = "g3984159@trbvm.com",
            Password = "ASDFG_12345"
        };

        new PurchaseContext(new SalesTaxOrderValidationStrategy()).PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
    }
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_AdvancedPurchaseStrategy_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_SeleniumTestingToolsCookbook()
    {
        string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
        string itemPrice = "40.49";
        var shippingInfo = new ClientAddressInfo()
        {
            FullName = "John Smith",
            Country = "United States",
            Address1 = "950 Avenue of the Americas",
            State = "New York",
            City = "New York City",
            Zip = "10001-2121",
            Phone = "00164644885569"
        };
        var billingInfo = new ClientAddressInfo()
        {
            FullName = "Anton Angelov",
            Country = "Bulgaria",
            Address1 = "950 Avenue of the Americas",
            City = "Sofia",
            Zip = "1672",
            Phone = "0894464647"
        };
        ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo(billingInfo, shippingInfo)
        {
            GiftWrapping = Enums.GiftWrappingStyles.Fancy
        };
        ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
        {
            Email = "g3984159@trbvm.com",
            Password = "ASDFG_12345"
        };

        new PurchaseContext(new SalesTaxOrderPurchaseStrategy(), new VatTaxOrderPurchaseStrategy(), new GiftOrderPurchaseStrategy())
        .PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
    }
}
```

## Strategy Design Pattern in Automated Testing

```csharp
public class ShippingAddressPage : BasePageSingleton<ShippingAddressPage, ShippingAddressPageMap>
{
    public void ClickContinueButton()
    {
        this.Map.ContinueButton.Click();
    }

    public void FillShippingInfo(ClientPurchaseInfo clientInfo)
    {
        this.Map.CountryDropDown.SelectByText(clientInfo.Country);
        this.Map.FullNameInput.SendKeys(clientInfo.FullName);
        this.Map.Address1Input.SendKeys(clientInfo.Address1);
        this.Map.CityInput.SendKeys(clientInfo.City);
        this.Map.ZipInput.SendKeys(clientInfo.Zip);
        this.Map.PhoneInput.SendKeys(clientInfo.Phone);
        this.Map.ShipToThisAddress.Click();
    }
}
```

```csharp
public class ClientPurchaseInfo
{
    public string FullName { get; set; }

    public string Country { get; set; }

    public string Address1 { get; set; }

    public string City { get; set; }

    public string Phone { get; set; }

    public string Zip { get; set; }

    public string Email { get; set; }

    public string State { get; set; }

    public string DeliveryType { get; set; }

    public GiftWrappingStyles GiftWrapping { get; set; }
}
```

```csharp
public class PurchaseFacade
{
    public void PurchaseItemSalesTax(string itemUrl, string itemPrice, string taxAmount, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        PurchaseItemInternal(itemUrl, clientLoginInfo, clientPurchaseInfo);
        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(taxAmount);
    }

    public void PurchaseItemGiftWrapping(string itemUrl, string itemPrice, string giftWrapTax, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        PurchaseItemInternal(itemUrl, clientLoginInfo, clientPurchaseInfo);
        PlaceOrderPage.Instance.Validate().GiftWrapPrice(giftWrapTax);
    }

    public void PurchaseItemShippingTax(string itemUrl, string itemPrice, string shippingTax, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        PurchaseItemInternal(itemUrl, clientLoginInfo, clientPurchaseInfo);
        PlaceOrderPage.Instance.Validate().ShippingTaxPrice(shippingTax);
    }

    private void PurchaseItemInternal(string itemUrl, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
    }
}
```

```csharp
public interface IOrderValidationStrategy
{
    void ValidateOrderSummary(string itemPrice, ClientPurchaseInfo clientPurchaseInfo);
}
```

```csharp
public class PurchaseContext
{
    private readonly IOrderValidationStrategy orderValidationStrategy;

    public PurchaseContext(IOrderValidationStrategy orderValidationStrategy)
    {
        this.orderValidationStrategy = orderValidationStrategy;
    }

    public void PurchaseItem(string itemUrl, string itemPrice, ClientLoginInfo clientLoginInfo, ClientPurchaseInfo clientPurchaseInfo)
    {
        ItemPage.Instance.Navigate(itemUrl);
        ItemPage.Instance.ClickBuyNowButton();
        PreviewShoppingCartPage.Instance.ClickProceedToCheckoutButton();
        SignInPage.Instance.Login(clientLoginInfo.Email, clientLoginInfo.Password);
        ShippingAddressPage.Instance.FillShippingInfo(clientPurchaseInfo);
        ShippingAddressPage.Instance.ClickContinueButton();
        ShippingPaymentPage.Instance.ClickBottomContinueButton();
        ShippingPaymentPage.Instance.ClickTopContinueButton();
        this.orderValidationStrategy.ValidateOrderSummary(itemPrice, clientPurchaseInfo);
    }
}
```

```csharp
public class SalesTaxOrderValidationStrategy : IOrderValidationStrategy
{
    public SalesTaxOrderValidationStrategy()
    {
        this.SalesTaxCalculationService = new SalesTaxCalculationService();
    }

    public SalesTaxCalculationService SalesTaxCalculationService { get; set; }

    public void ValidateOrderSummary(string itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        States currentState = (States)Enum.Parse(typeof(States), clientPurchaseInfo.State);
        decimal currentItemPrice = decimal.Parse(itemsPrice);
        decimal salesTax = this.SalesTaxCalculationService.Calculate(currentItemPrice, currentState, clientPurchaseInfo.Zip);

        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(salesTax.ToString());
    }
}
```

```csharp
public class VatTaxOrderValidationStrategy : IOrderValidationStrategy
{
    public VatTaxOrderValidationStrategy()
    {
        this.VatTaxCalculationService = new VatTaxCalculationService();
    }

    public VatTaxCalculationService VatTaxCalculationService { get; set; }

    public void ValidateOrderSummary(string itemsPrice, ClientPurchaseInfo clientPurchaseInfo)
    {
        Countries currentCountry = (Countries)Enum.Parse(typeof(Countries), clientPurchaseInfo.Country);
        decimal currentItemPrice = decimal.Parse(itemsPrice);
        decimal vatTax = this.VatTaxCalculationService.Calculate(currentItemPrice, currentCountry);

        PlaceOrderPage.Instance.Validate().EstimatedTaxPrice(vatTax.ToString());
    }
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_PurchaseStrategy_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_SeleniumTestingToolsCookbook()
    {
        string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
        string itemPrice = "40.49";
        ClientPurchaseInfo clientPurchaseInfo = new ClientPurchaseInfo()
        {
            FullName = "John Smith",
            Country = "United States",
            Address1 = "950 Avenue of the Americas",
            State = "New York",
            City = "New York City",
            Zip = "10001-2121",
            Phone = "00164644885569",
            GiftWrapping = Enums.GiftWrappingStyles.None
        };
        ClientLoginInfo clientLoginInfo = new ClientLoginInfo()
        {
            Email = "g3984159@trbvm.com",
            Password = "ASDFG_12345"
        };

        new PurchaseContext(new SalesTaxOrderValidationStrategy()).PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
    }
}
```

## Use IoC Container to Create Page Object Pattern on Steroids

```csharp
[TestClass]
public class UnityWikipediaTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void TestWikiContentsToggle()
    {
        WikipediaMainPage wikiPage = new WikipediaMainPage();
        wikiPage.Navigate();
        wikiPage.Search("Quality assurance");
        wikiPage.Validate().ToogleLinkTextHide();
        wikiPage.Validate().ContentsListVisible();
        wikiPage.ToggleContents();
        wikiPage.Validate().ToogleLinkTextShow();
        wikiPage.Validate().ContentsListHidden();
    }
}
```

```csharp
public abstract class BasePageSingletonDerived<S, M> : ThreadSafeNestedContructorsBaseSingleton<S>
    where M : BasePageElementMap, new()
    where S : BasePageSingletonDerived<S, M>
{
    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string url = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url));
    }
}

public abstract class BasePageSingletonDerived<S, M, V> : BasePageSingletonDerived<S, M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
    where S : BasePageSingletonDerived<S, M, V>
{
    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class BasePage<M>
    where M : BasePageElementMap, new()
{
    protected readonly string url;

    public BasePage(string url)
    {
        this.url = url;
    }

    public BasePage()
    {
        this.url = null;
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string part = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url, part));
    }
}

public class BasePage<M, V> : BasePage<M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    public BasePage(string url) : base(url)
    {
    }

    public BasePage()
    {
    }

    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class WikipediaMainPage : BasePage<WikipediaMainPageMap, WikipediaMainPageValidator>, IWikipediaMainPage
{
    public WikipediaMainPage()
        : base(@"mySiteUrl")
    {
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.SearchBox.Click();
    }

    public void ToggleContents()
    {
        this.Map.ContentsToggleLink.Click();
    }
}
```

```csharp
public interface IWikipediaMainPage
{
    void Navigate(string part = "");

    WikipediaMainPageValidator Validate();

    void Search(string textToType);

    void ToggleContents();
}
```

```csharp
[TestClass]
public class UnityWikipediaTests
{
    private static IUnityContainer pageFactory = new UnityContainer();

    [AssemblyInitialize()]
    public static void MyTestInitialize(TestContext testContext)
    {
        pageFactory.RegisterType<IWikipediaMainPage, WikipediaMainPage>(new ContainerControlledLifetimeManager());
    }

    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void TestWikiContentsToggle_Unity()
    {
        var wikiPage = pageFactory.Resolve<IWikipediaMainPage>();
        wikiPage.Navigate();
        wikiPage.Search("Quality assurance");
        wikiPage.Validate().ToogleLinkTextHide();
        wikiPage.Validate().ContentsListVisible();
        wikiPage.ToggleContents();
        wikiPage.Validate().ToogleLinkTextShow();
        wikiPage.Validate().ContentsListHidden();
    }
}
```

```csharp
pageFactory.RegisterType<IWikipediaMainPage, WikipediaMainPage>(new ContainerControlledLifetimeManager());

```

```xml
<configuration>
  <configSections>
    <section name="unity" type="Microsoft.Practices.Unity.Configuration.UnityConfigurationSection, Microsoft.Practices.Unity.Configuration"/>
  </configSections>
  <unity xmlns="http://schemas.microsoft.com/practices/2010/unity">
    <container>
      <register type="PatternsInAutomation.Tests.Advanced.Unity.WikipediaMainPage.IWikipediaMainPage, PatternsInAutomation.Tests"
                mapTo="PatternsInAutomation.Tests.Advanced.Unity.WikipediaMainPage.WikipediaMainPage, PatternsInAutomation.Tests">
        <lifetime type="singleton"/>
      </register>
    </container>
  </unity>
</configuration>
```

```xml
<lifetime type="singleton"/>

```

```csharp
private static IUnityContainer pageFactory = new UnityContainer();

[AssemblyInitialize()]
public static void MyTestInitialize(TestContext testContext)
{
    var fileMap = new ExeConfigurationFileMap { ExeConfigFilename = "unity.config" };
    Configuration configuration = ConfigurationManager.OpenMappedExeConfiguration(fileMap, ConfigurationUserLevel.None);
    var unitySection = (UnityConfigurationSection)configuration.GetSection("unity");
    pageFactory.LoadConfiguration(unitySection);
}
```

```csharp
pageFactory.RegisterType<IWikipediaMainPage, WikipediaMainPage>(new ContainerControlledLifetimeManager());

```

```csharp
public static class PageFactory
{
    private static IUnityContainer container;

    static PageFactory()
    {
        var fileMap = new ExeConfigurationFileMap { ExeConfigFilename = "unity.config" };
        Configuration configuration = ConfigurationManager.OpenMappedExeConfiguration(fileMap, ConfigurationUserLevel.None);
        var unitySection = (UnityConfigurationSection)configuration.GetSection("unity");
        container = new UnityContainer();
        container.LoadConfiguration(unitySection);
    }

    public static T Get<T>()
    {
        return container.Resolve<T>();
    }
}
```

```csharp
[TestClass]
public class UnityWikipediaTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void TestWikiContentsToggle_Unity()
    {
        var wikiPage = PageFactory.Get<IWikipediaMainPage>();
        ////var wikiPage = pageFactory.Resolve<IWikipediaMainPage>();
        wikiPage.Navigate();
        wikiPage.Search("Quality assurance");
        wikiPage.Validate().ToogleLinkTextHide();
        wikiPage.Validate().ContentsListVisible();
        wikiPage.ToggleContents();
        wikiPage.Validate().ToogleLinkTextShow();
        wikiPage.Validate().ContentsListHidden();
    }
}
```

```csharp
public interface IPage<M, V>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    V Validate();

    void Navigate(string part = "");
}
```

```csharp
public interface IWikipediaMainPage<M, V> : IPage<M, V>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    void Search(string textToType);

    void ToggleContents();
}
```

## Fluent Page Object Pattern in Automated Testing

```csharp
[TestClass]
public class FluentSearchEngineTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void SearchForImageNotFuent()
    {
        P.SearchEngineMainPage searchEngineMainPage = new P.SearchEngineMainPage();
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("facebook");
        searchEngineMainPage.ClickImages();
        searchEngineMainPage.SetSize(Sizes.Large);
        searchEngineMainPage.SetColor(Colors.BlackWhite);
        searchEngineMainPage.SetTypes(Types.Clipart);
        searchEngineMainPage.SetPeople(People.All);
        searchEngineMainPage.SetDate(Dates.PastYear);
        searchEngineMainPage.SetLicense(Licenses.All);
    }
}
```

```csharp
public class SearchEngineMainPage :
BaseFluentPageSingleton<
    SearchEngineMainPage,
    SearchEngineMainPageElementMap,
    SearchEngineMainPageValidator>
{
    public SearchEngineMainPage Navigate(string url = "searchEngineUrl")
    {
        base.Navigate(url);
        return this;
    }

    public SearchEngineMainPage Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
        return this;
    }

    public SearchEngineMainPage ClickImages()
    {
        this.Map.ImagesLink.Click();
        return this;
    }

    public SearchEngineMainPage SetSize(Sizes size)
    {
        this.Map.Sizes.SelectByIndex((int)size);
        return this;
    }

    public SearchEngineMainPage SetColor(Colors color)
    {
        this.Map.Color.SelectByIndex((int)color);
        return this;
    }

    public SearchEngineMainPage SetTypes(Types type)
    {
        this.Map.Type.SelectByIndex((int)type);
        return this;
    }

    public SearchEngineMainPage SetLayout(Layouts layout)
    {
        this.Map.Layout.SelectByIndex((int)layout);
        return this;
    }

    public SearchEngineMainPage SetPeople(People people)
    {
        this.Map.People.SelectByIndex((int)people);
        return this;
    }

    public SearchEngineMainPage SetDate(Dates date)
    {
        this.Map.Date.SelectByIndex((int)date);
        return this;
    }

    public SearchEngineMainPage SetLicense(Licenses license)
    {
        this.Map.License.SelectByIndex((int)license);
        return this;
    }
}
```

```csharp
return this;

```

```csharp
public SelectElement Sizes
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Size']")));
    }
}

public SelectElement Color
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Color']")));
    }
}

public SelectElement Type
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Type']")));
    }
}

public SelectElement Layout
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Layout']")));
    }
}

public SelectElement People
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'People']")));
    }
}

public SelectElement Date
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Date']")));
    }
}

public SelectElement License
{
    get
    {
        return new SelectElement(this.browser.FindElement(By.XPath("//div/ul/li/span/span[text() = 'License']")));
    }
}
```

```csharp
public enum Dates
{
    All,
    Past24Hours,
    PastWeek,
    PastMonth,
    PastYear
}
```

```csharp
public SearchEngineMainPage SetDate(Dates date)
{
    this.Map.Date.SelectByIndex((int)date);
    return this;
}
```

```csharp
public class BasePageValidator<M>
    where M : BasePageElementMap, new()
{
    protected M Map
    {
        get
        {
            return new M();
        }
    }
}
```

```csharp
public class BasePageValidator<S, M, V>
    where S : BaseFluentPageSingleton<S, M, V>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<S, M, V>, new()
{
    protected S pageInstance;

    public BasePageValidator(S currentInstance)
    {
        this.pageInstance = currentInstance;
    }

    public BasePageValidator()
    {
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }
}
```

```csharp
public class BingMainPageValidator : BasePageValidator<BingMainPageElementMap>
{
    public void ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
public class SearchEngineMainPageValidator :
BasePageValidator<
    SearchEngineMainPage,
    SearchEngineMainPageElementMap,
    SearchEngineMainPageValidator>
{
    public SearchEngineMainPage ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount),
        "The results DIV doesn't contains the specified text.");
        return this.pageInstance;
    }
}
```

```csharp
public abstract class BaseFluentPageSingleton<S, M> : ThreadSafeNestedContructorsBaseSingleton<S>
    where M : BasePageElementMap, new()
    where S : BaseFluentPageSingleton<S, M>
{
    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string url = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url));
    }
}

public abstract class BaseFluentPageSingleton<S, M, V> : BaseFluentPageSingleton<S, M>
    where M : BasePageElementMap, new()
    where S : BaseFluentPageSingleton<S, M, V>
    where V : BasePageValidator<S, M, V>, new()
{
    public V Validate()
    {
        return new V();
    }
}
```

```csharp
[TestClass]
public class FluentSearchEngineTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void SearchForImageFuent()
    {
        P.SearchEngineMainPage.Instance
                            .Navigate()
                            .Search("automate")
                            .ClickImages()
                            .SetSize(Sizes.Large)
                            .SetColor(Colors.BlackWhite)
                            .SetTypes(Types.Clipart)
                            .SetPeople(People.All)
                            .SetDate(Dates.PastYear)
                            .SetLicense(Licenses.All);
    }
}
```

## Singleton Design Pattern in Automated Testing

```csharp
public class BasePage<M>
    where M : BasePageElementMap, new()
{
    private static BasePage<M> instance;

    protected readonly string url;

    public BasePage(string url)
    {
        this.url = url;
    }

    public BasePage()
    {
        this.url = null;
    }

    public static BasePage<M> Instance
    {
        get
        {
            if (instance == null)
            {
                instance = new BasePage<M>();
            }

            return instance;
        }
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string part = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url, part));
    }
}
```

```csharp
public abstract class Nonthread-safeBaseSingleton < T >
    where T: new()
    {
    private static T instance;

public static T Instance
{
    get
    {
        if (instance == null)
        {
            instance = new T();
        }

        return instance;
    }
}
}
```

```csharp
public abstract class Thread-safeBaseSingleton < T >
    where T : new()
    {
    private static T instance;
private static readonly object lockObject = new object();

private thread -safeBaseSingleton()
    {
}

public static T Instance
{
    get
    {
        if (instance == null)
        {
            lock (lockObject)
            {
                if (instance == null)
                {
                    instance = new T();
                }
            }
        }
        return instance;
    }
}
}
```

```csharp
public abstract class ThreadSafeLazyBaseSingleton<T>
    where T : new()
{
    private static readonly Lazy<T> lazy = new Lazy<T>(() => new T());

    public static T Instance
    {
        get
        {
            return lazy.Value;
        }
    }
}
```

```csharp
public abstract class ThreadSafeNestedContructorsBaseSingleton<T>
{
    public static T Instance
    {
        get
        {
            return SingletonFactory.Instance;
        }
    }

    internal static class SingletonFactory
    {
        internal static T Instance;

        static SingletonFactory()
        {
            CreateInstance(typeof(T));
        }

        public static T CreateInstance(Type type)
        {
            ConstructorInfo[] ctorsPublic = type.GetConstructors(BindingFlags.Instance | BindingFlags.Public);

            if (ctorsPublic.Length > 0)
            {
                throw new Exception(string.Concat(type.FullName, " has one or more public constructors so the property cannot be enforced."));
            }


            ConstructorInfo nonPublicConstructor =
                type.GetConstructor(BindingFlags.Instance | BindingFlags.NonPublic, null, new Type[0], new ParameterModifier[0]);

            if (nonPublicConstructor == null)
            {
                throw new Exception(string.Concat(type.FullName, " does not have a private/protected constructor so the property cannot be enforced."));
            }

            try
            {
                return Instance = (T)nonPublicConstructor.Invoke(new object[0]);
            }
            catch (Exception e)
            {
                throw new Exception(
                    string.Concat("The Singleton could not be constructed. Check if ", type.FullName, " has a default constructor."), e);
            }
        }
    }
}
```

```csharp
public abstract class BasePageSingletonDerived<S, M> : thread-safeNestedContructorsBaseSingleton<S>
    where M : BasePageElementMap, new()
    where S : BasePageSingletonDerived<S, M>
{
    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public virtual void Navigate(string url = "")
    {
        Driver.Browser.Navigate().GoToUrl(string.Concat(url));
    }
}

public abstract class BasePageSingletonDerived<S, M, V> : BasePageSingletonDerived<S, M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
    where S : BasePageSingletonDerived<S, M, V>
{
    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class SearchEngineMainPage :
BasePageSingletonDerived<
    SearchEngineMainPage,
    SearchEngineMainPageElementMap,
    SearchEngineMainPageValidator>
{
    private SearchEngineMainPage() { }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }

    public override void Navigate(string url = "searchEngineUrl")
    {
        base.Navigate(url);
    }
}
```

```csharp
[TestClass]
public class AdvancedSearchEngineSingletonTests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void SearchTextInSearchEngine_Advanced_PageObjectPattern_NoSingleton()
    {
        // Usage without Singleton
        P.SearchEngineMainPage searchEngineMainPage = new P.SearchEngineMainPage();
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.Validate().ResultsCount(",000 RESULTS");
    }

    [TestMethod]
    public void SearchTextInSearchEngine_Advanced_PageObjectPattern_Singleton()
    {
        S.SearchEngineMainPage.Instance.Navigate();
        S.SearchEngineMainPage.Instance.Search("Automate The Planet");
        S.SearchEngineMainPage.Instance.Validate().ResultsCount(",000 RESULTS");
    }
}
```

## Facade Design Pattern in Automated Testing

```csharp
public class ShippingAddressPage : BasePage<ShippingAddressPageMap, ShippingAddressPageValidator>
{
    public void ClickContinueButton()
    {
        this.Map.ContinueButton.Click();
    }

    public void FillShippingInfo(ClientInfo clientInfo)
    {
        this.Map.SwitchToShippingFrame();
        this.Map.CountryDropDown.SelectByText(clientInfo.Country);
        this.Map.FirstName.SendKeys(clientInfo.FirstName);
        this.Map.LastName.SendKeys(clientInfo.LastName);
        this.Map.Address1.SendKeys(clientInfo.Address1);
        this.Map.City.SendKeys(clientInfo.City);
        this.Map.Zip.SendKeys(clientInfo.Zip);
        this.Map.Phone.SendKeys(clientInfo.Phone);
        this.Map.Email.SendKeys(clientInfo.Email);
        this.Map.SwitchToDefault();
    }
}
```

```csharp
public class ClientInfo
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Country { get; set; }
    public string Address1 { get; set; }
    public string City { get; set; }
    public string Phone { get; set; }
    public string Zip { get; set; }
    public string Email { get; set; }
}
```

```csharp
public class ShippingAddressPageMap : BasePageElementMap
{
    public SelectElement CountryDropDown
    {
        get
        {
            this.browserWait.Until<IWebElement>((d) => { return d.FindElement(By.Name("country")); });
            return new SelectElement(this.browser.FindElement(By.Name("country")));
        }
    }

    public IWebElement FirstName
    {
        get
        {
            return this.browser.FindElement(By.Id("firstName"));
        }
    }

    public IWebElement LastName
    {
        get
        {
            return this.browser.FindElement(By.Id("lastName"));
        }
    }

    public IWebElement Address1
    {
        get
        {
            return this.browser.FindElement(By.Id("address1"));
        }
    }

    public IWebElement City
    {
        get
        {
            return this.browser.FindElement(By.Id("city"));
        }
    }

    public IWebElement Zip
    {
        get
        {
            return this.browser.FindElement(By.Id("zip"));
        }
    }

    public IWebElement Phone
    {
        get
        {
            return this.browser.FindElement(By.Id("dayphone1"));
        }
    }

    public IWebElement Email
    {
        get
        {
            return this.browser.FindElement(By.Id("email"));
        }
    }

    public IWebElement Subtotal
    {
        get
        {
            return this.browser.FindElement(By.Id("xo_tot_amt"));
        }
    }

    public IWebElement ContinueButton
    {
        get
        {
            return this.browser.FindElement(By.Id("but_address_continue"));
        }
    }

    public void SwitchToShippingFrame()
    {
        this.WaitForLogo();
        this.browser.SwitchTo().Frame("shpFrame");
    }

    private void WaitForLogo()
    {
        this.browserWait.Until<IWebElement>((d) => { return d.FindElement(By.Id("gh-logo")); });
    }
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_Without_PurchaseFaceade_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_Casio_GShock()
    {
        string itemUrl = "watchItemUrl";
        string itemPrice = "AU $168.00";
        ClientInfo currentClientInfo = new ClientInfo()
        {
            FirstName = "Anton",
            LastName = "Angelov",
            Country = "Bulgaria",
            Address1 = "33 Alexander Malinov Blvd.",
            City = "Sofia",
            Zip = "1729",
            Phone = "0035964644885",
            Email = "aangelov@yahoo.com"
        };
        ItemPage itemPage = new ItemPage();
        CheckoutPage checkoutPage = new CheckoutPage();
        ShippingAddressPage shippingAddressPage = new ShippingAddressPage();
        SignInPage signInPage = new SignInPage();

        itemPage.Navigate(itemUrl);
        itemPage.Validate().Price(itemPrice);
        itemPage.ClickBuyNowButton();
        signInPage.ClickContinueAsGuestButton();
        shippingAddressPage.FillShippingInfo(currentClientInfo);
        shippingAddressPage.Validate().Subtotal(itemPrice);
        shippingAddressPage.ClickContinueButton();
        checkoutPage.Validate().Subtotal(itemPrice);
    }

    [TestMethod]
    public void Purchase_WhiteOpticalKeyboard()
    {
        string itemUrl = "watchItemUrl";
        string itemPrice = "C $20.86";
        ClientInfo currentClientInfo = new ClientInfo()
        {
            FirstName = "Anton",
            LastName = "Angelov",
            Country = "Bulgaria",
            Address1 = "33 Alexander Malinov Blvd.",
            City = "Stara Zagora",
            Zip = "6000",
            Phone = "0035964644885",
            Email = "aangelov@yahoo.com"
        };
        ItemPage itemPage = new ItemPage();
        CheckoutPage checkoutPage = new CheckoutPage();
        ShippingAddressPage shippingAddressPage = new ShippingAddressPage();
        SignInPage signInPage = new SignInPage();

        itemPage.Navigate(itemUrl);
        itemPage.Validate().Price(itemPrice);
        itemPage.ClickBuyNowButton();
        signInPage.ClickContinueAsGuestButton();
        shippingAddressPage.FillShippingInfo(currentClientInfo);
        shippingAddressPage.Validate().Subtotal(itemPrice);
        shippingAddressPage.ClickContinueButton();
        checkoutPage.Validate().Subtotal(itemPrice);
    }
}
```

```csharp
public class PurchaseFacade
{
    private ItemPage itemPage;
    private CheckoutPage checkoutPage;
    private ShippingAddressPage shippingAddressPage;
    private SignInPage signInPage;

    public ItemPage ItemPage
    {
        get
        {
            if (itemPage == null)
            {
                itemPage = new ItemPage();
            }
            return itemPage;
        }
    }

    public SignInPage SignInPage
    {
        get
        {
            if (signInPage == null)
            {
                signInPage = new SignInPage();
            }
            return signInPage;
        }
    }

    public CheckoutPage CheckoutPage
    {
        get
        {
            if (checkoutPage == null)
            {
                checkoutPage = new CheckoutPage();
            }
            return checkoutPage;
        }
    }

    public ShippingAddressPage ShippingAddressPage
    {
        get
        {
            if (shippingAddressPage == null)
            {
                shippingAddressPage = new ShippingAddressPage();
            }
            return shippingAddressPage;
        }
    }

    public void PurchaseItem(string item, string itemPrice, ClientInfo clientInfo)
    {
        this.ItemPage.Navigate(item);
        this.ItemPage.Validate().Price(itemPrice);
        this.ItemPage.ClickBuyNowButton();
        this.SignInPage.ClickContinueAsGuestButton();
        this.ShippingAddressPage.FillShippingInfo(clientInfo);
        this.ShippingAddressPage.Validate().Subtotal(itemPrice);
        this.ShippingAddressPage.ClickContinueButton();
        this.CheckoutPage.Validate().Subtotal(itemPrice);
    }
}
```

```csharp
[TestClass]
public class OnlineStorePurchase_PurchaseFaceade_Tests
{
    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void Purchase_Casio_GShock()
    {
        string itemUrl = "watchItemUrl";
        string itemPrice = "AU $168.00";
        ClientInfo currentClientInfo = new ClientInfo()
        {
            FirstName = "Anton",
            LastName = "Angelov",
            Country = "Bulgaria",
            Address1 = "33 Alexander Malinov Blvd.",
            City = "Sofia",
            Zip = "1729",
            Phone = "0035964644885",
            Email = "aangelov@yahoo.com"
        };
        new PurchaseFacade().PurchaseItem(itemUrl, itemPrice, currentClientInfo);
    }

    [TestMethod]
    public void Purchase_WhiteOpticalKeyboard()
    {
        string itemUrl = "watchItemUrl";
        string itemPrice = "C $20.86";
        ClientInfo currentClientInfo = new ClientInfo()
        {
            FirstName = "Anton",
            LastName = "Angelov",
            Country = "Bulgaria",
            Address1 = "33 Alexander Malinov Blvd.",
            City = "Stara Zagora",
            Zip = "6000",
            Phone = "0035964644885",
            Email = "aangelov@yahoo.com"
        };
        new PurchaseFacade().PurchaseItem(itemUrl, itemPrice, currentClientInfo);
    }
}
```

## Advanced Page Object Pattern in Automated Testing

```csharp
public static class Driver
{
    private static WebDriverWait browserWait;

    private static IWebDriver browser;

    public static IWebDriver Browser
    {
        get
        {
            if (browser == null)
            {
                throw new NullReferenceException("The WebDriver browser instance was not initialized. You should first call the method Start.");
            }
            return browser;
        }
        private set
        {
            browser = value;
        }
    }

    public static WebDriverWait BrowserWait
    {
        get
        {
            if (browserWait == null || browser == null)
            {
                throw new NullReferenceException("The WebDriver browser wait instance was not initialized. You should first call the method Start.");
            }
            return browserWait;
        }
        private set
        {
            browserWait = value;
        }
    }

    public static void StartBrowser(BrowserTypes browserType = BrowserTypes.Firefox, int defaultTimeOut = 30)
    {
        switch (browserType)
        {
            case BrowserTypes.Firefox:
                Driver.Browser = new FirefoxDriver();

                break;
            case BrowserTypes.InternetExplorer:
                break;
            case BrowserTypes.Chrome:
                break;
            default:
                break;
        }
        BrowserWait = new WebDriverWait(Driver.Browser, TimeSpan.FromSeconds(defaultTimeOut));
    }

    public static void StopBrowser()
    {
        Browser.Quit();
        Browser = null;
        BrowserWait = null;
    }
}
```

```csharp
public class SearchEngineMainPageElementMap
{
    private readonly IWebDriver browser;

    public SearchEngineMainPageElementMap(IWebDriver browser)
    {
        this.browser = browser;
    }

    public IWebElement SearchBox
    {
        get
        {
            return this.browser.FindElement(By.Id("sb_form_q"));
        }
    }
}
```

```csharp
public class BasePageElementMap
{
    protected IWebDriver browser;

    public BasePageElementMap()
    {
        this.browser = Driver.Browser;
    }
}
```

```csharp
public class SearchEngineMainPageElementMap : BasePageElementMap
{
    public IWebElement SearchBox
    {
        get
        {
            return this.browser.FindElement(By.Id("sb_form_q"));
        }
    }
}
```

```csharp
public class SearchEngineMainPageValidator
{
    private readonly IWebDriver browser;

    public SearchEngineMainPageValidator(IWebDriver browser)
    {
        this.browser = browser;
    }

    protected SearchEngineMainPageElementMap Map
    {
        get
        {
            return new SearchEngineMainPageElementMap(this.browser);
        }
    }

    public void ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver browser;
    private readonly string url = @"searchEngineUrl";

    public SearchEngineMainPage(IWebDriver browser)
    {
        this.browser = browser;
    }

    protected SearchEngineMainPageElementMap Map
    {
        get
        {
            return new SearchEngineMainPageElementMap(this.browser);
        }
    }

    public SearchEngineMainPageValidator Validate()
    {
        return new SearchEngineMainPageValidator(this.browser);
    }

    public void Navigate()
    {
        this.browser.Navigate().GoToUrl(this.url);
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }
}
```

```csharp
public class BasePage<M>
       where M : BasePageElementMap, new()
{
    protected readonly string url;

    public BasePage(string url)
    {
        this.url = url;
    }

    protected M Map
    {
        get
        {
            return new M();
        }
    }

    public void Navigate()
    {
        Driver.Browser.Navigate().GoToUrl(this.url);
    }
}

public class BasePage<M, V> : BasePage<M>
    where M : BasePageElementMap, new()
    where V : BasePageValidator<M>, new()
{
    public BasePage(string url)
        : base(url)
    {
    }

    public V Validate()
    {
        return new V();
    }
}
```

```csharp
public class SearchEngineMainPage :
    BasePage<SearchEngineMainPageElementMap, SearchEngineMainPageValidator>
{
    public SearchEngineMainPage()
        : base(@"searchEngineUrl")
    {
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }
}
```

```csharp
[TestClass]
public class AdvancedSearchEngineTests
{

    [TestInitialize]
    public void SetupTest()
    {
        Driver.StartBrowser();
    }

    [TestCleanup]
    public void TeardownTest()
    {
        Driver.StopBrowser();
    }

    [TestMethod]
    public void SearchTextInSearchEngine_Advanced_PageObjectPattern()
    {
        SearchEngineMainPage searchEngineMainPage = new SearchEngineMainPage();
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.Validate().ResultsCount(",000 RESULTS");
    }
}
```

## Page Object Pattern in Automated Testing

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"searchEngineUrl";

    public SearchEngineMainPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }

    [FindsBy(How = How.Id, Using = "sb_form_q")]
    public IWebElement SearchBox { get; set; }

    [FindsBy(How = How.Id, Using = "sb_form_go")]
    public IWebElement GoButton { get; set; }

    [FindsBy(How = How.Id, Using = "b_tween")]
    public IWebElement ResultsCountDiv { get; set; }

    public void Navigate()
    {
        this.driver.Navigate().GoToUrl(this.url);
    }

    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }

    public void ValidateResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
[FindsBy(How = How.Id, Using = "sb_form_q")]
public IWebElement SearchBox { get; set; }
```

```csharp
public SearchEngineMainPage(IWebDriver browser)
{
    this.driver = browser;
    PageFactory.InitElements(browser, this);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    public IWebDriver Driver { get; set; }
    public WebDriverWait Wait { get; set; }

    [TestInitialize]
    public void SetupTest()
    {
        this.Driver = new FirefoxDriver();
        this.Wait = new WebDriverWait(this.Driver, TimeSpan.FromSeconds(30));
    }

    [TestCleanup]
    public void TeardownTest()
    {
        this.Driver.Quit();
    }

    [TestMethod]
    public void SearchTextInSearchEngine_First()
    {
        SearchEngineMainPage searchEngineMainPage = new SearchEngineMainPage(this.Driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.ValidateResultsCount("264,000 RESULTS");
    }
}
```

```csharp
public class SearchEngineMainPageElementMap
{
    private readonly IWebDriver browser;

    public SearchEngineMainPageElementMap(IWebDriver browser)
    {
        this.browser = browser;
    }

    public IWebElement SearchBox
    {
        get
        {
            return this.browser.FindElement(By.Id("sb_form_q"));
        }
    }

    public IWebElement GoButton
    {
        get
        {
            return this.browser.FindElement(By.Id("sb_form_go"));
        }
    }

    public IWebElement ResultsCountDiv
    {
        get
        {
            return this.browser.FindElement(By.Id("b_tween"));
        }
    }
}
```

```csharp
public class SearchEngineMainPageValidator
{
    private readonly IWebDriver browser;

    public SearchEngineMainPageValidator(IWebDriver browser)
    {
        this.browser = browser;
    }

    protected SearchEngineMainPageElementMap Map
    {
        get
        {
            return new SearchEngineMainPageElementMap(this.browser);
        }
    }

    public void ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver browser;
    private readonly string url = @"searchEngineUrl";

    public SearchEngineMainPage(IWebDriver browser)
    {
        this.browser = browser;
    }

    protected SearchEngineMainPageElementMap Map
    {
        get
        {
            return new SearchEngineMainPageElementMap(this.browser);
        }
    }

    public SearchEngineMainPageValidator Validate()
    {
        return new SearchEngineMainPageValidator(this.browser);
    }

    public void Navigate()
    {
        this.browser.Navigate().GoToUrl(this.url);
    }

    public void Search(string textToType)
    {
        this.Map.SearchBox.Clear();
        this.Map.SearchBox.SendKeys(textToType);
        this.Map.GoButton.Click();
    }
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    public IWebDriver Driver { get; set; }
    public WebDriverWait Wait { get; set; }

    [TestInitialize]
    public void SetupTest()
    {
        this.Driver = new FirefoxDriver();
        this.Wait = new WebDriverWait(this.Driver, TimeSpan.FromSeconds(30));
    }

    [TestCleanup]
    public void TeardownTest()
    {
        this.Driver.Quit();
    }

    [TestMethod]
    public void SearchTextInSearchEngine_Second()
    {
        POP.SearchEngineMainPage searchEngineMainPage = new POP.SearchEngineMainPage(this.Driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.Validate().ResultsCount("264,000 RESULTS");
    }
}
```

# Enterprise Test Framework

## Enterprise Test Automation Framework: Plugin Architecture in MSTest

```csharp
public class TestWorkflowPlugin
{
    public void Subscribe(ITestWorkflowPluginProvider provider)
    {
        provider.PreTestInitEvent += PreTestInit;
        provider.TestInitFailedEvent += TestInitFailed;
        provider.PostTestInitEvent += PostTestInit;
        provider.PreTestCleanupEvent += PreTestCleanup;
        provider.PostTestCleanupEvent += PostTestCleanup;
        provider.TestCleanupFailedEvent += TestCleanupFailed;
        provider.PreTestsArrangeEvent += PreTestsArrange;
        provider.TestsArrangeFailedEvent += TestsArrangeFailed;
        provider.PreTestsActEvent += PreTestsAct;
        provider.PostTestsActEvent += PostTestsAct;
        provider.PostTestsArrangeEvent += PostTestsArrange;
        provider.PreTestsCleanupEvent += PreTestsCleanup;
        provider.PostTestsCleanupEvent += PostTestsCleanup;
        provider.TestsCleanupFailedEvent += TestsCleanupFailed;
    }

    public void Unsubscribe(ITestWorkflowPluginProvider provider)
    {
        provider.PreTestInitEvent -= PreTestInit;
        provider.TestInitFailedEvent -= TestInitFailed;
        provider.PostTestInitEvent -= PostTestInit;
        provider.PreTestCleanupEvent -= PreTestCleanup;
        provider.PostTestCleanupEvent -= PostTestCleanup;
        provider.TestCleanupFailedEvent -= TestCleanupFailed;
        provider.PreTestsArrangeEvent -= PreTestsArrange;
        provider.TestsArrangeFailedEvent -= TestsArrangeFailed;
        provider.PreTestsActEvent -= PreTestsAct;
        provider.PostTestsActEvent -= PostTestsAct;
        provider.PostTestsArrangeEvent -= PostTestsArrange;
        provider.PreTestsCleanupEvent -= PreTestsCleanup;
        provider.PostTestsCleanupEvent -= PostTestsCleanup;
        provider.TestsCleanupFailedEvent -= TestsCleanupFailed;
    }

    protected virtual void TestsCleanupFailed(object sender, Exception ex) { }

    protected virtual void PreTestsCleanup(object sender,
                                TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestsCleanup(object sender,
                                TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PreTestInit(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void TestInitFailed(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestInit(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PreTestCleanup(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestCleanup(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void TestCleanupFailed(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void TestsArrangeFailed(object sender, Exception e) { }
    protected virtual void PreTestsAct(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PreTestsArrange(object sender
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestsAct(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }
    protected virtual void PostTestsArrange(object sender,
                                    TestWorkflowPluginEventArgs e)
    { }

    protected List<dynamic> GetAllAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var classAttributes = GetClassAttributes<TAttribute>(memberInfo.DeclaringType);
        var methodAttributes = GetMethodAttributes<TAttribute>(memberInfo);
        var attributes = classAttributes.ToList();
        attributes.AddRange(methodAttributes);
        return attributes;
    }

    protected TAttribute GetOverridenAttribute<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var classAttribute = GetClassAttribute<TAttribute>(memberInfo.DeclaringType);
        var methodAttribute = GetMethodAttribute<TAttribute>(memberInfo);
        if (methodAttribute != null)
        {
            return methodAttribute;
        }
        return classAttribute;
    }

    protected dynamic GetClassAttribute<TAttribute>(Type currentType)
        where TAttribute : Attribute
    {
        var classAttribute = currentType.GetCustomAttribute<TAttribute>(true);
        return classAttribute;
    }

    protected dynamic GetMethodAttribute<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var methodAttribute = memberInfo?.GetCustomAttribute<TAttribute>(true);
        return methodAttribute;
    }

    protected IEnumerable<dynamic> GetClassAttributes<TAttribute>(Type currentType)
        where TAttribute : Attribute
    {
        var classAttributes = currentType.GetCustomAttributes<TAttribute>(true);
        return classAttributes;
    }

    protected IEnumerable<dynamic> GetMethodAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var methodAttributes = memberInfo?.GetCustomAttributes<TAttribute>(true);
        return methodAttributes;
    }
}
```

```csharp
[TestClass]
public class MSTestBaseTest
{
    public IServicesCollection Container;
    protected MSTestExecutionContext ExecutionContext;
    private static readonly List<string> TypeForAlreadyExecutedClassInits =
            new List<string>();
    private TestWorkflowPluginProvider _currentTestExecutionProvider;
    public TestContext TestContext { get; set; }
    [TestInitialize]
    public void CoreTestInit()
    {
        ExecutionContext = new MSTestExecutionContext(TestContext);
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(&(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
        ExecuteActArrangePhases();
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(ExecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        try
        {
            Initialize();
            _currentTestExecutionProvider.PreTestInit(
            ExecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            TestInit();
            _currentTestExecutionProvider.PostTestInit(
            ExecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestInitFailed(ex,
            ExecutionContext.TestName,testMethodMemberInfo,
            testClassType, categories, authors, descriptions);
            throw;
        }
    }
    [TestCleanup]
    public void CoreTestCleanup()
    {
        if (ExecutionContext == null)
        {
            ExecutionContext = new MSTestExecutionContext(TestContext);
        }
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(ExecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        try
        {
            _currentTestExecutionProvider.PreTestCleanup(
            (TestOutcome) ExecutionContext.TestOutcome,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            ExecutionContext.ExceptionMessage,
            ExecutionContext.ExceptionStackTrace, ExecutionContext.Exception);
            TestCleanup();
            _currentTestExecutionProvider.PostTestCleanup(
            (TestOutcome) ExecutionContext.TestOutcome,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            ExecutionContext.ExceptionMessage,
            ExecutionContext.ExceptionStackTrace, ExecutionContext.Exception);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestCleanupFailed(ex,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            throw;
        }
    }
    public virtual void Initialize() { }
    public virtual void TestsArrange() { }
    public virtual void TestsAct() { }
    public virtual void TestInit() { }
    public virtual void TestCleanup() { }
    public virtual void TestsCleanup() { }
    protected static bool IsDebugRun()
    {
#if DEBUG
        var isDebug = true;
#else
        bool isDebug = false;
#endif
        return isDebug;
    }
    private List<string> GetAllTestCategories(MemberInfo memberInfo)
    {
        var categories = new List<string>();
        var testCategoryAttributes = GetAllAttributes<TestCategoryAttribute>(memberInfo);
        foreach (var testCategoryAttribute in testCategoryAttributes)
        {
            categories.AddRange(testCategoryAttribute.TestCategories);
        }
        return categories;
    }
    private List<string> GetAllAuthors(MemberInfo memberInfo)
    {
        var authors = new List<string>();
        var ownerAttributes = GetAllAttributes<OwnerAttribute>(memberInfo);
        foreach (var ownerAttribute in ownerAttributes)
        {
            authors.Add(ownerAttribute.Owner);
        }
        return authors;
    }
    private List<string> GetAllDescriptions(MemberInfo memberInfo)
    {
        var descriptions = new List<string>();
        var descriptionAttributes = GetAllAttributes<DescriptionAttribute>(memberInfo);
        foreach (var descriptionAttribute in descriptionAttributes)
        {
            descriptions.Add(descriptionAttribute.Description);
        }
        return descriptions;
    }
    private void InitializeTestExecutionBehaviorObservers(TestWorkflowPluginProvider testExecutionProvider)
    {
        var observers = ServicesCollection.Current.ResolveAll<TestWorkflowPlugin>();
        foreach (var observer in observers)
        {
            observer.Subscribe(testExecutionProvider);
        }
    }
    private void ExecuteActArrangePhases()
    {
        try
        {
            var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
            if (!TypeForAlreadyExecutedClassInits.Contains(ExecutionContext.TestClassName))
            {
                Container = ServicesCollection.Current
                            .CreateChildServicesCollection(testClassType.FullName);
                Container.RegisterInstance(Container);
                Container.RegisterInstance<ExecutionContext>(ExecutionContext);
                _currentTestExecutionProvider = new TestWorkflowPluginProvider();
                InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
                TypeForAlreadyExecutedClassInits.Add(ExecutionContext.TestClassName);
                _currentTestExecutionProvider.PreTestsArrange(testClassType);
                Initialize();
                TestsArrange();
                _currentTestExecutionProvider.PostTestsArrange(testClassType);
                _currentTestExecutionProvider.PreTestsAct(testClassType);
                TestsAct();
                _currentTestExecutionProvider.PostTestsAct(testClassType);
            }
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestsArrangeFailed(ex);
        }
    }
    private MethodInfo GetCurrentExecutionMethodInfo(MSTestExecutionContext executionContext)
    {
        var memberInfo = GetCurrentExecutionTestClassType(executionContext)
                            .GetMethod(executionContext.TestName);
        return memberInfo;
    }
    private Type GetCurrentExecutionTestClassType(MSTestExecutionContext executionContext)
    {
        var testClassType = GetType().Assembly.GetType(executionContext.TestClassName);
        return testClassType;
    }
    private List<TAttribute> GetAllAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var allureClassAttributes = GetClassAttributes<TAttribute>(memberInfo.DeclaringType);
        var allureMethodAttributes = GetMethodAttributes<TAttribute>(memberInfo);
        var allAllureAttributes = allureClassAttributes.ToList();
        allAllureAttributes.AddRange(allureMethodAttributes);
        return allAllureAttributes;
    }
    private IEnumerable<TAttribute> GetClassAttributes<TAttribute>(Type currentType)
        where TAttribute : Attribute
    {
        var classAttributes = currentType.GetCustomAttributes<TAttribute>(true);
        return classAttributes;
    }
    private IEnumerable<TAttribute> GetMethodAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var methodAttributes = memberInfo.GetCustomAttributes<TAttribute>(true);
        return methodAttributes;
    }
}
```

```csharp
[TestClass]
public class MSTestBaseTest
{
    public IServicesCollection Container;
    protected MSTestExecutionContext ExecutionContext;
    private static readonly List<string> TypeForAlreadyExecutedClassInits =
            new List<string>();
    private TestWorkflowPluginProvider _currentTestExecutionProvider;
    public TestContext TestContext { get; set; }
    [TestInitialize]
    public void CoreTestInit()
    {
        ExecutionContext = new MSTestExecutionContext(TestContext);
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
        ExecuteActArrangePhases();
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(ExecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        try
        {
            Initialize();
            _currentTestExecutionProvider.PreTestInit(
            ExecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            TestInit();
            _currentTestExecutionProvider.PostTestInit(
            ExecutionContext.TestName,testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestInitFailed(ex,
            ExecutionContext.TestName,testMethodMemberInfo,
            testClassType, categories, authors, descriptions);
            throw;
        }
    }
    [TestCleanup]
    public void CoreTestCleanup()
    {
        if (ExecutionContext == null)
        {
            ExecutionContext = new MSTestExecutionContext(TestContext);
        }
        var testMethodMemberInfo = GetCurrentExecutionMethodInfo(ExecutionContext);
        var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
        var categories = GetAllTestCategories(testMethodMemberInfo);
        var authors = GetAllAuthors(testMethodMemberInfo);
        var descriptions = GetAllDescriptions(testMethodMemberInfo);
        Container = ServicesCollection.Current.FindCollection(testClassType.FullName);
        Container.RegisterInstance<ExecutionContext>(ExecutionContext);
        _currentTestExecutionProvider = new TestWorkflowPluginProvider();
        InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
        try
        {
            _currentTestExecutionProvider.PreTestCleanup(
            (TestOutcome) ExecutionContext.TestOutcome,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            ExecutionContext.ExceptionMessage,
            ExecutionContext.ExceptionStackTrace, ExecutionContext.Exception);
            TestCleanup();
            _currentTestExecutionProvider.PostTestCleanup(
            (TestOutcome) ExecutionContext.TestOutcome,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions,
            ExecutionContext.ExceptionMessage,
            ExecutionContext.ExceptionStackTrace, ExecutionContext.Exception);
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestCleanupFailed(ex,
            ExecutionContext.TestName, testMethodMemberInfo, testClassType,
            categories, authors, descriptions);
            throw;
        }
    }
    public virtual void Initialize() { }
    public virtual void TestsArrange() { }
    public virtual void TestsAct() { }
    public virtual void TestInit() { }
    public virtual void TestCleanup() { }
    public virtual void TestsCleanup() { }
    protected static bool IsDebugRun()
    {
#if DEBUG
        var isDebug = true;
#else
        bool isDebug = false;
#endif
        return isDebug;
    }
    private List<string> GetAllTestCategories(MemberInfo memberInfo)
    {
        var categories = new List<string>();
        var testCategoryAttributes = GetAllAttributes<TestCategoryAttribute>(memberInfo);
        foreach (var testCategoryAttribute in testCategoryAttributes)
        {
            categories.AddRange(testCategoryAttribute.TestCategories);
        }
        return categories;
    }
    private List<string> GetAllAuthors(MemberInfo memberInfo)
    {
        var authors = new List<string>();
        var ownerAttributes = GetAllAttributes<OwnerAttribute>(memberInfo);
        foreach (var ownerAttribute in ownerAttributes)
        {
            authors.Add(ownerAttribute.Owner);
        }
        return authors;
    }
    private List<string> GetAllDescriptions(MemberInfo memberInfo)
    {
        var descriptions = new List<string>();
        var descriptionAttributes = GetAllAttributes<DescriptionAttribute>(memberInfo);
        foreach (var descriptionAttribute in descriptionAttributes)
        {
            descriptions.Add(descriptionAttribute.Description);
        }
        return descriptions;
    }
    private void InitializeTestExecutionBehaviorObservers(TestWorkflowPluginProvider testExecutionProvider)
    {
        var observers = ServicesCollection.Current.ResolveAll<TestWorkflowPlugin>();
        foreach (var observer in observers)
        {
            observer.Subscribe(testExecutionProvider);
        }
    }
    private void ExecuteActArrangePhases()
    {
        try
        {
            var testClassType = GetCurrentExecutionTestClassType(ExecutionContext);
            if (!TypeForAlreadyExecutedClassInits.Contains(ExecutionContext.TestClassName))
            {
                Container = ServicesCollection.Current
                            .CreateChildServicesCollection(testClassType.FullName);
                Container.RegisterInstance(Container);
                Container.RegisterInstance<ExecutionContext>(ExecutionContext);
                _currentTestExecutionProvider = new TestWorkflowPluginProvider();
                InitializeTestExecutionBehaviorObservers(_currentTestExecutionProvider);
                TypeForAlreadyExecutedClassInits.Add(ExecutionContext.TestClassName);
                _currentTestExecutionProvider.PreTestsArrange(testClassType);
                Initialize();
                TestsArrange();
                _currentTestExecutionProvider.PostTestsArrange(testClassType);
                _currentTestExecutionProvider.PreTestsAct(testClassType);
                TestsAct();
                _currentTestExecutionProvider.PostTestsAct(testClassType);
            }
        }
        catch (Exception ex)
        {
            _currentTestExecutionProvider.TestsArrangeFailed(ex);
        }
    }
    private MethodInfo GetCurrentExecutionMethodInfo(MSTestExecutionContext executionContext)
    {
        var memberInfo = GetCurrentExecutionTestClassType(executionContext)
                            .GetMethod(executionContext.TestName);
        return memberInfo;
    }
    private Type GetCurrentExecutionTestClassType(MSTestExecutionContext executionContext)
    {
        var testClassType = GetType().Assembly.GetType(executionContext.TestClassName);
        return testClassType;
    }
    private List<TAttribute> GetAllAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var allureClassAttributes = GetClassAttributes<TAttribute>(memberInfo.DeclaringType);
        var allureMethodAttributes = GetMethodAttributes<TAttribute>(memberInfo);
        var allAllureAttributes = allureClassAttributes.ToList();
        allAllureAttributes.AddRange(allureMethodAttributes);
        return allAllureAttributes;
    }
    private IEnumerable<TAttribute> GetClassAttributes<TAttribute>(Type currentType)
        where TAttribute : Attribute
    {
        var classAttributes = currentType.GetCustomAttributes<TAttribute>(true);
        return classAttributes;
    }
    private IEnumerable<TAttribute> GetMethodAttributes<TAttribute>(MemberInfo memberInfo)
        where TAttribute : Attribute
    {
        var methodAttributes = memberInfo.GetCustomAttributes<TAttribute>(true);
        return methodAttributes;
    }
}
```

## Enterprise Test Automation Framework: Configuration Module Design

```json
{
  "timeoutSettings": {
    "waitForAjaxTimeout": 60,
    "sleepInterval": 1,
    "elementToBeVisibleTimeout": 60,
    "elementToExistTimeout": 60,
    "elementToNotExistTimeout": 60,
    "elementToBeClickableTimeout": 60,
    "elementNotToBeVisibleTimeout": 60,
    "elementToHaveContentTimeout": 15
  },
  "videoRecordingSettings": {
    "isEnabled": true,
    "waitAfterFinishRecordingMilliseconds": 500,
    "filePath": "ApplicationDataTroubleshootingVideos"
  },
  "screenshotsSettings": {
    "isEnabled": true,
    "filePath": "ApplicationDataTroubleshootingScreenshots"
  },
  "logging": {
    "isEnabled": true,
    "isConsoleLoggingEnabled": true,
    "isDebugLoggingEnabled": true,
    "isEventLoggingEnabled": false,
    "isFileLoggingEnabled": true,
    "outputTemplate": "[{Timestamp:HH:mm:ss}] {Message:lj}{NewLine}",
    "addUrlToBddLogging": true
  }
}
```

```csharp
bool shouldTakeVideos = ConfigurationService.Instance.GetVideoSettings().IsEnabled;
```

```xml
<ItemGroup>
    <None Update="testFrameworkSettings.$(Configuration).json">
    <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
<ItemGroup>
```

```csharp
public sealed class ConfigurationService
{
    private static ConfigurationService _instance;

    public ConfigurationService()
    {
        Root = InitializeConfiguration();
    }

    public static ConfigurationService Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new ConfigurationService();
            }

            return _instance;
        };
    }

    public IConfigurationRoot Root { get; }

    private IConfigurationRoot InitializeConfiguration()
    {
        var builder = new ConfigurationBuilder();
        if (string.IsNullOrEmpty(ExecutionContext.SettingsFileContent))
        {
            var executionDir = ExecutionDirectoryResolver.GetDriverExecutablePath();
            var filesInExecutionDir = Directory.GetFiles(executionDir);
            var settingsFile =
                filesInExecutionDir.FirstOrDefault(x => x.Contains("testFrameworkSettings") && x.EndsWith(".json"));
            if (settingsFile != null)
            {
                builder.AddJsonFile(settingsFile, optional: true, reloadOnChange: true);
            }
        }

        else
        {
            builder.AddJsonStream(new MemoryStream(System.Text.Encoding.UTF8.GetBytes(ExecutionContext.SettingsFileContent)));
        }
        builder.AddEnvironmentVariables();
        return builder.Build();
    }
}
```

```csharp
public static class ConfigurationExtensions
{
    public static string NormalizeAppPath(this string appPath)
    {
        if (string.IsNullOrEmpty(appPath))
        {
            return appPath;
        }
        else if (appPath.StartsWith("AssemblyFolder", StringComparison.Ordinal))
        {
            var executionFolder = ExecutionDirectoryResolver.GetDriverExecutablePath();
            appPath = appPath.Replace("AssemblyFolder", executionFolder);
        }

        return appPath;
    }
}
```

```csharp
public class VideoRecordingSettings
{
    public int WaitAfterFinishRecordingMilliseconds { get; set; } = 500;
    public string FilePath { get; set; }
    public bool IsEnabled { get; set; }
}
```

```csharp
namespace Bellatrix
{
    public static class ConfigurationServiceExtensions
    {
        public static VideoRecordingSettings GetVideoSettings(this ConfigurationService service)
                => ConfigurationService.Instance
                                        .Root
                                        .GetSection("videoRecordingSettings")
                                        .Get<VideoRecordingSettings>();
    }
}
```

```csharp
bool shouldTakeVideos = ConfigurationService.Instance.GetVideoSettings().IsEnabled;
```

## Enterprise Test Automation Framework: Inversion of Control Containers

```csharp
public interface ILogger
{
    void CreateLogEntry(string errorMessage);
}
```

```csharp
public class FileLogger : ILogger
{
    public void CreateLogEntry(string errorMessage)
    {
        File.WriteAllText(@"C:exceptions.txt", errorMessage);
    }
}

public class EmailLogger : ILogger
{
    public void CreateLogEntry(string errorMessage)
    {
        EmailFactory.SendEmail(errorMessage);
    }
}

public class SmsLogger : ILogger
{
    public void CreateLogEntry(string errorMessage)
    }
SmsFactory.SendSms(errorMessage);
    }
}
```

```csharp
public class CustomerOrder
{
    public void Create(OrderType orderType)
    {
        try
        {

            // Database code goes here
        }
        catch (Exception ex)
        {
            switch (orderType)
            {
                case OrderType.Platinum:
                    new SmsLogger().CreateLogEntry(ex.Message);
                    break;
                case OrderType.Gold:
                    new EmailLogger().CreateLogEntry(ex.Message);
                    break;
                default:
                    new FileLogger().CreateLogEntry(ex.Message);
                    break;
            }
        }
    }
}
```

```csharp
public class CustomerOrder
{
    private ILogger _logger;
    public CustomerOrder(ILogger logger)
    {
        _logger = logger;
    }

    public void Create()
    {
        try
        {
            // Database code goes here
        }
        catch (Exception ex)
        {
            _logger.CreateLogEntry(ex.Message);
        }
    }
}

public class GoldCustomerOrder : CustomerOrder
{
    public GoldCustomerOrder() : base(new EmailLogger()) { }
}

public class PlatinumCustomerOrder : CustomerOrder
{
    public PlatinumCustomerOrder() : base(new SmsLogger()) { }
}
```

```csharp
public interface IServicesResolvingCollection
{
    T Resolve<T>(bool shouldThrowResolveException = false);
    T Resolve<T>(string name, bool shouldThrowResolveException = false);
    object Resolve(Type type, bool shouldThrowResolveException = false);
    T Resolve<T>(bool shouldThrowResolveException = false,
        params OverrideParameter[] overrides);
    IEnumerable<T> ResolveAll<T>(bool shouldThrowResolveException = false);
    IEnumerable<T> ResolveAll<T>(bool shouldThrowResolveException = false,
        params OverrideParameter[] overrides);
}
```

```csharp
public interface IServicesRegisteringCollection
{
    bool IsRegistered<TInstance>();
    void RegisterType<TFrom>();
    void RegisterSingleInstance<TFrom, TTo>(InjectionConstructor injectionConstructor)
                                where TTo : TFrom;
    void RegisterSingleInstance<TFrom>(Type instanceType, InjectionConstructor injectionConstructor);
    void UnregisterSingleInstance<TFrom>();
    void UnregisterSingleInstance<TFrom>(string name);
    void RegisterType<TFrom, TTo>(string name, InjectionConstructor injectionConstructor)
                     where TTo : TFrom;
    void RegisterNull<TFrom>();
    void RegisterType<TFrom>(bool shouldUseSingleton);
    void RegisterType<TFrom, TTo>()
                    where TTo : TFrom;
    void RegisterType<TFrom, TTo>(string name)
                    where TTo : TFrom;
    void RegisterType<TFrom, TTo>(bool shouldUseSingleton)
                    where TTo : TFrom;
    void RegisterInstance<TFrom>(TFrom instance, bool shouldUseSingleton = false);
    void RegisterInstance<TFrom>(TFrom instance, string name);
    object CreateInjectionParameter<TInstance>();
    object CreateValueParameter(object value);
}
```

```csharp
public interface IServicesCollection : IServicesRegisteringCollection,
                 IServicesResolvingCollection, IDisposable
{
    List<IServicesCollection> GetChildServicesCollections();
    IServicesCollection CreateChildServicesCollection(string collectionName);
    IServicesCollection FindCollection(string collectionName);
    bool IsPresentServicesCollection(string collectionName);
}
```

```csharp
public class UnityServicesCollection : IServicesCollection
{
    private readonly IUnityContainer _container;
    private readonly Dictionary<string, IServicesCollection> _containers;
    private readonly object _lockObject = new object();
    private bool _isDisposed;

    public UnityServicesCollection()
    {
        _containers = new Dictionary<string, IServicesCollection>();
    }

    public UnityServicesCollection(IUnityContainer container)
    {
        _container = container;
        _containers = new Dictionary<string, IServicesCollection>();
    }

    public T Resolve<T>(bool shouldThrowResolveException = false)
    {
        T result = default;
        try
        {
            lock (_lockObject)
            {
                result = _container.Resolve<T>();
            }
        }
        catch (Exception ex)
        {
            if (shouldThrowResolveException)
            {
                throw;
            }
        }

        return result;
    }

    public IEnumerable<T> ResolveAll<T>(bool shouldThrowResolveException = false)
    {
        IEnumerable<T> result;
        try
        {
            lock (_lockObject)
            {
                result = _container.ResolveAll<T>();
            }
        }
        catch (Exception ex)
        {
            if (ex.InnerException != null && shouldThrowResolveException)
            {
                throw ex.InnerException;
            }

            throw;
        }

        return result;
    }

    public void RegisterType<TFrom, TTo>()
                            where TTo : TFrom
    {
        lock (_lockObject)
        {
            _container.RegisterType<TFrom, TTo>();
        }
    }

    public void RegisterType<TFrom, TTo>(bool useSingleInstance)
                             where TTo : TFrom
    {
        lock (_lockObject)
        {
            _container.RegisterType<TFrom, TTo>(
                new ContainerControlledLifetimeManager()
            );
        }
    }

    public void RegisterInstance<TFrom>(TFrom instance, bool useSingleInstance = false)
    {
        if (useSingleInstance)
        {
            lock (_lockObject)
            {
                _container.RegisterInstance(instance,
                new ContainerControlledLifetimeManager()
                );
            }
        }
        else
        {
            lock (_lockObject)
            {
                _container.RegisterInstance(instance);
            }
        }
    }

    public IServicesCollection CreateChildServicesCollection(string collectionName)
    {
        lock (_lockObject)
        {
            var childNativeContainer = _container.CreateChildContainer();
            var childServicesCollection =
                    new UnityServicesCollection(childNativeContainer);
            if (_containers.ContainsKey(collectionName))
            {
                _containers[collectionName] = childServicesCollection;
            }
            else
            {
                _containers.Add(collectionName, childServicesCollection);
            }

            return childServicesCollection;
        }
    }

    public void Dispose()
    {
        if (!_isDisposed)
        {
            _container.Dispose();
            GC.SuppressFinalize(this);
            _isDisposed = true;
        }
    }

    public IServicesCollection FindCollection(string collectionName)
    {
        lock (_lockObject)
        {
            if (_containers.ContainsKey(collectionName))
            {
                return _containers[collectionName];
            }

            return this;
        }
    }

    public bool IsPresentServicesCollection(string collectionName)
    {
        lock (_lockObject)
        {
            if (_containers.ContainsKey(collectionName))
            {
                return true;
            }

            return false;
        }
    }

    // the rest of the methods
}
```

```csharp
public sealed class ServicesCollection
{
    private static IServicesCollection _serviceProvider;

    public static IServicesCollection Main
    {
        get
        {
            if (_serviceProvider == null)
            {
                var unityContainer = new UnityContainer();
                _serviceProvider = new
                    UnityServicesCollection(unityContainer);
                _serviceProvider.RegisterInstance(unityContainer);
            }

            return _serviceProvider;
        }
    }
}

```

```csharp
public static void Dispose(IServicesCollection childContainer)
{
    var webDriver = childContainer.
        Resolve<WindowsDriver<WindowsElement>>();
    webDriver?.Quit();
    webDriver?.Dispose();
    childContainer
        .UnregisterSingleInstance<WindowsDriver<WindowsElement>>();
    webDriver = ServicesCollection.Main
        .Resolve<WindowsDriver<WindowsElement>>();
    webDriver?.Quit();
    webDriver?.Dispose();
    ServicesCollection.Main
        .UnregisterSingleInstance<WindowsDriver<WindowsElement>>();
}
```

# Testing practices

## Be More Efficient with AutoHotkey Scripts

```bash
^!d::
Send  https://automatetheplanet.com/
RETURN
```

````csharp

^!c::
Send  4111111111111111{ TAB}
123{ TAB}
{ TAB}```csharp

````

{ DOWN}
{ DOWN}
{ DOWN}
{ TAB}
{ DOWN}
{ DOWN}
{ DOWN}
{ TAB}
{ Enter}

````

```csharp
^!-::
Send----------------------------------------------
RETURN
````

```csharp
^SPACE::Winset, Alwaysontop, , A

```

```csharp
^!1::Send USE yourDB;
{ Enter}
{ Enter}

```

```csharp
!2::Send SELECT * { Enter}
FROM dbo.YourTable WITH(NOLOCK) { Enter}
WHERE YourTableId =

```

```csharp
^!v::
Send  MY - COUPON - DISCOUNT{ Enter}
return
```

```csharp
^!e::
FormatTime, TimeString,, dd-MMM-yyyy-HH-mm-ss
clipboard=anton-%TimeString%@angelov.com
Send %clipboard%
return
```

```csharp
^!t::
FormatTime, TimeString,, dd-MMM-yyyy HH:mm: ss
clipboard =% TimeString %
Send % clipboard %
return
```

```csharp
!UP::
SoundSet + 10
return
```

```csharp
!DOWN::
SoundSet - 10
return
```

# Automation Tools

## Software Management Automation in Automated Testing

```xml
<PackageReference Include="Microsoft.PowerShell.Commands.Diagnostics" Version="6.2.3" />
<PackageReference Include="Microsoft.PowerShell.Commands.Utility" Version="6.2.3" />
<PackageReference Include="Microsoft.PowerShell.SDK" Version="6.2.3" />
<PackageReference Include="System.Management.Automation" Version="6.2.3" />
```

```json
{
  "machineAutomationSettings": {
    "isEnabled": "true",
    "packagesToBeInstalled": [
      "firefox --version=65.0.2",
      "https-everywhere-firefox",
      "opera"
    ]
  }
}
```

```xml
<PackageReference Include="Microsoft.Extensions.Configuration" Version="3.1.0" />
<PackageReference Include="Microsoft.Extensions.Configuration.Json" Version="2.2.0" />
<PackageReference Include="Microsoft.Extensions.Configuration.Binder" Version="2.2.4" />
```

```csharp
public class MachineAutomationSettings
{
    public bool IsEnabled { get; set; }
    public List<string> PackagesToBeInstalled { get; set; }
}
```

```csharp
public sealed class ConfigurationService
{
    private static ConfigurationService _instance;
    public ConfigurationService() => Root = InitializeConfiguration();
    public static ConfigurationService Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new ConfigurationService();
            }
            return _instance;
        }
    }
    public IConfigurationRoot Root { get; }
    public MachineAutomationSettings GetMachineAutomationSettings()
    => ConfigurationService.Instance.Root.GetSection("machineAutomationSettings").Get<MachineAutomationSettings>();
    private IConfigurationRoot InitializeConfiguration()
    {
        var filesInExecutionDir = Directory.GetFiles(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
        var settingsFile =
        filesInExecutionDir.FirstOrDefault(x => x.Contains("testFrameworkSettings") && x.EndsWith(".json"));
        var builder = new ConfigurationBuilder();
        if (settingsFile != null)
        {
            builder.AddJsonFile(settingsFile, optional: true, reloadOnChange: true);
        }
        return builder.Build();
    }
}
```

```csharp
public static class SoftwareAutomationService
{
    public static void InstallRequiredSoftware()
    {
        var machineAutomationSettings = ConfigurationService.Instance.GetMachineAutomationSettings();
        if (machineAutomationSettings.IsEnabled && machineAutomationSettings.PackagesToBeInstalled.Any())
        {
            using (var powerShellInstance = PowerShell.Create())
            {
                // install Chocolatey
                powerShellInstance.AddScript("Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))");
                // Remove agree prompt.
                powerShellInstance.AddScript("choco feature enable -n=allowGlobalConfirmation");
                foreach (var packageToBeInstalled in machineAutomationSettings.PackagesToBeInstalled)
                {
                    Console.WriteLine($"INSTALL {packageToBeInstalled}");
                    string[] packageParts = packageToBeInstalled.Split(' ');
                    powerShellInstance.AddScript($"choco install {packageParts.First()}");
                    powerShellInstance.AddParameter("--allow-downgrade");
                    powerShellInstance.AddParameter("--force");
                    if (packageParts.Length >= 2)
                    {
                        string version = packageParts[1].Split('=').Last();
                        powerShellInstance.AddParameter("version", version);
                    }
                }
                try
                {
                    var psOutput = powerShellInstance.Invoke();
                    if (powerShellInstance.Streams.Error.Count > 0)
                    {
                        foreach (var outputItem in psOutput)
                        {
                            if (outputItem != null)
                            {
                                Console.WriteLine(outputItem.BaseObject.ToString());
                            }
                        }
                    }
                }
                catch (Exception e) when (e.Message.Contains("Installation of Chocolatey to default folder requires Administrative permissions"))
                {
                    throw new InvalidOperationException("To use the Machine Automation module please start Visual Studio in Administrative Mode.", e);
                }
            }
        }
    }
}
```

```csharp
powerShellInstance.AddScript("Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))");
powerShellInstance.AddScript("choco feature enable -n=allowGlobalConfirmation");
```

```csharp
var psOutput = powerShellInstance.Invoke();
if (powerShellInstance.Streams.Error.Count > 0)
{
    foreach (var outputItem in psOutput)
    {
        if (outputItem != null)
        {
            Console.WriteLine(outputItem.BaseObject.ToString());
        }
    }
}
```

```csharp
catch (Exception e) when(e.Message.Contains("Installation of Chocolatey to default folder requires Administrative permissions"))
{
    throw new InvalidOperationException("To use the Machine Automation please start Visual Studio in Administrative Mode.", e);
}
```

```csharp
[TestClass]
public class SoftwareManagementAutomationTests
{
    private static readonly string AssemblyFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
    private static IWebDriver _driver;
    [AssemblyInitialize]
    public static void AssemblyInitialize(TestContext testContext)
    {
        SoftwareAutomationService.InstallRequiredSoftware();
    }
    [ClassInitialize]
    public static void ClassInit(TestContext testContext)
    {
        _driver = new ChromeDriver(AssemblyFolder);
    }
    [ClassCleanup]
    public static void ClassCleanup()
    {
        _driver?.Dispose();
    }
    [TestMethod]
    public void CheckCurrentIpAddressEqualToSetProxyIp()
    {
        _driver.Navigate().GoToUrl("https://whatismyipaddress.com/");
        var element = _driver.FindElement(By.XPath("//*[@id="ipv4"]/a"));
        Console.WriteLine(element.Text);
    }
}
```

## Effortless Integration Tests with My Tested ASP.NET

```csharp
public class ArticlesController : Controller
{
    private readonly IArticleService articleService;
    public ArticlesController(IArticleService articleService)
    => this.articleService = articleService;
    [HttpGet]
    [Authorize]
    public IActionResult Create() => this.View();
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create(ArticleFormModel article)
    {
        if (this.ModelState.IsValid)
        {
            await this.articleService.Add(article.Title, article.Content, this.User.GetId());
            this.TempData.Add(ControllerConstants.SuccessMessage, "Article created successfully it is waiting for approval!");
            return this.RedirectToAction(nameof(UsersController.Mine), ControllerConstants.Users);
        }
        return this.View(article);
    }
}
```

```csharp
public class ArticleService : IArticleService
{
    private readonly BlogDbContext db;
    private readonly IDateTimeProvider dateTimeProvider;
    public ArticleService(
    BlogDbContext db,
    IDateTimeProvider dateTimeProvider)
    {
        this.db = db;
        this.dateTimeProvider = dateTimeProvider;
    }
    public async Task<int> Add(string title, string content, string userId)
    {
        var article = new Article
        {
            Title = title,
            Content = content,
            UserId = userId,
            PublishedOn = this.dateTimeProvider.Now();
    };
this.db.Articles.Add(article);
await this.db.SaveChangesAsync();
return article.Id;
    }
}
```

```csharp
public class DateTimeProvider : IDateTimeProvider
{
    public DateTime Now() => DateTime.UtcNow;
}
```

```csharp
// The TestStartup class provides all globally registered services for our tests.
public class TestStartup : Startup
{
    public TestStartup(IConfiguration configuration)
    : base(configuration)
    {
    }
    public void ConfigureTestServices(IServiceCollection services)
    {
        // Register all web application services.
        base.ConfigureServices(services);
        // Replace all custom services which need mocks.
        services.ReplaceTransient<IDateTimeProvider>(_ => DateTimeProviderMock.Create);
    }
}
```

```csharp
public class DateTimeProviderMock
{
    public static IDateTimeProvider Create
    {
        get
        {
            var moq = new Mock<IDateTimeProvider>();
            moq.Setup(m => m.Now()).Returns(new DateTime(1, 1, 1));
            return moq.Object;
        }
    }
}
```

```csharp
[Fact]
public void GetCreateShouldBeRoutedCorrectly()
=> MyRouting // Start a route test.
.Configuration() // Use the globally registered configuration.
.ShouldMap(request => request // Provide the request data.
.WithLocation("/Articles/Create") // Set the URL of the Get request.
.WithUser()) // Specify that the route needs an authenticated user.
.To<ArticlesController>(c => c.Create()); // Map the route to the specific action and controller.
```

```csharp
[Theory]
[InlineData("Test Article", "Test Article Content")]
public void PostCreateShouldBeRoutedCorrectly(string title, string content)
=> MyRouting // Start a route test.
.Configuration() // Use the globally registered configuration.
.ShouldMap(request => request // Provide the request data.
.WithMethod(HttpMethod.Post) // Set the method of the request.
.WithLocation("/Articles/Create") // Set the URL of the Post request.
.WithFormFields(new // Add form field data to the request.
{
    Title = title,
    Content = content
})
.WithUser() // Specify that the route needs an authenticated user.
.WithAntiForgeryToken()) // Add an Anti-Forgery token, if needed.
.To<ArticlesController>(c => c.Create(new ArticleFormModel // Map the route to the specific route values.
{
    Title = title,
    Content = content
}));
```

```csharp
[Fact]
public void CreateGetShouldHaveRestrictionsForHttpGetOnlyAndAuthorizedUsersAndShouldReturnView()
=> MyController<ArticlesController> // Specify the controller under test.
    .Instance() // Create it from the globally registered services.
    .Calling(c => c.Create()) // Specify the action under test.
    .ShouldHave()
    .ActionAttributes(attrs => attrs // Assert action attributes.
    .RestrictingForHttpMethod(HttpMethod.Get)
    .RestrictingForAuthorizedRequests())
    .AndAlso() // Provide additional assertions.
    .ShouldReturn()
    .View(); // Validate the view result.
```

```csharp
[Fact]
public void CreatePostShouldReturnViewWithSameModelWhenInvalidModelState()
=> MyController<ArticlesController> // Specify the controller under test.
    .Instance() // Create it from the globally registered services.
    .Calling(c => c.Create(With.Default<ArticleFormModel>())) // Specify the action under test and provide empty model.
    .ShouldHave()
    .InvalidModelState() // Assert invalid model state.
    .AndAlso() // Provide additional assertions.
    .ShouldReturn()
    .View(With.Default<ArticleFormModel>()); // Validate the view result and the same empty model.
```

```csharp
[Theory]
[InlineData("Article Title", "Article Content")]
public void CreatePostShouldSaveArticleSetModelStateMessageAndRedirectWhenValidModelState(string title, string content)
=> MyController<ArticlesController> // Specify the controller under test.
    .Instance() // Create it from the globally registered services.
    .Calling(c => c.Create(new ArticleFormModel // Specify the action under test and provide valid model.
    {
        Title = title,
        Content = content
    }))
    .ShouldHave()
    .ValidModelState() // Assert valid model state.
    .AndAlso() // Provide additional assertions.
    .ShouldHave()
    .Data(data => data // Assert the database.
    .WithSet<Article>(set => // Assert the Article database set.
    {
        set.ShouldNotBeEmpty();
        set.SingleOrDefault(a => a.Title == title).ShouldNotBeNull(); // Validate our article is saved.
    }))
    .AndAlso() // Provide additional assertions.
    .ShouldHave()
    .TempData(tempData => tempData // Validate the TempData success message..
    .ContainingEntryWithKey(ControllerConstants.SuccessMessage))
    .AndAlso() // Provide additional assertions.
    .ShouldReturn()
    .Redirect(redirect => redirect // Validate redirect result.
    .To<UsersController>(c => c.Mine())); // Validate correct redirect to action.
```

```csharp
[Fact]
public void CreatePostShouldHaveRestrictionsForHttpPostOnlyAndAuthorizedUsers()
=> MyController<ArticlesController> // Specify the controller under test.
    .Instance() // Create it from the globally registered services.
    .Calling(c => c.Create(With.Empty<ArticleFormModel>())) // Specify the action under test and provide empty model.
    .ShouldHave()
    .ActionAttributes(attrs => attrs // Assert action attributes.
    .RestrictingForHttpMethod(HttpMethod.Post)
    .RestrictingForAuthorizedRequests());
```

```csharp
[Fact]
public void GetCreateShouldShouldReturnView()
=> MyMvc
    .Pipeline() // Start a pipeline test.
    .ShouldMap(request => request // Provide the request data.
    .WithLocation("/Articles/Create")
    .WithUser())
    .To<ArticlesController>(c => c.Create()) // Validate the route values.
    .Which() // Provide additional assertions on the controller.
    .ShouldReturn()
    .View(); // Validate the view result.
```

## Testing for Developers- Isolation Frameworks Fundamentals

```csharp
public List<string> GeneratePiesNamesByCurrentYear()
{
    var brandedPiesNames = new List<string>();
    foreach (var pie in _originalPiesNames)
    {
        brandedPiesNames.Add($"{DateTime.Now.Year} {pie}");
    }
    return brandedPiesNames;
}
```

```csharp
public interface IDateTimeFacade
{
    DateTime GetCurrentDateTime();
}
```

```csharp
public List<string> GeneratePiesNamesByCurrentYear()
{
    var brandedPiesNames = new List<string>();
    foreach (var pie in _originalPiesNames)
    {
        brandedPiesNames.Add($"{_dateTimeFacade.GetCurrentDateTime().Year} {pie}");
    }
    return brandedPiesNames;
}
```

```csharp
public class AlwaysValidFakeExtensionManager : IExtensionManager
{
    public bool IsValid(string fileName)
    {
        return true;
    }
}
```

```csharp
private readonly ILogger<TestCaseRunsController> _logger;
private readonly MeissaRepository _meissaRepository;
public TestCaseRunsController(ILogger<TestCaseRunsController> logger, MeissaRepository repository)
{
    _logger = logger;
    _meissaRepository = repository;
}
```

```csharp
public TestCaseRunsController(ILogger<TestCaseRunsController> logger, MeissaRepository repository)
{
    _logger = logger;
}
public MeissaRepository MeissaRepository { get; set; }
```

```csharp
public async Task SetAllActiveAgentsToVerifyTheirStatusAsync(IServiceClient<TestAgentDto> testAgentRepository, string tag)
{
    var testAgents = await GetAllActiveTestAgentsByTagAsync(tag);
    if (testAgents.Count > 0)
    {
        await UpdateAgentsStatusAsync(testAgents, TestAgentStatus.RequestActiveConfirmation);
    }
}
```

```csharp
public async Task SetAllActiveAgentsToVerifyTheirStatusAsync(string tag)
{
    var repo = CreateTestAgentRepo();
    var testAgents = await repo.GetAllActiveTestAgentsByTagAsync(tag);
    if (testAgents.Count > 0)
    {
        await UpdateAgentsStatusAsync(testAgents, TestAgentStatus.RequestActiveConfirmation);
    }
}
private IServiceClient<TestAgentDto> CreateTestAgentRepo() => new TestAgentServiceClient();
```

```csharp
public class TestAgentRepoFactory : ITestAgentRepoFactory
{
    public IServiceClient<TestAgentDto> CreateTestAgentRepo()
    {
        return new TestAgentServiceClient();
    }
}
```

```csharp
internal class FakeExtensionManager : IExtensionManager
{
    public bool WillBeValid = false;
    public bool IsValid(string fileName)
    {
        return WillBeValid;
    }
}
public class LogAnalyzer
{
    private IExtensionManager manager;
    public LogAnalyzer(IExtensionManager mgr)
    {
        manager = mgr;
    }
    public bool IsValidLogFileName(string fileName)
    {
        return manager.IsValid(fileName);
    }
}
public interface IExtensionManager
{
    bool IsValid(string fileName);
}
[Test]
public void IsValidFileName_NameSupportedExtension_ReturnsTrue()
{
    FakeExtensionManager myFakeManager = new FakeExtensionManager();
    myFakeManager.WillBeValid = true;
    LogAnalyzer log = new LogAnalyzer(myFakeManager);
    bool result = log.IsValidLogFileName("short.ext");
    Assert.True(result);
}
```

```csharp
public class LogAnalyzer
{
    private IExtensionManager manager;
    public LogAnalyzer()
    {
        manager = new FileExtensionManager();
    }
    public IExtensionManager ExtensionManager
    {
        get { return manager; }
        set { manager = value; }
    }
    public bool IsValidLogFileName(string fileName)
    {
        return manager.IsValid(fileName);
    }
}
[Test]
public void IsValidFileName_SupportedExtension_ReturnsTrue()
{
    //set up the stub to use, make sure it returns true
    // ...
    //create analyzer and inject stub
    LogAnalyzer log = new LogAnalyzer();
    log.ExtensionManager = someFakeManagerCreatedEarlier;
    //Assert logic assuming extension is supported
    //...
}
```

```csharp
public class DateTimeProvider : IDateTimeProvider
{
    public DateTime GetCurrentTime() => DateTime.Now;
}
```

```csharp
public class LogAnalyzer
{
    //...
    internal LogAnalyzer(IExtensionManager extentionMgr)
    {
        manager = extentionMgr;
    }
    //...
}
using System.Runtime.CompilerServices;
[assembly:
InternalsVisibleTo("Meissa.Infrastructure")]
```

```csharp
[Conditional("DEBUG")]
public string GetRunningAssemblyPath()
{
    string codeBase = Assembly.GetExecutingAssembly().CodeBase;
    var uri = new UriBuilder(codeBase);
    string path = Uri.UnescapeDataString(uri.Path);
    return Path.GetDirectoryName(path);
}
```

```csharp
#if DEBUG
public LogAnalyzer (IExtensionManager extensionMgr)
{
manager = extensionMgr;
}
#endif
```

```csharp
[Test]
public async Task InsertCurrentTestAgent_When_TestAgentForCurrentMachineIsNotExistingInDatabase()
{
    // Arrange
    var testAgents = TestAgentFactory.CreateWithoutCurrentMachineName(TestAgentStatus.Inactive);
    var insertedTestAgent = default(Task<TestAgentDto>);
    _testAgentRepositoryMock.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(testAgents));
    _testAgentRepositoryMock.Setup(x => x.CreateAsync(It.IsAny<TestAgentDto>())).
    Returns((Task<TestAgentDto> a) => insertedTestAgent = a);
    // Act
    await _testAgentStateSwitcher.SetTestAgentAsActiveAsync(testAgents.First().AgentTag);
    // Assert
    // ...
}
```

```csharp
Assert.That(insertedTestAgent.Result.TestAgentId, Is.Not.Null);
Assert.That(insertedTestAgent.Result.AgentTag, Is.EqualTo(testAgents.First().AgentTag));
Assert.That(insertedTestAgent.Result.MachineName, Is.EqualTo(Environment.MachineName));
Assert.That(insertedTestAgent.Status, Is.EqualTo(TestAgentStatus.Active));
```

```csharp
_testRunRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<int>(),
It.Is<TestRunDto>(i => i.TestRunId == _testRunId && i.Status == status)), Times.Once);
_testRunRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<int>(),
It.IsAny<TestRunDto>()), Times.Once);
```

```csharp
private Mock<IServiceClient<TestAgentDto>> _testAgentRepositoryMock;
private ITestAgentsService _testAgentsService;
[SetUp]
public void TestInit()
{
    _testAgentRepositoryMock = new Mock<IServiceClient<TestAgentDto>>();
    _testAgentsService = new TestAgentsService(_testAgentRepositoryMock.Object);
}
```

```csharp
_directoryProvider.Setup(x => x.DoesDirectoryExists(It.IsAny<string>())).Returns(true);
_dateTimeProvider.Setup(x => x.GetCurrentTime()).Returns(DateTime.Now);

```

```csharp
var logs = LogFactory.CreateEmpty();
_logRepositoryMock.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(logs));
```

```csharp
_pathProvider.Setup(x => x.Combine(It.IsAny<string>(), It.IsAny<string>())).
Returns((string path1, string filePath) => Path.Combine(path1, filePath));
_fileProvider.Setup(x => x.WriteAllText(It.IsAny<string>(), It.IsAny<string>())).
Callback((string filePath, string content) => File.WriteAllText(filePath, content));
```

```csharp
Mock<IFileConnection> fileConnection = new Mock<IFileConnection>();
fileConnection.Setup(item => item.Get(It.IsAny<string>, It.IsAny<string>))
.Throws(new IOException());
```

```csharp
var mockHeater = new Mock<IHeater>();
var mockThermostat = new Mock<IThermostat>();
mockThermostat.Setup(m => m.StartAsyncSelfCheck()).Raises(
m => m.HealthCheckComplete += null, new ThermoEventArgs { OK = false });
var controller = new Services.HeatingController(mockHeater.Object, mockThermostat.Object);
// Act
controller.PerformHealthChecks();
// Assert
mockHeater.Verify(m => m.SwitchOff());
```

```csharp
[Test]
public void EventFiringManual()
{
    bool loadFired = false;
    SomeView view = new SomeView();
    view.Load += delegate
    {
        loadFired = true;
    };
    view.DoSomethingThatEventuallyFiresThisEvent();
    Assert.IsTrue(loadFired);
}
```

```csharp
// Arrange
var mockHeater = new Mock<IHeater>();
var mockThermostat = new Mock<IThermostat>();
mockThermostat.Setup(m => m.StartAsyncSelfCheck()).Raises(
m => m.HealthCheckComplete += null, new ThermoEventArgs { OK = false });
var controller = new Services.HeatingController(mockHeater.Object, mockThermostat.Object);
// Act
controller.PerformHealthChecks();
// Assert
mockHeater.Verify(m => m.SwitchOff());
// Arrange
var mockHeater = new Mock<IHeater>();
var mockThermostat = new Mock<IThermostat>();
mockThermostat.Setup(m => m.StartAsyncSelfCheck()).Raises(
m => m.HealthCheckComplete += null, new ThermoEventArgs { OK = true });
var controller = new Services.HeatingController(mockHeater.Object, mockThermostat.Object);
// Act
controller.PerformHealthChecks();
// Assert
mockHeater.Verify(m => m.SwitchOff(), Times.Never());
```

## Test Automation Reporting with Azure DevOps CI in .NET Projects

```csharp
TestContext.AddTestAttachment("screenshotPath", "image on fail");
```

## Test Automation Reporting with ReportPortal in .NET Projects

```powershell
curl https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml -o docker-compose.yml
```

```powershell
docker-compose -p reportportal up -d --force-recreate
```

```csharp
public class Calculator
{
    public int Square(int num) => num * num;
    public int Add(int num1, int num2) => num1 + num2;
    public int Multiply(int num1, int num2) => num1 * num2;
    public int Subtract(int num1, int num2)
    {
        if (num1 > num2)
        {
            return num1 - num2;
        }
        return num2 - num1;
    }
    public float Division(float num1, float num2) => num1 / num2;
}
```

```csharp
[TestClass]
public class CalculatorDivisionTests
{
    [TestMethod]
    public void Return4_WhenMultiply2And2()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Multiply(2, 2);
        Assert.AreEqual(4, actualResult);
    }

    [TestMethod]
    public void Return0_WhenMultiply0And0()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Multiply(0, 0);
        Assert.AreEqual(0, actualResult);
    }

    [TestMethod]
    public void ReturnMinus5_WhenMultiply5AndMinus1()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Multiply(5, -1);
        Assert.AreEqual(0, actualResult);
    }
}
```

```json
{
  "$schema": "https://raw.githubusercontent.com/reportportal/agent-net-vstest/master/ReportPortal.VSTest.TestLogger/ReportPortal.config.schema",
  "enabled": true,
  "server": {
    "url": "http://127.0.0.1:8080/api/v1/",
    "project": "superadmin_personal",
    "authentication": {
      "uuid": "d8685bb4-2f2a-4335-9c8b-1f2a5d176d02"
    }
  },
  "launch": {
    "name": "Automate The Planet Test Portal Demo",
    "description": "This is a demo run of the ATP demo examples for a demonstration of Test Portal integration with MSTest tests.",
    "debugMode": false,
    "tags": ["Automate The Planet", "Test Reporting", "MSTEST"]
  }
}
```

```powershell
dotnet vstest Bellatrix.Web.Tests.dll --testcasefilter:TestCategory=CI --logger:ReportPortal
```

## Test Automation Reporting with Allure in .NET Projects

```csharp
public class Calculator
{
    public int Square(int num) => num * num;
    public int Add(int num1, int num2) => num1 ez_plus num2;
    public int Multiply(int num1, int num2) => num1 * num2;
    public int Subtract(int num1, int num2)
    {
        if (num1 > num2)
        {
            return num1 - num2;
        }
        return num2 - num1;
    }
    public float Division(float num1, float num2) => num1 / num2;
}
```

```csharp
[TestFixture]
[AllureNUnit]
[AllureSuite("CalculatorTests")]
[AllureDisplayIgnored]
class CalculatorAddTests
{
    [Test(Description = "Add two integers and returns the sum")]
    [AllureTag("CI")]
    [AllureSeverity(SeverityLevel.critical)]
    [AllureIssue("8911")]
    [AllureTms("532")]
    [AllureOwner("Anton")]
    [AllureSubSuite("Add")]
    public void Return4_WhenAdd2And2()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Add(2, 2);
        Assert.AreEqual(4, actualResult);
    }

    [Test(Description = "Add two integers and returns the sum")]
    [AllureTag("CI")]
    [AllureSeverity(SeverityLevel.critical)]
    [AllureSubSuite("Add")]
    public void Return0_WhenAdd0And0()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Add(0, 0);
        Assert.AreEqual(0, actualResult);
    }

    [Test(Description = "Add two integers and returns the sum")]
    [AllureTag("CI")]
    [AllureSeverity(SeverityLevel.critical)]
    [AllureSubSuite("Add")]
    public void ReturnMinus5_WhenAddMinus3AndMinus2()
    {
        var calculator = new Calculator();
        int actualResult = calculator.Add(0, 0);
        Assert.AreEqual(1, actualResult);
    }
}
```

```json
{
  "allure": {
    "directory": "allure-results",
    "links": [
      "https://github.com/AutomateThePlanet/Meissa/issues/{issue}",
      "https://github.com/AutomateThePlanet/Meissa/projects/2#card-{tms}",
      "{link}"
    ]
  }
}
```

```json
[
  {
    "name": "Ignored tests",
    "matchedStatuses": ["skipped"]
  },
  {
    "name": "Product Bug",
    "matchedStatuses": ["broken", "failed"],
    "messageRegex": ".*AssertionException.*"
  },
  {
    "name": "Calculator Problem",
    "matchedStatuses": ["failed"],
    "traceRegex": ".*DivideByZeroException.*"
  }
]
```

```xml
<ItemGroup>
    <Categories Include="categories.json" />
</ItemGroup>
<Target Name="CopyCategoriesToAllureFolder">
    <Copy SourceFiles="@(Categories)" DestinationFolder="$(OutputPath)allure-results" />
</Target>
<Target Name="PostBuild" AfterTargets="PostBuildEvent">
    <CallTarget Targets="CopyCategoriesToAllureFolder" />
</Target>
```

```powershell
allure generate "allure-results-directory" --clean


```

```powershell
allure open "allure-report-directory"


```

## Test Automation Reporting with Zafira in .NET Projects

```powershell
git clone git@github.com:qaprosoft/zafira.git
```

```bash
$ docker-compose up -d
```

```bash
$ docker ps
```

```csharp
[ZafiraSuite, ZafiraTest]
public class ZafiraTests : ZafiraListener
{
    [OneTimeSetUp]
    public void StartDriver()
    {
        //...
    }
}
```

```csharp
public class BaseTest : ZafiraListener
{
    [OneTimeSetUp]
    public void StartDriver()
    {
        //...
    }
}
[ZafiraSuite, ZafiraTest]
public class ZafiraTests : BaseTest
{
    [Test]
    public void NavigateToHomePage()
    {
        //...
    }
}
```

## Speed up Automated Tests Writing with .NET Core Project Templates

```xml
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
		<TargetFramework>netcoreapp2.0</TargetFramework>
		<IsPackable>false</IsPackable>
		<CopyLocalLockFileAssemblies>true</CopyLocalLockFileAssemblies>
		<Configurations>Debug;Release</Configurations>
	</PropertyGroup>
	<PropertyGroup>
		<CodeAnalysisRuleSet>StyleCopeRules.ruleset</CodeAnalysisRuleSet>
	</PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Microsoft.NET.Test.Sdk" Version="15.9.0-preview-20180807-05" />
		<PackageReference Include="MSTest.TestAdapter" Version="1.3.2" />
		<PackageReference Include="MSTest.TestFramework" Version="1.3.2" />
		<PackageReference Include="Selenium.Firefox.WebDriver" Version="0.21.0" />
		<PackageReference Include="Selenium.Support" Version="3.14.0" />
		<PackageReference Include="Selenium.WebDriver" Version="3.14.0" />
		<PackageReference Include="Selenium.WebDriver.ChromeDriver" Version="2.41.0" />
		<PackageReference Include="Selenium.WebDriver.IEDriver" Version="3.14.0" />
		<PackageReference Include="StyleCop.Analyzers" Version="1.1.0-beta008">
			<NoWarn>NU1701</NoWarn>
			<PrivateAssets>all</PrivateAssets>
			<IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
		</PackageReference>
	</ItemGroup>
	<ItemGroup>
		<None Update=".editorconfig">
			<CopyToOutputDirectory>Always</CopyToOutputDirectory>
		</None>
		<None Update="stylecop.json">
			<CopyToOutputDirectory>Always</CopyToOutputDirectory>
		</None>
		<None Update="StyleCopeRules.ruleset">
			<CopyToOutputDirectory>Always</CopyToOutputDirectory>
		</None>
	</ItemGroup>
</Project>
```

```json
{
  "$schema": "http://json.schemastore.org/template",
  "author": "Anton Angelov",
  "classifications": ["WebDriver", "Test", "UITest"],
  "identity": "WebDriverTestsProject",
  "name": "MSTest WebDriver Test Project",
  "shortName": "mstest-webdriver-test-proj"
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<package
	xmlns="http://schemas.microsoft.com/packaging/2012/06/nuspec.xsd">
	<metadata>
		<id>WebDriverTestsProject</id>
		<version>1.0.0</version>
		<description>
Creates the WebDriver MSTest test project.
</description>
		<authors>Anton Angelov</authors>
		<packageTypes>
			<packageType name="Template" />
		</packageTypes>
	</metadata>
</package>
```

```powershell
nuget pack <pathToProject>WebDriverTestsProjectTemplate.nuspec

```

```powershell
dotnet new -i <pathToPackage>WebDriverTestsProject.1.0.0.nupkg

```

```powershell
dotnet new -i WebDriverTestsProject.1.0.0.nupkg

```

## Speed up Automated Tests Writing with Visual Studio Project Templates

```xml
<Project Sdk="Microsoft.NET.Sdk">
	<PropertyGroup>
		<TargetFramework>netcoreapp2.0</TargetFramework>
		<IsPackable>false</IsPackable>
		<CopyLocalLockFileAssemblies>true</CopyLocalLockFileAssemblies>
		<Configurations>Debug;Release</Configurations>
	</PropertyGroup>
	<PropertyGroup>
		<CodeAnalysisRuleSet>StyleCopeRules.ruleset</CodeAnalysisRuleSet>
	</PropertyGroup>
	<ItemGroup>
		<PackageReference Include="Microsoft.NET.Test.Sdk" Version="15.9.0-preview-20180807-05" />
		<PackageReference Include="MSTest.TestAdapter" Version="1.3.2" />
		<PackageReference Include="MSTest.TestFramework" Version="1.3.2" />
		<PackageReference Include="Selenium.Firefox.WebDriver" Version="0.21.0" />
		<PackageReference Include="Selenium.Support" Version="3.14.0" />
		<PackageReference Include="Selenium.WebDriver" Version="3.14.0" />
		<PackageReference Include="Selenium.WebDriver.ChromeDriver" Version="2.41.0" />
		<PackageReference Include="Selenium.WebDriver.IEDriver" Version="3.14.0" />
		<PackageReference Include="StyleCop.Analyzers" Version="1.1.0-beta008">
			<NoWarn>NU1701</NoWarn>
			<PrivateAssets>all</PrivateAssets>
			<IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
		</PackageReference>
	</ItemGroup>
	<ItemGroup>
		<None Update=".editorconfig">
			<CopyToOutputDirectory>Always</CopyToOutputDirectory>
		</None>
		<None Update="stylecop.json">
			<CopyToOutputDirectory>Always</CopyToOutputDirectory>
		</None>
		<None Update="StyleCopeRules.ruleset">
			<CopyToOutputDirectory>Always</CopyToOutputDirectory>
		</None>
	</ItemGroup>
</Project>
```

## High-Quality Code- Naming Methods

```csharp
public SendActionKeys(IKeyboard keyboard, IMouse mouse, ILocatable actionTarget, string keysToSend)
{
    //...
}
```

```csharp
public Send_Action_Keys(IKeyboard keyboard, IMouse mouse, ILocatable actionTarget, string keysToSend)
{
    //...
}
```

```csharp
int count = GetCountByStampId(Tenant tennat, long stampId);
```

```csharp
// get objects count filtered by stampId
int count = GetAllByStampCount(Tenant tennat, long stampId);
```

```csharp
var meanDemand = CalculateMeanDemand();
```

```csharp
// calculate mean demand
double meanDemand = Calculate();
```

```csharp
protected virtual DependentDemandValue InitDe-pendentDemand(
DateTime startDate,
DateTime endDate,
int counter,
int futureCounter,
bool isForDailyBucket)
{
    //..
}
```

```csharp
protected virtual void InitDependentDemand(
DateTime startDate,
DateTime endDate,
int counter,
int futureCounter,
bool isForDailyBucket,
out double dependentDemand,
out double dependentDemandFirm,
out double futureDependentDemand,
out double upperLevelForecast,
out double dependantDemandWithoutDestinationSO)
{
    // ...
}
```

## High-Quality Code- Naming Classes, Interfaces, Enumerations

```csharp
public partial class TwelveMonthRecurringBillingOrdersPanelAdminBasePage : AdminBasePage
{
}
```

```csharp
public partial class 12Month_RecurringBilling_OrdersPanel_AdminPage: AdminBasePage
{
}
```

```csharp
public class ElementsList<TElement> : IEnumerable<TElement>
where TElement : Element
{
    public TElement this[int i] => GetWebDriverElements().ElementAt(i);
    public IEnumerator<TElement> GetEnumerator() => GetAWebDriverElements().GetEnumerator();
    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    public int Count() => GetWebDriverElements().Count();
    //...
}
```

```csharp
SalesOrdersReportEngine engine;
SuggestedOrdersReportEngine engine;
```

```csharp
// engine to generete report with sales orders
ReportEngine engine;
//engine to generete report with suggested orders
ReportEngine2 engine;
```

```csharp
public interface ITimeouts
{
    // New API
    TimeSpan ImplicitWait { get; set; }
    [Obsolete("This method will be removed in a future version. Please set the ImplicitWait property instead.")]
    ITimeouts ImplicitlyWait(TimeSpan timeToWait);
    // ... rest
}
```

```csharp
// old API
[Obsolete("This type is obsolete. Please use the new version of the same class, X509Certificate2.")]
public class X509Certificate
{//...}
 // new API
    public class X509Certificate2 {//...}
```

```csharp
public enum CarColor
{
    Black,
    Blue,
    Red,
    Cyan,
    // ...
}
```

```csharp
[Flags]
public enum ConsoleModifiers
{
    Alt,
    Control,
    Shift,
}
```

## High-Quality Automated Tests- Top 10 ReSharper Coding Styles

```csharp
void LandMarsRover(
int x,
int y,
int z,
double fuelNeeded)
{
}
```

```csharp
void LandMarsRover(int x,
int y,
int z,
double fuelNeeded)
{
}
```

```csharp
LandMarsRover(
int x,
int y,
int z,
double fuelNeeded);
```

```csharp
LandMarsRover(int x,
int y,
int z,
double fuelNeeded);
```

```csharp
if (isRoverLandedSuccessfully)
{
    Celebrate();
}
else
{
    SendAnotherRover();
}
```

```csharp
if (isRoverLandedSuccessfully)
{
    Celebrate();
}
else
{
    PlaySadSong();
}
```

```csharp
totalFuel = engineFuel + upperRocket - upperBathroomFuel;
```

```csharp
totalFuel = engineFuel + upperRocket - upperBathroomFuel;

```

```csharp
LaunchSatellite(_xSky, _ySky, _fuel);

```

```csharp
LaunchSatellite(_xSky, _ySky, _fuel);

```

```csharp
Action calculateMoonBaseFuel = rover => roverFuel * 4.5;

```

```csharp
Action calculateMoonBaseFuel = rover => roverFuel * 4.5;

```

```csharp
LandMarsRover(
int x,
int y,
int z,
double fuelNeeded);
```

```csharp
LandMarsRover(
int x,
int y,
int z,
double fuelNeeded);
```

```csharp
private string secretJupiterBase = string.Empty;
```

```csharp
private string secretJupiterBase = "";
```

## High-Quality Automated Tests- Top StyleCop Coding Styles Part 3

```csharp
int xTarget = 5 + b;
string yTarget = this.GetTargetCoordinates().ToString();
return xTarget.FuelNeeded;
```

```csharp
int xTarget = (5 + b);
string yTarget = (this.GetTargetCoordinates()).ToString();
return (xTarget.FuelNeeded);
```

```csharp
public string LandMoonPioneer(int x, int y, double fuelToSave)
{
}
public string LandMoonPioneer(
int x, int y, double fuelToSave)
{
}
public string LandMoonPioneer(
int x,
int y,
double fuelToSave)
{
}
```

```csharp
public string LandMoonPioneer(int x, int y,
double fuelToSave)
{
}
```

```csharp
public bool LandMoonPioneer(int x, int y, double fuelToSave)
{
    bool isLandingSuccessfull = TryToLand(
    x,
    y);
}
```

```csharp
public bool LandMoonPioneer(int x, int y, double fuelToSave)
{
    bool isLandingSuccessfull = TryToLand(
    x,
    y
    );
}
```

```csharp
int xTarget = 5 + b;
string yTarget = GetTargetCoordinates().ToString();
```

```csharp
int xTarget = 5 + b; string yTarget = GetTargetCoordinates().ToString();

```

```csharp
string newMoonName = CreateNewMoonName("Jupiter", "Europa New");

```

```csharp
string newMoonName = base.CreateNewMoonName("Jupiter", "Europa New");

```

```csharp
public class JupiterMoonFactory<TPlanetType> : MoonFactory
{
    public JupiterMoonFactory(int size) : base(size)
    {
    }
}
```

```csharp
public class JupiterMoonFactory<TPlanetType> : MoonFactory
{
    public JupiterMoonFactory(int size) : base(size)
    {
    }
}
```

```csharp
private Location secretMilitarySpaceBase = GetLocation("Space Zebra 2");

```

```csharp
Location secretMilitarySpaceBase = GetLocation("Space Zebra 2");

```

```csharp
public class JupiterMoonFactory<TPlanetType> : MoonFactory
{
    public JupiterMoonFactory(int size) : base(size)
    {
    }
}
```

```csharp
public class JupiterMoonFactory<TPlanetType> : MoonFactory
{
    public JupiterMoonFactory(int Size) : base(Size)
    {
    }
}
```

```csharp
bool isPetrolOnMoon = LocateResources(ResourcesType.Petrol);
if (isTherePetrolOnMoon)
{
    // go there...
}
```

```csharp
bool IsPetrolOnMoon = LocateResources(ResourcesType.Petrol);
if (IsPetrolOnMoon)
{
    // go there...
}
```

```csharp
private Location _secretMilitarySpaceBase = new Location(107, 45);
```

```csharp
private Location secretMilitarySpaceBase = new Location(107, 45);

```

```csharp
private readonly Location SecretMilitarySpaceBase = new Location(107, 45);
```

```csharp
private readonly Location secretMilitarySpaceBase = new Location(107, 45);

```

```csharp
public const string SecretSaturnBaseName = "Titan Chocolate Corns 2.1";

```

```csharp
public const string secretSaturnBaseName = "Titan Chocolate Corns 2.1";
public const string SECRET_SATURN_BASE_NAME = "Titan Chocolate Corns 2.1";

```

## High-Quality Automated Tests- Top StyleCop Coding Styles Part 2

```csharp
private const string warningMessage = "Beware Evil Cookie Robots behind the Door!!";
private int fuelQuanlity;
```

```csharp
private int fuelQuanlity;
private const string warningMessage = "Beware Evil Cookie Robots behind the Door!!";
```

```csharp
public void ShouldShootTheMissile(string missileType)
{
    if (missileType == null)
    {
        throw new ArgumentNullException(nameof(missileType));
    }
}
```

```csharp
public void ShouldShootTheMissile(string missileType)
{
    if (null == missileType)
    {
        throw new ArgumentNullException(nameof(missileType));
    }
}
```

```csharp
Action calculateTargetX = () => { x = 0; };
Action calculateTargetY = () => { y = 0; };
Func<int, int, int> calculateDefense = (m, n) => m + n;
```

```csharp
Action calculateTargetX = delegate { x = 0; };
Action calculateTargetY = delegate () { y = 0; };
Func<int, int, int> calculateDefence = delegate (int m, int n) { return m + n; };
```

```csharp
public class RobotGardner
{
    public RobotGardner()
    : this(30)
    {
    }
    public RobotGardner()
    : base(50)
    {
    }
}
```

```csharp
public class RobotGardner
{
    public RobotGardner() : this(30)
    {
    }
    public RobotGardner() : base(50)
    {
    }
}
```

```csharp
private void CleanMoonDust<TRockType, TTool>()
where TRockType : class
where TTool : class, new()
{
}
```

```csharp
private void CleanMoonDust<TRockType, TTool>() where TRockType : class where TTool : class, new()
{
}
```

```csharp
private DateTime? launchStart;

```

```csharp
private Nullable<DateTime> launchStart;

```

```csharp
private DateTime? landingTime;

```

```csharp
#region Variables
private DateTime? landingTime;
#endregion
```

```csharp
private DateTime? archiveOldMoonBase; // maybe we should go there and clean the kitchen
```

```csharp
private DateTime? archiveOldMoonBase; //

```

## 6 Common Challenges Running WebDriver UI Tests in Parallel

```csharp
public static void Dispose()
{
    var processes = Process.GetProcesses();
    var processesToCheck = new List<string> { "edge", "chrome", "firefox" };
    foreach (var process in processes)
    {
        if (processesToCheck.Contains(process.ProcessName.ToLower()))
        {
            process.Kill();
            process.WaitForExit();
        }
    }
}
```

```csharp
private static int GetFreeTcpPort()
{
    Thread.Sleep(100);
    var tcpListener = new TcpListener(IPAddress.Loopback, 0);
    tcpListener.Start();
    int port = ((IPEndPoint)tcpListener.LocalEndpoint).Port;
    tcpListener.Stop();
    return port;
}
```

## High-Quality Automated Tests- Top 9 StyleCop Coding Styles Part 1

```csharp
if (true)
{
    return this.value;
}
```

```csharp
if (true)
    return this.value;

```

```csharp
public bool Enabled
{
    get
    {
        Console.WriteLine("Getting the enabled flag.");
        // Return the value of the 'enabled' field.
        return this.enabled;
    }
}
public bool Enabled
{
    get
    {
        Console.WriteLine("Getting the enabled flag.");
        ////return false;
        return this.enabled;
    }
}
```

```csharp
public bool Enabled
{
    get
    {
        Console.WriteLine("Getting the enabled flag.");
        // Return the value of the 'enabled' field.
        return this.enabled;
    }
}
```

```csharp
if (AmIHungry)
{
    MakePancakes();
}
return pancakesList;
```

```csharp
if (AmIHungry)
{
    MakePancakes();
}
return pancakesList;
```

```csharp
public bool ShouldBuyTheMoon
{
    get
    {
        Console.WriteLine("TODO: Should check the stocks after 1 month...");
        return this.shouldBuyTheMoon;
    }
}
```

```csharp
public bool ShouldBuyTheMoon
{
    get
    {
        Console.WriteLine("TODO: Should check the stocks after 1 month...");
        return this.shouldBuyTheMoon;
    }
}
```

````csharp
public object DefuseTheRockets()```csharp
private static bool ShouldMakePancakesWeeklyForecast;
private bool shouldTodayMakePancakes;
````

{
return null;
}

````

```csharp
public object DefuseTheRockets() { return null; }
````

```csharp
public object Teleport()
{
    lock (this)
    {
        return this.allMyParticles;
    }
}
```

```csharp
public object Teleport()
{
    lock (this)
    {
        return this.allMyParticles;
    }
}
```

```csharp
/// <summary>
/// </summary>
/// <remarks></remarks>
/// <param name="firstName">Your first name.</param>
/// <param name="lastName">Your last name.</param>
/// <returns>The application status.</returns>
public bool ApplyForJoiningTheDarkForce(string firstName, string lastName)
{
    ...
}
```

```csharp
private void VisitMarsSometimes()
{
    // TODO: 1. Visit grandma there.
    // TODO: 2. Buy some refrigerator magnets.
}
```

```csharp
private void VisitMarsSometimes()
{
    // TODO: 1. Visit grandma there.
    // TODO: 2. Buy some refrigerator magnets.
}
```

```csharp
private static bool ShouldMakePancakesWeeklyForecast;
private bool shouldTodayMakePancakes;
```

```csharp
private bool shouldTodayMakePancakes;
private static bool ShouldMakePancakesWeeklyForecast;
```

## High-Quality Automated Tests- Enforce Style and Consistency Rules Using StyleCop

```xml
<?xml version="1.0" encoding="utf-8"?>
<RuleSet Name="StyleCopeRules" Description="StyleCopeRules custom ruleset" ToolsVersion="15.0">
	<IncludeAll Action="Warning" />
	<Rules AnalyzerId="StyleCop.Analyzers" RuleNamespace="StyleCop.Analyzers">
		<Rule Id="SA1101" Action="None" />
		<Rule Id="SA1108" Action="None" />
		<Rule Id="SA1115" Action="None" />
		<Rule Id="SA1116" Action="None" />
		<Rule Id="SA1118" Action="None" />
		<Rule Id="SA1123" Action="None" />
		<Rule Id="SA1129" Action="None" />
		<Rule Id="SA1200" Action="None" />
		<Rule Id="SA1201" Action="None" />
		<Rule Id="SA1202" Action="None" />
		<Rule Id="SA1208" Action="None" />
		<Rule Id="SA1300" Action="None" />
		<Rule Id="SA1306" Action="None" />
		<Rule Id="SA1308" Action="None" />
		<Rule Id="SA1309" Action="None" />
		<Rule Id="SA1310" Action="None" />
		<Rule Id="SA1311" Action="None" />
		<Rule Id="SA1401" Action="None" />
		<Rule Id="SA1402" Action="None" />
		<Rule Id="SA1407" Action="None" />
		<Rule Id="SA1408" Action="None" />
		<Rule Id="SA1516" Action="None" />
		<Rule Id="SA1600" Action="None" />
		<Rule Id="SA1601" Action="None" />
		<Rule Id="SA1602" Action="None" />
		<Rule Id="SA1604" Action="None" />
		<Rule Id="SA1611" Action="None" />
		<Rule Id="SA1612" Action="None" />
		<Rule Id="SA1615" Action="None" />
		<Rule Id="SA1623" Action="None" />
		<Rule Id="SA1633" Action="None" />
		<Rule Id="SA1649" Action="None" />
		<Rule Id="SA1652" Action="None" />
		<Rule Id="SX1101" Action="Warning" />
		<Rule Id="SX1309" Action="Warning" />
	</Rules>
</RuleSet>
```

```json
{
  "$schema": "https://raw.githubusercontent.com/DotNetAnalyzers/StyleCopAnalyzers/master/StyleCop.Analyzers/StyleCop.Analyzers/Settings/stylecop.schema.json",
  "settings": {
    "documentationRules": {
      "companyName": "Automate The Planet Ltd.",
      "copyrightText": "This source code is Copyright © {companyName} and MAY NOT be copied, reproduced,published, distributed or transmitted to or stored in any manner without priorwritten consent from {companyName} (bellatrix.solutions).",
      "documentExposedElements": "false",
      "documentInternalElements": "false",
      "documentPrivateElements": "false",
      "documentPrivateFields": "false"
    },
    "layoutRules": {
      "newlineAtEndOfFile": "require"
    },
    "orderingRules": {
      "systemUsingDirectivesFirst": "true",
      "usingDirectivesPlacement": "outsideNamespace"
    }
  }
}
```

```xml
<PropertyGroup>
	<TargetFramework>netstandard2.0</TargetFramework>
	<RunCodeAnalysis>True</RunCodeAnalysis>
</PropertyGroup>
<PropertyGroup>
	<CodeAnalysisRuleSet>$(SolutionDir)StyleCopeRules.ruleset</CodeAnalysisRuleSet>
</PropertyGroup>
<ItemGroup>
	<AdditionalFiles Include="$(SolutionDir)stylecop.json" Link="stylecop.json" />
</ItemGroup>
<ItemGroup>
	<None Update="StyleCopeRules.ruleset">
		<CopyToOutputDirectory>Always</CopyToOutputDirectory>
	</None>
</ItemGroup>
```

```xml
<ItemGroup>
    <ExcludeFromStyleCop Include="***.cs" Condition=" '$(Configuration)' == 'Release' " />
<ItemGroup/>
```

## High-Quality Automated Tests- Top 10 EditorConfig Coding Styles Part 2

```csharp
// csharp_style_expression_bodied_properties = true:error
public int PlanetsCount => 42;
```

```csharp
// csharp_style_expression_bodied_properties = false:error
public int MoonsCount
{
    get { return 13; }
}
```

```csharp
// csharp_style_throw_expression = true:error
FuelType = fuelType ?? throw new ArgumentNullException(nameof(FuelType));
```

```csharp
// csharp_style_throw_expression = false:error
if (fuelType == null)
{
    throw new ArgumentNullException(nameof(fuelType));
}
this.FuelType = fuelType;
```

```csharp
// csharp_style_var_elsewhere = true:error
int moonSize = CalculateMoonSize();
```

```csharp
// csharp_style_var_elsewhere = false:error
var secondMoonSize = CalculateMoonSize();
```

```csharp
// csharp_style_var_for_built_in_types = true:error
var planetSize = 42;
```

```csharp
// csharp_style_var_for_built_in_types = false:error
int secondPlanetSize = 42;
```

```csharp
// csharp_style_var_when_type_is_apparent = true:error
var robots = new List<int>();
```

```csharp
// csharp_style_var_when_type_is_apparent = false:error
List<int> robots = new List<int>();
```

```csharp
// dotnet_sort_system_directives_first = true
using System;
using System.Collections.Generic;
```

```csharp
// dotnet_sort_system_directives_first = false
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
```

```csharp
// dotnet_style_coalesce_expression = true:error
int? sunSize = null;
var blackHole = sunSize ?? 10000;
```

```csharp

// dotnet_style_coalesce_expression = false:error
var secondBlackHole = sunSize != null ? sunSize : 10000;
```

```csharp
// dotnet_style_collection_initializer = true:error
var shieldsPower = new List<int> { 42, 13 };
```

```csharp
// dotnet_style_collection_initializer = false:error
var shieldsPower = new List<int>();
shieldsPower.Add(42);
shieldsPower.Add(13);
```

```csharp
// dotnet_style_null_propagation = true:error
var smallSpaceShip = spaceShipFactory?.Build();
```

```csharp
// dotnet_style_null_propagation = false:error
var smallSpaceShip = spaceShipFactory == null ? null : spaceShipFactory.Build();
```

```csharp
// dotnet_style_object_initializer = true:error
var bigSpaceShip = new SpaceShip
{
    Name = "Meissa"
};
```

```csharp
// dotnet_style_object_initializer = false:error
var bigSpaceShip = new SpaceShip();
bigSpaceShip.Name = "Meissa";
```

## High-Quality Automated Tests- Top 10 EditorConfig Coding Styles Part 1

```csharp
bool isEarthRound = false;
// csharp_indent_block_contents = true
if (isEarthRound)
{
    var answerOfUniverse = 42;
}
```

```csharp
// csharp_indent_block_contents = false
if (isEarthRound)
{
    var answerOfUniverse = 42;
}
```

```csharp
var answerOfEverything = 42;
// csharp_indent_case_contents = true
switch (answerOfEverything)
{
    case 42:
        break;
    case 13:
        break;
}
```

```csharp
var answerOfEverything = 42;
// csharp_indent_case_contents = false
switch (answerOfEverything)
{
    case 42:
        break;
    case 13:
        break;
}
```

```csharp
// csharp_prefer_braces = true:error
if (isEarthRound)
{
    return;
}
```

```csharp
// csharp_prefer_braces = false:error
if (isEarthRound)
    return;
```

```csharp
// csharp_space_after_keywords_in_control_flow_statements = true
if (isEarthRound)
{
}
while (isEarthRound)
{
}
```

```csharp
// csharp_space_after_keywords_in_control_flow_statements = false
if (isEarthRound)
{
}
while (isEarthRound)
{
}
```

```csharp
// csharp_space_before_colon_in_inheritance_clause = true
public class SpaceShipOne : Rocket
```

```csharp
// csharp_space_before_colon_in_inheritance_clause = false
public class SpaceShipOne : Rocket
```

```csharp
// csharp_style_conditional_delegate_call = true:error
spaceshipOne?.Invoke("98");
```

```csharp
// csharp_style_conditional_delegate_call = false:error
if (spaceshipOne != null)
{
    spaceshipOne("98");
}
```

```csharp
// csharp_style_expression_bodied_accessors = true:error
private int? fuelType;
public int? FuelType
{
    get => this.fuelType;
    set => this.fuelType = value;
}
```

```csharp
// csharp_style_expression_bodied_accessors = false:error
private int fuelType1;
public int FuelType1
{
    get { return this.fuelType1; }
    set { this.fuelType1 = value; }
}
```

```csharp
// csharp_style_expression_bodied_constructors = true:error
public SampleRulesCode() => FuelType = 100;
```

```csharp
// csharp_style_expression_bodied_constructors = false:error
public SampleRulesCode()
{
    FuelType = 100;
}
```

```csharp
// csharp_style_expression_bodied_indexers = false:error
public int this[int i]
{
    get { return 42; }
}
```

```csharp
// csharp_style_expression_bodied_methods = true:error
public int CalculateAnswerOfEverything() => 42;
```

```csharp
// csharp_style_expression_bodied_methods = false:error
public int CalculateAnswerOfEverything()
{
    return 42;
}
```

## High-Quality Automated Tests- Consistent Coding Styles Using EditorConfig

```csharp
# top-most EditorConfig file
root = true
# Don't use tabs for indentation.
[*]
indent_style = space
end_of_line = crlf
# CSharp code style settings:
[*.cs]
# Prefer "var" everywhere
csharp_style_var_for_built_in_types = true : suggestion
csharp_style_var_when_type_is_apparent = true : suggestion
csharp_style_var_elsewhere = true : suggestion
# Prefer method-like constructs to have a block body
csharp_style_expression_bodied_methods = false : none
csharp_style_expression_bodied_constructors = false : none
csharp_style_expression_bodied_operators = false : none
# Prefer property-like constructs to have an expression-body
csharp_style_expression_bodied_properties = true : none
csharp_style_expression_bodied_indexers = true : none
csharp_style_expression_bodied_accessors = true : none
# Suggest more modern language features when available
csharp_style_pattern_matching_over_is_with_cast_check = true : suggestion
csharp_style_pattern_matching_over_as_with_null_check = true : suggestion
csharp_style_inlined_variable_declaration = true : suggestion
csharp_style_throw_expression = true : suggestion
csharp_style_conditional_delegate_call = true : suggestion
# Newline settings
csharp_new_line_before_open_brace = all
csharp_new_line_before_else = true
csharp_new_line_before_catch = true
csharp_new_line_before_finally = true
csharp_new_line_before_members_in_object_initializers = true
csharp_new_line_before_members_in_anonymous_types = true
# Dotnet code style settings:
[*.{cs, vb}]
# Sort using and Import directives with System.* appearing first
dotnet_sort_system_directives_first = true
# Avoid "this." and "Me." if not necessary
dotnet_style_qualification_for_field = false : suggestion
dotnet_style_qualification_for_property = false : suggestion
dotnet_style_qualification_for_method = false : suggestion
dotnet_style_qualification_for_event = false : suggestion
# Use language keywords instead of framework type names for type references
dotnet_style_predefined_type_for_locals_parameters_members = true : suggestion
dotnet_style_predefined_type_for_member_access = true : suggestion
# Suggest more modern language features when available
dotnet_style_object_initializer = true : suggestion
dotnet_style_collection_initializer = true : suggestion
dotnet_style_coalesce_expression = true : suggestion
dotnet_style_null_propagation = true : suggestion
dotnet_style_explicit_tuple_names = true : suggestion
```

## Create Multiple Files Page Objects with Visual Studio Item Templates

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    [FindsBy(How = How.Id, Using = "sb_form_q")]
    public IWebElement SearchBox { get; set; }
    [FindsBy(How = How.Id, Using = "sb_form_go")]
    public IWebElement GoButton { get; set; }
    [FindsBy(How = How.Id, Using = "b_tween")]
    public IWebElement ResultsCountDiv { get; set; }
    public void Navigate()
    {
        this.driver.Navigate().GoToUrl(this.url);
    }
    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }
    public void ValidateResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
public partial class SearchEngineMainPage : BasePage
{
    public SearchEngineMainPage(IWebDriver driver) : base(driver)
    {
    }
    public override string Url
    {
        get
        {
            return @"searchEngineUrl";
        }
    }
    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }
    public int GetResultsCount()
    {
        int resultsCount = default(int);
        resultsCount = int.Parse(this.ResultsCountDiv.Text);
        return resultsCount;
    }
}
```

```csharp
public partial class SearchEngineMainPage : BasePage
{
    public IWebElement SearchBox
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_q"));
        }
    }
    public IWebElement GoButton
    {
        get
        {
            return this.driver.FindElement(By.Id("sb_form_go"));
        }
    }
    public IWebElement ResultsCountDiv
    {
        get
        {
            return this.driver.FindElement(By.Id("b_tween"));
        }
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCountIsAsExpected(int expectedCount)
    {
        Assert.AreEqual(this.ResultsCountDiv.Text, expectedCount, "The results count is not as expected.");
    }
}
```

```csharp
public static class SearchEngineMainPageAsserter
{
    public static void AssertResultsCountIsAsExpected(this SearchEngineMainPage page, int expectedCount)
    {
        Assert.AreEqual(page.ResultsCountDiv.Text, expectedCount, "The results count is not as expected.");
    }
}
```

```xml
<VSTemplate Version="3.0.0"
	xmlns="http://schemas.microsoft.com/developer/vstemplate/2005" Type="Item">
	<TemplateData>
		<DefaultName>SystemTestingFrameworkPage.cs</DefaultName>
		<Name>SystemTestingFrameworkPage</Name>
		<Description>Creates system testing framework's page, element map and asserter</Description>
		<ProjectType>CSharp</ProjectType>
		<SortOrder>10</SortOrder>
		<Icon>__TemplateIcon.png</Icon>
		<PreviewImage>__PreviewImage.png</PreviewImage>
	</TemplateData>
	<TemplateContent>
		<References />
		<ProjectItem SubType="" TargetFileName="$fileinputname$.cs" ReplaceParameters="true">TestPage.cs</ProjectItem>
	</TemplateContent>
</VSTemplate>
```

```csharp
// <copyright file="$safeitemname$.cs" company="Automate The Planet Ltd.">
// Copyright 2016 Automate The Planet Ltd.
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// <author>Anton Angelov</author>
// <site>https://automatetheplanet.com/</site>
using System;
using OpenQA.Selenium;
namespace $rootnamespace$
{
public partial class $safeitemname$
{
private IWebDriver driver;
public $safeitemname$(IWebDriver driver) : base(driver)
{
this.asserter = asserter;
}
public void SampleAction()
{
}
}
}
```

```csharp
// <copyright file="$safeitemname$.Map.cs" company="Automate The Planet Ltd.">
// Copyright 2016 Automate The Planet Ltd.
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// <author>Anton Angelov</author>
// <site>https://automatetheplanet.com/</site>
using OpenQA.Selenium;
namespace $rootnamespace$
{
public partial class $safeitemname$
{
/*
public IWebElement SuccessMessage
{
get
{
return this.driver.FindElement(By.Id("lblSuccessMessage"));
}
}
*/
}
}
```

```csharp
// <copyright file="$safeitemname$.Asserter.cs" company="Automate The Planet Ltd.">
// Copyright 2016 Automate The Planet Ltd.
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// <author>Anton Angelov</author>
// <site>https://automatetheplanet.com/</site>
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace $rootnamespace$
{
public partial class $safeitemname$
{
public void AssertSomething()
{
    Assert.IsTrue(true);
}
}
}
```

```xml
<VSTemplate Version="3.0.0"
	xmlns="http://schemas.microsoft.com/developer/vstemplate/2005" Type="Item">
	<TemplateData>
		<DefaultName>SystemTestingFrameworkPage.cs</DefaultName>
		<Name>SystemTestingFrameworkPage</Name>
		<Description>Creates system testing framework's page, element map and asserter</Description>
		<ProjectType>CSharp</ProjectType>
		<SortOrder>10</SortOrder>
		<Icon>__TemplateIcon.png</Icon>
		<PreviewImage>__PreviewImage.png</PreviewImage>
	</TemplateData>
	<TemplateContent>
		<References />
		<ProjectItem SubType="" TargetFileName="$fileinputname$.cs" ReplaceParameters="true">TestPage.cs</ProjectItem>
		<ProjectItem SubType="" TargetFileName="$fileinputname$.Map.cs" ReplaceParameters="true">TestPage.Map.cs</ProjectItem>
		<ProjectItem SubType="" TargetFileName="$fileinputname$.Asserter.cs" ReplaceParameters="true">TestPage.Asserter.cs</ProjectItem>
	</TemplateContent>
</VSTemplate>
```

## Standardize Page Objects with Visual Studio Item Templates

```csharp
public class SearchEngineMainPage
{
    private readonly IWebDriver driver;
    private readonly string url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser)
    {
        this.driver = browser;
        PageFactory.InitElements(browser, this);
    }
    [FindsBy(How = How.Id, Using = "sb_form_q")]
    public IWebElement SearchBox { get; set; }
    [FindsBy(How = How.Id, Using = "sb_form_go")]
    public IWebElement GoButton { get; set; }
    [FindsBy(How = How.Id, Using = "b_tween")]
    public IWebElement ResultsCountDiv { get; set; }
    public void Navigate()
    {
        this.driver.Navigate().GoToUrl(this.url);
    }
    public void Search(string textToType)
    {
        this.SearchBox.Clear();
        this.SearchBox.SendKeys(textToType);
        this.GoButton.Click();
    }
    public void ValidateResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
```

```csharp
// <copyright file="PageTemplate.cs" company="Automate The Planet Ltd.">
// Copyright 2016 Automate The Planet Ltd.
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// <author>Anton Angelov</author>
// <site>https://automatetheplanet.com/</site>
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
namespace PageObjectPattern.Selenium.SearchEngine.Pages
{
    public class PageTemplate
    {
        private readonly IWebDriver driver;
        private readonly string url = @"searchEngineUrl";
        public PageTemplate(IWebDriver browser)
        {
            this.driver = browser;
            PageFactory.InitElements(browser, this);
        }
        [FindsBy(How = How.Id, Using = "sb_form_q")]
        public IWebElement SampleElement { get; set; }
        public void Navigate()
        {
            this.driver.Navigate().GoToUrl(this.url);
        }
        public void SampleAction()
        {
        }
        public void AssertIsTrue(bool expectedCondition = true)
        {
            Assert.IsTrue(expectedCondition);
        }
    }
}
```

```csharp
// <copyright file="MyNewPage.cs" company="Automate The Planet Ltd.">
// Copyright 2016 Automate The Planet Ltd.
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// <author>Anton Angelov</author>
// <site>https://automatetheplanet.com/</site>
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
namespace PageObjectPattern
{
    public class MyNewPage
    {
        private readonly IWebDriver driver;
        private readonly string url = @"searchEngineUrl";
        public MyNewPage(IWebDriver browser)
        {
            this.driver = browser;
            PageFactory.InitElements(browser, this);
        }
        [FindsBy(How = How.Id, Using = "sb_form_q")]
        public IWebElement SampleElement { get; set; }
        public void Navigate()
        {
            this.driver.Navigate().GoToUrl(this.url);
        }
        public void SampleAction()
        {
        }
        public void AssertIsTrue(bool expectedCondition = true)
        {
            Assert.IsTrue(expectedCondition);
        }
    }
}
```

```xml
<VSTemplate Version="3.0.0"
	xmlns="http://schemas.microsoft.com/developer/vstemplate/2005" Type="Item">
	<TemplateData>
		<DefaultName>WebDriverPageObjectItemTemplate.cs</DefaultName>
		<Name>WebDriverPageObjecttemTemplate</Name>
		<Description>Creates a WebDriver Page Object</Description>
		<ProjectType>CSharp</ProjectType>
		<SortOrder>10</SortOrder>
		<Icon>__TemplateIcon.png</Icon>
		<PreviewImage>__PreviewImage.png</PreviewImage>
	</TemplateData>
	<TemplateContent>
		<References />
		<ProjectItem SubType="" TargetFileName="$fileinputname$.cs" ReplaceParameters="true">PageTemplate.cs</ProjectItem>
	</TemplateContent>
</VSTemplate>
```

## CodeProject Statistics Calculator Using WebDriver

```csharp
public partial class ArticlesPage : BasePage
{
    private string viewsRegex = @".*Views: (?<Views>[0-9,]{1,})";
    private string publishDateRegex = @".*Posted: (?<PublishDate>[0-9,A-Za-z ]{1,})";
    private readonly int profileId;
    public ArticlesPage(IWebDriver driver, int profileId) : base(driver)
    {
        this.profileId = profileId;
    }
    public override string Url
    {
        get
        {
            return string.Format("https://www.codeproject.com/script/Articles/MemberArticles.aspx?amid={0}", this.profileId);
        }
    }
    public void Navigate(string part)
    {
        base.Open(part);
    }
    public List<Article> GetArticlesByUrl(string sectionPart)
    {
        this.Navigate(sectionPart);
        var articlesInfos = new List<Article>();
        foreach (var articleRow in this.ArticlesRows.ToList())
        {
            if (!articleRow.Displayed)
            {
                continue;
            }
            var article = new Article();
            var articleTitleElement = this.GetArticleTitleElement(articleRow);
            article.Title = articleTitleElement.GetAttribute("innerHTML");
            article.Url = articleTitleElement.GetAttribute("href");
            var articleStatisticsElement = this.GetArticleStatisticsElement(articleRow);
            string articleStatisticsElementSource = articleStatisticsElement.GetAttribute("innerHTML");
            if (!string.IsNullOrEmpty(articleStatisticsElementSource))
            {
                article.Views = this.GetViewsCount(articleStatisticsElementSource);
                article.PublishDate = this.GetPublishDate(articleStatisticsElementSource);
            }
            articlesInfos.Add(article);
        }
        return articlesInfos;
    }
    private double GetViewsCount(string articleStatisticsElementSource)
    {
        var regexViews = new Regex(viewsRegex, RegexOptions.Singleline);
        Match currentMatch = regexViews.Match(articleStatisticsElementSource);
        if (!currentMatch.Success)
        {
            throw new ArgumentException("No content for the current statistics element.");
        }
        return double.Parse(currentMatch.Groups["Views"].Value);
    }
    private DateTime GetPublishDate(string articleStatisticsElementSource)
    {
        var regexPublishDate = new Regex(publishDateRegex, RegexOptions.IgnorePatternWhitespace);
        Match currentMatch = currentMatch = regexPublishDate.Match(articleStatisticsElementSource);
        if (!currentMatch.Success)
        {
            throw new ArgumentException("No content for the current statistics element.");
        }
        return DateTime.Parse(currentMatch.Groups["PublishDate"].Value);
    }
}
```

```csharp
public ReadOnlyCollection<IWebElement> ArticlesRows
{
    get
    {
        return this.driver.FindElements(By.XPath("//tr[contains(@id,'CAR_MainArticleRow')]"));
    }
}
```

```csharp
public IWebElement GetArticleStatisticsElement(IWebElement articleRow)
{
    return articleRow.FindElement(By.CssSelector("div[id$='CAR_SbD']"));
}
```

```csharp
private string viewsRegex = @".*Views: (?<Views>[0-9,]{1,})";
private string publishDateRegex = @".*Posted: (?<PublishDate>[0-9,A-Za-z ]{1,})";
private double GetViewsCount(string articleStatisticsElementSource)
{
    var regexViews = new Regex(viewsRegex, RegexOptions.Singleline);
    Match currentMatch = regexViews.Match(articleStatisticsElementSource);
    if (!currentMatch.Success)
    {
        throw new ArgumentException("No content for the current statistics element.");
    }
    return double.Parse(currentMatch.Groups["Views"].Value);
}
private DateTime GetPublishDate(string articleStatisticsElementSource)
{
    var regexPublishDate = new Regex(publishDateRegex, RegexOptions.IgnorePatternWhitespace);
    Match currentMatch = currentMatch = regexPublishDate.Match(articleStatisticsElementSource);
    if (!currentMatch.Success)
    {
        throw new ArgumentException("No content for the current statistics element.");
    }
    return DateTime.Parse(currentMatch.Groups["PublishDate"].Value);
}
```

```csharp
class Program
{
    private static string filePath = string.Empty;
    private static string yearInput = string.Empty;
    private static int year = -1;
    private static int profileId = 0;
    private static string profileIdInput = string.Empty;
    private static List<Article> articlesInfos;
    static void Main(string[] args)
    {
        var commandLineParser = new FluentCommandLineParser();
        commandLineParser.Setup<string>('p', "path").Callback(s => filePath = s);
        commandLineParser.Setup<string>('y', "year").Callback(y => yearInput = y);
        commandLineParser.Setup<string>('i', "profileId").Callback(p => profileIdInput = p);
        commandLineParser.Parse(args);
        bool isProfileIdCorrect = int.TryParse(profileIdInput, out profileId);
        if (string.IsNullOrEmpty(profileIdInput) || !isProfileIdCorrect)
        {
            Console.WriteLine("Please specify a correct profileId.");
            return;
        }
        if (string.IsNullOrEmpty(filePath))
        {
            Console.WriteLine("Please specify a correct file path.");
            return;
        }
        if (!string.IsNullOrEmpty(yearInput))
        {
            bool isYearCorrect = int.TryParse(yearInput, out year);
            if (!isYearCorrect)
            {
                Console.WriteLine("Please specify a correct year!");
                return;
            }
        }
        articlesInfos = GetAllArticlesInfos();
        if (year == -1)
        {
            CreateReportAllTime();
        }
        else
        {
            CreateReportYear();
        }
        Console.WriteLine("Total VIEWS: {0}", articlesInfos.Sum(x => x.Views));
        Console.ReadLine();
    }
    private static void CreateReportAllTime()
    {
        TextWriter textWriter = new StreamWriter(filePath);
        var csv = new CsvWriter(textWriter);
        csv.WriteRecords(articlesInfos.OrderByDescending(x => x.Views));
    }
    private static void CreateReportYear()
    {
        TextWriter currentYearTextWriter = new StreamWriter(filePath);
        var csv = new CsvWriter(currentYearTextWriter);
        csv.WriteRecords(articlesInfos.Where(x => x.PublishDate.Year.Equals(year)).OrderByDescending(x => x.Views));
    }
    private static List<Article> GetAllArticlesInfos()
    {
        var articlesInfos = new List<Article>();
        using (var driver = new ChromeDriver())
        {
            var articlePage = new ArticlesPage(driver, profileId);
            articlesInfos.AddRange(articlePage.GetArticlesByUrl("#Articles"));
        }
        using (var driver = new ChromeDriver())
        {
            var articlePage = new ArticlesPage(driver, profileId);
            articlesInfos.AddRange(articlePage.GetArticlesByUrl("#TechnicalBlog"));
        }
        using (var driver = new ChromeDriver())
        {
            var articlePage = new ArticlesPage(driver, profileId);
            articlesInfos.AddRange(articlePage.GetArticlesByUrl("#Tip"));
        }
        return articlesInfos;
    }
}
```

```csharp
var commandLineParser = new FluentCommandLineParser();
commandLineParser.Setup<string>('p', "path").Callback(s => filePath = s);
commandLineParser.Setup<string>('y', "year").Callback(y => yearInput = y);
commandLineParser.Setup<string>('i', "profileId").Callback(p => profileIdInput = p);
commandLineParser.Parse(args);
```

```csharp
private static void CreateReportAllTime()
{
    TextWriter textWriter = new StreamWriter(filePath);
    var csv = new CsvWriter(textWriter);
    csv.WriteRecords(articlesInfos.OrderByDescending(x => x.Views));
}
```

## How Visual Studio Code Snippets Can Speed up Tests’ Writing

```csharp
for (int i = 0; i < length; i++)
{
}
```

```csharp
public int MyProperty { get; set; }
```

```csharp
public partial class SearchEngineMainPage
{
    public ISearch SearchBox
    {
        get
        {
            return this.ElementFinder.Find<ISearch>(By.Id("sb_form_q"));
        }
    }
    public IInputSubmit GoButton
    {
        get
        {
            return this.ElementFinder.Find<IInputSubmit>(By.Id("sb_form_go"));
        }
    }
    public IDiv ResultsCountDiv
    {
        get
        {
            return this.ElementFinder.Find<IDiv>(By.Id("b_tween"));
        }
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<CodeSnippets
	xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet">
	<CodeSnippet Format="1.0.0">
		<Header>
			<Title>anchor</Title>
			<Shortcut>eanchor</Shortcut>
			<Description>Code snippet for 'anchor' element</Description>
			<Author>Automate The Planet Ltd.</Author>
			<SnippetTypes>
				<SnippetType>Expansion</SnippetType>
			</SnippetTypes>
		</Header>
		<Snippet>
			<Declarations>
				<Literal>
					<ID>name</ID>
					<Default>MyAnchor</Default>
					<ToolTip>The name of the anchor element</ToolTip>
				</Literal>
				<Literal>
					<ID>locatorType</ID>
					<Default>Id</Default>
					<ToolTip>The type of the element locator</ToolTip>
				</Literal>
				<Literal>
					<ID>locator</ID>
					<Default>myUniqueId</Default>
					<ToolTip>The actual locator for the element</ToolTip>
				</Literal>
			</Declarations>
			<Code Language="csharp">
				<![CDATA[public IAnchor $name$
{
get
{
return this.ElementFinder.Find<IAnchor>(By.$locatorType$("$locator$"));
}
}]]>
			</Code>
		</Snippet>
	</CodeSnippet>
</CodeSnippets>
```

```csharp
public IAnchor MyAnchor
{
    get
    {
        return this.ElementFinder.Find<IAnchor>(By.Id("myUniqueId"));
    }
}
```

```xml
<Declarations>
	<Literal>
		<ID>name</ID>
		<Default>MyAnchor</Default>
		<ToolTip>The name of the anchor element</ToolTip>
	</Literal>
	<Literal>
		<ID>locatorType</ID>
		<Default>Id</Default>
		<ToolTip>The type of the element locator</ToolTip>
	</Literal>
	<Literal>
		<ID>locator</ID>
		<Default>myUniqueId</Default>
		<ToolTip>The actual locator for the element</ToolTip>
	</Literal>
</Declarations>
```

```xml

<Code Language="csharp">
	<![CDATA[public IAnchor $name$
{
get
{
return this.ElementFinder.Find<IAnchor>(By.$locatorType$("$locator$"));
}
}]]>
</Code>
```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<CodeSnippets
	xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet">
	<CodeSnippet Format="1.0.0">
		<Header>
			<Title>anyelement</Title>
			<Shortcut>anyelement</Shortcut>
			<Description>Code snippet for any element</Description>
			<Author>Automate The Planet Ltd.</Author>
			<SnippetTypes>
				<SnippetType>Expansion</SnippetType>
			</SnippetTypes>
		</Header>
		<Snippet>
			<Declarations>
				<Literal>
					<ID>elementType</ID>
					<Default>IElement</Default>
					<ToolTip>The type of the element</ToolTip>
				</Literal>
				<Literal>
					<ID>name</ID>
					<Default>MyElement</Default>
					<ToolTip>The name of the element</ToolTip>
				</Literal>
				<Literal>
					<ID>locatorType</ID>
					<Default>Id</Default>
					<ToolTip>The type of the element locator</ToolTip>
				</Literal>
				<Literal>
					<ID>locator</ID>
					<Default>myUniqueId</Default>
					<ToolTip>The actual locator for the element</ToolTip>
				</Literal>
			</Declarations>
			<Code Language="csharp">
				<![CDATA[public $elementType$ $name$
{
get
{
return this.ElementFinder.Find<$elementType$>(By.$locatorType$("$locator$"));
}
}]]>
			</Code>
		</Snippet>
	</CodeSnippet>
</CodeSnippets>
```

```csharp
public IElement MyElement
{
    get
    {
        return this.ElementFinder.Find<IElement>(By.Id("myUniqueId"));
    }
}
```

```csharp
var myPage = this.Container.Resolve<MyPage>();
```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<CodeSnippets
	xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet">
	<CodeSnippet Format="1.0.0">
		<Header>
			<Title>resolvepage</Title>
			<Shortcut>rpage</Shortcut>
			<Description>Code snippet for resolving page</Description>
			<Author>Automate The Planet Ltd.</Author>
			<SnippetTypes>
				<SnippetType>Expansion</SnippetType>
			</SnippetTypes>
		</Header>
		<Snippet>
			<Declarations>
				<Literal>
					<ID>pageName</ID>
					<Default>myPage</Default>
					<ToolTip>The name of the resolved page.</ToolTip>
				</Literal>
				<Literal>
					<ID>pageType</ID>
					<Default>MyPage</Default>
					<ToolTip>The type of the resolved page.</ToolTip>
				</Literal>
			</Declarations>
			<Code Language="csharp">
				<![CDATA[var $pageName$ = this.Container.Resolve<$pageType$>();]]>
			</Code>
		</Snippet>
	</CodeSnippet>
</CodeSnippets>
```

## Jenkins C# API Library for Triggering Builds

```csharp
public class HttpAdapter : IHttpAdapter
{
    public string Get(string url)
    {
        string responseString = string.Empty;
        var request = (HttpWebRequest)WebRequest.Create(url);
        var httpResponse = (HttpWebResponse)request.GetResponse();
        Stream resStream = httpResponse.GetResponseStream();
        var reader = new StreamReader(resStream);
        responseString = reader.ReadToEnd();
        resStream.Close();
        reader.Close();
        return responseString;
    }
    public string Post(string url, string postData)
    {
        WebRequest request = WebRequest.Create(url);
        request.Method = "POST";
        byte[] byteArray = Encoding.UTF8.GetBytes(postData);
        request.ContentType = "application/x-www-form-urlencoded";
        request.ContentLength = byteArray.Length;
        Stream dataStream = request.GetRequestStream();
        dataStream.Write(byteArray, 0, byteArray.Length);
        dataStream.Close();
        WebResponse response = request.GetResponse();
        dataStream = response.GetResponseStream();
        var reader = new StreamReader(dataStream);
        string responseFromServer = reader.ReadToEnd();
        reader.Close();
        dataStream.Close();
        response.Close();
        return responseFromServer;
    }
}
```

```csharp
public string TriggerBuild(string tfsBuildNumber)
{
    string response = this.httpAdapter.Post(
    this.parameterizedQueueBuildUrl,
    string.Concat("TfsBuildNumber=", tfsBuildNumber));
    return response;
}
```

```csharp
internal string GenerateParameterizedQueueBuildUrl(
string jenkinsServerUrl,
string projectName)
{
    string resultUrl = string.Empty;
    Uri result = default(Uri);
    if (Uri.TryCreate(
    string.Concat(jenkinsServerUrl, "/job/", projectName, "/buildWithParameters"),
    UriKind.Absolute,
    out result))
    {
        resultUrl = result.AbsoluteUri;
    }
    else
    {
        throw new ArgumentException(
        "The Parameterized Queue Build Url was not created correctly.");
    }
    return resultUrl;
}
```

```csharp
internal string GenerateBuildStatusUrl(string jenkinsServerUrl, string projectName)
{
    string resultUrl = string.Empty;
    Uri result = default(Uri);
    if (Uri.TryCreate(
    string.Concat(jenkinsServerUrl, "/job/", projectName, "/api/xml"),
    UriKind.Absolute,
    out result))
    {
        resultUrl = result.AbsoluteUri;
    }
    else
    {
        throw new ArgumentException(
        "The Build status Url was not created correctly.");
    }
    return resultUrl;
}
```

```xml
<freeStyleProject>
	<action>
		<parameterDefinition>
			<defaultParameterValue>
				<value/>
			</defaultParameterValue>
			<description/>
			<name>TfsBuildNumber</name>
			<type>StringParameterDefinition</type>
		</parameterDefinition>
	</action>
	<action/>
	<description/>
	<displayName>Jenkins-CSharp-Api.Parameterized</displayName>
	<name>Jenkins-CSharp-Api.Parameterized</name>
	<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/
</url>
	<buildable>true</buildable>
	<build>
		<number>5</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/5/
</url>
	</build>
	<build>
		<number>4</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/4/
</url>
	</build>
	<build>
		<number>3</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/3/
</url>
	</build>
	<build>
		<number>2</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/2/
</url>
	</build>
	<build>
		<number>1</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/1/
</url>
	</build>
	<color>blue</color>
	<firstBuild>
		<number>1</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/1/
</url>
	</firstBuild>
	<healthReport>
		<description>Build stability: No recent builds failed.</description>
		<iconClassName>icon-health-80plus</iconClassName>
		<iconUrl>health-80plus.png</iconUrl>
		<score>100</score>
	</healthReport>
	<inQueue>false</inQueue>
	<keepDependencies>false</keepDependencies>
	<lastBuild>
		<number>5</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/5/
</url>
	</lastBuild>
	<lastCompletedBuild>
		<number>5</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/5/
</url>
	</lastCompletedBuild>
	<lastStableBuild>
		<number>5</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/5/
</url>
	</lastStableBuild>
	<lastSuccessfulBuild>
		<number>5</number>
		<url>
http://jenkins.aangelov.com/job/Jenkins-CSharp-Api.Parameterized/5/
</url>
	</lastSuccessfulBuild>
	<nextBuildNumber>6</nextBuildNumber>
	<property>
		<parameterDefinition>
			<defaultParameterValue>
				<name>TfsBuildNumber</name>
				<value/>
			</defaultParameterValue>
			<description/>
			<name>TfsBuildNumber</name>
			<type>StringParameterDefinition</type>
		</parameterDefinition>
	</property>
	<concurrentBuild>false</concurrentBuild>
	<scm/>
</freeStyleProject>
```

```csharp
internal string GenerateSpecificBuildNumberStatusUrl(
string buildNumber,
string jenkinsServerUrl,
string projectName)
{
    string generatedUrl = string.Empty;
    Uri result = default(Uri);
    if (Uri.TryCreate(
    string.Concat(jenkinsServerUrl, "/job/", projectName, "/", buildNumber, "/api/xml"),
    UriKind.Absolute,
    out result))
    {
        generatedUrl = result.AbsoluteUri;
    }
    else
    {
        throw new ArgumentException(
        "The Specific Build Number Url was not created correctly.");
    }
    return generatedUrl;
}
```

```csharp
internal string GetXmlNodeValue(string xmlContent, string xmlNodeName)
{
    IEnumerable<XElement> foundElemenets =
    this.GetAllElementsWithNodeName(xmlContent, xmlNodeName);
    if (foundElemenets.Count() == 0)
    {
        throw new Exception(
        string.Format("No elements were found for node {0}", xmlNodeName));
    }
    string elementValue = foundElemenets.First().Value;
    return elementValue;
}
internal IEnumerable<XElement> GetAllElementsWithNodeName(
string xmlContent,
string xmlNodeName)
{
    XDocument document = XDocument.Parse(xmlContent);
    XElement root = document.Root;
    IEnumerable<XElement> foundElemenets =
    from element in root.Descendants(xmlNodeName)
    select element;
    return foundElemenets;
}
```

```csharp
public int GetQueuedBuildNumber(string xmlContent, string queuedBuildName)
{
    IEnumerable<XElement> buildElements =
    this.GetAllElementsWithNodeName(xmlContent, "build");
    string nextBuildNumberStr = string.Empty;
    int nextBuildNumber = -1;
    foreach (XElement currentElement in buildElements)
    {
        nextBuildNumberStr = currentElement.Element("number").Value;
        string currentBuildSpecificUrl =
        this.GenerateSpecificBuildNumberStatusUrl(
        nextBuildNumberStr,
        this.jenkinsServerUrl,
        this.projectName);
        string newBuildStatus = this.httpAdapter.Get(currentBuildSpecificUrl);
        string currentBuildName = this.GetBuildTfsBuildNumber(newBuildStatus);
        if (queuedBuildName.Equals(currentBuildName))
        {
            nextBuildNumber = int.Parse(nextBuildNumberStr);
            Debug.WriteLine("The real build number is {0}", nextBuildNumber);
            break;
        }
    }
    if (nextBuildNumber == -1)
    {
        throw new Exception(
        string.Format(
        "Build with name {0} was not find in the queued builds.",
        queuedBuildName));
    }
    return nextBuildNumber;
}
public string GetBuildTfsBuildNumber(string xmlContent)
{
    IEnumerable<XElement> foundElements =
    from el in this.GetAllElementsWithNodeName(xmlContent, "parameter").Elements()
    where el.Value == "TfsBuildNumber"
    select el;
    if (foundElements.Count() == 0)
    {
        throw new ArgumentException("The TfsBuildNumber was not set!");
    }
    string tfsBuildNumber =
    foundElements.First().NodesAfterSelf().OfType<XElement>().First().Value;
    return tfsBuildNumber;
}
public bool IsProjectBuilding(string xmlContent)
{
    bool isBuilding = false;
    string isBuildingStr = this.GetXmlNodeValue(xmlContent, "building");
    isBuilding = bool.Parse(isBuildingStr);
    return isBuilding;
}
public string GetBuildResult(string xmlContent)
{
    string buildResult = this.GetXmlNodeValue(xmlContent, "result");
    return buildResult;
}
public string GetNextBuildNumber(string xmlContent)
{
    string nextBuildNumber = this.GetXmlNodeValue(xmlContent, "nextBuildNumber");
    return nextBuildNumber;
}
public string GetUserName(string xmlContent)
{
    string userName = this.GetXmlNodeValue(xmlContent, "userName");
    return userName;
}
```

```csharp
public string Run(string tfsBuildNumber)
{
    if (string.IsNullOrEmpty(tfsBuildNumber))
    {
        tfsBuildNumber = Guid.NewGuid().ToString();
    }
    string nextBuildNumber = this.GetNextBuildNumber();
    this.TriggerBuild(tfsBuildNumber, nextBuildNumber);
    this.WaitUntilBuildStarts(nextBuildNumber);
    string realBuildNumber = this.GetRealBuildNumber(tfsBuildNumber);
    this.buildAdapter.InitializeSpecificBuildUrl(realBuildNumber);
    this.WaitUntilBuildFinish(realBuildNumber);
    string buildResult = this.GetBuildStatus(realBuildNumber);
    return buildResult;
}
```

```csharp
internal string TriggerBuild(string tfsBuildNumber, string nextBuildNumber)
{
    string buildStatus = string.Empty;
    bool isAlreadyBuildTriggered = false;
    try
    {
        buildStatus = this.buildAdapter.GetSpecificBuildStatusXml(nextBuildNumber);
        Debug.WriteLine(buildStatus);
    }
    catch (WebException ex)
    {
        if (!ex.Message.Equals("The remote server returned an error: (404) Not Found."))
        {
            isAlreadyBuildTriggered = true;
        }
    }
    if (isAlreadyBuildTriggered)
    {
        throw new Exception("Another build with the same build number is already triggered.");
    }
    string response = this.buildAdapter.TriggerBuild(tfsBuildNumber);
    return response;
}
```

```csharp
internal void WaitUntilBuildFinish(string realBuildNumber)
{
    bool shouldContinue = false;
    string buildStatus = string.Empty;
    do
    {
        buildStatus = this.buildAdapter.GetSpecificBuildStatusXml(realBuildNumber);
        bool isProjectBuilding = this.buildAdapter.IsProjectBuilding(buildStatus);
        if (!isProjectBuilding)
        {
            shouldContinue = true;
        }
        Debug.WriteLine("Waits 5 seconds before the new check if the build is completed...");
        Thread.Sleep(5000);
    }
    while (!shouldContinue);
}
```

## Jenkins Get Source Code By Specific TFS Changeset

```powershell
%TFS% workspaces -format:brief -server:{your-tfs-team-project-collection-url}
%TFS% workspace -new Hudson-%JOB_NAME%-MASTER;{your-domain-user-name} -noprompt -server:{your-tfs-team-project-collection-url}
%TFS% workfold -map $/{tfs-path-to-your-sln} C:\Jenkins\jobs\%JOB_NAME%\workspace\ -workspace:Hudson-%JOB_NAME%-MASTER -server:{your-tfs-team-project-collection-url}
%TFS% get $/{tfs-path-to-your-sln} -force -recursive -version:%ChangesetNumber% -noprompt
%TFS% history $/{tfs-path-to-your-sln} -recursive -stopafter:1 -noprompt -version:%ChangesetNumber% -format:brief -server:{your-tfs-team-project-collection-url}

```

```powershell

%TFS% workspaces -format:brief -server:{your-tfs-team-project-collection-url}
%TFS% workspace -new Hudson-%JOB_NAME%-MASTER;{your-domain-user-name} -noprompt -server:{your-tfs-team-project-collection-url}
%TFS% workfold -map $/{tfs-path-to-your-sln} C:\Jenkins\jobs\%JOB_NAME%\workspace\ -workspace:Hudson-%JOB_NAME%-MASTER -server:{your-tfs-team-project-collection-url}
%TFS% get $/{tfs-path-to-your-sln} -force -recursive -noprompt
%TFS% history $/{tfs-path-to-your-sln} -recursive -stopafter:1 -noprompt -format:brief -server:{your-tfs-team-project-collection-url}
```

```powershell
IF "%ChangesetNumber%" == "" (
%TFS% workspaces -format:brief -server:{your-tfs-team-project-collection-url}
%TFS% workspace -new Hudson-%JOB_NAME%-MASTER;{your-domain-user-name} -noprompt -server:{your-tfs-team-project-collection-url}
%TFS% workfold -map $/{tfs-path-to-your-sln} C:\Jenkins\jobs\%JOB_NAME%\workspace\ -workspace:Hudson-%JOB_NAME%-MASTER -server:{your-tfs-team-project-collection-url}
%TFS% get $/{tfs-path-to-your-sln} -force -recursive -noprompt
%TFS% history $/{tfs-path-to-your-sln} -recursive -stopafter:1 -noprompt -format:brief -server:{your-tfs-team-project-collection-url}
) ELSE (
%TFS% workspaces -format:brief -server:{your-tfs-team-project-collection-url}
%TFS% workspace -new Hudson-%JOB_NAME%-MASTER;{your-domain-user-name} -noprompt -server:{your-tfs-team-project-collection-url}
%TFS% workfold -map $/{tfs-path-to-your-sln} C:\Jenkins\jobs\%JOB_NAME%\workspace\ -workspace:Hudson-%JOB_NAME%-MASTER -server:{your-tfs-team-project-collection-url}
%TFS% get $/{tfs-path-to-your-sln} -force -recursive -version:%ChangesetNumber% -noprompt
%TFS% history $/{tfs-path-to-your-sln} -recursive -stopafter:1 -noprompt -version:%ChangesetNumber% -format:brief -server:{your-tfs-team-project-collection-url}
)
```

## Output MSTest Tests Logs To Jenkins Console Log

```csharp
public static class Log
{
    public static void Write(string msg)
    {
        Console.WriteLine(msg);
    }

    public static void WriteFormat(string msgFormat, params object[] args)
    {
        string formattedString = string.Format(msgFormat, args);
        Console.WriteLine(formattedString);
    }

    public static void WriteLineFormat(string msgFormat, params object[] args)
    {
        string formattedString = string.Format(msgFormat, args);
        Console.WriteLine(formattedString);
        Console.WriteLine();
    }

    public static void WriteStringLine()
    {
        Console.WriteLine(new string('-', 30));
    }

    public static void WriteLine()
    {
        Console.WriteLine();
    }
}
```

```csharp
[TestMethod]
public void TestShiftByteArrayLeftNormalCase()
{
    byte[] inputByteArray = { 0, 1, 0, 3, 4 };
    int size = 5;

    byte[] expected = { 1, 0, 3, 4, 0 };
    byte[] actual = Encryptor.ShiftByteArrayLeft(inputByteArray, size);

    CollectionAssert.AreEqual(expected, actual, "There was a problem in shifting bytes left!");
    Log.WriteStringLine();
    Log.Write("There was a problem in shifting bytes left!");
    Log.WriteLine();
    Log.WriteFormat("Test args {0} and {1}", "#first#", "#second#");
    Log.WriteLineFormat("Test args {0} and {1}", "#first#", "#second#");
}
```

```powershell
"C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\mstest.exe" /resultsfile:"%WORKSPACE%\AutomationTestAssistant\Results.trx" /testcontainer:"%WORKSPACE%\AutomationTestAssistant\TestEncryption\bin\Release\TestEncryption.dll" /nologo /detail:stdout

```

# Free Tools

## UI Performance Analysis via Selenium WebDriver

```csharp
using DevTools = OpenQA.Selenium.DevTools.V91;
```

## Healenium: Self-Healing Library for Selenium-based Automated Tests

```bash
docker-compose up -d
```

## Test Automation Reporting with ReportPortal in .NET Projects

```bash
curl https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml -o docker-compose.yml
```

```bash
docker-compose -p reportportal up -d --force-recreate
```

```bash
dotnet vstest Bellatrix.Web.Tests.dll --testcasefilter:TestCategory=CI --logger:ReportPortal
```

## Test Automation Reporting with Allure in .NET Projects

```json
{
  "allure": {
    "directory": "allure-results",
    "links": [
      "https://github.com/AutomateThePlanet/Meissa/issues/{issue}",
      "https://github.com/AutomateThePlanet/Meissa/projects/2#card-{tms}",
      "{link}"
    ]
  }
}
```

```json
[
  {
    "name": "Ignored tests",
    "matchedStatuses": ["skipped"]
  },
  {
    "name": "Product Bug",
    "matchedStatuses": ["broken", "failed"],
    "messageRegex": ".*AssertionException.*"
  },
  {
    "name": "Calculator Problem",
    "matchedStatuses": ["failed"],
    "traceRegex": ".*DivideByZeroException.*"
  }
]
```

```xml
<ItemGroup>
    <Categories Include="categories.json" />
</ItemGroup>
<Target Name="CopyCategoriesToAllureFolder">
    <Copy SourceFiles="@(Categories)" DestinationFolder="$(OutputPath)allure-results" />
</Target>
<Target Name="PostBuild" AfterTargets="PostBuildEvent">
    <CallTarget Targets="CopyCategoriesToAllureFolder" />
</Target>
```

```bash
allure generate "allure-results-directory" --clean
```

```bash
allure open "allure-report-directory"
```
