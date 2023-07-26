---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

# Design and Architecture

## Benchmarking for Assessing Automated Test Components Performance

```csharp
[ClrJob(baseline: true), CoreJob, MonoJob, CoreRtJob]
[RPlotExporter, RankColumn]
public class Md5VsSha256
{
    private SHA256 sha256 = SHA256.Create();
    private MD5 md5 = MD5.Create();
    private byte[] data;
    [Params(1000, 10000)]
    public int N;
    [GlobalSetup]
    public void Setup()
    {
        data = new byte[N];
        new Random(42).NextBytes(data);
    }
    [Benchmark]
    public byte[] Sha256() => sha256.ComputeHash(data);
    [Benchmark]
    public byte[] Md5() => md5.ComputeHash(data);
}
public class Program
{
    public static void Main(string[] args)
    {
        var summary = BenchmarkRunner.Run<Md5VsSha256>();
    }
}
```

```csharp
public class ButtonClickBenchmark
{
    private const string TestPage = "http://htmlpreview.github.io/?https://github.com/angelovstanton/AutomateThePlanet/blob/master/WebDriver-Series/TestPage.html";
    private static IWebDriver _driver;
    private static IJavaScriptExecutor _javaScriptExecutor;
    [GlobalSetup]
    public void GlobalSetup()
    {
        _driver = new ChromeDriver(DriverExecutablePathResolver.GetDriverExecutablePath());
        _javaScriptExecutor = (IJavaScriptExecutor)_driver;
        _driver.Navigate().GoToUrl(TestPage);
    }
    [GlobalCleanup]
    public void GlobalCleanup()
    {
        _driver?.Dispose();
    }
    [Benchmark(Baseline = true)]
    public void BenchmarkWebDriverClick()
    {
        var buttons = _driver.FindElements(By.XPath("//input[@value='Submit']"));
        foreach (var button in buttons)
        {
            button.Click();
        }
    }
    [Benchmark]
    public void BenchmarkJavaScriptClick()
    {
        var buttons = _driver.FindElements(By.XPath("//input[@value='Submit']"));
        foreach (var button in buttons)
        {
            _javaScriptExecutor.ExecuteScript("arguments[0].click();", button);
        }
    }
}
```

```csharp
string assemblyFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
```

```csharp
public static class DriverExecutablePathResolver
{
    public static string GetDriverExecutablePath()
    {
        string assemblyFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        var directoryInfo = new DirectoryInfo(assemblyFolder);
        for (int i = 0; i < 4; i++)
        {
            directoryInfo = directoryInfo.Parent;
        }
        return directoryInfo.FullName;
    }
}
```

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        var summary = BenchmarkRunner.Run<ButtonClickBenchmark>();
        Console.WriteLine(summary);
    }
}
```

```csharp
[CsvExporter]
[HtmlExporter]
public class Program
{
    public static void Main(string[] args)
    {
        var summary = BenchmarkRunner.Run<ButtonClickBenchmark>();
        Console.WriteLine(summary);
    }
}
```

```csharp
[DisassemblyDiagnoser(printAsm: true, printSource: true)]
public class Program
{
    static void Main(string[] args)
    {
        var summary = BenchmarkRunner.Run<ButtonClickBenchmark>();
        Console.WriteLine(summary);
    }
}
```

```xml
<PropertyGroup>
    <PlatformTarget>AnyCPU</PlatformTarget>
    <DebugType>pdbonly</DebugType>
    <DebugSymbols>true</DebugSymbols>
</PropertyGroup>
```

```xml
<PropertyGroup>
    <DebugType>pdbonly</DebugType>
    <DebugSymbols>true</DebugSymbols>
</PropertyGroup>
```

```csharp
[EtwProfiler]
public class Program
{
    static void Main(string[] args)
    {
        var summary = BenchmarkRunner.Run<ButtonClickBenchmark>();
        Console.WriteLine(summary);
    }
}
```

## Simple Factory Design Pattern- WebDriver Anonymous Browsing with Reverse Proxy

```csharp
public static void GetListProxies()
{
    var options = new ChromeOptions();
    var chromeDriverService = ChromeDriverService.CreateDefaultService(Environment.CurrentDirectory);
    using (IWebDriver driver = new ChromeDriver(chromeDriverService, options))
    {
        driver.Navigate().GoToUrl("https://www.proxy-list.download/HTTPS");
        driver.FindElement(By.Id("btn3")).Click();
        _proxiesToCheck = new ConcurrentBag<string>(Clipboard.GetText().Split(Environment.NewLine).Where(x => !string.IsNullOrEmpty(x)).ToList());
    }
}
```

```csharp
public static void CheckProxiesStatus()
{
    Parallel.ForEach(_proxiesToCheck,
    proxyToCheck =>
    {
        if (PingHost(proxyToCheck))
        {
            _activeProxies.Add(new TimeBoundProxy(proxyToCheck));
        }
    });
}
private static bool PingHost(string nameOrAddress)
{
    var ip = nameOrAddress.Split(':').First();
    var port = int.Parse(nameOrAddress.Split(':').Last());
    Debug.WriteLine($"Ping address {nameOrAddress}");
    bool isProxyActive;
    try
    {
        var client = new TcpClient(ip, port);
        isProxyActive = true;
    }
    catch (Exception)
    {
        isProxyActive = false;
    }
    return isProxyActive;
}
}
```

```csharp
public static string GetProxyIp()
{
    var newProxy = _activeProxies.ToList().OrderByDescending(x => x.LastlyUsed).First();
    newProxy.LastlyUsed = DateTime.Now;
    CurrentProxyIp = newProxy.ProxyIp;
    return newProxy.ProxyIp;
}

```

```csharp
public class WebDriverFactory : IDisposable
{
    private readonly string _assemblyFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
    private ProxyServer _proxyServer;
    public static int SecondsToRefreshProxy { get; set; } = 5;
    public IWebDriver CreateDriver(Browser browser)
    {
        ProxyService.GetNewProxyIp();
        _proxyServer = new ProxyServer();
        var explicitEndPoint = new ExplicitProxyEndPoint(System.Net.IPAddress.Any, 18882, false);
        _proxyServer.CertificateManager.TrustRootCertificate(true);
        _proxyServer.AddEndPoint(explicitEndPoint);
        _proxyServer.Start();
        _proxyServer.SetAsSystemHttpProxy(explicitEndPoint);
        _proxyServer.SetAsSystemHttpsProxy(explicitEndPoint);
        _proxyServer.UpStreamHttpProxy = new ExternalProxy { HostName = ProxyService.CurrentProxyIpHost, Port = ProxyService.CurrentProxyIpPort };
        _proxyServer.UpStreamHttpsProxy = new ExternalProxy { HostName = ProxyService.CurrentProxyIpHost, Port = ProxyService.CurrentProxyIpPort };
        var proxyChangerTimer = new System.Timers.Timer();
        proxyChangerTimer.Elapsed += ChangeProxyEventHandler;
        proxyChangerTimer.Interval = SecondsToRefreshProxy * 1000;
        proxyChangerTimer.Enabled = true;
        var proxy = new Proxy
        {
            HttpProxy = "localhost:18882",
            SslProxy = "localhost:18882",
            FtpProxy = "localhost:18882",
        };
        IWebDriver webDriver;
        switch (browser)
        {
            case Browser.Chrome:
                var chromeOptions = new ChromeOptions
                {
                    Proxy = proxy
                };
                var chromeDriverService = ChromeDriverService.CreateDefaultService(_assemblyFolder);
                webDriver = new ChromeDriver(chromeDriverService, chromeOptions);
                webDriver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Chrome.PageLoadTimeout);
                webDriver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Chrome.ScriptTimeout);
                break;
            case Browser.Firefox:
                var firefoxOptions = new FirefoxOptions()
                {
                    Proxy = proxy
                };
                webDriver = new FirefoxDriver(Environment.CurrentDirectory, firefoxOptions);
                webDriver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Firefox.PageLoadTimeout);
                webDriver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Firefox.ScriptTimeout);
                break;
            case Browser.Edge:
                var edgeOptions = new EdgeOptions()
                {
                    Proxy = proxy
                };
                webDriver = new EdgeDriver(Environment.CurrentDirectory, edgeOptions);
                webDriver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Edge.PageLoadTimeout);
                webDriver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Edge.ScriptTimeout);
                break;
            case Browser.InternetExplorer:
                var ieOptions = new InternetExplorerOptions()
                {
                    Proxy = proxy
                };
                webDriver = new InternetExplorerDriver(Environment.CurrentDirectory, ieOptions);
                webDriver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().InternetExplorer.PageLoadTimeout);
                webDriver.Manage().Timeouts().AsynchronousJavaScript = TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().InternetExplorer.ScriptTimeout);
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(browser), browser, null);
        }
        return webDriver;
    }
    private void ChangeProxyEventHandler(object source, ElapsedEventArgs e)
    {
        ProxyService.GetNewProxyIp();
        _proxyServer.UpStreamHttpProxy = new ExternalProxy { HostName = ProxyService.CurrentProxyIpHost, Port = ProxyService.CurrentProxyIpPort };
        _proxyServer.UpStreamHttpsProxy = new ExternalProxy { HostName = ProxyService.CurrentProxyIpHost, Port = ProxyService.CurrentProxyIpPort };
    }
    public void Dispose()
    {
        _proxyServer?.Dispose();
    }
}
```

```csharp
_proxyServer = new ProxyServer();
var explicitEndPoint = new ExplicitProxyEndPoint(System.Net.IPAddress.Any, 18882, false);
_proxyServer.CertificateManager.TrustRootCertificate(true);
_proxyServer.AddEndPoint(explicitEndPoint);
_proxyServer.Start();
_proxyServer.SetAsSystemHttpProxy(explicitEndPoint);
_proxyServer.SetAsSystemHttpsProxy(explicitEndPoint);
_proxyServer.UpStreamHttpProxy = new ExternalProxy { HostName = ProxyService.CurrentProxyIpHost, Port = ProxyService.CurrentProxyIpPort };
_proxyServer.UpStreamHttpsProxy = new ExternalProxy { HostName = ProxyService.CurrentProxyIpHost, Port = ProxyService.CurrentProxyIpPort };
```

```csharp
var proxy = new Proxy
{
    HttpProxy = "localhost:18882",
    SslProxy = "localhost:18882",
    FtpProxy = "localhost:18882",
};
var chromeOptions = new ChromeOptions
{
    Proxy = proxy
};
var chromeDriverService = ChromeDriverService.CreateDefaultService(_assemblyFolder);
webDriver = new ChromeDriver(chromeDriverService, chromeOptions);
```

```csharp
var proxyChangerTimer = new Timer();
proxyChangerTimer.Elapsed += ChangeProxyEventHandler;
proxyChangerTimer.Interval = SecondsToRefreshProxy * 1000;
proxyChangerTimer.Enabled = true;
private void ChangeProxyEventHandler(object source, ElapsedEventArgs e)
{
    ProxyService.GetNewProxyIp();
    _proxyServer.UpStreamHttpProxy = new ExternalProxy { HostName = ProxyService.CurrentProxyIpHost, Port = ProxyService.CurrentProxyIpPort };
    _proxyServer.UpStreamHttpsProxy = new ExternalProxy { HostName = ProxyService.CurrentProxyIpHost, Port = ProxyService.CurrentProxyIpPort };
}
```

```csharp
[TestClass]
public class SimpleFactoryTests
{
    private static IWebDriver _driver;
    private static WebDriverFactory _webDriverFactory;
    [ClassInitialize]
    public static void ClassInit(TestContext testContext)
    {
        ProxyService.GetListProxies();
        ProxyService.CheckProxiesStatus();
        _webDriverFactory = new WebDriverFactory();
        _driver = _webDriverFactory.CreateDriver(Browser.Chrome);
    }
    [ClassCleanup]
    public static void ClassCleanup()
    {
        _webDriverFactory.Dispose();
        _driver?.Dispose();
    }
    [TestMethod]
    public void CheckCurrentIpAddressEqualToSetProxyIp()
    {
        _driver.Navigate().GoToUrl("https://whatismyipaddress.com/");
        var element = _driver.FindElement(By.XPath("//*[@id='ipv4']/a"));
        Thread.Sleep(30000);
        Assert.AreEqual(ProxyService.CurrentProxyIp, element.Text);
    }
}
```

## Simple Factory Design Pattern- WebDriver Anonymous Browsing with Rotating Proxies

```csharp
public static class WebDriverFactory
{
    private static readonly string AssemblyFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
    public static IWebDriver CreateDriver(Browser browser)
    {
        string proxyUrl = ProxyService.GetProxyIp();
        var proxy = new Proxy
        {
            HttpProxy = proxyUrl,
            SslProxy = proxyUrl,
            FtpProxy = proxyUrl,
        };
        IWebDriver webDriver;
        switch (browser)
        {
            case Browser.Chrome:
                var chromeOptions = new ChromeOptions
                {
                    Proxy = proxy
                };
                var chromeDriverService = ChromeDriverService.CreateDefaultService(AssemblyFolder);
                webDriver = new ChromeDriver(chromeDriverService, chromeOptions);
                webDriver.Manage().Timeouts().PageLoad =
                TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Chrome.PageLoadTimeout);
                webDriver.Manage().Timeouts().AsynchronousJavaScript =
                TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Chrome.ScriptTimeout);
                break;
            case Browser.Firefox:
                var firefoxOptions = new FirefoxOptions()
                {
                    Proxy = proxy
                };
                webDriver = new FirefoxDriver(Environment.CurrentDirectory, firefoxOptions);
                webDriver.Manage().Timeouts().PageLoad =
                TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Firefox.PageLoadTimeout);
                webDriver.Manage().Timeouts().AsynchronousJavaScript =
                TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Firefox.ScriptTimeout);
                break;
            case Browser.Edge:
                var edgeOptions = new EdgeOptions()
                {
                    Proxy = proxy
                };
                webDriver = new EdgeDriver(Environment.CurrentDirectory, edgeOptions);
                webDriver.Manage().Timeouts().PageLoad =
                TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Edge.PageLoadTimeout);
                webDriver.Manage().Timeouts().AsynchronousJavaScript =
                TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Edge.ScriptTimeout);
                break;
            case Browser.InternetExplorer:
                var ieOptions = new InternetExplorerOptions()
                {
                    Proxy = proxy
                };
                webDriver = new InternetExplorerDriver(Environment.CurrentDirectory, ieOptions);
                webDriver.Manage().Timeouts().PageLoad =
                TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().InternetExplorer.PageLoadTimeout);
                webDriver.Manage().Timeouts().AsynchronousJavaScript =
                TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().InternetExplorer.ScriptTimeout);
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(browser), browser, null);
        }
        return webDriver;
    }
}
```

```csharp
string proxyUrl = ProxyService.GetProxyIp();
var proxy = new Proxy
{
    HttpProxy = proxyUrl,
    SslProxy = proxyUrl,
    FtpProxy = proxyUrl,
};
var chromeOptions = new ChromeOptions
{
    Proxy = proxy
};
var chromeDriverService = ChromeDriverService.CreateDefaultService(AssemblyFolder);
webDriver = new ChromeDriver(chromeDriverService, chromeOptions);
```

```csharp
public static void GetListProxies()
{
    var options = new ChromeOptions();
    var chromeDriverService = ChromeDriverService.CreateDefaultService(Environment.CurrentDirectory);
    using (IWebDriver driver = new ChromeDriver(chromeDriverService, options))
    {
        driver.Navigate().GoToUrl("https://www.proxy-list.download/HTTPS");
        driver.FindElement(By.Id("btn3")).Click();
        _proxiesToCheck = new ConcurrentBag<string>(Clipboard.GetText().Split(Environment.NewLine).Where(x => !string.IsNullOrEmpty(x)).ToList());
    }
}
```

```csharp
public static void CheckProxiesStatus()
{
    Parallel.ForEach(_proxiesToCheck,
    proxyToCheck =>
    {
        if (PingHost(proxyToCheck))
        {
            _activeProxies.Add(new TimeBoundProxy(proxyToCheck));
        }
    });
}
private static bool PingHost(string nameOrAddress)
{
    var ip = nameOrAddress.Split(':').First();
    var port = int.Parse(nameOrAddress.Split(':').Last());
    Debug.WriteLine($"Ping address {nameOrAddress}");
    bool isProxyActive;
    try
    {
        var client = new TcpClient(ip, port);
        isProxyActive = true;
    }
    catch (Exception)
    {
        isProxyActive = false;
    }
    return isProxyActive;
}

```

```csharp
public static string GetProxyIp()
{
    var newProxy = _activeProxies.ToList().OrderByDescending(x => x.LastlyUsed).First();
    newProxy.LastlyUsed = DateTime.Now;
    CurrentProxyIp = newProxy.ProxyIp;
    return newProxy.ProxyIp;
}
```

```csharp
[TestClass]
public class SimpleFactoryTests
{
    private IWebDriver _driver;
    [ClassInitialize]
    public static void ClassInit(TestContext testContext)
    {
        ProxyService.GetListProxies();
        ProxyService.CheckProxiesStatus();
    }
    [TestInitialize]
    public void TestInit()
    {
        _driver = WebDriverFactory.CreateDriver(Browser.Chrome);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver?.Dispose();
    }
    [TestMethod]
    public void CheckCurrentIpAddressEqualToSetProxyIp()
    {
        _driver.Navigate().GoToUrl("https://whatismyipaddress.com/");
        var element = _driver.FindElement(By.XPath("//*[@id='ipv4']/a"));
        Assert.AreEqual(ProxyService.CurrentProxyIp, element.Text);
    }
}

