---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

# Development

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

# Design and Architecture

## How to Test the Test Automation Framework- Types of Tests

```csharp
[TestMethod]
public void OrientationTest()
{
IRotatable rotatable = ((IRotatable)_driver);
rotatable.Orientation = ScreenOrientation.Portrait;
Assert.AreEqual(ScreenOrientation.Portrait, rotatable.Orientation);
}
[TestMethod]
public void LockTest()
{
_driver.Lock();
Assert.AreEqual(true, _driver.IsLocked());
_driver.Unlock();
Assert.AreEqual(false, _driver.IsLocked());
}
```

## Rules Design Pattern in Automated Testing

```csharp
rulesEvaluator.Eval(new PromotionalPurchaseRule(purchaseTestInput, this.PerformUIAssert));

private void PerformUIAssert(string text = "Perform other UI actions")
{
    Debug.WriteLine(text);
}
```

```csharp
rulesEvaluator.Eval(new CreditCardChargeRule(purchaseTestInput, 20, () => Debug.WriteLine("Perform other UI actions")));
rulesEvaluator.Eval(new CreditCardChargeRule(purchaseTestInput, 20, () =>
{
    Debug.WriteLine("Perform other UI actions");
    Debug.WriteLine("Perform another UI action");
}));
```

```csharp
public class CreditCardChargeRule<TRuleResult> : BaseRule
    where TRuleResult : class, IRuleResult, new()
{
    private readonly PurchaseTestInput purchaseTestInput;
    private readonly decimal totalPriceLowerBoundary;

    public CreditCardChargeRule(PurchaseTestInput purchaseTestInput, decimal totalPriceLowerBoundary)
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
        return new TRuleResult();
    }
}
```

```csharp
public class CreditCardChargeRuleAssertResult : IRuleResult
{
    public bool IsSuccess { get; set; }

    public void Execute()
    {
        Console.WriteLine("Perform DB asserts.");
    }
}
```

```csharp
rulesEvaluator.OtherwiseEval(new CreditCardChargeRule<CreditCardChargeRuleRuleResult>(purchaseTestInput, 30));
rulesEvaluator.OtherwiseEval(new CreditCardChargeRule<CreditCardChargeRuleAssertResult>(purchaseTestInput, 40));
```

## Advanced Observer Design Pattern via Events and Delegates in Automated Testing

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
public class BaseTestBehaviorObserver
{
    public void Subscribe(IExecutionProvider provider)
    {
        provider.TestInstantiatedEvent += this.TestInstantiated;
        provider.PreTestInitEvent += this.PreTestInit;
        provider.PostTestInitEvent += this.PostTestInit;
        provider.PreTestCleanupEvent += this.PreTestCleanup;
        provider.PostTestCleanupEvent += this.PostTestCleanup;
    }

    public void Unsubscribe(IExecutionProvider provider)
    {
        provider.TestInstantiatedEvent -= this.TestInstantiated;
        provider.PreTestInitEvent -= this.PreTestInit;
        provider.PostTestInitEvent -= this.PostTestInit;
        provider.PreTestCleanupEvent -= this.PreTestCleanup;
        provider.PostTestCleanupEvent -= this.PostTestCleanup;
    }

    protected virtual void TestInstantiated(object sender, TestExecutionEventArgs e)
    {
    }

    protected virtual void PreTestInit(object sender, TestExecutionEventArgs e)
    {
    }

    protected virtual void PostTestInit(object sender, TestExecutionEventArgs e)
    {
    }

    protected virtual void PreTestCleanup(object sender, TestExecutionEventArgs e)
    {
    }

    protected virtual void PostTestCleanup(object sender, TestExecutionEventArgs e)
    {
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
public interface ITestExecutionSubject
{
    void Attach(ITestBehaviorObserver observer);

    void Detach(ITestBehaviorObserver observer);

    void PreTestInit(TestContext context, MemberInfo memberInfo);

    void PostTestInit(TestContext context, MemberInfo memberInfo);

    void PreTestCleanup(TestContext context, MemberInfo memberInfo);

    void PostTestCleanup(TestContext context, MemberInfo memberInfo);

    void TestInstantiated(MemberInfo memberInfo);
}
```

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

## Advanced Page Object Pattern in Automated Testing

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
public class SearchEngineMainPageValidator : BasePageValidator<SearchEngineMainPageElementMap>
{
    public void ResultsCount(string expectedCount)
    {
        Assert.IsTrue(this.Map.ResultsCountDiv.Text.Contains(expectedCount), "The results DIV doesn't contains the specified text.");
    }
}
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
