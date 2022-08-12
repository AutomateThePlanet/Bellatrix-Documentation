---
layout: default
title:  "AWS S3 Cloud Object Storage"
excerpt: "Learn to store secrets using AWS Secrets Manager integration."
date:   2022-08-12 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/aws-s3/
anchors:
  what-is-amazon-s3: What Is Amazon S3?
  usage: Usage
---
What Is Amazon S3?
------------------
**[Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/s3/)** is an object storage service offering industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can store and protect any amount of data for virtually any use case, such as data lakes, cloud-native applications, and mobile apps.

Usage
------------------
Our system tests are getting more complex and complex. To be stable as possible they need to create/modify test data. For distributed system that levarage the Amazon S3 cloud we built AWS S3 integration for enabling you to perform CRUD operations - download/upload/delete files from S3. You can access the service from **App.AWS.S3**. You need read AWS documentation to configure properly the authentication - we use internally the default mode. If you need something else you need to modify the code.
**Download File**
```csharp
 App.AWS.S3.DownloadFile(RegionEndpoint.EUCentral1, "s3bucketName", "pathToYourFile");
```
**Upload File**
```csharp
 App.AWS.S3.UploadFile(RegionEndpoint.EUCentral1, "s3bucketName", "pathToYourFile");
```
**Delete File**
```csharp
 App.AWS.S3.DeleteFile(RegionEndpoint.EUCentral1, "s3bucketName", "pathToYourFile");
```
**Delete Files**
```csharp
var filesToBeDeleted = new List<KeyVersion>()
{
    new KeyVersion()
    {
        Key = "pathToYourFile1",
        VersionId = "1.0"
    },
    new KeyVersion()
    {
        Key = "pathToYourFile2",
        VersionId = "2.0"
    }
};
 App.AWS.S3.DeleteMultipleFiles(RegionEndpoint.EUCentral1, "s3bucketName", filesToBeDeleted);
```