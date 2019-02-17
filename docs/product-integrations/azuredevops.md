---
layout: default
title:  "Azure DevOps CI"
excerpt: "Learn to analyze BELLATRIX test results through Azure DevOps CI."
date:   2018-06-23 06:50:17 +0200
parent: product-integrations
permalink: /product-integrations/azuredevops/
anchors:
  what-is-azure-devops-ci: What Is Azure DevOps CI?
  configuration: Configuration
---
What Is Azure DevOps CI?
-------
[Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) offers one of the best CI on the market. Instead of using 3rd party tools or systems you can directly publish the results in Azure DevOps.

You can create fully customizable dashboards to visualize the tests results and the latest status of your builds.

![Bellatrix](images/azure-devops-dashboard.png)

It offers a well designed interface for filtering and checking the latest published test results.

![Bellatrix](images/azure-devops-summary-results.png)

Also, you can see a summary with some informative charts.

![Bellatrix](images/azure-devops-test-results.png)

If you open a failed tests, you can find detailed information why your tests failed. As part of BELLATRIX integration, your screenshots and video recordings will be uploaded, and you will be able to check them on this screen.

![Bellatrix](images/azure-devops-failed-test.png)

Configuration
-------------
If you want your screenshots and video recording of failed tests to be uploaded automatically to the Azure DevOps CI test reports, BELLATRIX offers such integration. You only need to install a single NuGet package to turn-on the integration.
For MSTest project, you need install **Bellatrix.Results.MSTest** NuGet package.
For NUnit project, you need install **Bellatrix.Results.NUnit** NuGet package.