```

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

## Handling Test Environments Data in Automated Tests

```csharp
public partial class ItemPage : WebPage
{
    public ItemPage(IWebDriver driver)
    : base(driver)
    {
    }
    protected override string Url => "http://www.ebay.com/itm/";
    public void ClickBuyNowButton()
    {
        BuyNowButton.Click();
    }
    public double GetPrice() => double.Parse(Price.Text);
}
```

```csharp
public class ClientInfoDefaultValues
{
    public const string EMAIL = "angelov@yahoo.com";
    public const string FIRST_NAME = "Francoa";
    public const string LAST_NAME = "Sonchifolia";
    public const string COMPANY = "Moon AG";
    public const string COUNTRY = "France";
    public const string CITY = "Paris";
    public const string ADDRESS1 = "9 Rue Mandar";
    public const string PHONE = "+33186954328";
    public const string ZIP = "75002";
}
```

```json
{
  "webSettings": {
    "elementWaitTimeout": "30",
    "chrome": {
      "pageLoadTimeout": "120",
      "scriptTimeout": "5",
      "artificialDelayBeforeAction": "0"
    },
    "fireFox": {
      "pageLoadTimeout": "30",
      "scriptTimeout": "1",
      "artificialDelayBeforeAction": "0"
    },
    "edge": {
      "pageLoadTimeout": "30",
      "scriptTimeout": "1",
      "artificialDelayBeforeAction": "0"
    },
    "internetExplorer": {
      "pageLoadTimeout": "30",
      "scriptTimeout": "1",
      "artificialDelayBeforeAction": "0"
    },
    "opera": {
      "pageLoadTimeout": "30",
      "scriptTimeout": "1",
      "artificialDelayBeforeAction": "0"
    },
    "safari": {
      "pageLoadTimeout": "30",
      "scriptTimeout": "1",
      "artificialDelayBeforeAction": "0"
    }
  },
  "urlSettings": {
    "ebayUrl": "http://www.ebay.com/",
    "amazonUrl": "https://www.amazon.com/",
    "kindleUrl": "https://read.amazon.com"
  },
  "billingInfoDefaultValues": {
    "email": "angelov@yahoo.com",
    "company": "Moon AG",
    "country": "France",
    "firstName": "Francoa",
    "lastName": "Sonchifolia",
    "phone": "+33186954328",
    "zip": "75002",
    "city": "Paris",
    "address1": "9 Rue Mandar"
  }
}
```

```xml
<ItemGroup>
<   None Update="testFrameworkSettings.$(Configuration).json">
    <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
</ItemGroup>
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
    public BillingInfoDefaultValues GetBillingInfoDefaultValues()
    {
        var result = ConfigurationService.Instance.Root.GetSection("billingInfoDefaultValues").Get<BillingInfoDefaultValues>();
        if (result == null)
        {
            throw new ConfigurationNotFoundException(typeof(BillingInfoDefaultValues).ToString());
        }
        return result;
    }
    public UrlSettings GetUrlSettings()
    {
        var result = ConfigurationService.Instance.Root.GetSection("urlSettings").Get<UrlSettings>();
        if (result == null)
        {
            throw new ConfigurationNotFoundException(typeof(UrlSettings).ToString());
        }
        return result;
    }
    public WebSettings GetWebSettings()
    => ConfigurationService.Instance.Root.GetSection("webSettings").Get<WebSettings>();
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
public sealed class BillingInfoDefaultValues
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
[TestInitialize]
public void SetupTest()
{
    _driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
    _driver.Manage().Timeouts().PageLoad =
    TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Chrome.PageLoadTimeout);
    _driver.Manage().Timeouts().AsynchronousJavaScript =
    TimeSpan.FromSeconds(ConfigurationService.Instance.GetWebSettings().Chrome.ScriptTimeout);
    _shoppingCartFactory = new ShoppingCartFactory(_driver);
}

```

```csharp
public static class UrlDeterminer
{
    public static string GetEbayUrl(string urlPart)
    {
        return Url.Combine(ConfigurationService.Instance.GetUrlSettings().EbayUrl, urlPart).ToString();
    }
    public static string GetAmazonUrl(string urlPart)
    {
        return Url.Combine(ConfigurationService.Instance.GetUrlSettings().AmazonUrl, urlPart).ToString();
    }
    public static string GetKindleUrl(string urlPart)
    {
        return Url.Combine(ConfigurationService.Instance.GetUrlSettings().KindleUrl, urlPart).ToString();
    }
}
```

```csharp
public partial class ItemPage : WebPage
{
    public ItemPage(IWebDriver driver)
    : base(driver)
    {
    }
    ////protected override string Url => "http://www.ebay.com/itm/";
    protected override string Url => UrlDeterminer.GetEbayUrl("itm/");
    public void ClickBuyNowButton()
    {
        BuyNowButton.Click();
    }
    public double GetPrice() => double.Parse(Price.Text);
}
```

```csharp
public partial class ShippingAddressPage : WebPage
{
    private readonly WebDriverWait _driverWait;
    public ShippingAddressPage(IWebDriver driver)
    : base(driver)
    => _driverWait = new WebDriverWait(Driver, new System.TimeSpan(0, 0, 30));
    protected override string Url => string.Empty;
    public void ClickContinueButton()
    {
        ContinueButton.Click();
    }
    public void FillShippingInfo(ClientInfo clientInfo)
    {
        SwitchToShippingFrame();
        CountryDropDown.SelectByText(clientInfo.Country);
        FirstName.SendKeys(clientInfo.FirstName);
        LastName.SendKeys(clientInfo.LastName);
        Address1.SendKeys(clientInfo.Address1);
        City.SendKeys(clientInfo.City);
        Zip.SendKeys(clientInfo.Zip);
        Phone.SendKeys(clientInfo.Phone);
        Email.SendKeys(clientInfo.Email);
        Driver.SwitchTo().DefaultContent();
    }
    public double GetSubtotalAmount() => double.Parse(Subtotal.Text);
}
```

```csharp
public class ClientInfo
{
    public string FirstName { get; set; } = ConfigurationService.Instance.GetBillingInfoDefaultValues().FirstName;
    public string LastName { get; set; } = ConfigurationService.Instance.GetBillingInfoDefaultValues().LastName;
    public string Country { get; set; } = ConfigurationService.Instance.GetBillingInfoDefaultValues().Country;
    public string Address1 { get; set; } = ConfigurationService.Instance.GetBillingInfoDefaultValues().Address1;
    public string City { get; set; } = ConfigurationService.Instance.GetBillingInfoDefaultValues().City;
    public string Phone { get; set; } = ConfigurationService.Instance.GetBillingInfoDefaultValues().Phone;
    public string Zip { get; set; } = ConfigurationService.Instance.GetBillingInfoDefaultValues().Zip;
    public string Email { get; set; } = ConfigurationService.Instance.GetBillingInfoDefaultValues().Email;
}
```

```csharp
[TestMethod]
public void Purchase_Book()
{
    _shoppingCart = _shoppingCartFactory.CreateOldShoppingCart();
    _shoppingCart.PurchaseItem("The Hitchhiker's Guide to the Galaxy", 22.2, new ClientInfo());
}
```

```csharp
[TestMethod]
[DataSource("Microsoft.VisualStudio.TestTools.DataSource.CSV", "TestsData.csv", "TestsData#csv", DataAccessMethod.Sequential)]
public void Purchase_Book_DataDriven()
{
    string item = TestContext.DataRow["item"];
    int expectedPrice = int.Parse(this.TestContext.DataRow["itemPrice"]);
    _shoppingCart = _shoppingCartFactory.CreateOldShoppingCart();
    _shoppingCart.PurchaseItem(item, expectedPrice, new ClientInfo());
}
```

## Template Method Design Pattern in Automated Testing

```csharp
public class ShoppingCart
{
    private readonly IItemPage _itemPage;
    private readonly ISignInPage _signInPage;
    private readonly ICheckoutPage _checkoutPage;
    private readonly IShippingAddressPage _shippingAddressPage;
    public ShoppingCart(IItemPage itemPage,
    ISignInPage signInPage,
    ICheckoutPage checkoutPage,
    IShippingAddressPage shippingAddressPage)
    {
        _itemPage = itemPage;
        _signInPage = signInPage;
        _checkoutPage = checkoutPage;
        _shippingAddressPage = shippingAddressPage;
    }
    public void PurchaseItem(string item, double itemPrice, ClientInfo clientInfo)
    {
        _itemPage.Open(item);
        _itemPage.AssertPrice(itemPrice);
        _itemPage.ClickBuyNowButton();
        _signInPage.ClickContinueAsGuestButton();
        _shippingAddressPage.FillShippingInfo(clientInfo);
        _shippingAddressPage.AssertSubtotalAmount(itemPrice);
        _shippingAddressPage.ClickContinueButton();
        _checkoutPage.AssertSubtotal(itemPrice);
    }
}
```

```csharp
public class ShoppingCartFactory : IFactory<ShoppingCart>
{
    private readonly IWebDriver _driver;
    public ShoppingCartFactory(IWebDriver driver)
    {
        _driver = driver;
    }
    public ShoppingCart Create()
    {
        var itemPage = new ItemPage(_driver);
        var signInPage = new SignInPage(_driver);
        var checkoutPage = new CheckoutPage(_driver);
        var shippingAddressPage = new ShippingAddressPage(_driver);
        var purchaseFacade = new ShoppingCart(itemPage, signInPage, checkoutPage, shippingAddressPage);
        return purchaseFacade;
    }
}

