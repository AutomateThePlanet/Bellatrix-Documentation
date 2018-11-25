---
layout: default
title:  "Validate JSON and XML Schema"
excerpt: "Learn how to use BELLATRIX APi to validate JSON and XML schema of the responses."
date:   2018-06-23 06:50:17 +0200
parent: api-automation
permalink: /api-automation/validate-json-and-xml-schema/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
public class ValidateSchemaTests : APITest
{
    [TestMethod]
    public void AssertJsonSchema()
    {
        var request = new RestRequest("api/Albums/10");

        var response = App.GetApiClientService().Get<Albums>(request);

        // 1. The expected JSON schema.
        // http://json-schema.org/examples.html
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
          ],
          ""properties"": {
            ""albumId"": {
              ""$id"": ""#/properties/albumId"",
              ""type"": ""integer"",
              ""title"": ""The Albumid Schema"",
              ""default"": 0,
              ""examples"": [
                10
              ]
            },
            ""title"": {
              ""$id"": ""#/properties/title"",
              ""type"": ""string"",
              ""title"": ""The Title Schema"",
              ""default"": """",
              ""examples"": [
                ""Audioslave""
              ],
              ""pattern"": ""^(.*)$""
            },
            ""artistId"": {
              ""$id"": ""#/properties/artistId"",
              ""type"": ""integer"",
              ""title"": ""The Artistid Schema"",
              ""default"": 0,
              ""examples"": [
                8
              ]
            },
            ""artist"": {
              ""$id"": ""#/properties/artist"",
              ""type"": ""null"",
              ""title"": ""The Artist Schema"",
              ""default"": null,
              ""examples"": [
                null
              ]
            },
            ""tracks"": {
              ""$id"": ""#/properties/tracks"",
              ""type"": ""array"",
              ""title"": ""The Tracks Schema""
            }
          }
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
Use the BELLATRIX **AssertSchema** method to validate the schema. The method can be used for XML and JSON responses.