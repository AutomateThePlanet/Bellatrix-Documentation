---
layout: default
title:  "Computer Vision"
excerpt: "Learn how to validation text in PDFs and images."
date:   2021-06-01 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/computer-vision/
anchors:
  what-is-azure-computer-vision: What Is Azure Computer Vision?
  configuration: Configuration
  usage: Usage
---
What is Azure Computer Vision?
-------
**[Azure Computer Vision](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/)** is a service that can be used to extract printed and handwritten text from images and documents with mixed languages and writing styles. While **[Azure Form Recognizer](https://azure.microsoft.com/en-us/services/form-recognizer/)** is an AI-powered document extraction service that understands your document. In BELLATRIX, we use it to validate the layout of complex PDF documents. Both of these services are PAID after some usage each month. However, they are relatively cheaper than many other libraries and services or the cost of developing your own solution.
![Bellatrix](images/reportportal-filters.png)

Configuration
------------------
To use the integrations you need first to create and configure the Computer Vision and Form Recognizer services in your Azure subscription. To do so, you can follow the [official documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts-sdk/image-analysis-client-library?tabs=visual-studio&pivots=programming-language-csharp).

Once you have everything in place you need to add the info to the BELLATRIX configuration under the **cognitiveServicesSettings** section.
```json
"cognitiveServicesSettings": {
  "computerVisionEndpoint": "computerVisionEndpointUrl",
  "computerVisionSubscriptionKey": "yourkey",
  "formRecognizerEndpoint": "formRecognizerEndpointUrl",
  "formRecognizerSubscriptionKey": "yourkey"
},
```
Usage
-------------
You can access the **ComputerVision** service directly from the App class. Using the **ExtractOCRTextFromLocalFile** method, you can get a list of all text snippets in your document. You can use the **ValidateText** method to check whether a particular text sequence appears in your document under specific order.
```csharp
[Test]
public void MakeTextExtractionFromPDF()
{
    var textSnippets = App.ComputerVision.ExtractOCRTextFromLocalFile("sampleinvoice.pdf");
    textSnippets.ForEach(Console.WriteLine);

    List<string> expectedTextSnippets = new List<string>()
    {
        "69653 1st Point, 45 Acker Driv",
        "Subtotal",
        "$84.00",
        "Total",
        "$136.00",
    };

    App.ComputerVision.ValidateText("sampleinvoice.pdf", "en", expectedTextSnippets);
}
```