```

```csharp
[TestClass]
public class ShoppingCartTests
{
    private IFactory<ShoppingCart> _shoppingCartFactory;
    private ShoppingCart _shoppingCart;
    private IWebDriver _driver;
    [TestInitialize]
    public void SetupTest()
    {
        _driver = new FirefoxDriver();
        _shoppingCartFactory = new ShoppingCartFactory(_driver);
    }
    [TestCleanup]
    public void TeardownTest()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void Purchase_Book_Discounts()
    {
        _shoppingCart = _shoppingCartFactory.Create();
        _shoppingCart.PurchaseItem("The Hitchhiker's Guide to the Galaxy", 22.2, new ClientInfo());
    }
}
```

```csharp
public abstract class ShoppingCart
{
    public void PurchaseItem(string item, double itemPrice, ClientInfo clientInfo)
    {
        OpenItem(item);
        AssertPrice(itemPrice);
        ClickBuyNowButton();
        ClickContinueAsGuestButton();
        FillShippingInfo(clientInfo);
        AssertSubtotalAmount(itemPrice);
        ClickContinueButton();
        AssertSubtotal(itemPrice);
    }
    protected abstract void OpenItem(string item);
    protected abstract void AssertPrice(double itemPrice);
    protected abstract void ClickBuyNowButton();
    protected abstract void ClickContinueAsGuestButton();
    protected abstract void FillShippingInfo(ClientInfo clientInfo);
    protected abstract void AssertSubtotalAmount(double itemPrice);
    protected abstract void ClickContinueButton();
    protected abstract void AssertSubtotal(double itemPrice);
}
```

```csharp
public class OldShoppingCart : ShoppingCart
{
    private readonly ItemPage _itemPage;
    private readonly SignInPage _signInPage;
    private readonly CheckoutPage _checkoutPage;
    private readonly ShippingAddressPage _shippingAddressPage;
    public OldShoppingCart(ItemPage itemPage, SignInPage signInPage, CheckoutPage checkoutPage, ShippingAddressPage shippingAddressPage)
    {
        _itemPage = itemPage;
        _signInPage = signInPage;
        _checkoutPage = checkoutPage;
        _shippingAddressPage = shippingAddressPage;
    }
    protected override void AssertPrice(double itemPrice) => _itemPage.AssertPrice(itemPrice);
    protected override void AssertSubtotal(double itemPrice) => _checkoutPage.AssertSubtotal(itemPrice);
    protected override void AssertSubtotalAmount(double itemPrice) => _shippingAddressPage.AssertSubtotalAmount(itemPrice);
    protected override void ClickBuyNowButton() => _itemPage.ClickBuyNowButton();
    protected override void ClickContinueAsGuestButton() => _signInPage.ClickContinueAsGuestButton();
    protected override void ClickContinueButton() => _shippingAddressPage.ClickContinueButton();
    protected override void FillShippingInfo(ClientInfo clientInfo) => _shippingAddressPage.FillShippingInfo(clientInfo);
    protected override void OpenItem(string item) => _itemPage.Open(item);
}
```

```csharp
public class ShoppingCartFactory
{
    private readonly IWebDriver _driver;
    public ShoppingCartFactory(IWebDriver driver) => _driver = driver;
    public ShoppingCart CreateOldShoppingCart()
    {
        var itemPage = new ItemPage(_driver);
        var signInPage = new SignInPage(_driver);
        var checkoutPage = new CheckoutPage(_driver);
        var shippingAddressPage = new ShippingAddressPage(_driver);
        var oldShoppingCart = new OldShoppingCart(itemPage, signInPage, checkoutPage, shippingAddressPage);
        return oldShoppingCart;
    }
    public ShoppingCart CreateNewShoppingCart()
    {
        var itemPage = new ItemPage(_driver);
        var signInPage = new SignInPage(_driver);
        var checkoutPage = new CheckoutPage(_driver);
        var shippingAddressPage = new ShippingAddressPage(_driver);
        var oldShoppingCart = new NewShoppingCart(itemPage, signInPage, checkoutPage, shippingAddressPage);
        return oldShoppingCart;
    }
}
```

## Highlight Elements on Action- Test Automation Framework Extensibility through Observer Design Pattern

```csharp
public class ElementFinderService
{
    public static event EventHandler<NativeElementActionEventArgs> ReturningWrappedElement;
    private readonly IUnityContainer _container;
    public ElementFinderService(IUnityContainer container)
    {
        _container = container;
    }
    public TElement Find<TElement>(ISearchContext searchContext, Core.By by)
    where TElement : class, Core.Controls.IElement
    {
        var element = searchContext.FindElement(by.ToSeleniumBy());
        ReturningWrappedElement?.Invoke(this, new NativeElementActionEventArgs(element));
        var result = ResolveElement<TElement>(searchContext, element);
        return result;
    }
    public IEnumerable<TElement> FindAll<TElement>(ISearchContext searchContext, Core.By by)
    where TElement : class, Core.Controls.IElement
    {
        var elements = searchContext.FindElements(by.ToSeleniumBy());
        var resolvedElements = new List<TElement>();
        foreach (var currentElement in elements)
        {
            var result = ResolveElement<TElement>(searchContext, currentElement);
            resolvedElements.Add(result);
        }
        return resolvedElements;
    }
    public bool IsElementPresent(ISearchContext searchContext, Core.By by)
    {
        var element = Find<Element>(searchContext, by);
        return element.IsVisible;
    }
    private TElement ResolveElement<TElement>(ISearchContext searchContext, IWebElement currentElement)
    where TElement : class, Core.Controls.IElement
    {
        var result = _container.Resolve<TElement>(new ResolverOverride[]
        {
new ParameterOverride("driver", searchContext),
new ParameterOverride("webElement", currentElement),
new ParameterOverride("container", _container)
        });
        return result;
    }
}
```

```csharp
public TElement Find<TElement>(ISearchContext searchContext, Core.By by)
where TElement : class, Core.Controls.IElement
{
    var element = searchContext.FindElement(by.ToSeleniumBy());
    ReturningWrappedElement?.Invoke(this, new NativeElementActionEventArgs(element));
    var result = ResolveElement<TElement>(searchContext, element);
    return result;
}
```

```csharp
public class NativeElementActionEventArgs
{
    public NativeElementActionEventArgs(IWebElement element)
    => Element = element;
    public IWebElement Element { get; }
}
```

```csharp
public abstract class ElementFinderServiceEvenHandlers
{
    public virtual void SubscribeToAll()
    {
        ElementFinderService.ReturningWrappedElement
        += ReturningWrappedElementEventHandler;
    }
    public virtual void UnsubscribeToAll()
    {
        ElementFinderService.ReturningWrappedElement
        -= ReturningWrappedElementEventHandler;
    }
    protected virtual void ReturningWrappedElementEventHandler(
    object sender,
    NativeElementActionEventArgs arg)
    {
    }
}
```

```csharp
public static class ElementHighlighter
{
    private static readonly IJavaScriptInvoker JavaScriptExecutor;
    static ElementHighlighter()
    {
        JavaScriptExecutor = UnityContainerFactory.GetContainer().Resolve<IJavaScriptInvoker>();
    }
    public static void Highlight(this IWebElement nativeElement, int waitBeforeUnhighlightMiliSeconds = 100, string color = "yellow")
    {
        try
        {
            var originalElementBorder = (string)JavaScriptExecutor.ExecuteScript("return arguments[0].style.background", nativeElement);
            JavaScriptExecutor.ExecuteScript($"arguments[0].style.background='{color}'; return;", nativeElement);
            if (waitBeforeUnhighlightMiliSeconds >= 0)
            {
                if (waitBeforeUnhighlightMiliSeconds > 1000)
                {
                    var backgroundWorker = new BackgroundWorker();
                    backgroundWorker.DoWork += (obj, e)
                    => Unhighlight(nativeElement, originalElementBorder, waitBeforeUnhighlightMiliSeconds);
                    backgroundWorker.RunWorkerAsync();
                }
                else
                {
                    Unhighlight(nativeElement, originalElementBorder, waitBeforeUnhighlightMiliSeconds);
                }
            }
        }
        catch (Exception)
        {
            // ignored
        }
    }
    private static void Unhighlight(IWebElement nativeElement, string border, int waitBeforeUnhighlightMiliSeconds)
    {
        try
        {
            Thread.Sleep(waitBeforeUnhighlightMiliSeconds);
            JavaScriptExecutor.ExecuteScript("arguments[0].style.background='" + border + "'; return;", nativeElement);
        }
        catch (Exception)
        {
            // ignored
        }
    }
}
```

```csharp
var originalElementBorder = (string)JavaScriptExecutor.ExecuteScript("return arguments[0].style.background", nativeElement);
JavaScriptExecutor.ExecuteScript($"arguments[0].style.background='{color}'; return;", nativeElement);
```

```csharp
var backgroundWorker = new BackgroundWorker();
backgroundWorker.DoWork += (obj, e)
=> Unhighlight(nativeElement, originalElementBorder, waitBeforeUnhighlightMiliSeconds);
backgroundWorker.RunWorkerAsync();
```

```csharp
Thread.Sleep(waitBeforeUnhighlightMiliSeconds);
JavaScriptExecutor.ExecuteScript("arguments[0].style.background='" + border + "'; return;", nativeElement);
```

```csharp
[TestClass,
ExecutionEngineAttribute(ExecutionEngineType.WebDriver, Browsers.Chrome),
VideoRecordingAttribute(VideoRecordingMode.DoNotRecord)]
public class BingTests : BaseTest
{
    [TestMethod]
    public void SearchForAutomateThePlanet()
    {
        var bingMainPage = Container.Resolve<BingMainPage>();
        bingMainPage.Navigate();
        bingMainPage.Search("Automate The Planet");
        bingMainPage.AssertResultsCountIsAsExpected("15,800,000");
    }
}
```

## Full-Stack Test Automation Frameworks- Video Recording on Test Failure

```csharp
public interface IVideoRecorder : IDisposable
{
    string Record(string filePath, string fileName);
    void Stop();
}
```

```csharp
public class FFmpegVideoRecorder : IVideoRecorder
{
    private Process _recorderProcess;
    private bool _isRunning;
    public void Dispose()
    {
        if (_isRunning)
        {
            // Wait for 500 milliseconds before finishing video
            Thread.Sleep(500);
            if (!_recorderProcess.HasExited)
            {
                _recorderProcess?.Kill();
                _recorderProcess?.WaitForExit();
            }
            _isRunning = false;
        }
    }
    public string Record(string filePath, string fileName)
    {
        string videoPath = $"{Path.Combine(filePath, fileName)}";
        string videoFilePathWithExtension = GetFilePathWithExtensionByOS(videoPath);
        try
        {
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
        }
        catch (Exception ex)
        {
            throw new ArgumentException($"A problem occurred trying to initialize the create the directory you have specified. - {filePath}", ex);
        }
        if (!_isRunning)
        {
            var startInfo = GetProcessStartInfoByOS(videoFilePathWithExtension);
            _recorderProcess = Process.Start(startInfo);
            _isRunning = true;
        }
        return videoFilePathWithExtension;
    }
    public void Stop() => Dispose();
    private string GetFFmpegPath() => Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? throw new InvalidOperationException(), "ffmpeg.exe");
    private ProcessStartInfo GetProcessStartInfoByOS(string videoFilePathWithExtension)
    {
        var startInfo = new ProcessStartInfo
        {
            FileName = GetFFmpegPath(),
            RedirectStandardInput = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = false,
        };
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            startInfo.Arguments = $"-f gdigrab -framerate 30 -i desktop {videoFilePathWithExtension}";
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
        {
            startInfo.Arguments = $"-f avfoundation -framerate 30 -i default {videoFilePathWithExtension}";
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
        {
            startInfo.Arguments = $"-f x11grab -framerate 30 -i :0.0+100,200 {videoFilePathWithExtension}";
        }
        else
        {
            throw new NotSupportedException("The OS is not supported by FFmpeg video recorder. Currently supported OS are Windows, MacOS, Linux.");
        }
        return startInfo;
    }
    private string GetFilePathWithExtensionByOS(string videoPathNoExtension)
    {
        string videoPathWithExtension;
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            videoPathWithExtension = $"{videoPathNoExtension}.mpg";
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
        {
            videoPathWithExtension = $"{videoPathNoExtension}.mov";
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
        {
            videoPathWithExtension = $"{videoPathNoExtension}.mp4";
        }
        else
        {
            throw new NotSupportedException("The OS is not supported by FFmpeg video recorder. Currently supported OS are Windows, MacOS, Linux.");
        }
        return videoPathWithExtension;
    }
}
```

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method,
Inherited = true,
AllowMultiple = false)]
public sealed class VideoRecordingAttribute : Attribute
{
    public VideoRecordingAttribute(VideoRecordingMode videoRecordingMode)
    {
        this.VideoRecording = videoRecordingMode;
    }
    public VideoRecordingMode VideoRecording { get; set; }
}
```

```csharp
public enum VideoRecordingMode
{
    Always,
    DoNotRecord,
    Ignore,
    OnlyPass,
    OnlyFail
}
```

```csharp
public class VideoWorkflowPlugin : BaseTestBehaviorObserver
{
    private readonly IVideoRecorder _videoRecorder;
    private readonly IVideoRecorderOutputProvider _videoRecorderOutputProvider;
    private VideoRecordingMode _recordingMode;
    private string _videoRecordingPath;
    public VideoWorkflowPlugin(IVideoRecorder videoRecorder, IVideoRecorderOutputProvider videoRecorderOutputProvider)
    {
        _videoRecorder = videoRecorder;
        _videoRecorderOutputProvider = videoRecorderOutputProvider;
    }
    protected override void PostTestInit(object sender, TestExecutionEventArgs e)
    {
        _recordingMode = ConfigureTestVideoRecordingMode(e.MemberInfo);
        if (_recordingMode != VideoRecordingMode.DoNotRecord)
        {
            var fullTestName = $"{e.MemberInfo.DeclaringType.Name}.{e.TestName}";
            var videoRecordingDir = _videoRecorderOutputProvider.GetOutputFolder();
            var videoRecordingFileName = _videoRecorderOutputProvider.GetUniqueFileName(fullTestName);
            _videoRecordingPath = _videoRecorder.Record(videoRecordingDir, videoRecordingFileName);
        }
    }
    protected override void PostTestCleanup(object sender, TestExecutionEventArgs e)
    {
        if (_recordingMode != VideoRecordingMode.DoNotRecord)
        {
            try
            {
                bool hasTestPassed = e.TestOutcome.Equals(TestOutcome.Passed);
                DeleteVideoDependingOnTestOutcome(hasTestPassed);
            }
            finally
            {
                _videoRecorder.Dispose();
            }
        }
    }
    private void DeleteVideoDependingOnTestOutcome(bool haveTestPassed)
    {
        if (_recordingMode != VideoRecordingMode.DoNotRecord)
        {
            bool shouldRecordAlways = _recordingMode == VideoRecordingMode.Always;
            bool shouldRecordAllPassedTests = haveTestPassed && _recordingMode.Equals(VideoRecordingMode.OnlyPass);
            bool shouldRecordAllFailedTests = !haveTestPassed && _recordingMode.Equals(VideoRecordingMode.OnlyFail);
            if (!(shouldRecordAlways || shouldRecordAllPassedTests || shouldRecordAllFailedTests))
            {
                // Release the video file then delete it.
                _videoRecorder.Stop();
                if (File.Exists(_videoRecordingPath))
                {
                    File.Delete(_videoRecordingPath);
                }
            }
        }
    }
    private VideoRecordingMode ConfigureTestVideoRecordingMode(MemberInfo memberInfo)
    {
        VideoRecordingMode methodRecordingMode = GetVideoRecordingModeByMethodInfo(memberInfo);
        VideoRecordingMode classRecordingMode = GetVideoRecordingModeType(memberInfo.DeclaringType);
        VideoRecordingMode videoRecordingMode = VideoRecordingMode.DoNotRecord;
        var shouldTakeVideos = bool.Parse(ConfigurationManager.AppSettings["shouldTakeVideosOnExecution"]);
        if (methodRecordingMode != VideoRecordingMode.Ignore && shouldTakeVideos)
        {
            videoRecordingMode = methodRecordingMode;
        }
        else if (classRecordingMode != VideoRecordingMode.Ignore && shouldTakeVideos)
        {
            videoRecordingMode = classRecordingMode;
        }
        return videoRecordingMode;
    }
    private VideoRecordingMode GetVideoRecordingModeByMethodInfo(MemberInfo memberInfo)
    {
        if (memberInfo == null)
        {
            throw new ArgumentNullException();
        }
        var recordingModeMethodAttribute = memberInfo.GetCustomAttribute<VideoRecordingAttribute>(true);
        if (recordingModeMethodAttribute != null)
        {
            return recordingModeMethodAttribute.VideoRecording;
        }
        return VideoRecordingMode.Ignore;
    }
    private VideoRecordingMode GetVideoRecordingModeType(Type currentType)
    {
        if (currentType == null)
        {
            throw new ArgumentNullException();
        }
        var recordingModeClassAttribute = currentType.GetCustomAttribute<VideoRecordingAttribute>(true);
        if (recordingModeClassAttribute != null)
        {
            return recordingModeClassAttribute.VideoRecording;
        }
        return VideoRecordingMode.Ignore;
    }
}
```

```csharp
public class VideoRecorderOutputProvider : IVideoRecorderOutputProvider
{
    public string GetOutputFolder()
    {
        var outputDir = ConfigurationManager.AppSettings["videosFolderPath"];
        if (!Directory.Exists(outputDir))
        {
            Directory.CreateDirectory(outputDir);
        }
        return outputDir;
    }
    public string GetUniqueFileName(string testName) => string.Concat(testName, Guid.NewGuid().ToString());
}
```

```csharp
[TestClass,
ExecutionEngineAttribute(ExecutionEngineType.WebDriver, Browsers.Chrome),
VideoRecordingAttribute(VideoRecordingMode.OnlyFail)]
public class BingTests : BaseTest
{
    [TestMethod]
    public void SearchForAutomateThePlanet()
    {
        var bingMainPage = Container.Resolve<BingMainPage>();
        bingMainPage.Navigate();
        bingMainPage.Search("Automate The Planet");
        bingMainPage.AssertResultsCountIsAsExpected(264);
        Assert.Fail();
    }
    [TestMethod]
    public void SearchForAutomateThePlanet1()
    {
        var bingMainPage = Container.Resolve<BingMainPage>();
        bingMainPage.Navigate();
        bingMainPage.Search("Automate The Planet");
        bingMainPage.AssertResultsCountIsAsExpected(264);
        Assert.Fail();
    }
}
```

## Full-Stack Test Automation Frameworks- API Usability Part 2

```csharp
public class ByIdEndingWith : By
{
    public ByIdEndingWith(string value)
    : base(value)
    {
    }
    public override OpenQA.Selenium.By Convert()
    {
        return OpenQA.Selenium.By.CssSelector($"[id^='{Value}']");
    }
}
```

```csharp
public static TElement CreateByIdStartingWith<TElement>(this ElementCreateService repository, string idStarting)
where TElement : Element
{
    repository.Create<TElement, ByIdStartingWith>(new ByIdStartingWith(idStarting));
}
```

```csharp
public class UntilHasStyle : BaseUntil
{
    private readonly string _elementStyle;
    public UntilHasStyle(string elementStyle, int? timeoutInterval = null, int? sleepInterval = null)
    : base(timeoutInterval, sleepInterval)
    {
        _elementStyle = elementStyle;
    }
    public override void WaitUntil<TBy>(TBy by)
    {
        WaitUntil(ElementHasStyle(WrappedWebDriver, by), TimeoutInterval, SleepInterval);
    }
    private Func<IWebDriver, bool> ElementHasStyle<TBy>(ISearchContext searchContext, TBy by)
    where TBy : By
    {
        return driver =>
        {
            try
            {
                var element = FindElement(searchContext, by);
                return element != null && element.GetAttribute("style").Equals(_elementStyle);
            }
            catch (StaleElementReferenceException)
            {
                return false;
            }
        };
    }
}
```

```csharp
public static TElementType ToHasStyle<TElementType>(
this TElementType element,
string style,
int? timeoutInterval = null,
int? sleepInterval = null)
where TElementType : Element
{
    var until = new UntilHasStyle(style, timeoutInterval, sleepInterval);
    element.EnsureState(until);
    return element;
}
```

```csharp
IWebElement agreeCheckBox = driver.FindElement(By.Id("agreeChB"));
agreeCheckBox.Click();
IWebElement firstNameTextField = driver.FindElement(By.Id("firstName"));
firstNameTextField.SendKeys("John");
IWebElement avatarUpload = driver.FindElement(By.Id("uploadAvatar"));
avatarUpload.SendKeys("pathTomyAvatar.jpg");
IWebElement saveBtn = driver.FindElement(By.Id("saveBtn"));
agreeCheckBox.SendKeys(Keys.Enter);
```

```csharp
CheckBox agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
agreeCheckBox.Check();
TextField firstNameTextField = App.ElementCreateService.CreateById<TextField>("firstName");
firstNameTextField.SetText("John");
InputFile avatarUpload = App.ElementCreateService.CreateById<InputFile>("uploadAvatar");
avatarUpload.Upload("pathTomyAvatar.jpg");
Button saveBtn = App.ElementCreateService.CreateById<Button>("saveBtn");
saveBtn.ClickByEnter();
```

```csharp
Select billingCountry = App.ElementCreateService.CreateById<Select>("billing_country");
billingCountry.SelectByText("Bulgaria");
```

```csharp
IWebDriver driver;
IWebElement billingCountry = driver.FindElement(By.Id("billing_country"));
var billingCountrySelectElement = new SelectElement(billingCountry);
billingCountrySelectElement.SelectByText("Bulgaria");
```

```csharp
var confirmBtn = App.ElementCreateService.CreateById<Button>("confirm");
confirmBtn.Hover();
confirmBtn.Focus();
```

```csharp
IWebDriver driver;
IJavaScriptExecutor jsDriver = (IJavaScriptExecutor)driver;
jsDriver.ExecuteScript("arguments[0].onmouseover();", element);
```

```csharp
IWebDriver driver;
IJavaScriptExecutor jsDriver = (IJavaScriptExecutor)driver;
jsDriver.ExecuteScript("arguments[0].focus();", element);
```

```csharp
var confirmBtn = App.ElementCreateService.CreateById<Button>("confirm");
confirmBtn.EnsureAccessKeyIs(5);
var productQuantity = App.ElementCreateService.CreateById<Number>("qt_number");
productQuantity.EnsureMaxIs(5);
```

```csharp
Phone billingPhone = App.ElementCreateService.CreateById<Phone>("billing_phone");
billingPhone.SetPhone("+00359894646464");
Color carColor = App.ElementCreateService.CreateById<Color>("car_color");
carColor.SetColor("#f00030");
Time timeElement = App.ElementCreateService.CreateById<Time>("time");
timeElement.SetTime(12, 12);
```

```csharp
void SetTime(int hours, int minutes)
{
    IWebDriver driver;
    IJavaScriptExecutor jsDriver = (IJavaScriptExecutor)driver;
    jsDriver.ExecuteScript("arguments[0].setAttribute(value, arguments[1]);", element, $"{hours}:{minutes}:00");
}
```

## 5 Must-Have Features of Full-Stack Test Automation Frameworks Part 1

```csharp
[TestClass]
[Browser(BrowserType.Firefox, BrowserBehavior.ReuseIfStarted)]
[ExecutionTimeUnder(2)]
public class BellatrixBrowserBehaviourTests : WebTest
{
    [TestMethod]
    [Browser(BrowserType.Chrome, BrowserBehavior.RestartOnFail)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");
        blogLink.EnsureIsVisible();
        blogLink.Click();
    }
}
```

```csharp
[TestClass]
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
[ExecutionTimeUnder(2)]
public class ControlAppTests : DesktopTest
{
    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("LoginButton");
        button.Hover();
        var label = App.ElementCreateService.CreateByName<Button>("successLabel");
        label.EnsureInnerTextIs("Sucess");
    }
}
```

```csharp
[TestClass]
[ExecutionTimeUnder(2)]
public class CreateSimpleRequestTests : APITest
{
    [TestMethod]
    public void GetAlbumById()
    {
        var request = new RestRequest("api/Albums/10");
        var client = App.GetApiClientService();
        var response = client.Get<Albums>(request);
        response.AssertContentContains("Audioslave");
    }
}
```

```csharp
[TestClass]
[SauceLabs(BrowserType.Chrome, "62", "Windows", BrowserBehavior.ReuseIfStarted, recordScreenshots: true, recordVideo: true)]
public class SauceLabsTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }
}
```

```csharp
[BrowserStack(BrowserType.Chrome,
"62",
"Windows",
"10",
BrowserBehavior.ReuseIfStarted,
captureNetworkLogs: true,
captureVideo: true,
consoleLogType: BrowserStackConsoleLogType.Verbose,
debug: true,
build: "myUniqueBuildName")]
```

```csharp
[TestClass]
[ScreenshotOnFail(true)]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
public class FullPageScreenshotsOnFailTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }
}
```

```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
public class VideoRecordingTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }
}
```

```csharp
[TestClass]
[Browser(BrowserType.Firefox, BrowserBehavior.RestartEveryTime)]
public class OverrideGloballyElementActionsTests : WebTest
{
    public override void TestsArrange()
    {
        Button.OverrideClickGlobally = (e) =>
        {
            e.ToExists().ToBeClickable().WaitToBe();
            App.JavaScriptService.Execute("arguments[0].click();", e);
        };
        Anchor.OverrideFocusGlobally = CustomFocus;
    }
    private void CustomFocus(Anchor anchor)
    {
        App.JavaScriptService.Execute("window.focus();");
        App.JavaScriptService.Execute("arguments[0].focus();", anchor);
    }
    [TestMethod]
    public void PurchaseRocketWithGloballyOverridenMethods()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor addToCartFalcon9 =
        App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Span totalSpan = App.ElementCreateService.CreateByXpath<Span>("//*[@class='order-total']//span");
        sortDropDown.SelectByText("Sort by price: low to high");
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        totalSpan.EnsureInnerTextIs("95.00€", 15000);
    }
}
```

```csharp
Button.OverrideClickLocally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    App.JavaScriptService.Execute("arguments[0].click();", e);
};
```

```csharp
public class DebugLoggingButtonEventHandlers : ButtonEventHandlers
{
    protected override void ClickingEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before clicking button. Coordinates: X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }
    protected override void HoveringEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before hovering button. Coordinates: X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }
}
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class ElementActionHooksTests : WebTest
{
    public override void TestsArrange()
    {
        App.AddElementEventHandler<DebugLoggingButtonEventHandlers>();
    }
    [TestMethod]
    public void PurchaseRocketWithGloballyOverridenMethods()
    {
        // some test logic
    }
}
```

## How We Test Software: QA Process Architecture- Business Services Part One

```csharp

TestCase.AddTestCase("Telerik Platform Starter> Buy Telerik Platform");
XmlBillingInfo billingInfo = xmlInvoice.BillingInfo;
TestCase.AddActionStep("Type Billing First Name = {0}", billingInfo.FirstName);
billingInfoMap.BillingFirstName = billingInfo.FirstName;
TestCase.AddActionStep("Type Billing Last Name = {0}", billingInfo.LastName);
billingInfoMap.BillingLastName = billingInfo.LastName;
TestCase.AddActionStep("Type Billing Email = {0}", billingInfo.Email);
billingInfoMap.BillingEmail = billingInfo.Email;
TestCase.AddActionStep("Type Billing Company = {0}", billingInfo.CompanyName);
billingInfoMap.BillingCompany = billingInfo.CompanyName;
TestCase.AddActionStep("Type Billing Phone = {0}", billingInfo.Phone);
billingInfoMap.BillingPhone = billingInfo.Phone;
TestCase.AddActionStep("Type Billing Address = {0}", billingInfo.Address);
billingInfoMap.BillingAddress = billingInfo.Address;
TestCase.AddActionStep("Type Billing City = {0}", billingInfo.City);
billingInfoMap.BillingCity = billingInfo.City;
```

## Page Objects- Elements Access Styles- WebDriver C#

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser) => _driver = browser;
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        SearchBox.Clear();
        SearchBox.SendKeys(textToType);
        GoButton.Click();
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement SearchBox => _driver.FindElement(By.Id("sb_form_q"));
    public IWebElement GoButton => _driver.FindElement(By.Id("sb_form_go"));
    public IWebElement ResultsCountDiv => _driver.FindElement(By.Id("b_tween"));
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(ResultsCountDiv.Text, expectedCount);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void TestInitialize()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void PublicProperties_SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
    [TestMethod]
    public void PublicProperties_SearchTextInSearchEngine_UseElementsDirectly()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.SearchBox.SendKeys("Automate The Planet");
        searchEngineMainPage.GoButton.Click();
        Assert.AreEqual(searchEngineMainPage.ResultsCountDiv, "236,000 RESULTS");
    }
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void TestInitialize()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void PublicProperties_SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
    [TestMethod]
    public void PublicProperties_SearchTextInSearchEngine_UseElementsDirectly()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.SearchBox.SendKeys("Automate The Planet");
        searchEngineMainPage.GoButton.Click();
        Assert.AreEqual(searchEngineMainPage.ResultsCountDiv, "236,000 RESULTS");
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser) => _driver = browser;
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        _searchBox.Clear();
        _searchBox.SendKeys(textToType);
        _goButton.Click();
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    private IWebElement _searchBox => _driver.FindElement(By.Id("sb_form_q"));
    private IWebElement _goButton => _driver.FindElement(By.Id("sb_form_go"));
    private IWebElement _resultsCountDiv => _driver.FindElement(By.Id("b_tween"));
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(_resultsCountDiv.Text, expectedCount);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void TestInitialize()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void PublicProperties_SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    protected IWebElement SearchBox => Driver.FindElement(By.Id("sb_form_q"));
    protected IWebElement GoButton => Driver.FindElement(By.Id("sb_form_go"));
    protected IWebElement ResultsCountDiv => Driver.FindElement(By.Id("b_tween"));
}
```

```csharp
public partial class SearchEngineChildPage : SearchEngineMainPage
{
    public SearchEngineChildPage(IWebDriver driver) : base(driver)
    {
    }
    public void SomeAction()
    {
        // only here can access the protected elements.
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver driver)
    {
        _driver = driver;
        Elements = new SearchEngineMainPageElements(_driver);
    }
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        Elements.SearchBox.Clear();
        Elements.SearchBox.SendKeys(textToType);
        Elements.GoButton.Click();
    }
    public SearchEngineMainPageElements Elements { get; set; }
}
```

```csharp
public class SearchEngineMainPageElements
{
    private readonly IWebDriver _driver;
    public SearchEngineMainPageElements(IWebDriver driver) => _driver = driver;
    public IWebElement SearchBox => _driver.FindElement(By.Id("sb_form_q"));
    public IWebElement GoButton => _driver.FindElement(By.Id("sb_form_go"));
    public IWebElement ResultsCountDiv => _driver.FindElement(By.Id("b_tween"));
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(Elements.ResultsCountDiv.Text, expectedCount);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void TestInitialize()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void ElementsAsProperties_SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new ElementsExposedAsProperties.SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
    [TestMethod]
    public void ElementsAsProperties_SearchTextInSearchEngine_UseElementsDirectly()
    {
        var searchEngineMainPage = new ElementsExposedAsProperties.SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Elements.SearchBox.SendKeys("Automate The Planet");
        searchEngineMainPage.Elements.GoButton.Click();
        Assert.AreEqual(searchEngineMainPage.Elements.ResultsCountDiv, "236,000 RESULTS");
    }
}
```

## Page Objects- App Design Pattern- WebDriver C#

```csharp
public partial class SearchEngineMainPage : AssertedNavigatablePage
{
    public SearchEngineMainPage(IWebDriver driver) : base(driver)
    {
    }
    public override string Url => @"actualUrlToSite";
    public void Search(string textToType)
    {
        SearchBox.Clear();
        SearchBox.SendKeys(textToType);
        GoButton.Click();
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement SearchBox => WrappedDriver.FindElement(By.Id("sb_form_q"));
    public IWebElement GoButton => WrappedDriver.FindElement(By.Id("sb_form_go"));
    public IWebElement ResultsCountDiv => WrappedDriver.FindElement(By.Id("b_tween"));
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(ResultsCountDiv.Text, expectedCount);
}
```

```csharp
public abstract class Page
{
    protected Page(IWebDriver driver) => WrappedDriver = driver;
    protected IWebDriver WrappedDriver { get; }
}
```

```csharp
public abstract class NavigatablePage : Page
{
    protected NavigatablePage(IWebDriver driver) : base(driver)
    {
    }
    public abstract string Url { get; }
    public void GoTo() => WrappedDriver.Navigate().GoToUrl(Url);
    public void Refresh() => WrappedDriver.Navigate().Refresh();
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private App _app;
    [TestInitialize]
    public void TestInitialize()
    {
        _app = new App();
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _app.Dispose();
    }
    [TestMethod]
    public void UseApp_SearchTextInSearchEngine_UseElementsDirectly()
    {
        var searchEngineMainPage = _app.GoTo<SearchEngineMainPage>();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
}
```

```csharp
public class App : IDisposable
{
    private IWebDriver _driver;
    public App(BrowserType browserType = BrowserType.Firefox)
    {
        StartBrowser(browserType);
    }
    public void Dispose() => _driver.Dispose();
    public TPage Create<TPage>()
    where TPage : Page
    {
        var constructor = typeof(TPage).GetTypeInfo().GetConstructors(BindingFlags.NonPublic | Bind - ingFlags.Instance).FirstOrDefault();
        var page = constructor.Invoke(new object[] { _driver }) as TPage;
        return page;
    }
    public TPage GoTo<TPage>()
    where TPage : NavigatablePage
    {
        var constructor = typeof(TPage).GetTypeInfo().GetConstructors(BindingFlags.NonPublic | Bind - ingFlags.Instance).FirstOrDefault();
        var page = constructor.Invoke(new object[] { _driver }) as TPage;
        page.GoTo();
        return page;
    }
    private void StartBrowser(BrowserType browserType = BrowserType.Firefox)
    {
        switch (browserType)
        {
            case BrowserType.Firefox:
                _driver = new FirefoxDriver();
                break;
            case BrowserType.InternetExplorer:
                break;
            case BrowserType.Chrome:
                break;
            default:
                throw new ArgumentException("You need to set a valid browser type.");
        }
    }
}
```

## Page Objects- Partial Classes Base Pages- WebDriver C#

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser) => _driver = browser;
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        SearchBox.Clear();
        SearchBox.SendKeys(textToType);
        GoButton.Click();
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement SearchBox => _driver.FindElement(By.Id("sb_form_q"));
    public IWebElement GoButton => _driver.FindElement(By.Id("sb_form_go"));
    public IWebElement ResultsCountDiv => _driver.FindElement(By.Id("b_tween"));
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(ResultsCountDiv.Text, expectedCount);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void TestInitialize()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
}
```

```csharp
public partial class SearchEngineMainPage : AssertedNavigatablePage
{
    public SearchEngineMainPage(IWebDriver driver) : base(driver)
    {
    }
    public override string Url => @"searchEngineUrl";
    public void Search(string textToType)
    {
        SearchBox.Clear();
        SearchBox.SendKeys(textToType);
        GoButton.Click();
    }
}
```

```csharp
public abstract class Page
{
    protected Page(IWebDriver driver) => WrappedDriver = driver;
    protected IWebDriver WrappedDriver { get; }
}
```

```csharp
public abstract class NavigatablePage : Page
{
    protected NavigatablePage(IWebDriver driver) : base(driver)
    {
    }
    public abstract string Url { get; }
    public void GoTo() => WrappedDriver.Navigate().GoToUrl(Url);
    public void Refresh() => WrappedDriver.Navigate().Refresh();
}
```

```csharp
public abstract class AssertedNavigatablePage : NavigatablePage
{
    protected AssertedNavigatablePage(IWebDriver driver) : base(driver)
    {
        // Resolve the IAssert through some of the popular IoC containers.
        ////Assert = ServiceContainer.Provider.Resolve<IAssert>();
    }
    protected IAssert Assert { get; }
}
```

## Page Objects- Partial Classes Singleton Design Pattern- WebDriver C#

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser) => _driver = browser;
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        SearchBox.Clear();
        SearchBox.SendKeys(textToType);
        GoButton.Click();
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement SearchBox => _driver.FindElement(By.Id("sb_form_q"));
    public IWebElement GoButton => _driver.FindElement(By.Id("sb_form_go"));
    public IWebElement ResultsCountDiv => _driver.FindElement(By.Id("b_tween"));
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(ResultsCountDiv.Text, expectedCount);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void TestInitialize()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TestCleanup()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
}
```

```csharp
public partial class SSearchEngineMainPage : WebPage<SSearchEngineMainPage>
{
    private readonly string _url = @"searchEngineUrl";
    public void Navigate() => WrappedDriver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        SearchBox.Clear();
        SearchBox.SendKeys(textToType);
        GoButton.Click();
    }
}
```

```csharp
public abstract class WebPage<TPage>
where TPage : new()
{
    private static readonly Lazy<TPage> _lazyPage = new Lazy<TPage>(() => new TPage());
    protected readonly IWebDriver WrappedDriver;
    protected WebPage() =>
    WrappedDriver = Driver.Browser ?? throw new ArgumentNullException("The wrapped IWebDriver instance is not initialized.");
    public static TPage Instance => _lazyPage.Value;
}
```

```csharp
public static class Driver
{
    private static WebDriverWait _browserWait;
    private static IWebDriver _browser;
    public static IWebDriver Browser
    {
        get
        {
            if (_browser == null)
            {
                throw new NullReferenceException("The WebDriver browser instance was not initialized. You should first call the method Start.");
            }
            return _browser;
        }
        private set => _browser = value;
    }
    public static WebDriverWait BrowserWait
    {
        get
        {
            if (_browserWait == null || _browser == null)
            {
                throw new NullReferenceException("The WebDriver browser wait instance was not initialized. You should first call the method Start.");
            }
            return _browserWait;
        }
        private set => _browserWait = value;
    }
    public static void StartBrowser(BrowserType browserType = BrowserType.Firefox, int defaultTimeOut = 30)
    {
        switch (browserType)
        {
            case BrowserType.Firefox:
                Browser = new FirefoxDriver();
                break;
            case BrowserType.InternetExplorer:
                break;
            case BrowserType.Chrome:
                break;
            default:
                throw new ArgumentException("You need to set a valid browser type.");
        }
        BrowserWait = new WebDriverWait(Browser, TimeSpan.FromSeconds(defaultTimeOut));
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
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void TestInitialize()
    {
        Driver.StartBrowser();
    }
    [TestCleanup]
    public void TestCleanup()
    {
        Driver.StopBrowser();
    }
    [TestMethod]
    public void Singleton_SearchTextInSearchEngine_First()
    {
        SSearchEngineMainPage.Instance.Navigate();
        SSearchEngineMainPage.Instance.Search("Automate The Planet");
        SSearchEngineMainPage.Instance.AssertResultsCount("236,000 RESULTS");
    }
}
```

## Page Objects- Partial Classes Page Sections- WebDriver C#

```csharp
public partial class LoginPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"productSiteUrllogin";
    public LoginPage(IWebDriver browser)
    {
        _driver = browser;
        LoginSection = new LoginSection(_driver);
        MainNavigationSection = new MainNavigationSection(_driver);
        ConnectWithSection = new ConnectWithSection(_driver);
    }
    public LoginSection LoginSection { get; private set; }
    public MainNavigationSection MainNavigationSection { get; private set; }
    public ConnectWithSection ConnectWithSection { get; private set; }
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
}
```

```csharp
public partial class LoginSection
{
    private readonly IWebDriver _driver;
    public LoginSection(IWebDriver browser)
    {
        _driver = browser;
    }
    public void Login(string email, string password)
    {
        Email.SendKeys(email);
        Password.SendKeys(password);
        LoginButton.Click();
    }
}
```

```csharp
public partial class LoginSection
{
    public IWebElement Email => _driver.FindElement(By.Id("username"));
    public IWebElement Password => _driver.FindElement(By.Id("password"));
    public IWebElement LoginButton => _driver.FindElement(By.Id("LoginButton"));
    public IWebElement RememberMe => _driver.FindElement(By.Id("RememberMe"));
}
```

```csharp
public partial class LoginSection
{
    public void RememberMeChecked() => Assert.IsTrue(RememberMe.Selected);
}
```

```csharp
public partial class SignUpPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"productSiteUrllogin/v2";
    public SignUpPage(IWebDriver browser)
    {
        _driver = browser;
        MainNavigationSection = new MainNavigationSection(_driver);
        ConnectWithSection = new ConnectWithSection(_driver);
    }
    public MainNavigationSection MainNavigationSection { get; private set; }
    public ConnectWithSection ConnectWithSection { get; private set; }
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void SignUpDefault(string email, string password)
    {
        FirstName.SendKeys(Guid.NewGuid().ToString());
        LastName.SendKeys(Guid.NewGuid().ToString());
        Company.SendKeys("Automate The Planet");
        Country.SelectByText("Bulgaria");
        Phone.SendKeys("+44 13 4436 0444");
        Email.SendKeys(email);
        Password.SendKeys(password);
        LaunchButton.Click();
    }
}
```

```csharp
[TestClass]
public class LoginTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void SetupTest()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TeardownTest()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void SuccessfullyLogin_WhenLoginWithExistingUser()
    {
        var loginPage = new LoginPage(_driver);
        loginPage.Navigate();
        loginPage.LoginSection.Login("myemail@automatetheplanet.com", "somePassword");
    }
    [TestMethod]
    public void SuccessfullyLogin_WhenLoginWithExistingGoogleAccount()
    {
        var loginPage = new LoginPage(_driver);
        loginPage.Navigate();
        loginPage.ConnectWithSection.GoogleButton.Click();
    }
    [TestMethod]
    public void SignUpWithNewDefaultUser()
    {
        var signUpPage = new SignUpPage(_driver);
        signUpPage.Navigate();
        signUpPage.SignUpDefault("myemail@automatetheplanet.com", "somePassword");
    }
}
```

## Page Objects- Partial Classes String Properties- WebDriver C#

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser) => _driver = browser;
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        SearchBox.Clear();
        SearchBox.SendKeys(textToType);
        GoButton.Click();
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser) => _driver = browser;
    public void Navigate() => _driver.Navigate().GoToUrl(_url);
    public void Search(string textToType)
    {
        SearchBox = textToType;
        GoButton.Click();
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement SearchBox
    {
        get
        {
            return this._driver.FindElement(By.Id("sb_form_q"));
        }
    }
    public IWebElement GoButton
    {
        get
        {
            return this._driver.FindElement(By.Id("sb_form_go"));
        }
    }
    public IWebElement ResultsCountDiv
    {
        get
        {
            return this._driver.FindElement(By.Id("b_tween"));
        }
    }
}
```

