---
layout: default
title: "Custom Code"
excerpt: "Custom Code"
date: 2021-02-20 06:50:17 +0200
permalink: /customcode/
---

## Bellatrix Test Automation Framework

# Automation Tools

## High-Quality Automated Tests- Top 9 StyleCop Coding Styles Part 1

```csharp
public object DefuseTheRockets()
{
    return null;
}
```

```csharp
public object DefuseTheRockets() { return null; }
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

```bash
DELETE %TFS% workspace /delete /noprompt /collection:"{your-tfs-team-project-collection-url}" "Hudson-%JOB_NAME%-MASTER;{your-domain-user-name}"

```
