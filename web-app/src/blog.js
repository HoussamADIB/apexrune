// Blog posts data - Expert Salesforce insights from ApexRune
export const blogPosts = [
  {
    id: 'apex-cpu-timeout-troubleshooting',
    title: 'Fixing "Apex CPU Time Limit Exceeded": A Developer\'s Troubleshooting Guide',
    excerpt: 'That dreaded CPU timeout error can halt your business operations. Here\'s exactly how we diagnose and fix it—with real code examples from client projects.',
    content: `
      <p>If you've seen the error "Apex CPU time limit exceeded" in your Salesforce org, you know the frustration. Transactions fail, users can't save records, and your business grinds to a halt. We've fixed this issue dozens of times for clients, and here's exactly how we approach it.</p>
      
      <h2>Understanding the Problem</h2>
      <p>Salesforce gives each transaction 10,000 milliseconds (10 seconds) of CPU time. When your code exceeds this, the transaction fails. But here's what most people miss: <strong>CPU time is cumulative across all Apex code in the transaction</strong>—triggers, flows, process builders, and any called classes.</p>
      
      <p>A single trigger might only use 500ms, but when you have 5 triggers, 3 flows, and a process builder all firing on the same object? That's where trouble begins.</p>
      
      <h2>Step 1: Identify the Culprit</h2>
      <p>First, we need to find what's consuming the most CPU time. Here's how:</p>
      
      <h3>Enable Debug Logs</h3>
      <p>Set up a debug log for the affected user with these settings:</p>
      <ul>
        <li>Apex Code: FINEST</li>
        <li>Profiling: FINE</li>
        <li>System: DEBUG</li>
      </ul>
      
      <p>Then reproduce the error and analyze the log. Look for the <code>CUMULATIVE_LIMIT_USAGE</code> section—it shows exactly how much CPU time was consumed.</p>
      
      <h3>Use the Apex Execution Tree</h3>
      <p>In Developer Console, the "Execution Overview" panel shows CPU time by method. Sort by CPU time to find your worst offenders.</p>
      
      <h2>Step 2: Common Causes We See</h2>
      
      <h3>Cause 1: SOQL Queries Inside Loops</h3>
      <p>This is the #1 issue we encounter. Here's a real example from a client's trigger:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountTriggerHandler.cls</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">for (Account acc : Trigger.new) {
    List&lt;Contact&gt; contacts = [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
    // Process contacts...
}</code></pre>
        </div>
      </div>
      
      <p>Each iteration executes a new query. With 200 records, that's 200 queries—and massive CPU overhead.</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountTriggerHandler.cls</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">Set&lt;Id&gt; accountIds = new Set&lt;Id&gt;();
for (Account acc : Trigger.new) {
    accountIds.add(acc.Id);
}

Map&lt;Id, List&lt;Contact&gt;&gt; contactsByAccount = new Map&lt;Id, List&lt;Contact&gt;&gt;();
for (Contact c : [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accountIds]) {
    if (!contactsByAccount.containsKey(c.AccountId)) {
        contactsByAccount.put(c.AccountId, new List&lt;Contact&gt;());
    }
    contactsByAccount.get(c.AccountId).add(c);
}</code></pre>
        </div>
      </div>
      
      <h3>Cause 2: Recursive Triggers</h3>
      <p>Trigger A updates Object B, which fires Trigger B, which updates Object A, which fires Trigger A again... You get the picture.</p>
      
      <div class="callout">
        <div class="callout-title">
          <span class="callout-icon">i</span>
          Architect's Note
        </div>
        <p class="callout-text">We recommend adopting a Trigger Handler Framework (like the Kevin O'Hara framework) to manage execution order and logic separation cleanly.</p>
      </div>
      
      <p>The fix: Use a static variable to track recursion:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">TriggerHelper.cls</span>
          <span class="code-badge good">Recursion Guard</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class TriggerHelper {
    public static Boolean isFirstRun = true;
}

// In your trigger:
if (TriggerHelper.isFirstRun) {
    TriggerHelper.isFirstRun = false;
    // Your logic here
}</code></pre>
        </div>
      </div>
      
      <h3>Cause 3: Inefficient String Operations</h3>
      <p>String concatenation in loops is surprisingly expensive:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">StringHelper.cls</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">String result = '';
for (Account acc : accounts) {
    result += acc.Name + ', ';  // Creates new string each time
}</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">StringHelper.cls</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">List&lt;String&gt; names = new List&lt;String&gt;();
for (Account acc : accounts) {
    names.add(acc.Name);
}
String result = String.join(names, ', ');</code></pre>
        </div>
      </div>
      
      <h3>Cause 4: Complex Validation Rules + Triggers</h3>
      <p>Validation rules execute before triggers, but if your trigger updates the same record, validations run again. We've seen orgs with 30+ validation rules per object—each evaluation adds CPU time.</p>
      
      <h2>Step 3: Optimization Strategies</h2>
      
      <h3>Consolidate Triggers</h3>
      <p>Multiple triggers on the same object have unpredictable execution order and compound CPU usage. We always recommend the <strong>one trigger per object</strong> pattern with a handler class:</p>
      
      <div class="callout">
        <div class="callout-title">
          <span class="callout-icon">i</span>
          Architect's Note
        </div>
        <p class="callout-text">Salesforce best practice dictates <strong>one trigger per object</strong>. If you open an Object in Setup and see 5 different triggers (e.g., <code>AccountTrigger</code>, <code>AccountUpdate</code>, <code>PushToERP</code>), you have a problem.</p>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountTrigger.trigger</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">trigger AccountTrigger on Account (before insert, before update, after insert, after update) {
    AccountTriggerHandler handler = new AccountTriggerHandler();
    
    if (Trigger.isBefore && Trigger.isInsert) handler.beforeInsert(Trigger.new);
    if (Trigger.isBefore && Trigger.isUpdate) handler.beforeUpdate(Trigger.new, Trigger.oldMap);
    // ... etc
}</code></pre>
        </div>
      </div>
      
      <h3>Move Logic to Async</h3>
      <p>Heavy processing that doesn't need to complete in real-time? Move it to a Queueable or Batch job:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountTriggerHandler.cls</span>
          <span class="code-badge good">Async Pattern</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// Instead of processing in the trigger:
System.enqueueJob(new ProcessAccountsQueueable(accountIds));</code></pre>
        </div>
      </div>
      
      <h3>Cache Expensive Operations</h3>
      <p>If you're calling Custom Metadata or Custom Settings repeatedly, cache them. Instead, always use <code>Schema.DescribeSObjectResult</code> methods or Custom Metadata Types to fetch IDs dynamically based on Developer Name.</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">SettingsHelper.cls</span>
          <span class="code-badge good">Caching Pattern</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">private static Map&lt;String, My_Setting__mdt&gt; settingsCache;

public static Map&lt;String, My_Setting__mdt&gt; getSettings() {
    if (settingsCache == null) {
        settingsCache = new Map&lt;String, My_Setting__mdt&gt;();
        for (My_Setting__mdt setting : [SELECT DeveloperName, Value__c FROM My_Setting__mdt]) {
            settingsCache.put(setting.DeveloperName, setting);
        }
    }
    return settingsCache;
}</code></pre>
        </div>
      </div>
      
      <h2>Real Client Example</h2>
      <p>A client came to us with CPU timeouts occurring every time they tried to update more than 50 Accounts. After analysis, we found:</p>
      <ul>
        <li>4 separate triggers on Account (total: 6,200ms CPU)</li>
        <li>2 Process Builder processes (total: 2,100ms CPU)</li>
        <li>1 Flow (total: 1,400ms CPU)</li>
        <li>SOQL inside loops in 2 triggers</li>
      </ul>
      
      <p><strong>Our solution:</strong></p>
      <ol>
        <li>Consolidated 4 triggers into 1 with proper handler pattern</li>
        <li>Migrated Process Builders to the consolidated trigger logic</li>
        <li>Converted the Flow to Apex for better performance</li>
        <li>Bulkified all queries</li>
      </ol>
      
      <p><strong>Result:</strong> CPU time dropped from 9,700ms to 1,200ms. They can now update 500+ Accounts without issues.</p>
      
      <h2>Prevention: Best Practices</h2>
      <ul>
        <li><strong>Always bulkify:</strong> Design every trigger to handle 200 records</li>
        <li><strong>Test with data volumes:</strong> Don't test with 1 record and assume it scales</li>
        <li><strong>Monitor limits:</strong> Use <code>Limits.getCpuTime()</code> to track consumption</li>
        <li><strong>Regular audits:</strong> Review automation quarterly as your org grows</li>
      </ul>
      
      <p><strong>Struggling with CPU timeout errors?</strong> <a href="/contact">Reach out to us</a>—we'll diagnose the issue and implement a permanent fix. Our health checks include comprehensive performance analysis.</p>
    `,
    author: 'ApexRune Team',
    date: '2025-01-10',
    category: 'Performance',
    readTime: '12 min read',
    featured: true
  },
  {
    id: 'salesforce-flow-vs-apex-decision-guide',
    title: 'Flow vs. Apex: A Decision Framework for Salesforce Architects',
    excerpt: 'Should you build that automation in Flow or Apex? After implementing hundreds of automations, here\'s the framework we use to decide.',
    content: `
      <p>One of the most common questions we get: "Should I build this in Flow or write Apex?" The answer isn't always obvious, and the wrong choice can lead to maintenance nightmares or performance issues down the road.</p>
      
      <p>After years of building Salesforce automations, we've developed a decision framework that balances performance, maintainability, and future flexibility.</p>
      
      <h2>The Quick Decision Matrix</h2>
      <p>Before diving deep, here's a quick guide:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 1rem; text-align: left; border: 1px solid #e2e8f0;">Scenario</th>
            <th style="padding: 1rem; text-align: left; border: 1px solid #e2e8f0;">Recommendation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;">Simple field updates on save</td>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;"><strong>Flow</strong></td>
          </tr>
          <tr>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;">Create related records</td>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;"><strong>Flow</strong></td>
          </tr>
          <tr>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;">Send email notifications</td>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;"><strong>Flow</strong></td>
          </tr>
          <tr>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;">Complex calculations with multiple conditions</td>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;"><strong>Apex</strong></td>
          </tr>
          <tr>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;">Callouts to external APIs</td>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;"><strong>Apex</strong> (with @future or Queueable)</td>
          </tr>
          <tr>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;">Processing 10,000+ records</td>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;"><strong>Apex Batch</strong></td>
          </tr>
          <tr>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;">User-facing screens with dynamic logic</td>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;"><strong>Screen Flow</strong></td>
          </tr>
          <tr>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;">Custom UI components</td>
            <td style="padding: 1rem; border: 1px solid #e2e8f0;"><strong>LWC + Apex</strong></td>
          </tr>
        </tbody>
      </table>
      
      <h2>Factor 1: Who Will Maintain This?</h2>
      <p>This is often the most important consideration.</p>
      
      <p><strong>Choose Flow when:</strong></p>
      <ul>
        <li>Your Salesforce admin team will maintain the automation</li>
        <li>Business logic changes frequently and needs quick updates</li>
        <li>You want business users to understand what's happening</li>
        <li>The logic is straightforward enough to represent visually</li>
      </ul>
      
      <p><strong>Choose Apex when:</strong></p>
      <ul>
        <li>You have dedicated Salesforce developers on staff</li>
        <li>The logic is complex enough that visual representation becomes confusing</li>
        <li>You need precise control over execution</li>
        <li>Performance is critical</li>
      </ul>
      
      <p><em>Real example:</em> A client asked us to build a lead scoring system. The scoring rules change monthly based on marketing campaigns. We built it in Flow with Decision elements so their marketing admin can adjust scores without developer involvement. If the rules were static, Apex would've been cleaner.</p>
      
      <h2>Factor 2: Performance Requirements</h2>
      <p>Flow has improved dramatically, but Apex is still faster for complex operations.</p>
      
      <p><strong>Flow performance considerations:</strong></p>
      <ul>
        <li>Each Flow element has overhead (~5-10ms per element)</li>
        <li>Loops in Flow can be slow with large datasets</li>
        <li>Flow interviews consume more CPU time than equivalent Apex</li>
        <li>Subflows add latency</li>
      </ul>
      
      <p><strong>When performance matters:</strong></p>
      <ul>
        <li>Processing more than 200 records in a transaction</li>
        <li>Time-sensitive user interactions</li>
        <li>High-volume data loads or integrations</li>
        <li>Already approaching governor limits</li>
      </ul>
      
      <p><em>Benchmark from our testing:</em> A simple "update 5 fields based on criteria" automation:</p>
      <ul>
        <li>Flow: ~180ms for 200 records</li>
        <li>Apex: ~45ms for 200 records</li>
      </ul>
      
      <p>For most use cases, 180ms is fine. But when you're already using 8 seconds of CPU time, that difference matters.</p>
      
      <h2>Factor 3: Complexity of Logic</h2>
      
      <p><strong>Flow excels at:</strong></p>
      <ul>
        <li>Linear processes (A → B → C)</li>
        <li>Simple branching (if X, do Y; otherwise do Z)</li>
        <li>CRUD operations on records</li>
        <li>Sending notifications</li>
        <li>Scheduling future actions</li>
      </ul>
      
      <p><strong>Apex is better for:</strong></p>
      <ul>
        <li>Complex calculations with multiple variables</li>
        <li>Nested loops and conditional logic</li>
        <li>String parsing and manipulation</li>
        <li>Working with collections (maps, sets)</li>
        <li>Error handling with try-catch blocks</li>
        <li>Calling external services</li>
      </ul>
      
      <h2>Factor 4: The Hybrid Approach</h2>
      <p>Often, the best solution combines both. We frequently use this pattern:</p>
      
      <ol>
        <li><strong>Flow handles orchestration:</strong> The business process is visible in Flow</li>
        <li><strong>Apex handles complexity:</strong> Complex logic lives in invocable Apex methods</li>
      </ol>
      
      <p>Here's how to create an invocable method that Flow can call:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">LeadScoringService.cls</span>
          <span class="code-badge good">Invocable Method</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class LeadScoringService {
    
    @InvocableMethod(label='Calculate Lead Score' description='Calculates a lead score based on multiple factors')
    public static List&lt;Integer&gt; calculateScores(List&lt;LeadScoreRequest&gt; requests) {
        List&lt;Integer&gt; scores = new List&lt;Integer&gt;();
        
        for (LeadScoreRequest req : requests) {
            Integer score = 0;
            
            // Complex scoring logic that would be messy in Flow
            if (req.companySize > 500) score += 20;
            if (req.industry == 'Technology') score += 15;
            if (req.engagementScore > 50) score += Math.min(req.engagementScore / 2, 30);
            // ... more rules
            
            scores.add(score);
        }
        
        return scores;
    }
    
    public class LeadScoreRequest {
        @InvocableVariable(required=true)
        public Integer companySize;
        
        @InvocableVariable
        public String industry;
        
        @InvocableVariable
        public Integer engagementScore;
    }
}</code></pre>
        </div>
      </div>
      
      <p>Now Flow can call this method, making the process visible while keeping complex logic in testable, maintainable Apex.</p>
      
      <h2>Anti-Patterns to Avoid</h2>
      
      <h3>❌ "We'll just use Flow for everything"</h3>
      <p>We've seen orgs with 200+ Flows that are impossible to debug. When a save operation fails, good luck figuring out which of 15 active Flows caused it.</p>
      
      <h3>❌ "Apex is always better because it's code"</h3>
      <p>Simple automations in Apex create unnecessary maintenance burden. A 50-line trigger for something Flow handles in 3 elements is over-engineering.</p>
      
      <h3>❌ "Let's mix Process Builder, Workflow Rules, and Flows"</h3>
      <p>Execution order becomes unpredictable. Stick to one automation tool per object when possible.</p>
      
      <h2>Our Recommended Approach</h2>
      <ol>
        <li><strong>Start with Flow</strong> for new automations—it's faster to build and easier to modify</li>
        <li><strong>Move to Apex</strong> when Flow becomes unwieldy (20+ elements) or performance suffers</li>
        <li><strong>Use invocable Apex</strong> for complex calculations called from Flow</li>
        <li><strong>Document your decisions</strong> so future maintainers understand why you chose each approach</li>
      </ol>
      
      <p><strong>Need help deciding?</strong> We offer architecture reviews where we assess your automation landscape and recommend the optimal approach for each use case. <a href="/service/process-automation">Learn more about our automation services</a>.</p>
    `,
    author: 'ApexRune Team',
    date: '2025-01-05',
    category: 'Architecture',
    readTime: '10 min read',
    featured: true
  },
  {
    id: 'salesforce-integration-error-handling',
    title: 'Building Bulletproof Salesforce Integrations: Error Handling That Actually Works',
    excerpt: 'Most Salesforce integrations work fine—until they don\'t. Here\'s how we build integrations that fail gracefully and recover automatically.',
    content: `
      <p>We've audited hundreds of Salesforce integrations, and they almost always have the same problem: they work perfectly in testing but fail mysteriously in production. The culprit? Inadequate error handling.</p>
      
      <p>Here's how we build integrations that handle failures gracefully and keep your business running.</p>
      
      <h2>The Reality of Production Integrations</h2>
      <p>In a perfect world, APIs are always available, data is always valid, and networks never have issues. In reality:</p>
      <ul>
        <li>External APIs go down for maintenance (often without notice)</li>
        <li>Network latency causes timeouts</li>
        <li>Data formats change unexpectedly</li>
        <li>Rate limits get hit during peak usage</li>
        <li>Authentication tokens expire</li>
        <li>Partial failures leave data in inconsistent states</li>
      </ul>
      
      <p>Your integration needs to handle all of these scenarios without losing data or requiring manual intervention.</p>
      
      <h2>Layer 1: Defensive Coding</h2>
      
      <h3>Always Use Try-Catch</h3>
      <p>This seems obvious, but we regularly see callout code without exception handling:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">IntegrationService.cls</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">HttpResponse response = http.send(request);
Map&lt;String, Object&gt; data = (Map&lt;String, Object&gt;) JSON.deserializeUntyped(response.getBody());
String customerId = (String) data.get('customer_id');</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">IntegrationService.cls</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">try {
    HttpResponse response = http.send(request);
    
    if (response.getStatusCode() != 200) {
        throw new IntegrationException(
            'API returned status ' + response.getStatusCode() + ': ' + response.getBody()
        );
    }
    
    Map&lt;String, Object&gt; data = (Map&lt;String, Object&gt;) JSON.deserializeUntyped(response.getBody());
    
    if (data == null || !data.containsKey('customer_id')) {
        throw new IntegrationException('Invalid response structure: missing customer_id');
    }
    
    String customerId = (String) data.get('customer_id');
    // Process successfully...
    
} catch (CalloutException e) {
    // Network/timeout issues
    handleCalloutFailure(e, request);
} catch (JSONException e) {
    // Response parsing issues
    handleParsingFailure(e, response);
} catch (IntegrationException e) {
    // Business logic issues
    handleBusinessFailure(e);
} catch (Exception e) {
    // Unexpected issues
    handleUnexpectedFailure(e);
}</code></pre>
        </div>
      </div>
      
      <h3>Validate Everything</h3>
      <p>Never trust external data:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">ExternalCustomerData.cls</span>
          <span class="code-badge good">Data Validation</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class ExternalCustomerData {
    public String customerId;
    public String email;
    public Decimal revenue;
    
    public void validate() {
        List&lt;String&gt; errors = new List&lt;String&gt;();
        
        if (String.isBlank(customerId)) {
            errors.add('customerId is required');
        }
        
        if (String.isNotBlank(email) && !Pattern.matches('^[\\\\w.+-]+@[\\\\w.-]+\\\\.[a-zA-Z]{2,}$', email)) {
            errors.add('Invalid email format: ' + email);
        }
        
        if (revenue != null && revenue < 0) {
            errors.add('Revenue cannot be negative: ' + revenue);
        }
        
        if (!errors.isEmpty()) {
            throw new ValidationException(String.join(errors, '; '));
        }
    }
}</code></pre>
        </div>
      </div>
      
      <h2>Layer 2: Retry Logic</h2>
      <p>Transient failures (network blips, temporary API issues) often resolve themselves. Implement automatic retries with exponential backoff:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">RetryableCallout.cls</span>
          <span class="code-badge good">Retry Pattern</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class RetryableCallout {
    private static final Integer MAX_RETRIES = 3;
    private static final Integer BASE_DELAY_MS = 1000;
    
    public static HttpResponse executeWithRetry(HttpRequest request) {
        Integer attempt = 0;
        Exception lastException;
        
        while (attempt < MAX_RETRIES) {
            try {
                Http http = new Http();
                HttpResponse response = http.send(request);
                
                // Retry on server errors (5xx)
                if (response.getStatusCode() >= 500) {
                    throw new RetryableException('Server error: ' + response.getStatusCode());
                }
                
                return response;
                
            } catch (CalloutException e) {
                lastException = e;
                attempt++;
                
                if (attempt < MAX_RETRIES) {
                    // Exponential backoff: 1s, 2s, 4s
                    Integer delayMs = BASE_DELAY_MS * (Integer) Math.pow(2, attempt - 1);
                    
                    // In real implementation, you'd use Platform Events or Queueable
                    // for proper async retry. This is simplified.
                    System.debug('Retry attempt ' + attempt + ' after ' + delayMs + 'ms');
                }
            }
        }
        
        throw new IntegrationException('Max retries exceeded', lastException);
    }
}</code></pre>
        </div>
      </div>
      
      <h2>Layer 3: Dead Letter Queue</h2>
      <p>When retries fail, don't lose the data. Store failed requests for later processing:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">IntegrationFailureHandler.cls</span>
          <span class="code-badge good">Dead Letter Queue</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// Custom object: Integration_Failure__c
// Fields: Endpoint__c, Request_Body__c, Error_Message__c, Retry_Count__c, Status__c

public class IntegrationFailureHandler {
    
    public static void recordFailure(String endpoint, String requestBody, String errorMessage) {
        Integration_Failure__c failure = new Integration_Failure__c(
            Endpoint__c = endpoint,
            Request_Body__c = requestBody.left(131072), // Long text area limit
            Error_Message__c = errorMessage.left(32768),
            Status__c = 'Pending',
            Retry_Count__c = 0,
            Created_Date__c = System.now()
        );
        
        insert failure;
        
        // Notify admins of critical failures
        if (isCriticalEndpoint(endpoint)) {
            notifyAdmins(failure);
        }
    }
    
    // Scheduled job to retry failed integrations
    public static void retryFailedIntegrations() {
        List&lt;Integration_Failure__c&gt; failures = [
            SELECT Id, Endpoint__c, Request_Body__c, Retry_Count__c
            FROM Integration_Failure__c
            WHERE Status__c = 'Pending'
            AND Retry_Count__c < 5
            AND Created_Date__c > :System.now().addDays(-7)
            ORDER BY Created_Date__c
            LIMIT 100
        ];
        
        for (Integration_Failure__c failure : failures) {
            // Attempt retry...
        }
    }
}</code></pre>
        </div>
      </div>
      
      <h2>Layer 4: Circuit Breaker Pattern</h2>
      <p>If an external system is down, stop hammering it with requests. Implement a circuit breaker:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">CircuitBreaker.cls</span>
          <span class="code-badge good">Circuit Breaker</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class CircuitBreaker {
    private static final Integer FAILURE_THRESHOLD = 5;
    private static final Integer RESET_TIMEOUT_MINUTES = 5;
    
    // Use Custom Metadata or Platform Cache in production
    private static Map&lt;String, CircuitState&gt; circuits = new Map&lt;String, CircuitState&gt;();
    
    public static Boolean canProceed(String serviceName) {
        CircuitState state = circuits.get(serviceName);
        
        if (state == null) {
            return true; // No state = closed circuit
        }
        
        if (state.isOpen) {
            // Check if we should try again
            if (System.now() > state.openedAt.addMinutes(RESET_TIMEOUT_MINUTES)) {
                state.isOpen = false;
                state.failureCount = 0;
                return true;
            }
            return false;
        }
        
        return true;
    }
    
    public static void recordSuccess(String serviceName) {
        CircuitState state = circuits.get(serviceName);
        if (state != null) {
            state.failureCount = 0;
        }
    }
    
    public static void recordFailure(String serviceName) {
        CircuitState state = circuits.get(serviceName);
        
        if (state == null) {
            state = new CircuitState();
            circuits.put(serviceName, state);
        }
        
        state.failureCount++;
        
        if (state.failureCount >= FAILURE_THRESHOLD) {
            state.isOpen = true;
            state.openedAt = System.now();
            
            // Alert: Circuit opened for this service
            System.debug(LoggingLevel.ERROR, 'Circuit OPEN for ' + serviceName);
        }
    }
    
    private class CircuitState {
        public Integer failureCount = 0;
        public Boolean isOpen = false;
        public DateTime openedAt;
    }
}</code></pre>
        </div>
      </div>
      
      <h2>Layer 5: Monitoring & Alerting</h2>
      <p>You can't fix what you can't see. Set up proper monitoring:</p>
      
      <ul>
        <li><strong>Custom Dashboard:</strong> Track integration success/failure rates</li>
        <li><strong>Email Alerts:</strong> Notify when failure rate exceeds threshold</li>
        <li><strong>Platform Events:</strong> Publish integration events for real-time monitoring</li>
        <li><strong>Audit Trail:</strong> Log all integration attempts with timestamps</li>
      </ul>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">IntegrationLogger.cls</span>
          <span class="code-badge good">Platform Events</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// Platform Event: Integration_Event__e
// Fields: Integration_Name__c, Status__c, Message__c, Duration_Ms__c

public class IntegrationLogger {
    
    public static void logIntegration(String name, Boolean success, String message, Long durationMs) {
        Integration_Event__e event = new Integration_Event__e(
            Integration_Name__c = name,
            Status__c = success ? 'Success' : 'Failure',
            Message__c = message?.left(255),
            Duration_Ms__c = durationMs
        );
        
        EventBus.publish(event);
    }
}</code></pre>
        </div>
      </div>
      
      <h2>Real-World Implementation</h2>
      <p>For a recent client, we built an integration with their ERP system that processes 50,000+ records daily. Our error handling architecture:</p>
      
      <ol>
        <li><strong>Queueable chain</strong> processes records in batches of 200</li>
        <li><strong>Circuit breaker</strong> pauses processing if ERP is down</li>
        <li><strong>Failed records</strong> go to a retry queue with exponential backoff</li>
        <li><strong>Dashboard</strong> shows real-time integration health</li>
        <li><strong>Email alerts</strong> notify when failure rate exceeds 5%</li>
      </ol>
      
      <p><strong>Result:</strong> 99.97% success rate with zero manual intervention over 6 months.</p>
      
      <p><strong>Need help building reliable integrations?</strong> <a href="/service/system-integration">Check out our integration services</a>—we build systems that don't wake you up at 3 AM.</p>
    `,
    author: 'ApexRune Team',
    date: '2024-12-28',
    category: 'Integration',
    readTime: '14 min read',
    featured: false
  },
  {
    id: 'salesforce-lwc-performance-optimization',
    title: 'Lightning Web Components Performance: From Sluggish to Snappy',
    excerpt: 'Your LWC is slow and users are complaining. Here\'s how we diagnose and fix Lightning component performance issues.',
    content: `
      <p>Lightning Web Components are powerful, but it's easy to build components that frustrate users with slow rendering and laggy interactions. We've optimized dozens of LWCs, and here are the techniques that make the biggest difference.</p>
      
      <h2>Diagnosing Performance Issues</h2>
      <p>Before optimizing, identify what's actually slow:</p>
      
      <h3>Use Chrome DevTools Performance Tab</h3>
      <ol>
        <li>Open DevTools (F12)</li>
        <li>Go to Performance tab</li>
        <li>Click Record, interact with your component, then Stop</li>
        <li>Look for long tasks (red triangles) and JavaScript execution time</li>
      </ol>
      
      <h3>Enable Lightning Debug Mode</h3>
      <p>In Setup → Debug Mode → Enable for your user. This gives you better stack traces and component timing.</p>
      
      <h3>Check the Lightning Inspector</h3>
      <p>The Salesforce Lightning Inspector Chrome extension shows component lifecycle events and performance metrics.</p>
      
      <h2>Problem 1: Too Many Wire Calls</h2>
      <p>Each <code>@wire</code> decorator makes an Apex call. Multiple wires mean multiple round trips:</p>
      
      <pre><code class="language-java">// ❌ BAD: Three separate server calls
@wire(getAccount, { accountId: '$recordId' })
account;

@wire(getContacts, { accountId: '$recordId' })
contacts;

@wire(getOpportunities, { accountId: '$recordId' })
opportunities;</code></pre>
      
      <p>Combine them into one call:</p>
      
      <pre><code class="language-java">// ✅ GOOD: One server call returns all data
@wire(getAccountWithRelated, { accountId: '$recordId' })
wiredData({ error, data }) {
    if (data) {
        this.account = data.account;
        this.contacts = data.contacts;
        this.opportunities = data.opportunities;
    }
}

// Apex method
@AuraEnabled(cacheable=true)
public static AccountWrapper getAccountWithRelated(Id accountId) {
    return new AccountWrapper(
        [SELECT Id, Name, Industry FROM Account WHERE Id = :accountId],
        [SELECT Id, Name, Email FROM Contact WHERE AccountId = :accountId LIMIT 100],
        [SELECT Id, Name, Amount, StageName FROM Opportunity WHERE AccountId = :accountId LIMIT 50]
    );
}</code></pre>
      
      <h2>Problem 2: Rendering Large Lists</h2>
      <p>Rendering thousands of items kills performance. Use pagination or virtualization:</p>
      
      <pre><code class="language-java">// ❌ BAD: Render all 5,000 records at once
&lt;template for:each={allRecords} for:item="record"&gt;
    &lt;c-record-card key={record.Id} record={record}&gt;&lt;/c-record-card&gt;
&lt;/template&gt;

// ✅ GOOD: Paginate with "Load More"
&lt;template for:each={visibleRecords} for:item="record"&gt;
    &lt;c-record-card key={record.Id} record={record}&gt;&lt;/c-record-card&gt;
&lt;/template&gt;

&lt;template if:true={hasMore}&gt;
    &lt;lightning-button label="Load More" onclick={handleLoadMore}&gt;&lt;/lightning-button&gt;
&lt;/template&gt;</code></pre>
      
      <pre><code class="language-java">// JavaScript
PAGE_SIZE = 50;
currentPage = 1;

get visibleRecords() {
    return this.allRecords.slice(0, this.currentPage * this.PAGE_SIZE);
}

get hasMore() {
    return this.visibleRecords.length < this.allRecords.length;
}

handleLoadMore() {
    this.currentPage++;
}</code></pre>
      
      <h2>Problem 3: Expensive Getters</h2>
      <p>Getters run on every render. Complex calculations in getters cause performance issues:</p>
      
      <pre><code class="language-java">// ❌ BAD: Complex calculation runs on every render
get processedData() {
    return this.rawData.map(item => {
        return {
            ...item,
            score: this.calculateComplexScore(item),
            formatted: this.formatAllFields(item),
            // More expensive operations...
        };
    });
}

// ✅ GOOD: Cache the result
_processedData;

get processedData() {
    if (!this._processedData && this.rawData) {
        this._processedData = this.rawData.map(item => {
            return {
                ...item,
                score: this.calculateComplexScore(item),
                formatted: this.formatAllFields(item),
            };
        });
    }
    return this._processedData;
}

// Clear cache when raw data changes
@wire(getData)
wiredData({ data }) {
    if (data) {
        this.rawData = data;
        this._processedData = null; // Invalidate cache
    }
}</code></pre>
      
      <h2>Problem 4: Unnecessary Re-renders</h2>
      <p>Changing any <code>@track</code> property triggers a re-render. Batch your updates:</p>
      
      <pre><code class="language-java">// ❌ BAD: Three separate re-renders
this.isLoading = false;
this.data = result;
this.error = null;

// ✅ GOOD: Update object properties (single re-render)
this.state = {
    ...this.state,
    isLoading: false,
    data: result,
    error: null
};</code></pre>
      
      <p>Or use a single state object from the start:</p>
      
      <pre><code class="language-java">@track state = {
    isLoading: false,
    data: null,
    error: null
};

// Update all at once
updateState(updates) {
    this.state = { ...this.state, ...updates };
}</code></pre>
      
      <h2>Problem 5: Missing Cacheable</h2>
      <p>If your Apex method returns the same data for the same inputs, make it cacheable:</p>
      
      <pre><code class="language-java">// ❌ Missing caching - calls server every time
@AuraEnabled
public static List&lt;Product__c&gt; getProducts() {
    return [SELECT Id, Name, Price__c FROM Product__c];
}

// ✅ With caching - uses client-side cache when possible
@AuraEnabled(cacheable=true)
public static List&lt;Product__c&gt; getProducts() {
    return [SELECT Id, Name, Price__c FROM Product__c];
}</code></pre>
      
      <p><strong>Important:</strong> Only use <code>cacheable=true</code> for methods that:</p>
      <ul>
        <li>Don't modify data</li>
        <li>Return consistent results for the same inputs</li>
        <li>Are okay with slightly stale data</li>
      </ul>
      
      <h2>Problem 6: Heavy DOM Operations</h2>
      <p>Manipulating the DOM directly (querying elements, changing styles) is expensive. Let the framework handle it:</p>
      
      <pre><code class="language-java">// ❌ BAD: Direct DOM manipulation in a loop
this.template.querySelectorAll('.item').forEach(el => {
    if (this.selectedIds.includes(el.dataset.id)) {
        el.classList.add('selected');
    } else {
        el.classList.remove('selected');
    }
});

// ✅ GOOD: Let the template handle it
&lt;template for:each={items} for:item="item"&gt;
    &lt;div key={item.id} class={item.cssClass}&gt;{item.name}&lt;/div&gt;
&lt;/template&gt;

// In JS, compute cssClass as part of data transformation
get items() {
    return this.rawItems.map(item => ({
        ...item,
        cssClass: this.selectedIds.includes(item.id) ? 'item selected' : 'item'
    }));
}</code></pre>
      
      <h2>Real Performance Wins</h2>
      <p>We recently optimized a client's account hierarchy viewer component:</p>
      
      <p><strong>Before optimization:</strong></p>
      <ul>
        <li>Initial load: 4.2 seconds</li>
        <li>5 separate wire calls</li>
        <li>Rendering 2,000 nodes at once</li>
        <li>Getters recalculating on every click</li>
      </ul>
      
      <p><strong>After optimization:</strong></p>
      <ul>
        <li>Initial load: 0.8 seconds</li>
        <li>1 combined wire call with caching</li>
        <li>Virtual scrolling showing only visible nodes</li>
        <li>Memoized calculations</li>
      </ul>
      
      <p><strong>80% faster load time, and users actually use the feature now.</strong></p>
      
      <h2>Quick Wins Checklist</h2>
      <ul>
        <li>✅ Combine multiple wire calls into one</li>
        <li>✅ Add <code>cacheable=true</code> to read-only Apex methods</li>
        <li>✅ Paginate lists with more than 100 items</li>
        <li>✅ Cache expensive getter calculations</li>
        <li>✅ Batch state updates to reduce re-renders</li>
        <li>✅ Use <code>key</code> attribute in <code>for:each</code> loops</li>
        <li>✅ Lazy load child components with <code>lwc:if</code></li>
      </ul>
      
      <p><strong>Need help optimizing your Lightning components?</strong> <a href="/service/custom-development">Our custom development services</a> include performance optimization. Let's make your components fast.</p>
    `,
    author: 'ApexRune Team',
    date: '2024-12-20',
    category: 'Development',
    readTime: '11 min read',
    featured: false
  },
  {
    id: 'salesforce-data-migration-strategy',
    title: 'Salesforce Data Migration: A Battle-Tested Strategy for Zero Data Loss',
    excerpt: 'Migrating data into Salesforce is high-stakes work. One mistake can corrupt your entire database. Here\'s the methodology we use for flawless migrations.',
    content: `
      <p>Data migration is one of the highest-risk activities in a Salesforce implementation. Get it wrong, and you're dealing with corrupted records, broken relationships, and angry users. Get it right, and nobody even notices—which is exactly how it should be.</p>
      
      <p>After migrating millions of records across dozens of projects, here's the methodology we've refined.</p>
      
      <h2>Phase 1: Discovery & Planning</h2>
      
      <h3>Map Source to Target</h3>
      <p>Before touching any data, create a detailed mapping document:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Source Field</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Source Type</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Target Field</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Transformation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">customer_name</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">VARCHAR(100)</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Account.Name</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Trim whitespace</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">cust_type</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">INT</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Account.Type</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">1='Customer', 2='Partner', 3='Prospect'</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">created_date</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">DATETIME</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Account.CreatedDate</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Convert timezone UTC→Local</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Identify Data Quality Issues Early</h3>
      <p>Run these queries on your source data before migration:</p>
      
      <pre><code class="language-sql">-- Find duplicates
SELECT customer_name, COUNT(*)
FROM customers
GROUP BY customer_name
HAVING COUNT(*) > 1;

-- Find invalid emails
SELECT id, email
FROM contacts
WHERE email NOT LIKE '%@%.%';

-- Find orphaned records
SELECT c.id, c.customer_id
FROM contacts c
LEFT JOIN customers cu ON c.customer_id = cu.id
WHERE cu.id IS NULL;

-- Find data that will fail validation
SELECT id, phone
FROM customers
WHERE LENGTH(phone) > 40; -- Salesforce limit</code></pre>
      
      <h3>Plan the Load Order</h3>
      <p>Salesforce enforces referential integrity. Load in this order:</p>
      
      <ol>
        <li><strong>Users</strong> (if record ownership matters)</li>
        <li><strong>Parent objects</strong> (Accounts before Contacts)</li>
        <li><strong>Child objects</strong> (Contacts, Opportunities)</li>
        <li><strong>Junction objects</strong> (many-to-many relationships)</li>
        <li><strong>Activities</strong> (Tasks, Events)</li>
        <li><strong>Attachments/Files</strong> (last, as they're large)</li>
      </ol>
      
      <h2>Phase 2: Data Preparation</h2>
      
      <h3>Clean Before You Migrate</h3>
      <p>It's tempting to "clean it up later." Don't. Dirty data in Salesforce is harder to fix than dirty data in a spreadsheet.</p>
      
      <p><strong>Standardization checklist:</strong></p>
      <ul>
        <li>✅ Consistent capitalization (ACME CORP → Acme Corp)</li>
        <li>✅ Phone number formatting ((555) 123-4567)</li>
        <li>✅ State/country standardization (CA → California)</li>
        <li>✅ Remove leading/trailing whitespace</li>
        <li>✅ Merge or flag duplicates</li>
        <li>✅ Validate required fields have values</li>
      </ul>
      
      <h3>Create External ID Fields</h3>
      <p>This is critical for maintaining relationships and enabling updates:</p>
      
      <pre><code class="language-java">// Create External ID field on Account
Field: Legacy_ID__c
Type: Text (External ID, Unique)

// Now you can upsert by legacy ID
Account acc = new Account(
    Legacy_ID__c = 'CUST-12345',  // From source system
    Name = 'Acme Corporation'
);
upsert acc Legacy_ID__c;</code></pre>
      
      <p>External IDs let you:</p>
      <ul>
        <li>Update records without knowing Salesforce IDs</li>
        <li>Re-run migrations without creating duplicates</li>
        <li>Maintain relationships using source system IDs</li>
      </ul>
      
      <h2>Phase 3: The Migration</h2>
      
      <h3>Always Migrate to Sandbox First</h3>
      <p>Never—and we mean never—do your first migration directly to production. Our standard process:</p>
      
      <ol>
        <li>Full migration to Full Sandbox</li>
        <li>Validate data, fix issues in source/transformation</li>
        <li>Repeat until clean</li>
        <li>Migrate to Production</li>
      </ol>
      
      <h3>Disable Automation During Migration</h3>
      <p>Triggers, flows, and validation rules will slow down your migration and may cause failures:</p>
      
      <pre><code class="language-java">// Create a bypass custom setting
public class TriggerControl {
    public static Boolean bypassAllTriggers {
        get {
            Trigger_Settings__c settings = Trigger_Settings__c.getOrgDefaults();
            return settings?.Bypass_All_Triggers__c == true;
        }
    }
}

// In your triggers
trigger AccountTrigger on Account (before insert, before update) {
    if (TriggerControl.bypassAllTriggers) return;
    
    // Normal trigger logic...
}</code></pre>
      
      <p><strong>Don't forget to re-enable automation after migration!</strong></p>
      
      <h3>Use Bulk API for Large Volumes</h3>
      <p>For migrations over 10,000 records, use Bulk API (Data Loader, Workbench, or code):</p>
      
      <ul>
        <li><strong>&lt;10,000 records:</strong> Data Loader (SOAP API) is fine</li>
        <li><strong>10,000-1M records:</strong> Bulk API with parallel batches</li>
        <li><strong>&gt;1M records:</strong> Bulk API with serial batches to avoid locking</li>
      </ul>
      
      <pre><code class="language-java">// Bulk API settings for large migrations
Batch Size: 2000 (reduce if you hit failures)
Parallel/Serial: Serial for same-object updates, Parallel for different objects
Concurrency Mode: Parallel (unless updating the same records)</code></pre>
      
      <h2>Phase 4: Validation</h2>
      
      <h3>Record Count Reconciliation</h3>
      <p>Simple but essential—compare counts:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Object</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Source Count</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Salesforce Count</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Accounts</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">15,234</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">15,234</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">✅</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Contacts</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">42,891</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">42,856</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">⚠️ -35 (investigate)</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Spot-Check Critical Records</h3>
      <p>Pick 20-50 records from each object and manually verify:</p>
      <ul>
        <li>All fields populated correctly</li>
        <li>Relationships intact (Contact → Account)</li>
        <li>Picklist values valid</li>
        <li>Dates/times correct (watch for timezone issues)</li>
      </ul>
      
      <h3>Run Validation Reports</h3>
      <p>Create reports to find issues:</p>
      <ul>
        <li>Accounts without Contacts (if expected to have them)</li>
        <li>Contacts without valid emails</li>
        <li>Records with blank required fields</li>
        <li>Duplicate detection report</li>
      </ul>
      
      <h2>Common Migration Failures & Fixes</h2>
      
      <h3>"INVALID_CROSS_REFERENCE_KEY"</h3>
      <p><strong>Cause:</strong> Lookup field references a record that doesn't exist.</p>
      <p><strong>Fix:</strong> Ensure parent records are loaded before child records. Use External IDs for lookups.</p>
      
      <h3>"STRING_TOO_LONG"</h3>
      <p><strong>Cause:</strong> Source data exceeds Salesforce field length.</p>
      <p><strong>Fix:</strong> Truncate in transformation, or increase field length in Salesforce.</p>
      
      <h3>"DUPLICATE_VALUE"</h3>
      <p><strong>Cause:</strong> Unique field already has that value.</p>
      <p><strong>Fix:</strong> Deduplicate source data, or use upsert with External ID.</p>
      
      <h3>Slow Performance</h3>
      <p><strong>Cause:</strong> Triggers/flows running on each record.</p>
      <p><strong>Fix:</strong> Disable automation, use Bulk API, reduce batch size.</p>
      
      <h2>Post-Migration Checklist</h2>
      <ul>
        <li>☑️ Re-enable all triggers, flows, and validation rules</li>
        <li>☑️ Verify automation works correctly with migrated data</li>
        <li>☑️ Run Apex tests to ensure no regressions</li>
        <li>☑️ Update record ownership if needed</li>
        <li>☑️ Archive migration files securely</li>
        <li>☑️ Document any data transformations for future reference</li>
        <li>☑️ Train users on any data changes</li>
      </ul>
      
      <p><strong>Planning a data migration?</strong> <a href="/contact">Talk to us</a> before you start. A 30-minute planning call can save you weeks of cleanup later.</p>
    `,
    author: 'ApexRune Team',
    date: '2024-12-15',
    category: 'Migration',
    readTime: '15 min read',
    featured: false
  }
];

// Get featured posts
export function getFeaturedPosts() {
  return blogPosts.filter(post => post.featured);
}

// Get post by ID
export function getPostById(id) {
  return blogPosts.find(post => post.id === id);
}

// Get posts by category
export function getPostsByCategory(category) {
  return blogPosts.filter(post => post.category === category);
}

// Get all categories
export function getAllCategories() {
  return [...new Set(blogPosts.map(post => post.category))];
}