```csharp
public partial class SearchEngineMainPage
{
    public string SearchBox
    {
        get => _driver.FindElement(By.Id("sb_form_q")).Text;
        set
        {
            var element = _driver.FindElement(By.Id("sb_form_q"));
            element.Clear();
            element.SendKeys(value);
        }
    }
    public IWebElement GoButton => _driver.FindElement(By.Id("sb_form_go"));
    public string ResultsCountDiv => _driver.FindElement(By.Id("b_tween")).Text;
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(ResultsCountDiv.Text, expectedCount);
}
```

```csharp
public partial class SearchEngineMainPage
{
    public void AssertResultsCount(string expectedCount) => Assert.AreEqual(ResultsCountDiv, expectedCount);
}
```

```csharp
[TestClass]
public class SearchEngineTests
{
    private IWebDriver _driver;
    [TestInitialize]
    public void SetupTest()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
    }
    [TestCleanup]
    public void TeardownTest()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void SearchTextInSearchEngine_First()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.Search("Automate The Planet");
        searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
    }
    [TestMethod]
    public void SearchTextInSearchEngine_UseElementsDirectly()
    {
        var searchEngineMainPage = new SearchEngineMainPage(_driver);
        searchEngineMainPage.Navigate();
        searchEngineMainPage.SearchBox = "Automate The Planet";
        searchEngineMainPage.GoButton.Click();
        Assert.AreEqual(searchEngineMainPage.ResultsCountDiv, "236,000 RESULTS");
    }
}
```

