---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------
iOS
ACCELERATE TEST CREATION


Keep The Clean State of Agents

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

Change Port on WebDriver Initialization
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
=