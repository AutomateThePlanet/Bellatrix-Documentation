---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

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