## Page Objects- Partial Classes Fluent API- WebDriver C#

```csharp
public enum Colors
{
    All,
    ColorOnly,
    BlackWhite,
    Red,
    Orange,
    Yellow,
    Green
}
```

```csharp
public partial class SearchEngineMainPage
{
    private readonly IWebDriver _driver;
    private readonly string _url = @"searchEngineUrl";
    public SearchEngineMainPage(IWebDriver browser)
    {
        _driver = browser;
    }
    public SearchEngineMainPage Navigate()
    {
        _driver.Navigate().GoToUrl(_url);
        return this;
    }
    public SearchEngineMainPage Search(string textToType)
    {
        SearchBox.Clear();
        SearchBox.SendKeys(textToType);
        GoButton.Click();
        return this;
    }
    public SearchEngineMainPage ClickImages()
    {
        ImagesLink.Click();
        return this;
    }
    public SearchEngineMainPage SetSize(Sizes size)
    {
        Sizes.SelectByIndex((int)size);
        return this;
    }
    public SearchEngineMainPage SetColor(Colors color)
    {
        Color.SelectByIndex((int)color);
        return this;
    }
    public SearchEngineMainPage SetTypes(Types type)
    {
        Type.SelectByIndex((int)type);
        return this;
    }
    public SearchEngineMainPage SetLayout(Layouts layout)
    {
        Layout.SelectByIndex((int)layout);
        return this;
    }
    public SearchEngineMainPage SetPeople(People people)
    {
        People.SelectByIndex((int)people);
        return this;
    }
    public SearchEngineMainPage SetDate(Dates date)
    {
        Date.SelectByIndex((int)date);
        return this;
    }
    public SearchEngineMainPage SetLicense(Licenses license)
    {
        License.SelectByIndex((int)license);
        return this;
    }
}

```

```csharp
public partial class SearchEngineMainPage
{
    public IWebElement SearchBox => _driver.FindElement(By.Id("sb_form_q"));
    public IWebElement GoButton => _driver.FindElement(By.Id("sb_form_go"));
    public IWebElement ResultsCountDiv => _driver.FindElement(By.Id("b_tween"));
    public IWebElement ImagesLink => _driver.FindElement(By.LinkText("Images"));
    public SelectElement Sizes => new SelectElement(_driver.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Size']")));
    public SelectElement Color => new SelectElement(_driver.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Color']")));
    public SelectElement Type => new SelectElement(_driver.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Type']")));
    public SelectElement Layout => new SelectElement(_driver.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Layout']")));
    public SelectElement People => new SelectElement(_driver.FindElement(By.XPath("//div/ul/li/span/span[text() = 'People']")));
    public SelectElement Date => new SelectElement(_driver.FindElement(By.XPath("//div/ul/li/span/span[text() = 'Date']")));
    public SelectElement License => new SelectElement(_driver.FindElement(By.XPath("//div/ul/li/span/span[text() = 'License']")));
}
```

```csharp
public partial class SearchEngineMainPage
{
    public SearchEngineMainPage ResultsCount(string expectedCount)
    {
        Assert.IsTrue(ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
        return this;
    }
}
```

```csharp
[TestClass]
public class FluentSearchEngineTests
{
    private IWebDriver _driver;
    private SearchEngineMainPage _bingPage;
    [TestInitialize]
    public void SetupTest()
    {
        _driver = new FirefoxDriver();
        _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(30);
        _bingPage = new SearchEngineMainPage(_driver);
    }
    [TestCleanup]
    public void TeardownTest()
    {
        _driver.Quit();
    }
    [TestMethod]
    public void SearchForImageFuent()
    {
        _bingPage
        .Navigate()
        .Search("facebook")
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

## Page Objects with Partial Classes and Properties- WebDriver C#

```csharp
using OpenQA.Selenium;
namespace HuddlePageObjectsElementsStringProperties.ImprovedVersion
{
    public partial class SearchEngineMainPage
    {
        private readonly IWebDriver _driver;
        private readonly string url = @"searchEngineUrl";
        public SearchEngineMainPage(IWebDriver browser)
        {
            _driver = browser;
        }
        public void Navigate()
        {
            _driver.Navigate().GoToUrl(url);
        }
        public void Search(string textToType)
        {
            SearchBox.Clear();
            SearchBox.SendKeys(textToType);
            GoButton.Click();
        }
    }
}
```

```csharp
using OpenQA.Selenium;
namespace HuddlePageObjectsElementsStringProperties.ImprovedVersion
{
    public partial class SearchEngineMainPage
    {
        public IWebElement SearchBox
        {
            get
            {
                return _driver.FindElement(By.Id("sb_form_q"));
            }
        }
        public IWebElement GoButton
        {
            get
            {
                return _driver.FindElement(By.Id("sb_form_go"));
            }
        }
        public IWebElement ResultsCountDiv
        {
            get
            {
                return _driver.FindElement(By.Id("b_tween"));
            }
        }
    }
}
```

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace HuddlePageObjectsElementsStringProperties.ImprovedVersion
{
    public partial class SearchEngineMainPage
    {
        public void AssertResultsCount(string expectedCount)
        {
            Assert.AreEqual(ResultsCountDiv.Text, expectedCount);
        }
    }
}
```

## Assessment System for Tests’ Architecture Design- SpecFlow Based Tests

```csharp
Feature: Create Purchase in Online Store
In order to receive a book online
As a client
I want to be able to choose it through the browser and pay for it online
@testingFramework
Scenario: Create Successfull Purchase When Billing Country Is United States with American Express Card
When I navigate to "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743"
And I click the 'buy now' button
And then I click the 'proceed to checkout' button
#When the login page loads
And I login with email = "g3984159@trbvm.com" and pass = "ASDFG_12345"
#When the shipping address page loads
And I type full name = "John Smith", country = "United States", Adress = "950 Avenue of the Americas", city = "New Your City", state = "New Your", zip = "10001-2121" and phone = "00164644885569"
And I choose to fill different billing, full name = "John Smith", country = "United States", Adress = "950 Avenue of the Americas", city = "New Your City", state = "New Your", zip = "10001-2121" and phone = "00164644885569"
And click shipping address page 'continue' button
And click shipping payment top 'continue' button
Then assert that order total price = "40.49"
```

```csharp
[Binding]
public class CreatePurchaseSteps
{
    [When(@"I navigate to ""([^""]*)""")]
    public void NavigateToItemUrl(string itemUrl)
    {
        var itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
        itemPage.Navigate(itemUrl);
    }
    [When(@"I click the 'buy now' button")]
    public void ClickBuyNowButtonItemPage()
    {
        var itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
        itemPage.ClickBuyNowButton();
    }
    [When(@"then I click the 'proceed to checkout' button")]
    public void ClickProceedToCheckoutButtonPreviewShoppingCartPage()
    {
        var previewShoppingCartPage = UnityContainerFactory.GetContainer().Resolve<PreviewShoppingCartPage>();
        previewShoppingCartPage.ClickProceedToCheckoutButton();
    }
    [When(@"the login page loads")]
    public void SignInPageLoads()
    {
        var signInPage = UnityContainerFactory.GetContainer().Resolve<SignInPage>();
        signInPage.WaitForPageToLoad();
    }
    [When(@"I login with email = ""([^""]*)"" and pass = ""([^""]*)""")]
    public void LoginWithEmailAndPass(string email, string password)
    {
        var signInPage = UnityContainerFactory.GetContainer().Resolve<SignInPage>();
        signInPage.Login(email, password);
    }
    [When(@"the shipping address page loads")]
    public void ShippingPageLoads()
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        shippingAddressPage.WaitForPageToLoad();
    }
    [When(@"I type full name = ""([^""]*)"", country = ""([^""]*)"", Adress = ""([^""]*)"", city = ""([^""]*)"", state = ""([^""]*)"", zip = ""([^""]*)"" and phone = ""([^""]*)""")]
    public void FillShippingInfo(string fullName, string country, string address, string state, string city, string zip, string phone)
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        var clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = fullName,
            Country = country,
            Address1 = address,
            State = state,
            City = city,
            Zip = zip,
            Phone = phone
        });
        shippingAddressPage.FillShippingInfo(clientPurchaseInfo);
    }
    [When(@"I choose to fill different billing, full name = ""([^""]*)"", country = ""([^""]*)"", Adress = ""([^""]*)"", city = ""([^""]*)"", state = ""([^""]*)"", zip = ""([^""]*)"" and phone = ""([^""]*)""")]
    public void FillDifferentBillingInfo(string fullName, string country, string address, string state, string city, string zip, string phone)
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        var shippingPaymentPage = UnityContainerFactory.GetContainer().Resolve<ShippingPaymentPage>();
        var clientPurchaseInfo = new ClientPurchaseInfo(
        new ClientAddressInfo()
        {
            FullName = fullName,
            Country = country,
            Address1 = address,
            State = state,
            City = city,
            Zip = zip,
            Phone = phone
        });
        shippingAddressPage.ClickDifferentBillingCheckBox(clientPurchaseInfo);
        shippingAddressPage.ClickContinueButton();
        shippingPaymentPage.ClickBottomContinueButton();
        shippingAddressPage.FillBillingInfo(clientPurchaseInfo);
    }
    [When(@"click shipping address page 'continue' button")]
    public void ClickContinueButtonShippingAddressPage()
    {
        var shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        shippingAddressPage.ClickContinueButton();
    }
    [When(@"click shipping payment top 'continue' button")]
    public void WhenClickTopPaymentButton()
    {
        var shippingPaymentPage = PerfectSystemTestsDesign.Base.UnityContainerFactory.GetContainer().Resolve<ShippingPaymentPage>();
        shippingPaymentPage.ClickTopContinueButton();
    }
    [Then(@"assert that order total price = ""([^""]*)""")]
    public void AssertOrderTotalPrice(string itemPrice)
    {
        var placeOrderPage = PerfectSystemTestsDesign.Base.UnityContainerFactory.GetContainer().Resolve<PlaceOrderPage>();
        double totalPrice = double.Parse(itemPrice);
        placeOrderPage.AssertOrderTotalPrice(totalPrice);
    }
}
```

```csharp
[Binding]
public sealed class SpecflowHooks
{
    [BeforeTestRun]
    public static void BeforeTestRun()
    {
        Driver.StartBrowser(BrowserTypes.Chrome);
        UnityContainerFactory.GetContainer().RegisterType<ItemPage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<PreviewShoppingCartPage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<SignInPage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ShippingAddressPage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ShippingPaymentPage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<PlaceOrderPage>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ItemPageBuyBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ItemPageNavigationBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<PlaceOrderPageAssertFinalAmountsBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<PreviewShoppingCartPageProceedBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ShippingAddressPageContinueBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ShippingAddressPageFillDifferentBillingBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ShippingAddressPageFillShippingBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ShippingPaymentPageContinueBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<SignInPageLoginBehaviour>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterType<ShoppingCart>(new ContainerControlledLifetimeManager());
        UnityContainerFactory.GetContainer().RegisterInstance<IWebDriver>(PerfectSystemTestsDesign.Core.Driver.Browser);
    }
    [AfterTestRun]
    public static void AfterTestRun()
    {
        Driver.StopBrowser();
    }
    [BeforeScenario]
    public static void BeforeScenario()
    {
    }
    [AfterScenario]
    public static void AfterScenario()
    {
    }
}
```

```csharp
Scenario Outline: Successfully Convert Seconds to Minutes Table
When I navigate to Seconds to Minutes Page
And type seconds for <seconds>
Then assert that <minutes> minutes are displayed as answer
Examples:
| seconds | minutes |
| 1 day, 1 hour, 1 second | 1500 |
| 5 days, 3 minutes | 7203 |
| 4 hours | 240 |
| 180 seconds | 3 |
```

```csharp
Scenario: Add Online Store Products with Affiliate Codes
When add products
| Url | AffilicateCode |
| /dp/B00TSUGXKE/ref=ods_gw_d_h1_tab_fd_c3 | affiliate3 |
| /dp/B00KC6I06S/ref=fs_ods_fs_tab_al | affiliate4 |
| /dp/B0189XYY0Q/ref=fs_ods_fs_tab_ts | affiliate5 |
| /dp/B018Y22C2Y/ref=fs_ods_fs_tab_fk | affiliate6 |
```

```csharp
[When(@"add products")]
public void NavigateToItemUrl(Table productsTable)
{
    var itemPage = UnityContainerFactory.GetContainer().Resolve<ItemPage>();
    IEnumerable<dynamic> products = productsTable.CreateDynamicSet();
    foreach (var product in products)
    {
        itemPage.Navigate(string.Concat(product.Url, "?", product.AffilicateCode));
        itemPage.ClickBuyNowButton();
    }
}
```

## Enhanced Selenium WebDriver Page Objects through Partial Classes

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
namespace ImprovedPageObjects
{
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
        public void AssertResultsCount(string expectedCount)
        {
            Assert.AreEqual(this.ResultsCountDiv.Text, expectedCount);
        }
    }
}
```

```csharp
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
namespace ImprovedPageObjects
{
    [TestClass]
    public class SearchEngineTests
    {
        private IWebDriver driver;
        [TestInitialize]
        public void SetupTest()
        {
            this.driver = new FirefoxDriver();
            this.driver.Manage().Timeouts().ImplicitlyWait(new TimeSpan(0, 0, 30));
        }
        [TestCleanup]
        public void TeardownTest()
        {
            this.driver.Quit();
        }
        [TestMethod]
        public void SearchTextInSearchEngine_First()
        {
            var searchEngineMainPage = new SearchEngineMainPage(this.driver);
            searchEngineMainPage.Navigate();
            searchEngineMainPage.Search("Automate The Planet");
            searchEngineMainPage.AssertResultsCount("236,000 RESULTS");
        }
    }
}
```

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
namespace ImprovedPageObjects.ImprovedVersion
{
    public partial class SearchEngineMainPage
    {
        private readonly IWebDriver driver;
        private readonly string url = @"searchEngineUrl";
        public SearchEngineMainPage(IWebDriver browser)
        {
            this.driver = browser;
            PageFactory.InitElements(browser, this);
        }
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
    }
}
```

```csharp
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
namespace ImprovedPageObjects.ImprovedVersion
{
    public partial class SearchEngineMainPage
    {
        [FindsBy(How = How.Id, Using = "sb_form_q")]
        public IWebElement SearchBox { get; set; }
        [FindsBy(How = How.Id, Using = "sb_form_go")]
        public IWebElement GoButton { get; set; }
        [FindsBy(How = How.Id, Using = "b_tween")]
        public IWebElement ResultsCountDiv { get; set; }
    }
}
```

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace ImprovedPageObjects.ImprovedVersion
{
    public partial class SearchEngineMainPage
    {
        public void AssertResultsCount(string expectedCount)
        {
            Assert.AreEqual(this.ResultsCountDiv.Text, expectedCount);
        }
    }
}
```

## Assessment System for Tests’ Architecture Design- Behaviour Based Tests

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
public class PreviewShoppingCartPageProceedBehaviour : WaitableActionBehaviour
{
    private readonly PreviewShoppingCartPage previewShoppingCartPage;
    private readonly SignInPage signInPage;
    public PreviewShoppingCartPageProceedBehaviour()
    {
        this.previewShoppingCartPage =
        UnityContainerFactory.GetContainer().Resolve<PreviewShoppingCartPage>();
        this.signInPage =
        UnityContainerFactory.GetContainer().Resolve<SignInPage>();
    }
    protected override void PerformAct()
    {
        this.previewShoppingCartPage.ClickProceedToCheckoutButton();
    }
    protected override void PerformPostActWait()
    {
        this.signInPage.WaitForPageToLoad();
    }
}
```

```csharp
public class ShippingAddressPageFillDifferentBillingBehaviour : ActionBehaviour
{
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ShippingPaymentPage shippingPaymentPage;
    private readonly PerfectSystemTestsDesign.Data.ClientPurchaseInfo clientPurchaseInfo;
    public ShippingAddressPageFillDifferentBillingBehaviour(ClientPurchaseInfo clientPurchaseInfo)
    {
        this.shippingAddressPage = UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
        this.shippingPaymentPage = UnityContainerFactory.GetContainer().Resolve<ShippingPaymentPage>();
        this.clientPurchaseInfo = clientPurchaseInfo;
    }
    protected override void PerformAct()
    {
        this.shippingAddressPage.ClickDifferentBillingCheckBox(this.clientPurchaseInfo);
        this.shippingAddressPage.ClickContinueButton();
        this.shippingPaymentPage.ClickBottomContinueButton();
        this.shippingAddressPage.FillBillingInfo(this.clientPurchaseInfo);
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
    PerfectSystemTestsDesign.Behaviours.Core.BehaviourExecutor.Execute(
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
[Binding]
public class SignInPageLoginBehaviour : WaitableActionBehaviour
{
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    private ClientLoginInfo clientLoginInfo;
    public SignInPageLoginBehaviour()
    {
        this.signInPage =
        UnityContainerFactory.GetContainer().Resolve<SignInPage>();
        this.shippingAddressPage =
        UnityContainerFactory.GetContainer().Resolve<ShippingAddressPage>();
    }
    [When(@"I login with email = ""([^""]*)"" and pass = ""([^""]*)""")]
    public void LoginWithEmailAndPass(string email, string password)
    {
        this.clientLoginInfo = new ClientLoginInfo
        {
            Email = email,
            Password = password
        };
        base.Execute();
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
```

