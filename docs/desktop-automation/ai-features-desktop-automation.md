---
layout: default
title:  "AI Features in Desktop Automation"
excerpt: "Learn how to use the advanced LLM-powered BELLTRIX features such as element finding by prompt, assertions, self-healing, and smart failure analysis."
date:   2025-05-28 17:00:00 +0300
parent: web-automation
permalink: /desktop-automation/ai-features/  
anchors:  
  overview: Overview  
  element-finding: Element Finding by Prompt  
  assert-validate: AI Assertions and Validations  
  self-healing: Native Self-Healing via LLM  
  smart-analysis: Smart AI Analysis  
  configuration: Configuration and Settings  
  troubleshooting: Troubleshooting & Examples  
---

Overview
--------
BELLATRIX Desktop introduces four advanced AI-powered features for desktop automation using LLMs:

- **Element Finding by Prompt**: Locate UI elements using natural language instructions—works for WPF, WinForms, and all supported desktop controls.
- **AssertByPrompt / ValidateByPrompt**: Validate or assert UI states with human-readable descriptions.
- **Native Self-Healing via LLM**: Automatic self-healing when locators break due to UI changes.
- **Smart AI Analysis**: Deep root cause analysis and BDD-style logging for failed tests.

These features drastically reduce test maintenance, increase reliability, and enable prompt-driven automation for any desktop application.

Element Finding by Prompt
--------
BELLATRIX Desktop enables you to find any UI control just by describing it—no need for brittle locator logic.

**Example:**
```csharp
// Classic way:
var permanentTransfer = App.Components.CreateByName<CheckBox>("BellaCheckBox");

// New AI-powered way:
var items = App.Components.CreateByPrompt<ComboBox>("find the select under meissa check box");
items.SelectByText("Item1");
```

**How it works:**
- The framework indexes PageObjects and known controls using a vector database (Qdrant) and matches them semantically.
- If no known locator matches, the system generates a new one using LLM and the current UI snapshot.
- Successfully resolved locators are cached for future runs.

**To enable PageObject indexing:**
```json
"largeLanguageModelsSettings": {
  ...
  "shouldIndexPageObjects": true,
  "pageObjectFilesPath": "Pages"
}
```

To manually trigger indexing:
```csharp
DesktopAiExtensions.IndexAllPageObjects();
```

AssertByPrompt and ValidateByPrompt
--------
Instead of coding detailed assertion logic, you can validate UI state using prompt instructions:

**Example:**
```csharp
ValidateByPrompt("verify select under meissa check box displayed");
ValidateByPrompt("validate that the label says that the button was clicked");
```

**Output:**
```
✅ AI Validate passed: verify select under meissa check box displayed
✅ AI Validate passed: validate that the label says that the button was clicked
```

**How it works:**
- The framework generates a prompt including the JSON snapshot of the UI and your human instruction.
- The LLM returns “PASS” or “FAIL: [explanation]”.
- Failures are logged with reasoning and recommendations.

Native Self-Healing via LLM
--------
If a locator breaks or the UI changes, BELLATRIX Desktop:

1. Compares the last known working snapshot with the current one.
2. Uses the LLM to generate a new locator from detected UI differences.
3. Tries the new locator for the current run only (not permanently saved).
4. Logs the healing process and result.


**Trigger conditions:**
- `enableSelfHealing` is set to `true` in the settings.
- A locator fails to find an element (e.g., AutomationId or Name changed).


**Typical scenarios:**
- AutomationId or Name is changed.
- Controls are added/removed/renamed.
- UI elements are temporary or dynamic.

Smart AI Analysis via LLM
--------
Every test failure (or optionally every run) triggers a comprehensive AI-driven analysis:

- **BDD-style logging**: Every action, assertion, and result is logged.
- **UI Snapshots**: Stores both passing and failing snapshots for comparison.
- **Root cause classification**: AI tries to classify the failure as a test bug, app bug, or environment issue.
- **Recommendations**: The AI suggests concrete steps to fix the problem.
- **Stacktrace & context**: Full debugging information is included.

**Example output:**
```
🧠 AI-Driven Root Cause Summary:
---
### 🧠 Root Cause Classification:  
**Test Bug**  
Failure due to missing Name property on the “select” control after last UI refactor.
---
### 🛠 Recommended Actions:  
1. Update the test to look for the new AutomationId.
2. Synchronize UI with test expectations.
3. Add fallback logic for temporary UI elements.
---
### 🧩 Reasoning and Evidence:  
- **Key Differences in UI Snapshots:**  
- **Error Messages and Visual State:**  
- **Stack Trace Analysis:**  
---
```

Configuration and Settings
--------
All main AI features are controlled in **testFrameworkSettings.Debug.json** under the section **largeLanguageModelsSettings**.

**Sample settings:**
```json
"largeLanguageModelsSettings": {
  "modelSettings": [
    {
      "endpoint": "env_AZURE_OPENAI_ENDPOINT",
      "key": "env_AZURE_OPENAI_KEY",
      "deployment": "gpt-4o"
    },
    {
      "serviceId": "openai-embed",
      "endpoint": "env_AZURE_OPENAI_EMBEDDINGS_ENDPOINT",
      "key": "env_AZURE_OPENAI_EMBEDDINGS_KEY",
      "embeddingDeployment": "text-embedding-ada-002"
    }
  ],
  "qdrantMemoryDbEndpoint": "http://localhost:6333",
  "localCacheConnectionString": "env_LocalCacheConnectionString",
  "localCacheProjectName": "desktop_getting_started",
  "shouldIndexPageObjects": false,
  "pageObjectFilesPath": "Pages",
  "memoryIndex": "PageObjects",
  "resetIndexEverytime": false,
  "locatorRetryAttempts": 5,
  "validationsTimeout": 15,
  "sleepInterval": 1,
  "enableSelfHealing": true,
  "enableSmartFailureAnalysis": true
}
```

**Where to configure:**
- The file is in the root directory of the **Bellatrix.LLM** project.
- For cloud deployment: set all endpoints and keys as environment variables.

**Docker Compose for Qdrant and local cache:**
```bash
docker-compose -f docker-compose.local_cache_postgres.yml up -d
```

- The compose file is in the main folder of your project.
- For cloud, deploy your own Qdrant instance and update config accordingly.


**DB caching:**
- All resolved locators for prompts are cached and reused for future tests.
- The cache can be reset per project via `localCacheProjectName`.

Troubleshooting & Examples
--------
- If a test is self-healed, you will see log entries such as:
  - `⚠️ RAG-located element not present. Trying cached selectors...`
  - `🧠 Caching new selector for 'find select under meissa check box': [new locator]`
  - `✅ Using cached selector.`
- If AI analysis cannot heal the test, you will get a detailed diagnosis and recommendations.
