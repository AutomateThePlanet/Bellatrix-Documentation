---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------

Predefined Response Assertions

Assert that the status code is successful. 
```csharp
response.AssertSuccessStatusCode();
```


Assert that the header named ‘server’ has the value ‘Kestrel’.
```csharp
response.AssertResponseHeader("server", "Kestrel");
```

Assert that the native text content (JSON or XML) contains the specified value.
```csharp
response.AssertContentContains("Metallica");
```

Assert the response content encoding.
```csharp
response.AssertContentEncoding("gzip");
```

Assert C# collections directly.
```csharp
response.AssertResultEquals(expectedAlbums);
```

Assert that a specific cookie exists.
```csharp
response.AssertCookieExists("whoIs");
```

Validate JSON and XML Schemas
```csharp

var expectedSchema = @"{
    ""definitions"": {},
    ""$schema"": ""http://json-schema.org/draft-07/schema#"",
    ""$id"": ""http://example.com/root.json"",
    ""type"": ""object"",
    ""title"": ""The Root Schema"",
    ""required"": [
    ""albumId"",
    ""title"",
    ""artistId"",
    ""artist"",
    ""tracks""
    ]
}";
            
response.AssertSchema(expectedSchema);
```