```csharp
ehaviourExecutor.Execute(
new ItemPageNavigationBehaviour(itemUrl),
new ItemPageBuyBehaviour(),
new PreviewShoppingCartPageProceedBehaviour(),
new SignInPageLoginBehaviour(clientLoginInfo),
new ShippingAddressPageFillShippingBehaviour(clientPurchaseInfo),
new ShippingAddressPageFillDifferentBillingBehaviour(clientPurchaseInfo),
new ShippingAddressPageContinueBehaviour(),
new ShippingPaymentPageContinueBehaviour(),
new PlaceOrderPageAssertFinalAmountsBehaviour(itemPrice));
```

## Assessment System for Tests’ Architecture Design- Facade Based Tests

```csharp
public class ShoppingCart
{
    private readonly ItemPage itemPage;
    private readonly PreviewShoppingCartPage previewShoppingCartPage;
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    private readonly ShippingPaymentPage shippingPaymentPage;
    private readonly PlaceOrderPage placeOrderPage;
    public ShoppingCart(
    ItemPage itemPage,
    PreviewShoppingCartPage previewShoppingCartPage,
    SignInPage signInPage,
    ShippingAddressPage shippingAddressPage,
    ShippingPaymentPage shippingPaymentPage,
    PlaceOrderPage placeOrderPage)
    {
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
        double totalPrice = double.Parse(itemPrice);
        this.placeOrderPage.AssertOrderTotalPrice(totalPrice);
    }
}
```

```csharp
[TestMethod]
public void Purchase_ShoppingCartFacade()
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
    var shoppingCart = container.Resolve<ShoppingCart>();
    shoppingCart.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
}
```

```csharp
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
    double totalPrice = double.Parse(itemPrice);
    this.placeOrderPage.AssertOrderTotalPrice(totalPrice);
}
```

```csharp
var shoppingCart = container.Resolve<ShoppingCart>();
shoppingCart.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
```

```csharp
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
```

```csharp
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
    double totalPrice = double.Parse(itemPrice);
    this.placeOrderPage.AssertOrderTotalPrice(totalPrice);
}
```

```csharp
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
var shoppingCart = container.Resolve<ShoppingCart>();
shoppingCart.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
```

```csharp
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
var shoppingCart = container.Resolve<ShoppingCart>();
shoppingCart.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
```

## Failed Tests Аnalysis – Decorator Design Pattern

```csharp
public interface IExceptionAnalysationHandler
{
    bool IsApplicable(Exception ex = null, params object[] context);
    string DetailedIssueExplanation { get; }
}
```

```csharp
public interface IExceptionAnalyser
{
    void Analyse(Exception ex = null, params object[] context);
    void AddExceptionAnalysationHandler<TExceptionAnalysationHandler>(
    IExceptionAnalysationHandler exceptionAnalysationHandler)
    where TExceptionAnalysationHandler : IExceptionAnalysationHandler;
    void AddExceptionAnalysationHandler<TExceptionAnalysationHandler>()
    where TExceptionAnalysationHandler : IExceptionAnalysationHandler, new();
    void RemoveFirstExceptionAnalysationHandler();
}
```

```csharp
public class ExceptionAnalyser : IExceptionAnalyser
{
    private readonly List<IExceptionAnalysationHandler> exceptionAnalysationHandlers;
    public ExceptionAnalyser(IEnumerable<IExceptionAnalysationHandler> handlers)
    {
        this.exceptionAnalysationHandlers = new List<IExceptionAnalysationHandler>();
        this.exceptionAnalysationHandlers.AddRange(handlers);
    }
    public void RemoveFirstExceptionAnalysationHandler()
    {
        if (exceptionAnalysationHandlers.Count > 0)
        {
            exceptionAnalysationHandlers.RemoveAt(0);
        }
    }
    public void Analyse(Exception ex = null, params object[] context)
    {
        foreach (var exceptionHandler in exceptionAnalysationHandlers)
        {
            if (exceptionHandler.IsApplicable(ex, context))
            {
                throw new AnalyzedTestException(exceptionHandler.DetailedIssueExplanation, ex);
            }
        }
    }
    public void AddExceptionAnalysationHandler<TExceptionAnalysationHandler>(
    IExceptionAnalysationHandler exceptionAnalysationHandler)
    where TExceptionAnalysationHandler : IExceptionAnalysationHandler
    {
        exceptionAnalysationHandlers.Insert(0, exceptionAnalysationHandler);
    }
    public void AddExceptionAnalysationHandler<TExceptionAnalysationHandler>()
    where TExceptionAnalysationHandler : IExceptionAnalysationHandler, new()
    {
        exceptionAnalysationHandlers.Insert(0, new TExceptionAnalysationHandler());
    }
}
```

```csharp
public interface IUiExceptionAnalyser : IExceptionAnalyser
{
    void AddExceptionAnalysationHandler(
    string textToSearchInSource,
    string detailedIssueExplanation);
}
```

```csharp
public class UiExceptionAnalyser : ExceptionAnalyser, IUiExceptionAnalyser
{
    public UiExceptionAnalyser(IEnumerable<IExceptionAnalysationHandler> handlers) :
    base(handlers)
    {
    }
    public void AddExceptionAnalysationHandler(
    string textToSearchInSource,
    string detailedIssueExplanation)
    {
        this.AddExceptionAnalysationHandler<CustomHtmlExceptionHandler>(
        new CustomHtmlExceptionHandler(textToSearchInSource, detailedIssueExplanation));
    }
}
```

```csharp
public abstract class HtmlSourceExceptionHandler : IExceptionAnalysationHandler
{
    public HtmlSourceExceptionHandler()
    {
    }
    public abstract string DetailedIssueExplanation { get; }
    public abstract string TextToSearchInSource { get; }
    public bool IsApplicable(Exception ex = null, params object[] context)
    {
        IBrowser browser = (IBrowser)context.FirstOrDefault();
        if (browser == null)
        {
            throw new ArgumentNullException("The browser cannot be null!");
        }
        bool result = browser.SourceString.Contains(this.TextToSearchInSource);
        return result;
    }
}
```

```csharp
public abstract class ExceptionAnalysedPage : BasePage
{
    public ExceptionAnalysedPage(
    IElementFinder elementFinder,
    INavigationService navigationService)
    {
        var exceptionAnalyzedElementFinder =
        new ExceptionAnalyzedElementFinder(
        elementFinder as ExceptionAnalyzedElementFinder);
        var exceptionAnalyzedNavigationService =
        new ExceptionAnalyzedNavigationService(
        navigationService as ExceptionAnalyzedNavigationService,
        exceptionAnalyzedElementFinder.UiExceptionAnalyser);
        this.ExceptionAnalyser = exceptionAnalyzedElementFinder.UiExceptionAnalyser;
        this.ElementFinder = exceptionAnalyzedElementFinder;
        this.NavigationService = exceptionAnalyzedNavigationService;
    }
    public IUiExceptionAnalyser ExceptionAnalyser { get; private set; }
}
```

```csharp
public class ExceptionAnalyzedElementFinder : IElementFinder
{
    public ExceptionAnalyzedElementFinder(
    IElementFinder elementFinder,
    IUiExceptionAnalyser exceptionAnalyser)
    {
        this.ElementFinder = elementFinder;
        this.UiExceptionAnalyser = exceptionAnalyser;
    }
    public ExceptionAnalyzedElementFinder(
    ExceptionAnalyzedElementFinder elementFinderDecorator)
    {
        this.UiExceptionAnalyser = elementFinderDecorator.UiExceptionAnalyser;
        this.ElementFinder = elementFinderDecorator.ElementFinder;
    }
    public IUiExceptionAnalyser UiExceptionAnalyser { get; private set; }
    public IElementFinder ElementFinder { get; private set; }
    public TElement Find<TElement>(By by) where TElement : class, IElement
    {
        TElement result = default(TElement);
        try
        {
            result = this.ElementFinder.Find<TElement>(by);
        }
        catch (Exception ex)
        {
            this.UiExceptionAnalyser.Analyse(ex, this.ElementFinder);
            throw;
        }
        return result;
    }
    public IEnumerable<TElement> FindAll<TElement>(By by)
    where TElement : class, IElement
    {
        IEnumerable<TElement> result = default(IEnumerable<TElement>);
        try
        {
            result = this.ElementFinder.FindAll<TElement>(by);
        }
        catch (Exception ex)
        {
            this.UiExceptionAnalyser.Analyse(ex, this.ElementFinder);
            throw;
        }
        return result;
    }
    public bool IsElementPresent(By by)
    {
        bool result = default(bool);
        try
        {
            result = this.ElementFinder.IsElementPresent(by);
        }
        catch (Exception ex)
        {
            this.UiExceptionAnalyser.Analyse(ex, this.ElementFinder);
            throw;
        }
        return result;
    }
}
```

```csharp
public class ExceptionAnalyzedNavigationService : INavigationService
{
    public ExceptionAnalyzedNavigationService(
    INavigationService navigationService,
    IUiExceptionAnalyser exceptionAnalyser)
    {
        this.NavigationService = navigationService;
        this.UiExceptionAnalyser = exceptionAnalyser;
    }
    public ExceptionAnalyzedNavigationService(
    ExceptionAnalyzedNavigationService exceptionAnalyzedNavigationService)
    {
        this.UiExceptionAnalyser = exceptionAnalyzedNavigationService.UiExceptionAnalyser;
        this.NavigationService = exceptionAnalyzedNavigationService.NavigationService;
    }
    public ExceptionAnalyzedNavigationService(
    ExceptionAnalyzedNavigationService exceptionAnalyzedNavigationService,
    IUiExceptionAnalyser exceptionAnalyser)
    {
        this.UiExceptionAnalyser = exceptionAnalyser;
        this.NavigationService = exceptionAnalyzedNavigationService.NavigationService;
    }
    public IUiExceptionAnalyser UiExceptionAnalyser { get; private set; }
    public INavigationService NavigationService { get; private set; }
    public event EventHandler<PageEventArgs> Navigated;
    public string Url
    {
        get
        {
            return this.NavigationService.Url;
        }
    }
    public string Title
    {
        get
        {
            return this.NavigationService.Title;
        }
    }
    public void Navigate(string relativeUrl, string currentLocation, bool sslEnabled = false)
    {
        this.NavigationService.Navigate(relativeUrl, currentLocation, sslEnabled);
    }
    public void NavigateByAbsoluteUrl(string absoluteUrl, bool useDecodedUrl = true)
    {
        this.NavigationService.NavigateByAbsoluteUrl(absoluteUrl, useDecodedUrl);
    }
    public void Navigate(string currentLocation, bool sslEnabled = false)
    {
        this.NavigationService.Navigate(currentLocation, sslEnabled);
    }
    public void WaitForUrl(string url)
    {
        try
        {
            this.NavigationService.WaitForUrl(url);
        }
        catch (Exception ex)
        {
            this.UiExceptionAnalyser.Analyse(ex, this.NavigationService);
            throw;
        }
    }
    public void WaitForPartialUrl(string url)
    {
        try
        {
            this.NavigationService.WaitForPartialUrl(url);
        }
        catch (Exception ex)
        {
            this.UiExceptionAnalyser.Analyse(ex, this.NavigationService);
            throw;
        }
    }
}
```

```csharp
this.unityContainer.RegisterType<IEnumerable<IExceptionAnalysationHandler>, IExceptionAnalysationHandler[]>();
this.unityContainer.RegisterType<IUiExceptionAnalyser, UiExceptionAnalyser>();
this.unityContainer.RegisterType<IElementFinder, ExceptionAnalyzedElementFinder>(
new InjectionFactory(x => new ExceptionAnalyzedElementFinder(this.driver, this.unityContainer.Resolve<IUiExceptionAnalyser>())));
this.unityContainer.RegisterType<INavigationService, ExceptionAnalyzedNavigationService>(
new InjectionFactory(x => new ExceptionAnalyzedNavigationService(this.driver, this.unityContainer.Resolve<IUiExceptionAnalyser>())));
```

```csharp

public partial class LoginPage : ExceptionAnalysedPage
{
    public LoginPage(
    IElementFinder elementFinder,
    INavigationService navigationService) : base(elementFinder, navigationService)
    {
    }
    public void Navigate()
    {
        this.NavigationService.NavigateByAbsoluteUrl(@"productSiteUrllogin/");
    }
    public void Login()
    {
        this.LoginButton.Click();
    }
    public void Logout()
    {
        this.ExceptionAnalyser.
        AddExceptionAnalysationHandler<EmptyEmailValidationExceptionHandler>();
        this.LogoutButton.Click();
        this.ExceptionAnalyser.RemoveFirstExceptionAnalysationHandler();
    }
}
```

```csharp
[TestClass,
ExecutionEngineAttribute(ExecutionEngineType.TestStudio, Browsers.Firefox),
VideoRecordingAttribute(VideoRecordingMode.DoNotRecord)]
public class LoginProductSiteTests : BaseTest
{
    public override void TestInit()
    {
        base.TestInit();
        UnityContainerFactory.GetContainer().
        RegisterType<IExceptionAnalysationHandler, ServiceUnavailableExceptionHandler>(
        Guid.NewGuid().ToString());
        UnityContainerFactory.GetContainer().
        RegisterType<IExceptionAnalysationHandler, FileNotFoundExceptionHandler>(
        Guid.NewGuid().ToString());
    }
    [TestMethod]
    public void TryToLoginProductSite_Decorator()
    {
        var loginPage = this.Container.Resolve<LoginPage>();
        loginPage.Navigate();
        loginPage.Login();
        loginPage.Logout();
    }
}
```

## Failed Tests Аnalysis- Ambient Context Design Pattern

```csharp
public class TestsExceptionsAnalyzerContext<THandler> : IDisposable
where THandler : Handler, new()
{
    private static readonly Stack<Handler> scopeStack = new Stack<Handler>();
    public TestsExceptionsAnalyzerContext()
    {
        this.AddHandlerInfrontOfChain<THandler>();
    }
    public void Dispose()
    {
        this.MakeSuccessorMainHandler();
    }
    protected void AddHandlerInfrontOfChain<TNewHandler>()
    where TNewHandler : Handler, new()
    {
        var mainApplicationHandler = UnityContainerFactory.GetContainer().Resolve<Handler>(
        ExceptionAnalyzerConstants.MainApplicationHandlerName);
        var newHandler = UnityContainerFactory.GetContainer().Resolve<TNewHandler>();
        newHandler.SetSuccessor(mainApplicationHandler);
        UnityContainerFactory.GetContainer().RegisterInstance<Handler>(
        ExceptionAnalyzerConstants.MainApplicationHandlerName, newHandler);
        scopeStack.Push(newHandler);
    }
    private void MakeSuccessorMainHandler()
    {
        for (int i = 0; i < this.GetType().GetGenericArguments().Length; i++)
        {
            var handler = scopeStack.Pop();
            UnityContainerFactory.GetContainer().RegisterInstance<Handler>(
            ExceptionAnalyzerConstants.MainApplicationHandlerName, handler.Successor);
            handler.ClearSuccessor();
        }
    }
}
```

```csharp
public class ExceptionAnalyzerConstants
{
    public const string MainApplicationHandlerName = @"MAIN_APP_HANDLER";
}
```

```csharp
public class TestsExceptionsAnalyzerContext<THandler1, THandler2> :
TestsExceptionsAnalyzerContext<THandler1>
where THandler1 : Handler, new()
where THandler2 : Handler, new()
{
    public TestsExceptionsAnalyzerContext()
    {
        this.AddHandlerInfrontOfChain<THandler2>();
    }
}
```

```csharp
public class TestsExceptionsAnalyzerContext<THandler1, THandler2, THandler3> :
TestsExceptionsAnalyzerContext<THandler1, THandler2>
where THandler1 : Handler, new()
where THandler2 : Handler, new()
where THandler3 : Handler, new()
{
    public TestsExceptionsAnalyzerContext()
    {
        this.AddHandlerInfrontOfChain<THandler3>();
    }
}
```

```csharp
public static class ExceptionAnalyzer
{
    public static void AnalyzeFor<TExceptionHander>(Action action)
    where TExceptionHander : Handler, new()
    {
        using (UnityContainerFactory.GetContainer().
        Resolve<TestsExceptionsAnalyzerContext<TExceptionHander>>())
        {
            action();
        }
    }
    public static void AnalyzeFor<TExceptionHander1, TExceptionHander2>(Action action)
    where TExceptionHander1 : Handler, new()
    where TExceptionHander2 : Handler, new()
    {
        using (UnityContainerFactory.GetContainer().
        Resolve<TestsExceptionsAnalyzerContext<TExceptionHander1, TExceptionHander2>>())
        {
            action();
        }
    }
    public static void AnalyzeFor<TExceptionHander1, TExceptionHander2, TExceptionHander3>(Action action)
    where TExceptionHander1 : Handler, new()
    where TExceptionHander2 : Handler, new()
    where TExceptionHander3 : Handler, new()
    {
        using (UnityContainerFactory.GetContainer().
        Resolve<TestsExceptionsAnalyzerContext<TExceptionHander1, TExceptionHander2, TExceptionHander3>>())
        {
            action();
        }
    }
}
```

