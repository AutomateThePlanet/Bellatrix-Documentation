---
layout: default
title:  "FileSystemService"
excerpt: "Learn how to use BELLATRIX Android FileSystemService."
date:   2021-06-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/file-system-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
public class FileSystemServiceTests : AndroidTest
{
    [Test]
    public void FileSavedToDevice_When_CallPushFile()
    {
        string data = "The eventual code is no more than the deposit of your understanding. ~E. W. Dijkstra";
        App.Files.PushFile("/data/local/tmp/remote.txt", data);

        byte[] returnDataBytes = App.Files.PullFile("/data/local/tmp/remote.txt");
        string returnedData = Encoding.UTF8.GetString(returnDataBytes);

        Assert.AreEqual(data, returnedData);
    }

    [Test]
    public void FileSavedToDevice_When_CallPushFileFromBytes()
    {
        string data = "The eventual code is no more than the deposit of your understanding. ~E. W. Dijkstra";
        var bytes = Encoding.UTF8.GetBytes(data);

        App.Files.PushFile("/data/local/tmp/remote.txt", bytes);

        byte[] returnDataBytes = App.Files.PullFile("/data/local/tmp/remote.txt");
        string returnedData = Encoding.UTF8.GetString(returnDataBytes);

        Assert.AreEqual(data, returnedData);
    }

    [Test]
    public void FileSavedToDevice_When_CallPushFileFromFileInfo()
    {
        string filePath = Path.GetTempPath();
        var fileName = Guid.NewGuid().ToString();
        string fullPath = Path.Combine(filePath, fileName);

        File.WriteAllText(fullPath,
            "The eventual code is no more than the deposit of your understanding. ~E. W. Dijkstra");

        try
        {
            var file = new FileInfo(fullPath);

            App.Files.PushFile("/data/local/tmp/remote.txt", file);

            byte[] returnDataBytes = App.Files.PullFile("/data/local/tmp/remote.txt");
            string returnedData = Encoding.UTF8.GetString(returnDataBytes);
            Assert.AreEqual(
                "The eventual code is no more than the deposit of your understanding. ~E. W. Dijkstra",
                returnedData);
        }
        finally
        {
            File.Delete(fullPath);
        }
    }

    [Test]
    public void AllFilesReturned_When_CallPullFolder()
    {
        string data = "The eventual code is no more than the deposit of your understanding. ~E. W. Dijkstra";
        App.Files.PushFile("/data/local/tmp/remote.txt", data);

        byte[] returnDataBytes = App.Files.PullFolder("/data/local/tmp/");

        Assert.IsTrue(returnDataBytes.Length > 0);
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with files using the FileSystemService class.
```csharp
App.Files.PushFile("/data/local/tmp/remote.txt", data);
```
Creates a new file on the device with the specified text.
```csharp
byte[] returnDataBytes = App.Files.PullFile("/data/local/tmp/remote.txt");
```
Returns the content of the specified file as a byte array.
```csharp
var bytes = Encoding.UTF8.GetBytes(data);
App.Files.PushFile("/data/local/tmp/remote.txt", bytes);
```
Creates a new file on the device from the specified byte array.
```csharp
var file = new FileInfo(fullPath);
App.Files.PushFile("/data/local/tmp/remote.txt", file);
```
Creates a new file on the device from the specified file info.
```csharp
byte[] returnDataBytes = App.Files.PullFolder("/data/local/tmp/");
```
Returns the content of the specified folder as a byte array.