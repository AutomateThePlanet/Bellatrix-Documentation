---
layout: default
title:  "Retry Failed Requests"
excerpt: "Learn how to retry failed requests with BELLATRIX API attributes."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/retry-failed-requests/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestMethod]
public void AssertJsonSchema()
{
    var request = new RestRequest("api/Albums/10");

    var response = App.GetApiClientService().Get<Albums>(request);

    // http://json-schema.org/examples.html
    var expectedSchema = @"{
                            ""title"": ""Albums"",
                            ""type"": ""object"",
                            ""properties"": {
                                        ""albumId"": {
                                            ""type"": ""integer""
                                        },
                                ""title"": {
                                            ""type"": ""string""
                                },
                                ""artistId"": {
                                            ""type"": ""integer""
                                },
                          ""artist"": {
                                            ""type"": ""object""
                                },
                         ""tracks"": {
                                            ""type"": ""object""
                                }
                                    },
                            ""required"": [""albumId""]
                          }";

    response.AssertSchema(expectedSchema);
}
}
```

Explanations
------------
```csharp
response.AssertSchema(expectedSchema);
```
Use the BELLATRIX **AssertSchema** method to validate the schema. The same method can be used for XML responses as well.