```csharp
public class ExceptionAnalizedElementFinderService
{
    private readonly IUnityContainer container;
    private readonly IExceptionAnalyzer excepionAnalyzer;
    public ExceptionAnalizedElementFinderService(
    IUnityContainer container,
    IExceptionAnalyzer excepionAnalyzer)
    {
        this.container = container;
        this.excepionAnalyzer = excepionAnalyzer;
    }
    public TElement Find<TElement>(IDriver driver, Find findContext, Core.By by)
    where TElement : class, Core.Controls.IElement
    {
        TElement result = default(TElement);
        try
        {
            string testingFrameworkExpression = by.ToTestingFrameworkExpression();
            this.WaitForExists(driver, testingFrameworkExpression);
            var element = findContext.ByExpression(by.ToTestingFrameworkExpression());
            result = this.ResolveElement<TElement>(driver, element);
        }
        catch (Exception ex)
        {
            #region 10. Failed Tests Аnalysis- Ambient Context Design Pattern
            var mainApplicationHandler = UnityContainerFactory.GetContainer().Resolve<Handler>(
            ExceptionAnalyzerConstants.MainApplicationHandlerName);
            mainApplicationHandler.HandleRequest(ex, driver);
            #endregion
            throw;
        }
        return result;
    }
    public IEnumerable<TElement> FindAll<TElement>(IDriver driver, Find findContext, Core.By by)
    where TElement : class, Core.Controls.IElement
    {
        List<TElement> resolvedElements = new List<TElement>();
        try
        {
            string testingFrameworkExpression = by.ToTestingFrameworkExpression();
            this.WaitForExists(driver, testingFrameworkExpression);
            var elements = findContext.AllByExpression(testingFrameworkExpression);
            foreach (var currentElement in elements)
            {
                TElement result = this.ResolveElement<TElement>(driver, currentElement);
                resolvedElements.Add(result);
            }
        }
        catch (Exception ex)
        {
            #region 10. Failed Tests Аnalysis- Ambient Context Design Pattern
            var mainApplicationHandler = UnityContainerFactory.GetContainer().Resolve<Handler>(
            ExceptionAnalyzerConstants.MainApplicationHandlerName);
            mainApplicationHandler.HandleRequest(ex, driver);
            #endregion
            throw;
        }
        return resolvedElements;
    }
    public bool IsElementPresent(Find findContext, Core.By by)
    {
        try
        {
            string controlFindExpression = by.ToTestingFrameworkExpression();
            Manager.Current.ActiveBrowser.RefreshDomTree();
            HtmlFindExpression hfe = new HtmlFindExpression(controlFindExpression);
            Manager.Current.ActiveBrowser.WaitForElement(hfe, 5000, false);
        }
        catch (TimeoutException)
        {
            return false;
        }
        return true;
    }
    private void WaitForExists(IDriver driver, string findExpression)
    {
        try
        {
            driver.WaitUntilReady();
            HtmlFindExpression hfe = new HtmlFindExpression(findExpression);
            Manager.Current.ActiveBrowser.WaitForElement(hfe, 5000, false);
        }
        catch (Exception)
        {
            this.ThrowTimeoutExceptionIfElementIsNull(driver, findExpression);
        }
    }
    private TElement ResolveElement<TElement>(
    IDriver driver,
    ArtOfTest.WebAii.ObjectModel.Element element)
    where TElement : class, Core.Controls.IElement
    {
        TElement result = this.container.Resolve<TElement>(
        new ResolverOverride[]
        {
new ParameterOverride("driver", driver),
new ParameterOverride("element", element),
new ParameterOverride("container", this.container)
        });
        return result;
    }
    private void ThrowTimeoutExceptionIfElementIsNull(IDriver driver, params string[] customExpression)
    {
        StackTrace stackTrace = new StackTrace();
        StackFrame[] stackFrames = stackTrace.GetFrames();
        StackFrame callingFrame = stackFrames[3];
        MethodBase method = callingFrame.GetMethod();
        string currentUrl = driver.Url;
        throw new ElementTimeoutException(
        string.Format(
        "TIMED OUT- for element with Find Expression: {0} Element Name: {1}.{2} URL: {3}Element Timeout: {4}",
        string.Join(",", customExpression.Select(p => p.ToString()).ToArray()),
        method.ReflectedType.FullName, method.Name, currentUrl, Manager.Current.Settings.ElementWaitTimeout));
    }
}
```

```csharp
UnityContainerFactory.GetContainer().RegisterType<FileNotFoundExceptionHandler>(
ExceptionAnalyzerConstants.MainApplicationHandlerName);
var mainHandler = UnityContainerFactory.GetContainer().Resolve<FileNotFoundExceptionHandler>();
UnityContainerFactory.GetContainer().RegisterInstance<Handler>(
ExceptionAnalyzerConstants.MainApplicationHandlerName,
mainHandler,
new HierarchicalLifetimeManager());
```

```csharp
[TestClass,
ExecutionEngineAttribute(ExecutionEngineType.TestStudio, Browsers.Firefox),
VideoRecordingAttribute(VideoRecordingMode.DoNotRecord)]
public class LoginProductSiteTests : BaseTest
{
    [TestMethod]
    public void TryToLoginProductSite_AmbientContext()
    {
        this.Driver.NavigateByAbsoluteUrl("productSiteUrllogin/");
        using (new TestsExceptionsAnalyzerContext<EmptyEmailValidationExceptionHandler>())
        {
            var loginButton = this.Driver.FindByIdEndingWith<IButton>("LoginButton");
            loginButton.Click();
            var logoutButton = this.Driver.FindByIdEndingWith<IButton>("LogoutButton");
            logoutButton.Click();
        }
    }
    [TestMethod]
    public void TryToLoginProductSite_AmbientContextWrapper()
    {
        this.Driver.NavigateByAbsoluteUrl("productSiteUrllogin/");
        ExceptionAnalyzer.AnalyzeFor<EmptyEmailValidationExceptionHandler>(() =>
        {
            var loginButton = this.Driver.FindByIdEndingWith<IButton>("LoginButton");
            loginButton.Click();
            var logoutButton = this.Driver.FindByIdEndingWith<IButton>("LogoutButton");
            logoutButton.Click();
        });
    }
}
```

## Failed Tests Аnalysis- Chain of Responsibility Design Pattern

```csharp
public abstract class Handler
{
    protected abstract string DetailedIssueExplanation { get; }
    public Handler Successor { get; private set; }
    public void SetSuccessor(Handler successor)
    {
        this.Successor = successor;
    }
    public void ClearSuccessor()
    {
        this.Successor = null;
    }
    public void HandleRequest(Exception ex = null, params object[] context)
    {
        if (string.IsNullOrEmpty(this.DetailedIssueExplanation))
        {
            throw new ArgumentException(
            "The detailed exception explanation should be specified.");
        }
        if (this.IsApplicable(context))
        {
            throw new AnalyzedTestException(this.DetailedIssueExplanation, ex);
        }
        else if (Successor != null)
        {
            Successor.HandleRequest(ex, context);
        }
    }
    protected abstract bool IsApplicable(params object[] exceptionData);
}
```

```csharp
public class AnalyzedTestException : Exception
{
    public AnalyzedTestException()
    {
    }
    public AnalyzedTestException(string message)
    : base(FormatExceptionMessage(message))
    {
    }
    public AnalyzedTestException(string message, Exception inner)
    : base(FormatExceptionMessage(message), inner)
    {
    }
    private static string FormatExceptionMessage(
    string exceptionMessage)
    {
        return string.Format(
        "{0}{1}{2}",
        new string('#', 40),
        exceptionMessage,
        new string('#', 40));
    }
}
```

```csharp
public abstract class HtmlSourceExceptionHandler : Handler
{
    public HtmlSourceExceptionHandler()
    {
    }
    protected abstract string TextToSearchInSource { get; }
    protected override bool IsApplicable(params object[] context)
    {
        IBrowser browser = (IBrowser)context.FirstOrDefault();
        if (browser == null)
        {
            throw new ArgumentNullException("The browser cannot be null!");
        }
        bool result = browser.SourceString.Contains(this.TextToSearchInSource);
        return result;
    }
}
```

```csharp
public class ServiceUnavailableExceptionHandler : HtmlSourceExceptionHandler
{
    protected override string DetailedIssueExplanation
    {
        get
        {
            return "IT IS NOT A TEST PROBLEM. THE SERVICE IS UNAVAILABLE.";
        }
    }
    protected override string TextToSearchInSource
    {
        get
        {
            return "HTTP Error 503. The service is unavailable.";
        }
    }
}
```

```csharp
public class FileNotFoundExceptionHandler : HtmlSourceExceptionHandler
{
    protected override string DetailedIssueExplanation
    {
        get
        {
            return "IT IS NOT A TEST PROBLEM. THE PAGE DOES NOT EXIST.";
        }
    }
    protected override string TextToSearchInSource
    {
        get
        {
            return "404 - File or directory not found.";
        }
    }
}
```

```csharp
public class CustomHtmlExceptionHandler : HtmlSourceExceptionHandler
{
    private readonly string textToSearchInSource;
    private readonly string detailedIssueExplanation;
    public CustomHtmlExceptionHandler(
    string textToSearchInSource,
    string detailedIssueExplanation)
    {
        this.textToSearchInSource = textToSearchInSource;
        this.detailedIssueExplanation = detailedIssueExplanation;
    }
    public CustomHtmlExceptionHandler()
    {
    }
    protected override string TextToSearchInSource
    {
        get
        {
            return this.textToSearchInSource;
        }
    }
    protected override string DetailedIssueExplanation
    {
        get
        {
            return this.detailedIssueExplanation;
        }
    }
}
```

```csharp
public interface IExceptionAnalyzer
{
    void AddNewHandler<TNewHandler>() where TNewHandler : Handler, new();
    void RemoveLastHandler();
    Handler MainApplicationHandler { get; set; }
}
```

```csharp
public class ExceptionAnalyzer : IExceptionAnalyzer
{
    public ExceptionAnalyzer(Handler mainApplicationHandler)
    {
        this.MainApplicationHandler = mainApplicationHandler;
    }
    public ExceptionAnalyzer()
    {
    }
    public Handler MainApplicationHandler { get; set; }
    public void AddNewHandler<TNewHandler>()
    where TNewHandler : Handler, new()
    {
        var newHandler = new TNewHandler();
        newHandler.SetSuccessor(this.MainApplicationHandler);
        this.MainApplicationHandler = newHandler;
    }
    public void RemoveLastHandler()
    {
        MainApplicationHandler = MainApplicationHandler.Successor;
        MainApplicationHandler.ClearSuccessor();
    }
}
```

```csharp
public class ExceptionAnalizedElementFinderService
{
    private readonly IUnityContainer container;
    private readonly IExceptionAnalyzer excepionAnalyzer;
    public ExceptionAnalizedElementFinderService(
    IUnityContainer container,
    IExceptionAnalyzer excepionAnalyzer)
    {
        this.container = container;
        this.excepionAnalyzer = excepionAnalyzer;
    }
    public TElement Find<TElement>(IDriver driver, Find findContext, Core.By by)
    where TElement : class, Core.Controls.IElement
    {
        TElement result = default(TElement);
        try
        {
            string testingFrameworkExpression = by.ToTestingFrameworkExpression();
            this.WaitForExists(driver, testingFrameworkExpression);
            var element = findContext.ByExpression(by.ToTestingFrameworkExpression());
            result = this.ResolveElement<TElement>(driver, element);
        }
        catch (Exception ex)
        {
            #region 9. Failed Tests Аnalysis- Chain of Responsibility Design Pattern
            this.excepionAnalyzer.MainApplicationHandler.HandleRequest(ex, driver);
            #endregion
            throw;
        }
        return result;
    }
    public IEnumerable<TElement> FindAll<TElement>(IDriver driver, Find findContext, Core.By by)
    where TElement : class, Core.Controls.IElement
    {
        List<TElement> resolvedElements = new List<TElement>();
        try
        {
            string testingFrameworkExpression = by.ToTestingFrameworkExpression();
            this.WaitForExists(driver, testingFrameworkExpression);
            var elements = findContext.AllByExpression(testingFrameworkExpression);
            foreach (var currentElement in elements)
            {
                TElement result = this.ResolveElement<TElement>(driver, currentElement);
                resolvedElements.Add(result);
            }
        }
        catch (Exception ex)
        {
            #region 9. Failed Tests Аnalysis- Chain of Responsibility Design Pattern
            this.excepionAnalyzer.MainApplicationHandler.HandleRequest(ex, driver);
            #endregion
            throw;
        }
        return resolvedElements;
    }
    public bool IsElementPresent(Find findContext, Core.By by)
    {
        try
        {
            string controlFindExpression = by.ToTestingFrameworkExpression();
            Manager.Current.ActiveBrowser.RefreshDomTree();
            HtmlFindExpression hfe = new HtmlFindExpression(controlFindExpression);
            Manager.Current.ActiveBrowser.WaitForElement(hfe, 5000, false);
        }
        catch (TimeoutException)
        {
            return false;
        }
        return true;
    }
    private void WaitForExists(IDriver driver, string findExpression)
    {
        try
        {
            driver.WaitUntilReady();
            HtmlFindExpression hfe = new HtmlFindExpression(findExpression);
            Manager.Current.ActiveBrowser.WaitForElement(hfe, 5000, false);
        }
        catch (Exception)
        {
            this.ThrowTimeoutExceptionIfElementIsNull(driver, findExpression);
        }
    }
    private TElement ResolveElement<TElement>(
    IDriver driver,
    ArtOfTest.WebAii.ObjectModel.Element element)
    where TElement : class, Core.Controls.IElement
    {
        TElement result = this.container.Resolve<TElement>(
        new ResolverOverride[]
        {
new ParameterOverride("driver", driver),
new ParameterOverride("element", element),
new ParameterOverride("container", this.container)
        });
        return result;
    }
    private void ThrowTimeoutExceptionIfElementIsNull(IDriver driver, params string[] customExpression)
    {
        StackTrace stackTrace = new StackTrace();
        StackFrame[] stackFrames = stackTrace.GetFrames();
        StackFrame callingFrame = stackFrames[3];
        MethodBase method = callingFrame.GetMethod();
        string currentUrl = driver.Url;
        throw new ElementTimeoutException(
        string.Format(
        "TIMED OUT- for element with Find Expression: {0} Element Name: {1}.{2} URL: {3}Element Timeout: {4}",
        string.Join(",", customExpression.Select(p => p.ToString()).ToArray()),
        method.ReflectedType.FullName, method.Name, currentUrl, Manager.Current.Settings.ElementWaitTimeout));
    }
}
```

```csharp
ServiceUnavailableExceptionHandler serviceUnavailableExceptionHandler =
new ServiceUnavailableExceptionHandler();
var exceptionAnalyzer = new ExceptionAnalyzer(serviceUnavailableExceptionHandler);
this.unityContainer.RegisterInstance<IExceptionAnalyzer>(exceptionAnalyzer);
this.unityContainer.RegisterType<IDriver, TestingFrameworkDriver>(
new InjectionFactory(x => new TestingFrameworkDriver(
this.unityContainer,
browserSettings,
exceptionAnalyzer)));
```

```csharp
public class EmptyEmailValidationExceptionHandler : HtmlSourceExceptionHandler
{
    protected override string DetailedIssueExplanation
    {
        get
        {
            return "The client was not successfully loged in instead an Empty Email validation was displayed!";
        }
    }
    protected override string TextToSearchInSource
    {
        get
        {
            return "Enter your email";
        }
    }
}
```

```csharp
[TestClass,
ExecutionEngineAttribute(ExecutionEngineType.TestStudio, Browsers.Firefox),
VideoRecordingAttribute(VideoRecordingMode.DoNotRecord)]
public class LoginProductSiteTests : BaseTest
{
    private IExceptionAnalyzer exceptionAnalyzer;
    public override void TestInit()
    {
        base.TestInit();
        this.exceptionAnalyzer = this.Container.Resolve<IExceptionAnalyzer>();
    }
    [TestMethod]
    public void TryToLoginProductSite()
    {
        this.Driver.NavigateByAbsoluteUrl("productSiteUrllogin/");
        this.exceptionAnalyzer.AddNewHandler<EmptyEmailValidationExceptionHandler>();
        var loginButton = this.Driver.FindByIdEndingWith<IButton>("LoginButton");
        loginButton.Click();
        var logoutButton = this.Driver.FindByIdEndingWith<IButton>("LogoutButton");
        logoutButton.Click();
        this.exceptionAnalyzer.RemoveLastHandler();
    }
}
```

## Advanced Behaviours Design Pattern in Automated Testing Part 2

```csharp
public abstract class BehaviorDefinition
{
    public BehaviorDefinition(Type behaviorType)
    {
        this.BehaviorType = behaviorType;
    }
    internal Type BehaviorType { get; private set; }
}
```

```csharp
public class NavigatePageBehaviorDefinition : BehaviorDefinition
{
    public NavigatePageBehaviorDefinition(string expectedUrl) :
    base(typeof(NavigatePageBehavior))
    {
        this.ExpectedUrl = expectedUrl;
    }
    internal string ExpectedUrl { get; private set; }
}
```

```csharp
public class NavigatePageBehavior : ActionBehaviour
{
    private readonly string expectedUrl;
    public NavigatePageBehavior(NavigatePageBehaviorDefinition definition)
    {
        this.expectedUrl = definition.ExpectedUrl;
    }
    protected override void PerformAct()
    {
        Console.WriteLine(this.expectedUrl);
    }
}
```

