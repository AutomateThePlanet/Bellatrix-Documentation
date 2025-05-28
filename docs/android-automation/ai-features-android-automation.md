---
layout: default
title:  "AI Features in Android Automation"
excerpt: "Learn how to use the advanced LLM-powered BELLTRIX features such as element finding by prompt, assertions, self-healing, and smart failure analysis."
date:   2025-05-28 17:00:00 +0300
parent: android-automation
permalink: /android-automation/ai-features/  
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
BELLATRIX Mobile Android now brings all advanced AI-powered features to native and hybrid app automation:

- **Element Finding by Prompt**: Locate elements using plain English, not brittle selectors.
- **Smart Scrolling Locators**: The AI generates intelligent UiAutomator expressions that auto-scroll to the correct element.
- **AssertByPrompt / ValidateByPrompt**: Validate or assert UI states using natural language.
- **Native Self-Healing via LLM**: Automatic healing when element locators break.
- **Smart AI Analysis**: Root cause analysis and recommendations for failures.

These features make your Appium tests maintainable, robust, and accessible to non-coders.

Element Finding by Prompt & Smart Scrolling
--------
BELLATRIX Mobile Android allows you to find any UI element using a natural-language description—no need to know its technical details.

**Example:**
```csharp
// Classic way:
var checkBox = App.Components.CreateByIdContaining<CheckBox>("check1");

// Prompt-driven way (AI-powered, works for any element, even if not visible initially!):
var checkBox = App.Components.CreateByPrompt<CheckBox>("find the checkbox under the disabled button");
checkBox.Check();
checkBox.ValidateIsChecked();
```

**How it works:**
- The framework first tries to resolve your prompt via Retrieval-Augmented Generation (RAG) against indexed PageObjects.
- If no known locator is found, it builds a new UiAutomator locator using the LLM and the current UI view snapshot.
- **Smart Scrolling:** If the element is not visible, the AI generates a UiAutomator expression with `UiScrollable().scrollIntoView(...)`. This means the framework will scroll automatically to find the element, even if it’s off-screen!
- All successful locators are cached for blazing-fast and robust reuse.

**Example of AI-generated smart scrolling locator:**
```
new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Submit"))
```

**How the locator is generated:**
- The AI takes your intent (e.g. “find the checkbox under the disabled button”) and the visible view hierarchy.
- It generates the simplest and most robust UiAutomator string using `.text()`, `.description()`, `.resourceId()` etc.
- If scrolling is needed, it wraps it with `UiScrollable(...).scrollIntoView(...)`.
- All this is handled automatically, no need to write scroll code or use XPath.

**Advanced prompt-to-locator logic includes:**
- Using combinations of `.textContains()`, `.descriptionContains()`, `.className()` for best match.
- Never using fragile XPath.
- Works for all Android native controls and hybrid apps.

AssertByPrompt and ValidateByPrompt
--------
Validate or assert UI state with a human-readable sentence.

**Example:**
```csharp
ValidateByPrompt("validate that the spinner combobox has text Jupiter");
```

**Output:**
```
✅ AI Validate passed: validate that the spinner combobox has text Jupiter
```

**How it works:**
- BELLATRIX builds a semantic snapshot of the current Android view.
- The LLM checks your prompt against the JSON summary and returns PASS/FAIL (with reasoning on failure).

Native Self-Healing via LLM
--------
If a locator breaks (e.g., after an app update or UI refactor):

1. The framework compares the last passing UI snapshot with the current failing one.
2. The LLM generates a new, working UiAutomator locator—often including smart scrolling.
3. The framework retries the action with the new locator (only for this run, not stored).
4. The whole healing process and outcome is logged for transparency.


**Trigger conditions:**
- `enableSelfHealing` is `true` in your settings.
- A locator throws (e.g., element not found, text/ID changed, moved, etc.)


**Scenarios:**
- Controls get new resource IDs, text, or change position.
- The screen structure changes, or elements appear in new containers.

Smart AI Analysis via LLM
--------
Every test failure (and optionally every run) is diagnosed with an AI-powered root cause analysis:

- **BDD-style logging** of actions and assertions.
- **View snapshots** before and after failure.
- **Root cause classification:** Is it an app bug, test bug, or environment issue?
- **Concrete recommendations** for how to fix.
- **Stacktrace and all logs** are included.

**Example output:**
```
🧠 AI-Driven Root Cause Summary:
---
### 🧠 Root Cause Classification:  
**App Bug**  
Element's text changed from "Save" to "Submit" after the last update. Locator could not adapt.
---
### 🛠 Recommended Actions:  
1. Update the test prompt to use the new button text.
2. If the UI change is permanent, refactor the app's accessibility identifiers.
---
### 🧩 Reasoning and Evidence:  
- **Old View Snapshot:** Button text was "Save".
- **New View Snapshot:** Button text is "Submit".
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
  "localCacheProjectName": "android_getting_started",
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
- The file is in the root directory of your project.
- For cloud: set endpoints and keys as environment variables.


**Docker Compose for Qdrant and local cache:**
```bash
docker-compose -f docker-compose.local_cache_postgres.yml up -d
```

- The compose file is in your repo.
- For cloud, deploy Qdrant and update config.



**DB caching:**
- All prompt-locators are cached and reused for future runs.
- The cache can be reset per project via `localCacheProjectName`.

Troubleshooting & Examples
--------
- When a test heals itself, you'll see logs like:
  - `⚠️ RAG-located element not present. Trying cached selectors...`
  - `🧠 Caching new selector for 'find the checkbox under the disabled button': new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().className("android.widget.CheckBox"))`
  - `✅ Using cached selector.`
- If healing fails, smart AI analysis will explain why, and what to do next.