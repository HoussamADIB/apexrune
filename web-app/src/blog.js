// Blog posts data - Expert Salesforce insights from ApexRune
export const blogPosts = [
  {
    id: 'apex-cpu-timeout-troubleshooting',
    title: 'Fixing "Apex CPU Time Limit Exceeded": A Developer\'s Troubleshooting Guide',
    excerpt: 'That dreaded CPU timeout error can halt your business operations. Here\'s exactly how we diagnose and fix it—with real code examples from client projects.',
    image: '/images/blog/apex-cpu-hero.svg',
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
    date: '2026-01-10',
    category: 'Performance',
    readTime: '12 min read',
    featured: true
  },
  {
    id: 'salesforce-flow-vs-apex-decision-guide',
    title: 'Flow vs. Apex: A Decision Framework for Salesforce Architects',
    excerpt: 'Should you build that automation in Flow or Apex? After implementing hundreds of automations, here\'s the framework we use to decide.',
    image: '/images/blog/flow-vs-apex-hero.svg',
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
    date: '2026-01-05',
    category: 'Architecture',
    readTime: '10 min read',
    featured: true
  },
  {
    id: 'salesforce-integration-error-handling',
    title: 'Building Bulletproof Salesforce Integrations: Error Handling That Actually Works',
    excerpt: 'Most Salesforce integrations work fine—until they don\'t. Here\'s how we build integrations that fail gracefully and recover automatically.',
    image: '/images/blog/integration-hero.svg',
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
    image: '/images/blog/lwc-performance-hero.svg',
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
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountViewer.js</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ❌ BAD: Three separate server calls
@wire(getAccount, { accountId: '$recordId' })
account;

@wire(getContacts, { accountId: '$recordId' })
contacts;

@wire(getOpportunities, { accountId: '$recordId' })
opportunities;</code></pre>
        </div>
      </div>
      
      <p>Combine them into one call:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountViewer.js</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
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
        </div>
      </div>
      
      <h2>Problem 2: Rendering Large Lists</h2>
      <p>Rendering thousands of items kills performance. Use pagination or virtualization:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">RecordList.html</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ❌ BAD: Render all 5,000 records at once
&lt;template for:each={allRecords} for:item="record"&gt;
    &lt;c-record-card key={record.Id} record={record}&gt;&lt;/c-record-card&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">RecordList.html</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ✅ GOOD: Paginate with "Load More"
&lt;template for:each={visibleRecords} for:item="record"&gt;
    &lt;c-record-card key={record.Id} record={record}&gt;&lt;/c-record-card&gt;
&lt;/template&gt;

&lt;template if:true={hasMore}&gt;
    &lt;lightning-button label="Load More" onclick={handleLoadMore}&gt;&lt;/lightning-button&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">RecordList.js</span>
          <span class="code-badge good">Pagination Logic</span>
        </div>
        <div class="code-content">
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
        </div>
      </div>
      
      <h2>Problem 3: Expensive Getters</h2>
      <p>Getters run on every render. Complex calculations in getters cause performance issues:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">DataProcessor.js</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
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
}</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">DataProcessor.js</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ✅ GOOD: Cache the result
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
        </div>
      </div>
      
      <h2>Problem 4: Unnecessary Re-renders</h2>
      <p>Changing any <code>@track</code> property triggers a re-render. Batch your updates:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">StateManagement.js</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ❌ BAD: Three separate re-renders
this.isLoading = false;
this.data = result;
this.error = null;</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">StateManagement.js</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ✅ GOOD: Update object properties (single re-render)
this.state = {
    ...this.state,
    isLoading: false,
    data: result,
    error: null
};</code></pre>
        </div>
      </div>
      
      <p>Or use a single state object from the start:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">StateManagement.js</span>
          <span class="code-badge good">State Object</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">@track state = {
    isLoading: false,
    data: null,
    error: null
};

// Update all at once
updateState(updates) {
    this.state = { ...this.state, ...updates };
}</code></pre>
        </div>
      </div>
      
      <h2>Problem 5: Missing Cacheable</h2>
      <p>If your Apex method returns the same data for the same inputs, make it cacheable:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">ProductController.cls</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ❌ Missing caching - calls server every time
@AuraEnabled
public static List&lt;Product__c&gt; getProducts() {
    return [SELECT Id, Name, Price__c FROM Product__c];
}</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">ProductController.cls</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ✅ With caching - uses client-side cache when possible
@AuraEnabled(cacheable=true)
public static List&lt;Product__c&gt; getProducts() {
    return [SELECT Id, Name, Price__c FROM Product__c];
}</code></pre>
        </div>
      </div>
      
      <p><strong>Important:</strong> Only use <code>cacheable=true</code> for methods that:</p>
      <ul>
        <li>Don't modify data</li>
        <li>Return consistent results for the same inputs</li>
        <li>Are okay with slightly stale data</li>
      </ul>
      
      <h2>Problem 6: Heavy DOM Operations</h2>
      <p>Manipulating the DOM directly (querying elements, changing styles) is expensive. Let the framework handle it:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">DOMManipulation.js</span>
          <span class="code-badge">Bad Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ❌ BAD: Direct DOM manipulation in a loop
this.template.querySelectorAll('.item').forEach(el => {
    if (this.selectedIds.includes(el.dataset.id)) {
        el.classList.add('selected');
    } else {
        el.classList.remove('selected');
    }
});</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">ItemList.html</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ✅ GOOD: Let the template handle it
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
        </div>
      </div>
      
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
    image: '/images/blog/data-migration-hero.svg',
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
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">DataAnalysis.sql</span>
          <span class="code-badge good">Data Quality</span>
        </div>
        <div class="code-content">
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
        </div>
      </div>
      
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
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">MigrationScript.apex</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// Create External ID field on Account
Field: Legacy_ID__c
Type: Text (External ID, Unique)