```csharp
public static class BehaviorEngine
{
    public static void Execute(params BehaviorDefinition[] behaviorDefinitions)
    {
        foreach (var definition in behaviorDefinitions)
        {
            var behavior =
            UnityContainerFactory.GetContainer().Resolve(
            definition.BehaviorType,
            new ResolverOverride[]
            {
new ParameterOverride("definition", definition)
            }) as Behavior;
            behavior.Execute();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_SimpleBehaviourEngine()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    BehaviorEngine.Execute(
    new NavigatePageBehaviorDefinition(itemUrl));
}
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

## Behaviours Design Pattern in Automated Testing

```csharp
public interface IBehaviour
{
    void PerformAct();
    void PerformPostAct();
    void PerformPostActAsserts();
    void PerformPreActAsserts();
}
```

```csharp
public class Behaviour : IBehaviour
{
    public virtual void PerformAct()
    {
    }
    public virtual void PerformPostAct()
    {
    }
    public virtual void PerformPostActAsserts()
    {
    }
    public virtual void PerformPreActAsserts()
    {
    }
}
```

```csharp
public class ItemPageBuyBehaviour : Behaviour
{
    private readonly ItemPage itemPage;
    public ItemPageBuyBehaviour(ItemPage itemPage)
    {
        this.itemPage = itemPage;
    }
    public override void PerformAct()
    {
        this.itemPage.ClickBuyNowButton();
    }
}
```

```csharp
public class SignInPageLoginBehaviour : Behaviour
{
    private readonly SignInPage signInPage;
    private readonly ShippingAddressPage shippingAddressPage;
    public SignInPageLoginBehaviour(
    SignInPage signInPage,
    ShippingAddressPage shippingAddressPage)
    {
        this.signInPage = signInPage;
        this.shippingAddressPage = shippingAddressPage;
    }
    public override void PerformAct()
    {
        this.signInPage.Login(
        PurchaseTestContext.ClientLoginInfo.Email,
        PurchaseTestContext.ClientLoginInfo.Password);
    }
    public override void PerformPostAct()
    {
        this.shippingAddressPage.WaitForPageToLoad();
    }
}
```

```csharp
public static class SimpleBehaviourEngine
{
    public static void Execute(params Type[] pageBehaviours)
    {
        foreach (Type pageBehaviour in pageBehaviours)
        {
            var currentbehaviour = Activator.CreateInstance(pageBehaviour) as Behaviour;
            currentbehaviour.PerformPreActAsserts();
            currentbehaviour.PerformAct();
            currentbehaviour.PerformPostActAsserts();
            currentbehaviour.PerformPostAct();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_SimpleBehaviourEngine()
{
    PurchaseTestContext.ItemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    PurchaseTestContext.ItemPrice = "40.49";
    PurchaseTestContext.ClientPurchaseInfo = new ClientPurchaseInfo(
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
    PurchaseTestContext.ClientPurchaseInfo.CouponCode = "99PERDIS";
    PurchaseTestContext.ClientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    SimpleBehaviourEngine.Execute(
    typeof(ItemPageNavigationBehaviour),
    typeof(ItemPageBuyBehaviour),
    typeof(PreviewShoppingCartPageProceedBehaviour),
    typeof(SignInPageLoginBehaviour),
    typeof(ShippingAddressPageFillShippingBehaviour),
    typeof(ShippingAddressPageFillDifferentBillingBehaviour),
    typeof(ShippingAddressPageContinueBehaviour),
    typeof(ShippingPaymentPageContinueBehaviour),
    typeof(PlaceOrderPageAssertFinalAmountsBehaviour));
}
```

```csharp
public static class GenericBehaviourEngine
{
    public static void Execute(params Type[] pageBehaviours)
    {
        foreach (Type pageBehaviour in pageBehaviours)
        {
            var currentbehaviour = Activator.CreateInstance(pageBehaviour) as Behaviour;
            currentbehaviour.PerformPreActAsserts();
            currentbehaviour.PerformAct();
            currentbehaviour.PerformPostActAsserts();
            currentbehaviour.PerformPostAct();
        }
    }
    public static void Execute<T1>()
    where T1 : Behaviour
    {
        Execute(typeof(T1));
    }
    public static void Execute<T1, T2>()
    where T1 : Behaviour
    where T2 : Behaviour
    {
        Execute(typeof(T1), typeof(T2));
    }
    public static void Execute<T1, T2, T3>()
    where T1 : Behaviour
    where T2 : Behaviour
    where T3 : Behaviour
    {
        Execute(typeof(T1), typeof(T2), typeof(T3));
    }
    public static void Execute<T1, T2, T3, T4>()
    where T1 : Behaviour
    where T2 : Behaviour
    where T3 : Behaviour
    where T4 : Behaviour
    {
        Execute(typeof(T1), typeof(T2), typeof(T3), typeof(T4));
    }
    // contains 15 more overloads...
    public static void Execute<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20>()
    where T1 : Behaviour
    where T2 : Behaviour
    where T3 : Behaviour
    where T4 : Behaviour
    where T5 : Behaviour
    where T6 : Behaviour
    where T7 : Behaviour
    where T8 : Behaviour
    where T9 : Behaviour
    where T10 : Behaviour
    where T11 : Behaviour
    where T12 : Behaviour
    where T13 : Behaviour
    where T14 : Behaviour
    where T15 : Behaviour
    where T16 : Behaviour
    where T17 : Behaviour
    where T18 : Behaviour
    where T19 : Behaviour
    where T20 : Behaviour
    {
        Execute(
        typeof(T1),
        typeof(T2),
        typeof(T3),
        typeof(T4),
        typeof(T5),
        typeof(T6),
        typeof(T7),
        typeof(T8),
        typeof(T9),
        typeof(T10),
        typeof(T12),
        typeof(T13),
        typeof(T14),
        typeof(T15),
        typeof(T16),
        typeof(T17),
        typeof(T18),
        typeof(T19),
        typeof(T20),
        typeof(T11));
    }
}
```

```csharp
[TestMethod]
public void Purchase_GenericBehaviourEngine()
{
    PurchaseTestContext.ItemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    PurchaseTestContext.ItemPrice = "40.49";
    PurchaseTestContext.ClientPurchaseInfo = new ClientPurchaseInfo(
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
    PurchaseTestContext.ClientPurchaseInfo.CouponCode = "99PERDIS";
    PurchaseTestContext.ClientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    GenericBehaviourEngine.Execute<
    ItemPageNavigationBehaviour,
    ItemPageBuyBehaviour,
    PreviewShoppingCartPageProceedBehaviour,
    SignInPageLoginBehaviour,
    ShippingAddressPageFillShippingBehaviour,
    ShippingAddressPageFillDifferentBillingBehaviour,
    ShippingAddressPageContinueBehaviour,
    ShippingPaymentPageContinueBehaviour,
    PlaceOrderPageAssertFinalAmountsBehaviour>();
}
```

```csharp
public class OverridenActionsBehaviourEngine
{
    private readonly Dictionary<Type, Dictionary<BehaviourActions, Action>>
    overridenBehavioursActions;
    public OverridenActionsBehaviourEngine()
    {
        this.overridenBehavioursActions =
        new Dictionary<Type, Dictionary<BehaviourActions, Action>>();
    }
    public void Execute(params Type[] pageBehaviours)
    {
        foreach (Type pageBehaviour in pageBehaviours)
        {
            var currentbehaviour = Activator.CreateInstance(pageBehaviour) as Behaviour;
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PreActAsserts,
            () => currentbehaviour.PerformPreActAsserts());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.Act,
            () => currentbehaviour.PerformAct());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PostActAsserts,
            () => currentbehaviour.PerformPostActAsserts());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PostAct,
            () => currentbehaviour.PerformPostAct());
        }
    }
    public void ConfugureCustomBehaviour<ТBehavior>(
    BehaviourActions behaviourAction,
    Action action)
    where ТBehavior : IBehaviour
    {
        if (!this.overridenBehavioursActions.ContainsKey(typeof(ТBehavior)))
        {
            this.overridenBehavioursActions.Add(
            typeof(ТBehavior),
            new Dictionary<BehaviourActions, Action>());
        }
        if (!this.overridenBehavioursActions[typeof(ТBehavior)].ContainsKey(
        behaviourAction))
        {
            this.overridenBehavioursActions[typeof(ТBehavior)].Add(behaviourAction, action);
        }
        else
        {
            this.overridenBehavioursActions[typeof(ТBehavior)][behaviourAction] = action;
        }
    }
    private void ExecuteBehaviourOperation(
    Type pageBehaviour,
    BehaviourActions behaviourAction,
    Action defaultBehaviourOperation)
    {
        if (this.overridenBehavioursActions.ContainsKey(pageBehaviour.GetType()) &&
        this.overridenBehavioursActions[pageBehaviour.GetType()].ContainsKey(
        behaviourAction))
        {
            this.overridenBehavioursActions[pageBehaviour.GetType()][behaviourAction].Invoke();
        }
        else
        {
            defaultBehaviourOperation.Invoke();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_OverridenActionsBehaviourEngine()
{
    PurchaseTestContext.ItemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    PurchaseTestContext.ItemPrice = "40.49";
    PurchaseTestContext.ClientPurchaseInfo = new ClientPurchaseInfo(
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
    PurchaseTestContext.ClientPurchaseInfo.CouponCode = "99PERDIS";
    PurchaseTestContext.ClientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var behaviourEngine = new OverriddenActionsBehaviourEngine();
    behaviourEngine.ConfugureCustomBehaviour<SignInPageLoginBehaviour>(
    BehaviourActions.PostAct,
    () =>
    {
        // wait for different URL for this case.
    });
    behaviourEngine.Execute(
    typeof(ItemPageNavigationBehaviour),
    typeof(ItemPageBuyBehaviour),
    typeof(PreviewShoppingCartPageProceedBehaviour),
    typeof(SignInPageLoginBehaviour),
    typeof(ShippingAddressPageFillShippingBehaviour),
    typeof(ShippingAddressPageFillDifferentBillingBehaviour),
    typeof(ShippingAddressPageContinueBehaviour),
    typeof(ShippingPaymentPageContinueBehaviour),
    typeof(PlaceOrderPageAssertFinalAmountsBehaviour));
}
```

```csharp
public class UnityBehaviourEngine
{
    private readonly IUnityContainer unityContainer;
    private readonly Dictionary<Type, Dictionary<BehaviourActions, Action>>
    overridenBehavioursActions;
    public UnityBehaviourEngine(IUnityContainer unityContainer)
    {
        this.unityContainer = unityContainer;
        this.overridenBehavioursActions =
        new Dictionary<Type, Dictionary<BehaviourActions, Action>>();
    }
    public void Execute(params Type[] pageBehaviours)
    {
        foreach (Type pageBehaviour in pageBehaviours)
        {
            var currentbehaviour = this.unityContainer.Resolve(pageBehaviour) as Behaviour;
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PreActAsserts,
            () => currentbehaviour.PerformPreActAsserts());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.Act,
            () => currentbehaviour.PerformAct());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PostActAsserts,
            () => currentbehaviour.PerformPostActAsserts());
            this.ExecuteBehaviourOperation(
            pageBehaviour,
            BehaviourActions.PostAct,
            () => currentbehaviour.PerformPostAct());
        }
    }
    public void ConfugureCustomBehaviour<ТBehavior>(
    BehaviourActions behaviourAction,
    Action action)
    where ТBehavior : IBehaviour
    {
        if (!this.overridenBehavioursActions.ContainsKey(typeof(ТBehavior)))
        {
            this.overridenBehavioursActions.Add(typeof(ТBehavior),
            new Dictionary<BehaviourActions, Action>());
        }
        if (!this.overridenBehavioursActions[typeof(ТBehavior)].ContainsKey(behaviourAction))
        {
            this.overridenBehavioursActions[typeof(ТBehavior)].Add(behaviourAction, action);
        }
        else
        {
            this.overridenBehavioursActions[typeof(ТBehavior)][behaviourAction] = action;
        }
    }
    private void ExecuteBehaviourOperation(
    Type pageBehaviour,
    BehaviourActions behaviourAction,
    Action defaultBehaviourOperation)
    {
        if (this.overridenBehavioursActions.ContainsKey(pageBehaviour.GetType()) &&
        this.overridenBehavioursActions[pageBehaviour.GetType()].ContainsKey(
        behaviourAction))
        {
            this.overridenBehavioursActions[pageBehaviour.GetType()][behaviourAction].Invoke();
        }
        else
        {
            defaultBehaviourOperation.Invoke();
        }
    }
}
```

```csharp
[TestMethod]
public void Purchase_UnityBehaviourEngine()
{
    PurchaseTestContext.ItemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    PurchaseTestContext.ItemPrice = "40.49";
    PurchaseTestContext.ClientPurchaseInfo = new ClientPurchaseInfo(
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
    PurchaseTestContext.ClientPurchaseInfo.CouponCode = "99PERDIS";
    PurchaseTestContext.ClientLoginInfo = new ClientLoginInfo()
    {
        Email = "g3984159@trbvm.com",
        Password = "ASDFG_12345"
    };
    var behaviourEngine = new UnityBehaviourEngine(container);
    behaviourEngine.ConfugureCustomBehaviour<SignInPageLoginBehaviour>(
    BehaviourActions.PostAct,
    () =>
    {
        // wait for different URL for this case.
    });
    behaviourEngine.Execute(
    typeof(ItemPageNavigationBehaviour),
    typeof(ItemPageBuyBehaviour),
    typeof(PreviewShoppingCartPageProceedBehaviour),
    typeof(SignInPageLoginBehaviour),
    typeof(ShippingAddressPageFillShippingBehaviour),
    typeof(ShippingAddressPageFillDifferentBillingBehaviour),
    typeof(ShippingAddressPageContinueBehaviour),
    typeof(ShippingPaymentPageContinueBehaviour),
    typeof(PlaceOrderPageAssertFinalAmountsBehaviour));
}
```

## Advanced Null Object Design Pattern in Automated Testing

```csharp
public abstract class BasePromotionalCodeStrategy : IPurchasePromotionalCodeStrategy
{
    public abstract void AssertPromotionalCodeDiscount();
    public abstract double GetPromotionalCodeDiscountAmount();
    public abstract void ApplyPromotionalCode(string couponCode);
    #region NULL
    static readonly NullPurchasePromotionalCodeStrategy nullPurchasePromotionalCodeStrategy =
    new NullPurchasePromotionalCodeStrategy();
    public static NullPurchasePromotionalCodeStrategy NULL
    {
        get
        {
            return nullPurchasePromotionalCodeStrategy;
        }
    }
    public class NullPurchasePromotionalCodeStrategy : BasePromotionalCodeStrategy
    {
        public override void AssertPromotionalCodeDiscount()
        {
        }
        public override double GetPromotionalCodeDiscountAmount()
        {
            return 0;
        }
        public override void ApplyPromotionalCode(string couponCode)
        {
        }
    }
    #endregion
}
```

```csharp
public class UiPurchasePromotionalCodeStrategy : BasePromotionalCodeStrategy
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
    public override void AssertPromotionalCodeDiscount()
    {
        Assert.AreEqual(
        this.couponDiscountAmount.ToString(),
        this.placeOrderPage.PromotionalDiscountPrice.Text);
    }
    public override double GetPromotionalCodeDiscountAmount()
    {
        return this.couponDiscountAmount;
    }
    public override void ApplyPromotionalCode(string couponCode)
    {
        this.placeOrderPage.PromotionalCode.SendKeys(couponCode);
    }
}
```

```csharp
[TestMethod]
public void Purchase_SeleniumTestingToolsCookbook()
{
    string itemUrl = "/Selenium-Testing-Cookbook-Gundecha-Unmesh/dp/1849515743";
    string itemPrice = "40.49";
    ClientPurchaseInfo clientPurchaseInfo =
    new ClientPurchaseInfo(
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
    UiPurchasePromotionalCodeStrategy.NULL,
    new ItemPage(Driver.Browser),
    new PreviewShoppingCartPage(Driver.Browser),
    new SignInPage(Driver.Browser),
    new ShippingAddressPage(Driver.Browser),
    new ShippingPaymentPage(Driver.Browser),
    new PlaceOrderPage(Driver.Browser));
    purchaseContext.PurchaseItem(
    itemUrl,
    itemPrice,
    clientLoginInfo,
    clientPurchaseInfo);
}
```

```csharp
public class NullPurchasePromotionalCodeStrategy : IPurchasePromotionalCodeStrategy
{
    private static NullPurchasePromotionalCodeStrategy instance;
    public static NullPurchasePromotionalCodeStrategy NULL
    {
        get
        {
            if (instance == null)
            {
                instance = new NullPurchasePromotionalCodeStrategy();
            }
            return instance;
        }
    }
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
    var purchaseContext = new PurchaseContext(NullPurchasePromotionalCodeStrategy.NULL,
    new ItemPage(Driver.Browser),
    new PreviewShoppingCartPage(Driver.Browser),
    new SignInPage(Driver.Browser),
    new ShippingAddressPage(Driver.Browser),
    new ShippingPaymentPage(Driver.Browser),
    new PlaceOrderPage(Driver.Browser));
    purchaseContext.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
}
```

```csharp
private static IUnityContainer container = new UnityContainer();
[TestInitialize]
public void SetupTest()
{
    Driver.StartBrowser();
    container.RegisterType<ItemPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<PreviewShoppingCartPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<SignInPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<ShippingAddressPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<ShippingPaymentPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<PlaceOrderPage>(new ContainerControlledLifetimeManager());
    container.RegisterType<PurchaseContext>(new ContainerControlledLifetimeManager());
    container.RegisterType<
    IPurchasePromotionalCodeStrategy,
    NullPurchasePromotionalCodeStrategy>(new ContainerControlledLifetimeManager());
    container.RegisterInstance<IWebDriver>(Driver.Browser);
}
```

```csharp
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
    var purchaseContext = container.Resolve<PurchaseContext>();
    purchaseContext.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
}
```

```csharp
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
    container.RegisterInstance<IPurchasePromotionalCodeStrategy>(
    new UiPurchasePromotionalCodeStrategy(container.Resolve<PlaceOrderPage>(), 40.49));
    var purchaseContext = container.Resolve<PurchaseContext>();
    purchaseContext.PurchaseItem(itemUrl, itemPrice, clientLoginInfo, clientPurchaseInfo);
}
```

## Null Object Design Pattern in Automated Testing

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