// Now you can upsert by legacy ID
Account acc = new Account(
    Legacy_ID__c = 'CUST-12345',  // From source system
    Name = 'Acme Corporation'
);
upsert acc Legacy_ID__c;</code></pre>
        </div>
      </div>
      
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
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">TriggerControl.cls</span>
          <span class="code-badge good">Bypass Pattern</span>
        </div>
        <div class="code-content">
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
        </div>
      </div>
      
      <p><strong>Don't forget to re-enable automation after migration!</strong></p>
      
      <h3>Use Bulk API for Large Volumes</h3>
      <p>For migrations over 10,000 records, use Bulk API (Data Loader, Workbench, or code):</p>
      
      <ul>
        <li><strong>&lt;10,000 records:</strong> Data Loader (SOAP API) is fine</li>
        <li><strong>10,000-1M records:</strong> Bulk API with parallel batches</li>
        <li><strong>&gt;1M records:</strong> Bulk API with serial batches to avoid locking</li>
      </ul>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">BulkSettings.config</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// Bulk API settings for large migrations
Batch Size: 2000 (reduce if you hit failures)
Parallel/Serial: Serial for same-object updates, Parallel for different objects
Concurrency Mode: Parallel (unless updating the same records)</code></pre>
        </div>
      </div>
      
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
  },
  {
    id: 'todo-salesforce-security-best-practices',
    title: 'Salesforce Security Best Practices: Protecting Your Org from Common Vulnerabilities',
    excerpt: 'Security isn\'t optional. Learn the essential security practices every Salesforce org needs—from field-level security to Apex injection prevention.',
    content: `
      <p>Salesforce holds your most sensitive business data: customer information, financial records, proprietary processes. A security breach isn't just a technical issue—it's a business disaster that can destroy trust and result in regulatory fines.</p>
      
      <p>After auditing hundreds of Salesforce orgs, we've seen the same security gaps repeated over and over. This guide covers the essential security practices that every org should implement, regardless of size or industry.</p>
      
      <h2>The Security Model: Understanding the Layers</h2>
      <p>Salesforce security operates in layers, each protecting different aspects of your data:</p>
      
      <ul>
        <li><strong>Organization-level:</strong> Login IP restrictions, password policies, session settings</li>
        <li><strong>Object-level:</strong> Which objects users can access</li>
        <li><strong>Field-level:</strong> Which fields users can see or edit</li>
        <li><strong>Record-level:</strong> Which specific records users can access (sharing rules, profiles)</li>
      </ul>
      
      <h2>Common Security Vulnerabilities We Find</h2>
      
      <h3>1. Overly Permissive Profiles</h3>
      <p>Too many orgs use "System Administrator" as a default profile for users who don't need that level of access. This violates the principle of least privilege.</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">Security Audit Checklist</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// Review profile permissions quarterly
// Questions to ask:
// 1. Does this user need "Modify All" on this object?
// 2. Can we use a permission set instead of profile changes?
// 3. Are we using field-level security appropriately?</code></pre>
        </div>
      </div>
      
      <h3>2. SOQL Injection Vulnerabilities</h3>
      <p>Dynamic SOQL queries built from user input are a major security risk. Always use bind variables.</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountController.cls</span>
          <span class="code-badge">Vulnerable</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// NEVER DO THIS
String searchTerm = ApexPages.currentPage().getParameters().get('search');
String query = 'SELECT Id, Name FROM Account WHERE Name LIKE \\'%' + searchTerm + '%\\'';
List&lt;Account&gt; accounts = Database.query(query);</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountController.cls</span>
          <span class="code-badge good">Secure</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// ALWAYS USE BIND VARIABLES
String searchTerm = String.escapeSingleQuotes(
    ApexPages.currentPage().getParameters().get('search')
);
String query = 'SELECT Id, Name FROM Account WHERE Name LIKE :searchTerm';
List&lt;Account&gt; accounts = Database.query(query);</code></pre>
        </div>
      </div>
      
      <h3>3. Missing Field-Level Security</h3>
      <p>Sensitive fields like Social Security Numbers, credit card numbers, or salary information should be protected at the field level, not just object level.</p>
      
      <h2>Implementing Field-Level Security</h2>
      <p>Field-level security (FLS) is your second line of defense. Even if a user can access an Account record, they shouldn't necessarily see all fields.</p>
      
      <h2>Record-Level Security: Sharing Rules and Manual Sharing</h2>
      <p>Understanding when to use sharing rules vs. manual sharing vs. Apex managed sharing is critical for maintaining security while enabling collaboration.</p>
      
      <h2>API Security: Protecting Your Integrations</h2>
      <p>When exposing data via REST or SOAP APIs, implement proper authentication, rate limiting, and input validation.</p>
      
      <h2>Security Audit Checklist</h2>
      <ul>
        <li>☑️ Review all profiles quarterly</li>
        <li>☑️ Audit all Apex classes for SOQL injection</li>
        <li>☑️ Enable field-level security on sensitive fields</li>
        <li>☑️ Review sharing rules and OWD settings</li>
        <li>☑️ Enable login IP restrictions for admin users</li>
        <li>☑️ Implement two-factor authentication</li>
        <li>☑️ Review connected app OAuth settings</li>
        <li>☑️ Audit API access and usage</li>
      </ul>
      
      <p><strong>Need a security audit?</strong> Our health checks include comprehensive security reviews. <a href="/contact">Contact us</a> to schedule an assessment.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-01-15',
    category: 'Security',
    readTime: '14 min read',
    featured: false
  },
  {
    id: 'todo-salesforce-testing-strategies',
    title: 'Salesforce Testing Strategies: Beyond Code Coverage Requirements',
    excerpt: '85% code coverage is just the beginning. Learn how to write tests that actually catch bugs, prevent regressions, and document your code\'s behavior.',
    content: `
      <p>Every Salesforce developer knows the rule: 75% code coverage minimum for deployment. But hitting that number doesn't mean your code is tested—it just means you've written enough lines to satisfy the platform.</p>
      
      <p>We've seen orgs with 90%+ coverage that still break in production because tests don't validate business logic, edge cases, or integration points. Here's how to write tests that actually matter.</p>
      
      <h2>The Testing Pyramid</h2>
      <p>Effective testing follows a pyramid structure:</p>
      
      <ul>
        <li><strong>Unit Tests (70%):</strong> Fast, isolated tests of individual methods</li>
        <li><strong>Integration Tests (20%):</strong> Tests that verify components work together</li>
        <li><strong>End-to-End Tests (10%):</strong> Full user workflow tests</li>
      </ul>
      
      <h2>Writing Meaningful Unit Tests</h2>
      
      <h3>Test the Business Logic, Not Just the Code</h3>
      <p>Your tests should verify that your code does what it's supposed to do, not just that it runs without errors.</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountTriggerHandler.cls</span>
          <span class="code-badge">Production Code</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class AccountTriggerHandler {
    public static void calculateAnnualRevenue(List&lt;Account&gt; accounts) {
        for (Account acc : accounts) {
            if (acc.NumberOfEmployees &gt; 100) {
                acc.AnnualRevenue = acc.AnnualRevenue * 1.1; // 10% boost
            }
        }
    }
}</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountTriggerHandlerTest.cls</span>
          <span class="code-badge good">Good Test</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">@isTest
private class AccountTriggerHandlerTest {
    @isTest
    static void testCalculateAnnualRevenue_LargeCompany() {
        // Given: Account with 150 employees and $1M revenue
        Account acc = new Account(
            Name = 'Test Corp',
            NumberOfEmployees = 150,
            AnnualRevenue = 1000000
        );
        
        // When: Calculate revenue
        AccountTriggerHandler.calculateAnnualRevenue(new List&lt;Account&gt;{acc});
        
        // Then: Revenue should be increased by 10%
        System.assertEquals(1100000, acc.AnnualRevenue, 
            'Large companies should get 10% revenue boost');
    }
    
    @isTest
    static void testCalculateAnnualRevenue_SmallCompany() {
        // Given: Account with 50 employees
        Account acc = new Account(
            Name = 'Small Corp',
            NumberOfEmployees = 50,
            AnnualRevenue = 1000000
        );
        
        // When: Calculate revenue
        AccountTriggerHandler.calculateAnnualRevenue(new List&lt;Account&gt;{acc});
        
        // Then: Revenue should remain unchanged
        System.assertEquals(1000000, acc.AnnualRevenue,
            'Small companies should not get revenue boost');
    }
}</code></pre>
        </div>
      </div>
      
      <h2>Testing Edge Cases</h2>
      <p>Don't just test the happy path. Test what happens when:</p>
      <ul>
        <li>Null values are passed</li>
        <li>Empty lists are processed</li>
        <li>Governor limits are approached</li>
        <li>Related records don't exist</li>
        <li>Validation rules should prevent the operation</li>
      </ul>
      
      <h2>Testing Bulk Operations</h2>
      <p>Salesforce processes records in batches. Your tests should verify bulkification works correctly.</p>
      
      <h2>Mocking External Dependencies</h2>
      <p>When testing code that makes callouts or queries external data, use test classes and mock responses.</p>
      
      <h2>Test Data Management</h2>
      <p>Use @TestSetup to create test data once, then reference it in multiple test methods. This improves performance and maintainability.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ One assertion per test method (when possible)</li>
        <li>✅ Use descriptive test method names: <code>testMethodName_Scenario_ExpectedResult</code></li>
        <li>✅ Test both positive and negative cases</li>
        <li>✅ Verify governor limit usage in tests</li>
        <li>✅ Test with realistic data volumes</li>
        <li>✅ Keep tests fast—they should run in seconds, not minutes</li>
      </ul>
      
      <p><strong>Struggling with test coverage or quality?</strong> We can help you build a comprehensive testing strategy. <a href="/contact">Get in touch</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-01-20',
    category: 'Development',
    readTime: '12 min read',
    featured: false
  },
  {
    id: 'todo-salesforce-ci-cd-pipeline',
    title: 'Building a CI/CD Pipeline for Salesforce: From Code to Production',
    excerpt: 'Manual deployments are error-prone and slow. Learn how to set up automated CI/CD pipelines that catch bugs early and deploy with confidence.',
    content: `
      <p>Deploying Salesforce changes manually is risky. You might forget to include a dependent class, miss a test failure, or deploy to production without proper review. One mistake can bring down your entire org.</p>
      
      <p>Continuous Integration and Continuous Deployment (CI/CD) automates the entire process: testing, code review, validation, and deployment. Here's how we set up CI/CD pipelines that catch issues before they reach production.</p>
      
      <h2>Why CI/CD Matters for Salesforce</h2>
      <p>Manual deployments lead to:</p>
      <ul>
        <li>Human error (forgetting files, wrong org, missing dependencies)</li>
        <li>Inconsistent environments (sandbox drift from production)</li>
        <li>Slow feedback loops (bugs discovered days or weeks after coding)</li>
        <li>Deployment anxiety (fear of breaking production)</li>
      </ul>
      
      <p>CI/CD solves these problems by automating every step and providing immediate feedback.</p>
      
      <h2>The CI/CD Pipeline Architecture</h2>
      <p>A typical Salesforce CI/CD pipeline includes:</p>
      
      <ol>
        <li><strong>Source Control:</strong> Git repository (GitHub, GitLab, Bitbucket)</li>
        <li><strong>Build Server:</strong> GitHub Actions, GitLab CI, Jenkins, or CircleCI</li>
        <li><strong>Salesforce CLI:</strong> For deployments and validation</li>
        <li><strong>Testing:</strong> Automated test execution</li>
        <li><strong>Code Quality:</strong> Linting, static analysis</li>
        <li><strong>Deployment:</strong> Automated or manual approval gates</li>
      </ol>
      
      <h2>Setting Up Salesforce DX</h2>
      <p>Salesforce DX is the foundation of modern CI/CD. It provides:</p>
      <ul>
        <li>Source format for version control</li>
        <li>CLI tools for automation</li>
        <li>Scratch orgs for isolated development</li>
        <li>Package-based development</li>
      </ul>
      
      <h2>Example GitHub Actions Workflow</h2>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">.github/workflows/deploy.yml</span>
          <span class="code-badge good">CI/CD Pipeline</span>
        </div>
        <div class="code-content">
          <pre><code class="language-yaml">name: Deploy to Salesforce

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Salesforce CLI
        uses: salesforce-actions/setup-sfdx@v1
      
      - name: Authenticate to Sandbox
        run: |
          echo $\\{\\{ secrets.SF_AUTH_URL \\}\\} | sfdx auth:sfdxurl:store -f -
      
      - name: Run Apex Tests
        run: |
          sfdx force:apex:test:run --code-coverage --resultformat human --wait 10
      
      - name: Validate Deployment
        run: |
          sfdx force:source:deploy --checkonly --testlevel RunLocalTests</code></pre>
        </div>
      </div>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ Always validate before deploying</li>
        <li>✅ Run all tests, not just local tests</li>
        <li>✅ Use separate pipelines for different environments</li>
        <li>✅ Implement approval gates for production</li>
        <li>✅ Monitor deployment success/failure</li>
        <li>✅ Keep deployment logs for audit</li>
      </ul>
      
      <h2>Common Pitfalls</h2>
      <ul>
        <li>❌ Not testing in a sandbox first</li>
        <li>❌ Skipping test execution to save time</li>
        <li>❌ Deploying directly to production</li>
        <li>❌ Not handling deployment failures gracefully</li>
      </ul>
      
      <p><strong>Need help setting up CI/CD?</strong> We can configure a complete pipeline for your team. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-01-25',
    category: 'Development',
    readTime: '11 min read',
    featured: false
  },
  {
    id: 'todo-custom-metadata-types',
    title: 'Custom Metadata Types: The Modern Alternative to Custom Settings',
    excerpt: 'Custom Metadata Types let you configure your Apex code without code changes. Learn when and how to use them effectively.',
    content: `
      <p>Custom Settings were revolutionary when they launched—finally, a way to configure Apex without hardcoding values. But Custom Metadata Types (CMT) are the modern evolution, offering better version control, deployment, and testing capabilities.</p>
      
      <p>If you're still using Custom Settings for configuration that doesn't need to vary by user or profile, you're missing out on a powerful tool.</p>
      
      <h2>Custom Settings vs. Custom Metadata Types</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Feature</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Custom Settings</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e2e8f0;">Custom Metadata Types</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Version Control</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">❌ Not tracked</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">✅ Tracked in source</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Deployment</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Manual or data loader</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Deployed with code</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Test Access</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Requires SeeAllData=true</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Available in tests</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">Runtime Updates</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">✅ Yes</td>
            <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">❌ Requires deployment</td>
          </tr>
        </tbody>
      </table>
      
      <h2>When to Use Custom Metadata Types</h2>
      <p>Use CMT when:</p>
      <ul>
        <li>Configuration values are set during development/deployment</li>
        <li>You want configuration tracked in version control</li>
        <li>Values don't need to change at runtime</li>
        <li>You need configuration available in test contexts</li>
      </ul>
      
      <h2>Example: API Configuration</h2>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">API_Config__mdt</span>
          <span class="code-badge good">Custom Metadata Type</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// Custom Metadata Type: API_Config__mdt
// Fields:
// - DeveloperName (Text)
// - Endpoint_URL__c (URL)
// - API_Key__c (Text, Protected)
// - Timeout_Seconds__c (Number)

// Usage in Apex:
API_Config__mdt config = API_Config__mdt.getInstance('Production');
String endpoint = config.Endpoint_URL__c;
String apiKey = config.API_Key__c;</code></pre>
        </div>
      </div>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ Use DeveloperName for lookups (not IDs)</li>
        <li>✅ Create a helper class to access CMT values</li>
        <li>✅ Use protected fields for sensitive data</li>
        <li>✅ Document each metadata record's purpose</li>
        <li>✅ Version control your metadata records</li>
      </ul>
      
      <p><strong>Need help migrating from Custom Settings to CMT?</strong> We can help you modernize your configuration management. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-01-30',
    category: 'Architecture',
    readTime: '9 min read',
    featured: false
  },
  {
    id: 'todo-governor-limits-mastery',
    title: 'Salesforce Governor Limits: Understanding and Working Within the Boundaries',
    excerpt: 'Governor limits aren\'t restrictions—they\'re guardrails that force you to write efficient code. Master them to build scalable solutions.',
    content: `
      <p>Every Salesforce developer has hit a governor limit at some point. "Apex CPU time limit exceeded." "Too many SOQL queries." "List has more than 10,000 rows."</p>
      
      <p>These errors aren't bugs—they're Salesforce's way of ensuring one transaction doesn't monopolize shared resources. Understanding limits isn't just about avoiding errors; it's about writing code that scales.</p>
      
      <h2>The Most Common Limits</h2>
      
      <h3>SOQL Queries: 100 per transaction</h3>
      <p>This is the limit most developers hit first. The solution: bulkify your queries.</p>
      
      <h3>DML Statements: 150 per transaction</h3>
      <p>Batch your DML operations. Don't update records one at a time.</p>
      
      <h3>CPU Time: 10,000ms (10 seconds)</h3>
      <p>Optimize loops, avoid nested queries, cache expensive operations.</p>
      
      <h3>Heap Size: 6MB synchronous, 12MB asynchronous</h3>
      <p>Don't load more data than you need. Use SOQL filters.</p>
      
      <h2>Monitoring Limits in Real-Time</h2>
      <p>Use the Limits class to check your consumption:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">LimitMonitor.cls</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">// Check limits before expensive operations
if (Limits.getQueries() &gt; 90) {
    // Log warning or switch to async processing
}

// Monitor CPU time
Integer cpuTime = Limits.getCpuTime();
if (cpuTime &gt; 8000) {
    // Consider deferring work to async</code></pre>
        </div>
      </div>
      
      <h2>Strategies for Working Within Limits</h2>
      
      <h3>1. Bulkification</h3>
      <p>Always design code to handle 200 records (the trigger batch size).</p>
      
      <h3>2. Query Optimization</h3>
      <p>Select only fields you need. Use WHERE clauses. Avoid SELECT *.</p>
      
      <h3>3. Async Processing</h3>
      <p>Move heavy processing to @future, Queueable, or Batch Apex.</p>
      
      <h3>4. Caching</h3>
      <p>Cache expensive operations like describe calls or metadata queries.</p>
      
      <h2>Common Patterns</h2>
      <ul>
        <li>✅ Collect IDs in a Set, then query once</li>
        <li>✅ Use Maps for lookups instead of nested loops</li>
        <li>✅ Process in batches for large datasets</li>
        <li>✅ Defer non-critical work to async</li>
      </ul>
      
      <p><strong>Hitting governor limits frequently?</strong> Our health checks include limit analysis. <a href="/contact">Schedule an audit</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-02-05',
    category: 'Performance',
    readTime: '10 min read',
    featured: false
  },
  {
    id: 'todo-lwc-best-practices',
    title: 'Lightning Web Components Best Practices: Building Performant, Maintainable UI',
    excerpt: 'LWC is powerful, but poor patterns lead to slow, buggy components. Learn the patterns that separate good components from great ones.',
    content: `
      <p>Lightning Web Components represent the future of Salesforce UI development. Built on web standards, they're fast, modern, and powerful. But with great power comes the responsibility to use it correctly.</p>
      
      <p>We've seen LWCs that load in milliseconds and others that take seconds. The difference? Following best practices from the start.</p>
      
      <h2>Performance Best Practices</h2>
      
      <h3>1. Minimize Wire Service Calls</h3>
      <p>Every @wire call triggers a server round-trip. Batch related data fetches.</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">accountCard.js</span>
          <span class="code-badge">Inefficient</span>
        </div>
        <div class="code-content">
          <pre><code class="language-javascript">// DON'T: Multiple wire calls
@wire(getAccount, { accountId: '$recordId' })
account;

@wire(getContacts, { accountId: '$recordId' })
contacts;

@wire(getOpportunities, { accountId: '$recordId' })
opportunities;</code></pre>
        </div>
      </div>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">accountCard.js</span>
          <span class="code-badge good">Efficient</span>
        </div>
        <div class="code-content">
          <pre><code class="language-javascript">// DO: Single wire call that returns all data
@wire(getAccountDetails, { accountId: '$recordId' })
accountDetails({ error, data }) {
    if (data) {
        this.account = data.account;
        this.contacts = data.contacts;
        this.opportunities = data.opportunities;
    }
}</code></pre>
        </div>
      </div>
      
      <h3>2. Use @api Properties Wisely</h3>
      <p>@api properties trigger re-renders. Only expose what parent components need to control.</p>
      
      <h3>3. Lazy Load Heavy Components</h3>
      <p>Use conditional rendering to load expensive components only when needed.</p>
      
      <h2>Code Organization</h2>
      <ul>
        <li>✅ Keep components focused (single responsibility)</li>
        <li>✅ Extract reusable logic to service classes</li>
        <li>✅ Use composition over complex components</li>
        <li>✅ Follow naming conventions consistently</li>
      </ul>
      
      <h2>Error Handling</h2>
      <p>Always handle errors gracefully. Show user-friendly messages, not stack traces.</p>
      
      <h2>Testing LWCs</h2>
      <p>Write Jest tests for your components. Test user interactions, not just rendering.</p>
      
      <p><strong>Building LWCs?</strong> We can review your components for performance and best practices. <a href="/contact">Get in touch</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-02-10',
    category: 'Development',
    readTime: '11 min read',
    featured: false
  },
  {
    id: 'todo-debugging-techniques',
    title: 'Advanced Debugging Techniques: Finding and Fixing Bugs Faster',
    excerpt: 'Debug logs are just the beginning. Learn advanced techniques for diagnosing complex issues in Salesforce.',
    content: `
      <p>Every developer debugs, but great developers debug efficiently. Instead of adding console.log statements everywhere and hoping, they use systematic approaches to isolate issues quickly.</p>
      
      <p>After debugging thousands of Salesforce issues, we've developed a methodology that finds root causes faster.</p>
      
      <h2>The Debugging Process</h2>
      
      <h3>1. Reproduce the Issue</h3>
      <p>Can't fix what you can't see. Create a reliable reproduction path.</p>
      
      <h3>2. Enable Appropriate Debug Logs</h3>
      <p>Set log levels based on what you're investigating:</p>
      <ul>
        <li><strong>Apex Code:</strong> FINEST for method entry/exit</li>
        <li><strong>Profiling:</strong> FINE for CPU time analysis</li>
        <li><strong>Database:</strong> FINE for SOQL query details</li>
        <li><strong>Workflow:</strong> DEBUG for automation debugging</li>
      </ul>
      
      <h3>3. Use the Developer Console</h3>
      <p>The Developer Console provides powerful debugging tools:</p>
      <ul>
        <li>Execution Tree: See method call hierarchy</li>
        <li>Execution Log: Step through execution</li>
        <li>Checkpoints: Pause execution at specific points</li>
        <li>SOQL Query Plan: Analyze query performance</li>
      </ul>
      
      <h2>Common Debugging Scenarios</h2>
      
      <h3>Trigger Not Firing</h3>
      <p>Check: Is the trigger active? Are the conditions met? Is automation bypassed?</p>
      
      <h3>Data Not Saving</h3>
      <p>Check: Validation rules, required fields, field-level security, sharing rules.</p>
      
      <h3>Performance Issues</h3>
      <p>Use the Execution Tree to find slow methods. Look for SOQL in loops.</p>
      
      <h2>Remote Debugging</h2>
      <p>For complex issues, use VS Code with the Salesforce Debugger extension to set breakpoints and step through code.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ Start with broad logs, narrow down as you isolate</li>
        <li>✅ Use checkpoints strategically</li>
        <li>✅ Document your debugging process</li>
        <li>✅ Clean up debug statements before committing</li>
      </ul>
      
      <p><strong>Stuck on a bug?</strong> We offer debugging support. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-02-15',
    category: 'Development',
    readTime: '9 min read',
    featured: false
  },
  {
    id: 'todo-code-review-checklist',
    title: 'Salesforce Code Review Checklist: What to Look For Before Merging',
    excerpt: 'Code reviews catch bugs before production. Use this comprehensive checklist to ensure code quality and maintainability.',
    content: `
      <p>Code reviews are your last line of defense before code reaches production. A thorough review catches bugs, improves code quality, and shares knowledge across your team.</p>
      
      <p>But what should you actually look for? Here's a comprehensive checklist we use for every code review.</p>
      
      <h2>Security Review</h2>
      <ul>
        <li>☑️ No SOQL injection vulnerabilities</li>
        <li>☑️ Proper field-level security checks</li>
        <li>☑️ No hardcoded credentials or sensitive data</li>
        <li>☑️ Proper sharing model implementation</li>
        <li>☑️ Input validation on user-provided data</li>
      </ul>
      
      <h2>Performance Review</h2>
      <ul>
        <li>☑️ No SOQL queries in loops</li>
        <li>☑️ Code handles bulk operations (200+ records)</li>
        <li>☑️ Efficient use of collections (Maps, Sets)</li>
        <li>☑️ No unnecessary describe calls</li>
        <li>☑️ Governor limits monitored</li>
      </ul>
      
      <h2>Code Quality</h2>
      <ul>
        <li>☑️ Follows naming conventions</li>
        <li>☑️ Methods are focused and single-purpose</li>
        <li>☑️ Code is well-commented (where needed)</li>
        <li>☑️ No duplicate code</li>
        <li>☑️ Error handling is appropriate</li>
      </ul>
      
      <h2>Testing</h2>
      <ul>
        <li>☑️ Test coverage meets requirements</li>
        <li>☑️ Tests cover edge cases</li>
        <li>☑️ Tests verify business logic, not just coverage</li>
        <li>☑️ Tests don't use @SeeAllData unnecessarily</li>
        <li>☑️ Tests are maintainable</li>
      </ul>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ Review in small chunks (200-400 lines)</li>
        <li>✅ Be constructive, not critical</li>
        <li>✅ Explain why, not just what</li>
        <li>✅ Approve when standards are met</li>
      </ul>
      
      <p><strong>Need help establishing code review standards?</strong> We can help set up review processes. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-02-20',
    category: 'Development',
    readTime: '8 min read',
    featured: false
  },
  {
    id: 'todo-deployment-strategies',
    title: 'Salesforce Deployment Strategies: Change Sets, CLI, and Metadata API',
    excerpt: 'Choose the right deployment method for your team. Each has pros and cons—learn when to use which.',
    content: `
      <p>Deploying Salesforce changes isn't one-size-fits-all. Change Sets work for small teams, but as you scale, you need more sophisticated approaches.</p>
      
      <p>We've deployed thousands of changes across hundreds of orgs. Here's when to use each method.</p>
      
      <h2>Change Sets</h2>
      <p><strong>Best for:</strong> Small teams, occasional deployments, simple changes</p>
      
      <p><strong>Pros:</strong></p>
      <ul>
        <li>No technical setup required</li>
        <li>Visual interface</li>
        <li>Built into Salesforce</li>
      </ul>
      
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Manual process</li>
        <li>No version control integration</li>
        <li>Can't deploy everything</li>
        <li>Error-prone for complex changes</li>
      </ul>
      
      <h2>Salesforce CLI (sfdx)</h2>
      <p><strong>Best for:</strong> Teams using source control, CI/CD pipelines, Salesforce DX</p>
      
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Scriptable and automatable</li>
        <li>Works with version control</li>
        <li>Supports all metadata types</li>
        <li>Enables CI/CD</li>
      </ul>
      
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Requires technical knowledge</li>
        <li>Command-line interface</li>
        <li>Setup overhead</li>
      </ul>
      
      <h2>Metadata API</h2>
      <p><strong>Best for:</strong> Custom tools, complex automation, enterprise deployments</p>
      
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Full programmatic control</li>
        <li>Can build custom tools</li>
        <li>Most flexible option</li>
      </ul>
      
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Most complex to implement</li>
        <li>Requires significant development</li>
      </ul>
      
      <h2>Deployment Best Practices</h2>
      <ul>
        <li>✅ Always deploy to sandbox first</li>
        <li>✅ Validate before deploying</li>
        <li>✅ Run all tests</li>
        <li>✅ Deploy during maintenance windows when possible</li>
        <li>✅ Have a rollback plan</li>
        <li>✅ Document what's being deployed</li>
      </ul>
      
      <p><strong>Need help setting up deployment processes?</strong> We can configure the right approach for your team. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-02-25',
    category: 'Development',
    readTime: '10 min read',
    featured: false
  },
  {
    id: 'todo-api-integration-patterns',
    title: 'API Integration Patterns: REST, SOAP, and When to Use Each',
    excerpt: 'Integrating Salesforce with external systems? Learn the patterns that make integrations reliable, maintainable, and scalable.',
    content: `
      <p>Salesforce doesn't exist in a vacuum. It needs to talk to your ERP, marketing automation platform, accounting software, and custom applications.</p>
      
      <p>But integrations fail. APIs timeout. Data gets out of sync. Errors go unnoticed for days. Here are the patterns that prevent these problems.</p>
      
      <h2>REST vs. SOAP: When to Use Which</h2>
      
      <h3>REST APIs</h3>
      <p><strong>Use when:</strong></p>
      <ul>
        <li>Modern systems support REST</li>
        <li>You need simple, lightweight integration</li>
        <li>JSON data format is acceptable</li>
        <li>Stateless operations</li>
      </ul>
      
      <h3>SOAP APIs</h3>
      <p><strong>Use when:</strong></p>
      <ul>
        <li>Legacy systems require SOAP</li>
        <li>You need strong typing and contracts</li>
        <li>WS-Security is required</li>
        <li>Complex operations with multiple steps</li>
      </ul>
      
      <h2>Integration Patterns</h2>
      
      <h3>1. Request-Response (Synchronous)</h3>
      <p>Call external API, wait for response, process result. Simple but blocks execution.</p>
      
      <h3>2. Fire-and-Forget (Asynchronous)</h3>
      <p>Send request, don't wait. Use @future or Queueable for non-blocking calls.</p>
      
      <h3>3. Webhook (Event-Driven)</h3>
      <p>External system calls your Salesforce endpoint when events occur. More efficient than polling.</p>
      
      <h3>4. Polling</h3>
      <p>Scheduled job checks external system for changes. Less efficient but reliable.</p>
      
      <h2>Error Handling Patterns</h2>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">APIClient.cls</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class APIClient {
    public static HttpResponse callExternalAPI(String endpoint) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        req.setTimeout(12000); // 12 second timeout
        
        Http http = new Http();
        HttpResponse res;
        
        try {
            res = http.send(req);
            
            // Handle different status codes
            if (res.getStatusCode() == 200) {
                return res;
            } else if (res.getStatusCode() == 429) {
                // Rate limited - retry with backoff
                throw new APIException('Rate limited');
            } else {
                throw new APIException('API error: ' + res.getStatusCode());
            }
        } catch (Exception e) {
            // Log error
            // Create platform event for monitoring
            throw new APIException('Callout failed: ' + e.getMessage());
        }
    }
}</code></pre>
        </div>
      </div>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ Implement retry logic with exponential backoff</li>
        <li>✅ Set appropriate timeouts</li>
        <li>✅ Log all API calls for debugging</li>
        <li>✅ Use named credentials for authentication</li>
        <li>✅ Handle rate limiting gracefully</li>
        <li>✅ Monitor integration health</li>
      </ul>
      
      <p><strong>Building integrations?</strong> We can help design and implement reliable API integrations. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-03-01',
    category: 'Integration',
    readTime: '13 min read',
    featured: false
  },
  {
    id: 'todo-error-handling-patterns',
    title: 'Error Handling Patterns in Apex: Building Resilient Code',
    excerpt: 'Errors happen. Great code handles them gracefully. Learn patterns for error handling that improve user experience and make debugging easier.',
    content: `
      <p>Your code will fail. Users will enter invalid data. External APIs will timeout. Database constraints will be violated. The question isn't whether errors will occur—it's how your code handles them.</p>
      
      <p>Poor error handling leads to cryptic error messages, lost data, and frustrated users. Good error handling provides clear feedback, preserves data integrity, and makes debugging easier.</p>
      
      <h2>Exception Types in Apex</h2>
      <p>Understanding exception types helps you catch the right errors:</p>
      
      <ul>
        <li><strong>DmlException:</strong> Database operation failures</li>
        <li><strong>QueryException:</strong> SOQL query errors</li>
        <li><strong>CalloutException:</strong> HTTP callout failures</li>
        <li><strong>LimitException:</strong> Governor limit exceeded</li>
        <li><strong>Custom Exceptions:</strong> Your own exception classes</li>
      </ul>
      
      <h2>Error Handling Patterns</h2>
      
      <h3>1. Try-Catch Blocks</h3>
      <p>Always wrap risky operations in try-catch blocks.</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">AccountService.cls</span>
          <span class="code-badge good">Best Practice</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class AccountService {
    public static void updateAccounts(List&lt;Account&gt; accounts) {
        List&lt;Database.SaveResult&gt; results = Database.update(accounts, false);
        
        for (Integer i = 0; i &lt; results.size(); i++) {
            Database.SaveResult result = results[i];
            if (!result.isSuccess()) {
                for (Database.Error error : result.getErrors()) {
                    // Log specific error for this record
                    System.debug('Account ' + accounts[i].Id + 
                        ' failed: ' + error.getMessage());
                }
            }
        }
    }
}</code></pre>
        </div>
      </div>
      
      <h3>2. Partial Success Handling</h3>
      <p>Use Database methods with <code>allOrNone=false</code> to allow partial success.</p>
      
      <h3>3. Custom Exception Classes</h3>
      <p>Create domain-specific exceptions for better error handling.</p>
      
      <h2>Error Logging</h2>
      <p>Log errors with context: user, record, operation, timestamp. Consider using Platform Events for error tracking.</p>
      
      <h2>User-Friendly Error Messages</h2>
      <p>Don't show stack traces to users. Provide actionable error messages.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ Catch specific exceptions when possible</li>
        <li>✅ Log errors with sufficient context</li>
        <li>✅ Provide user-friendly error messages</li>
        <li>✅ Handle partial success scenarios</li>
        <li>✅ Don't swallow exceptions silently</li>
      </ul>
      
      <p><strong>Need help improving error handling?</strong> We can review your code and suggest improvements. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-03-05',
    category: 'Development',
    readTime: '10 min read',
    featured: false
  },
  {
    id: 'todo-performance-monitoring',
    title: 'Performance Monitoring in Salesforce: Tools and Techniques',
    excerpt: 'You can\'t improve what you don\'t measure. Learn how to monitor Salesforce performance and identify bottlenecks before users complain.',
    content: `
      <p>Performance problems are insidious. They start small—a page that takes 2 seconds instead of 1. Then it gets worse. Before you know it, users are complaining and adoption is dropping.</p>
      
      <p>Proactive performance monitoring catches issues early, before they impact users. Here's how to set up effective monitoring.</p>
      
      <h2>Built-in Monitoring Tools</h2>
      
      <h3>1. Debug Logs</h3>
      <p>Enable profiling in debug logs to see CPU time per method.</p>
      
      <h3>2. Developer Console</h3>
      <p>Use the Execution Tree to identify slow operations.</p>
      
      <h3>3. Setup Audit Trail</h3>
      <p>Track configuration changes that might impact performance.</p>
      
      <h2>Custom Monitoring</h2>
      
      <h3>Platform Events for Performance Tracking</h3>
      <p>Emit platform events when operations exceed thresholds:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-filename">PerformanceMonitor.cls</span>
          <span class="code-badge good">Monitoring Pattern</span>
        </div>
        <div class="code-content">
          <pre><code class="language-java">public class PerformanceMonitor {
    public static void logSlowOperation(String operation, Integer duration) {
        if (duration &gt; 5000) { // 5 seconds
            Performance_Event__e event = new Performance_Event__e(
                Operation__c = operation,
                Duration__c = duration,
                User__c = UserInfo.getUserId()
            );
            EventBus.publish(event);
        }
    }
}</code></pre>
        </div>
      </div>
      
      <h2>Key Metrics to Monitor</h2>
      <ul>
        <li>Page load times</li>
        <li>SOQL query execution time</li>
        <li>CPU time per transaction</li>
        <li>API callout response times</li>
        <li>DML operation duration</li>
      </ul>
      
      <h2>Setting Up Dashboards</h2>
      <p>Create reports and dashboards to visualize performance trends over time.</p>
      
      <h2>Alerting</h2>
      <p>Set up alerts when performance degrades beyond acceptable thresholds.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ Monitor continuously, not just when issues arise</li>
        <li>✅ Establish baseline performance metrics</li>
        <li>✅ Set up automated alerts</li>
        <li>✅ Review performance trends regularly</li>
        <li>✅ Document performance improvements</li>
      </ul>
      
      <p><strong>Need help setting up performance monitoring?</strong> Our health checks include performance analysis. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-03-10',
    category: 'Performance',
    readTime: '9 min read',
    featured: false
  },
  {
    id: 'todo-data-quality-management',
    title: 'Data Quality Management: Keeping Your Salesforce Org Clean',
    excerpt: 'Bad data leads to bad decisions. Learn strategies for maintaining data quality in Salesforce—from prevention to cleanup.',
    content: `
      <p>Garbage in, garbage out. No matter how well-designed your Salesforce org is, bad data will undermine everything.</p>
      
      <p>Duplicate accounts. Invalid email addresses. Inconsistent naming conventions. Missing required fields. These problems compound over time, making your CRM less valuable every day.</p>
      
      <p>Here's how to prevent bad data from entering your org and clean up what's already there.</p>
      
      <h2>Prevention: Validation Rules</h2>
      <p>Validation rules are your first line of defense. They prevent bad data at the point of entry.</p>
      
      <h2>Data Quality Tools</h2>
      
      <h3>1. Duplicate Management</h3>
      <p>Use Salesforce's duplicate management features to prevent and find duplicates.</p>
      
      <h3>2. Data.com Clean</h3>
      <p>Automatically verify and enrich contact and account data.</p>
      
      <h3>3. Third-Party Tools</h3>
      <p>Tools like DemandTools, Cloudingo, or custom Apex can help with bulk cleanup.</p>
      
      <h2>Data Quality Metrics</h2>
      <p>Track these metrics to measure data quality:</p>
      <ul>
        <li>Duplicate rate</li>
        <li>Email bounce rate</li>
        <li>Completeness (required fields)</li>
        <li>Accuracy (valid formats)</li>
      </ul>
      
      <h2>Cleanup Strategies</h2>
      
      <h3>1. Identify Issues</h3>
      <p>Run reports to find data quality problems.</p>
      
      <h3>2. Prioritize</h3>
      <p>Focus on high-impact records first (key accounts, active opportunities).</p>
      
      <h3>3. Clean in Batches</h3>
      <p>Don't try to fix everything at once. Work in manageable batches.</p>
      
      <h3>4. Prevent Recurrence</h3>
      <p>After cleanup, implement prevention measures.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>✅ Set up validation rules early</li>
        <li>✅ Train users on data entry standards</li>
        <li>✅ Regular data quality audits</li>
        <li>✅ Use picklists instead of text fields when possible</li>
        <li>✅ Automate data enrichment where possible</li>
      </ul>
      
      <p><strong>Data quality issues?</strong> We can help audit and clean your data. <a href="/contact">Contact us</a>.</p>
      
      <p style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #E5E7EB; color: var(--text-light); font-size: 0.9rem;">#TBR</p>
    `,
    author: 'ApexRune Team',
    date: '2025-03-15',
    category: 'Migration',
    readTime: '11 min read',
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
