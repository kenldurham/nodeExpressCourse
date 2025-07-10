/**
 ******************************************************************************
 *********************** Assignment Instructions! *****************************
 ******************************************************************************
 *
 * First, start up the website and check it out. This is an interactive
 * tutorial, so interact with it before you go any further! You can run this
 * server just like the assignments you have been working on so far:
 *
 * ```
 * npm install
 * npm run start
 * ```
 *
 * Go through the website, then come back; have fun!
 *
 * ============================================================================
 *
 * If you choose to complete this alternative assignment, your task is to
 * create one fun and creative server game like the ones that make up this
 * guide. It doesn't need to be fancy or complex! Just be creative, and make
 * a neat little widget. You can use HTML, or even just plain text. It can
 * be as simple as a riddle whose solution is a URL parameter.
 *
 * Get creative, have fun, and make sure to request code review for whatever
 * you create!
 */

const app = require("./stuffThatYouCanIgnore"); // take my word for it :)

app.get("/", (_, res) => res.send(`
  <h1>Hi!</h1><a href="/whatisaserver">Visit /whatisaserver to get started!</a>
`));

/**
 * Visit `http://localhost:3000/whatisaserver` to run this function and see
 * what it does!
 */
app.get("/whatisaserver", (request, response) => {
  response.setHeader("content-type", "text/plain").send(
    `A server is just a program that runs forever and does a very simple job.

It receives a HTTP request, and sends a HTTP response. HTTP is a
text-based protocol. That's why it is called hyper-text transfer protocol.
The most important part is "text transfer protocol." That is the most
important job of HTTP - to transfer text.

See, this page serves text. Just plain old text. Text is cool, but not _super_
cool. For example, I really wanted the word "super" to be in italic, but I
can't do that! This is just text. Also, I'd love to provide you with a link
to the next page, but I can't, because plain text can't have links!

We don't have to be limited to plain text, though! A cool thing about HTTP
that every request and response actually has two parts: the headers, and
the body. When the server responds to the client, it can include a
content-type header with the response. This tells the browser what type
of data it's getting back from the server! That means we can send way more
than just plain text; for example, we can send HTML (hyper-text markup
language)! For that matter, we can send any textual data: JSON, XML,
url-encoded and url-encoded form data are just some of the content types we
can specify.

Technically, we're not even limited to text. It is also possible to use HTTP
to send images, videos, custom data formats, or any other type of data.


--


Moving along on our tour, let's explore the hyper-powers of HTTP.

Unfortunately, I can't give you a link, because this is just plain text,
but that's about to change!

      ⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄
Visit http://localhost:3000/whatisaserver/html to learn more.
      ⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃

Fun fact: Did you know this is just plain text: 😆
`
  );
});

/**
 * This is the second step of the interactive tutorial, at `/whatisaserver/html`
 */
app.get("/whatisaserver/html", (request, response) => {
  // content-type: text/html is the default, so we don't need to specify it
  // anymore!
  response.send(`

    <!--
      Woah, HTML!! Now we can write comments (this text won't appear on
      the page). We also don't really care about indentation anymore. HTML,
      like most programming languages, is pretty flexible about where you put
      whitespace.

      And, yes, this is HTML inside JavaScript!
      Inception!!: http://localhost:3000/static/inception_meme.jpg
    --!>

    <style>
      /**
       * And now some CSS
       * in our HTML
       * which is in our JavaScript
       * :)
       */

      * { font-family: Arial; box-sizing: border-box; }
      body { display: flex; align-items: center; justify-content: center; }
      main { max-width: 70ch; }
    </style>

    <body><main>
      <h1>Hello world!</h1>
      <p>
        Text is cool and all, but with <b><i>HTML</i></b> we can do all kinds
        of fancy stuff!
      </p>

      <details>
        <summary>For example, with nothing more than a little HTML, we can hide
        a little surprise for you to find!</summary>

        <img width="500px" src="/static/inception_meme.jpg" />

        <p>
          Turns out that serving up a little HTML and CSS can create a pretty
          cool user experience!
        </p>

        <p>
          And, it turns out that a server can do a whole lot more than just
          share some hard-coded HTML. Before we check that out, there is one more
          cool thing that HTML can do: we don't have to tell you the next link
          to visit like we did before. Instead, we can hide the link behind some
          text, and
            <a href="/whatisaserver/dynamicHtml">all you need to do is click!</a>
        </p>
      </detail>

    </main></body>

  `);
});

// Now, I'm going to refactor the CSS into a separate string so that I can
// re-use it for the remaining pages without repeating it! Instead you'll see
// ${STYLE} at the beginning of each of the following HTML pages.
const STYLE = `
<style>
  * { font-family: Arial; box-sizing: border-box; }
  body { display: flex; align-items: center; justify-content: center; }
  main { max-width: 70ch; }
  pre { font-family: monospace; }
</style>`;

app.get("/whatisaserver/dynamicHtml", (request, response) => {
  response.send(`
    ${STYLE}
    <body><main>
    <p>
      The most powerful thing about a server is that you can serve dynamic
      content to the user. For example, I can actually inspect the request you
      sent me, the server, to see where you're visiting from. For example, I
      know all this about the browser you are sending a request from now:

    <pre>${request.headers["user-agent"]}</pre>

    <p>
      This is how the browser and the server can communicate with each other
      in order make your website dynamic. The server can decide to return different
      data based on information the browser gives it in the request.
    </p>
    <p>  
      Even the URL itself can have information that lets us change what we show
      on the website! Have you ever seen a URL with a bunch of gibberish in it? For example:
    </p>
    <pre>http://example.com?filter=1%2C56%2C3%2C7&sortOrder=id%3Adesc</pre>
    <p>
      Those are called URL parameters! It might look like gibberish, but
      those are actually key-value pairs that the server can read while it
      is processing a request. It's almost like using the URL as a tiny little
      database; the URL itself can store data!
    </p>
    <p>
        Try visiting
        <a href="/whatisaserver/dynamicHtml?yourName=typeItInTheAddressBar&myName=TheServer%20%3A%29">
          this link                                                                   <!-- ^^^^^^^^^ -->
        </a>                                                                          <!-- URL-encoded :) -->
        to see this behavior in action, and I will echo back the URL parameters
        you provide:
    </p>

    ${
      // Don't show the second part of the page until some URL params are
      // present, which will typically happen after the user clicks the link
      // above
      Object.keys(request.query).length !== 0

        ? `


          <!--
            We don't want anyone accidentally skipping this demo; let's make
            it super clear with some extra styles!
          --!>

          <style>
            .paramDemo {
              padding: 5px;
              background-color: #ffe9c7;
              border: 2px solid #ff9800;
              border-radius: 5px;
            }
            .demoNagging {
              font-size: 1rem;
              font-weight: light;
            }
          </style>

          <div class="paramDemo">

        <!--
          stringifying the whole 'request.query' makes this highly dynamic;
          whatever URL parameters the user sends us will go into the page.

          Hmmmm, I wonder what would happen if we put a URL parameter that
          said:

            <script>alert('hi')</script>

          Do you think the browser would run that code?....
        --!>

            <pre>${JSON.stringify(request.query, null, 2)}</pre>
            <h2 class="demoNagging">Hey! Make sure you don't skip this demo!</h2>
            <p style="font-size: 12px"><i>You can change the text in this orange box by changing the URL!!</i></p>
          </div>

          <p>You might still be wondering, what's up with the percent signs and whatnot in the
             earlier example (<code>http://example.com?filter=1%2C56%2C3%2C7&sortOrder=id%3Adesc</code>).
             
             There's certain characters that don't play very well with links in the browser,
             like spaces. There's also certain characters that already have a specific meaning in URLs like
             ampersands (<code>&</code>) and colons (<code>:</code>). 
         </p>
         <p>In order to make things more clear for the browser, we use URL encoding to translate those characters
            into a format that the browser can understand without ambiguity. 
            
             To learn more, check out this tool for
              <a href="https://www.urlencoder.org/">URL Encoding!</a> (you can switch between encoding and decoding 
             using the buttons at the top)
            </p>

            <p>
              Before you move on, follow the directions above! Look in your
              browser's URL bar - there's something up there for you to interact
              with!
            </p>

            <p>
              Then, check out the
              <a href="/whatisaserver/dynamicHtml/extra">next demo</a>
            </p>
        `
        : ""
    }
    </body></main>
  `);
});

app.get("/whatisaserver/dynamicHtml/extra", (request, response) => {
  response.send(`
    ${STYLE}
    <body><main>
    <p>
      With a little creativity, it is amazing how much we can build with
      these simple primitives. For example:
      <ul>
        <a href="/whatisaserver/dynamicHtml/extra?lightsOn=false"><li>Lights Off</li></a>
        <a href="/whatisaserver/dynamicHtml/extra?lightsOn=true"><li>Lights On</li></a>
        <a href="/whatisaserver/dynamicHtml/extra"><li>Undo</li></a>
      </ul>
    </p>

    <!-- And here are the styles and server-side code to enable the above
    trickery to work. Remember the ${"javascript"} code runs on the server! --!>

    ${
      // I am using strings that say "true" and "false" which is a bit
      // confusing. These are strings, not boolean values! Hence, I actually
      // have a lot more than 2 possibilities; I only turn the lights on
      // if I have an exact "true". I turn them off for an exact "false".
      // Otherwise, I do nothing!
      request.query["lightsOn"] === "true"
        ? "<style>body { background-color: #ffff82 /* light yellow */ }</style>"
        : request.query["lightsOn"] === "false"
        ? "<style>body {background-color: black }</style>"
        : ""
    }


    <h2>Pretty cool!</h2>
    <p><a href="/whatisaserver/json">Next Demo</a></p>
    </body></main>
  `);
});

app.get("/whatisaserver/json", (_, response) => {
                                // ^ It is not a bad idea to use an underscore
                                // to displace positional arguments that you
                                // don't need. I don't need `request`, so I
                                // just put an _. This is not very beautiful,
                                // but sometimes developers do this if they
                                // have no other choice!
  response.contentType("application/json").send(`
    {
      "Oh!": "and don't get stressed about JSON!",
      "you see": "JSON is just a nifty way to share structured data between programs",
      "fun fact": "if you copy and paste this into a JS program, it's all valid JS!",
      "it": [
        "turns",
        "out",
        "it's",
        "just",
        "another",
        "type",
        "of",
        "text",
        "that",
        "HTTP",
        "servers",
        "like",
        "to",
        "send!"
      ],
      "and": {
        "if": "you are a human user, it might not look that pretty,",
        "but": "if you are a computer, this stuff is absolutely infectious!"
      },
      "finalPageHref": "http://localhost:3000/whatisaserver/xmlcloser",
      "note": "visit the above link next!     ^^^^^^^^^^^^^^^^^^^^^^^"
    }
  `);
});

// XML is an older alternative to JSON, which is still widely used!
//
// - You might notice the relationship between XML / HTML because they look
//   similar! They both descended from Standard Generalized Markup Language but
//   have different use cases
// - You may see it in payloads for things like ecommerce, banking, sports
//   betting, weather
// - Some people consider it more human-readable than JSON (though of course
//   with practice, JSON is plenty human-readable)
// - You can add comments and attributes to tags which is not possible in JSON
// - If you ever go into mobile development, XML is often used for creating
//   layouts in Android development, and it's used for config in macOS / iOS
//   too!
// - In fact, it's generally more popular for configuration files than JSON
//   (YAML or TOML) are probably the most trendy configuration languages today,
//   though
// - XML can be converted to JSON and vice-versa:
//   https://codebeautify.org/xmltojson
app.get("/whatisaserver/xmlcloser", (_, response) => {
  response.contentType("application/xml").send(`
      <xml>
      <so>
      <that>
      <is>
      <about>
      <all_I_have>
      <got>
      <for_you>
      <today.>
      <thank_you_for_learning_with_me>
      <and_see_you_next_time>
      😁
      </and_see_you_next_time>
      </thank_you_for_learning_with_me>
      </today.>
      </for_you>
      </got>
      </all_I_have>
      </about>
      </is>
      </that>
      </so>
      </xml>
    `);
});

// ============================================================================
// DOCUMENT MANAGEMENT AGENT
// ============================================================================

const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Ensure documents directory exists
const DOCUMENTS_DIR = path.join(__dirname, 'documents');
fs.ensureDirSync(DOCUMENTS_DIR);

// In-memory storage for document metadata and agent state
const agentState = {
  documents: new Map(),
  monitoredFiles: new Set(),
  errors: [],
  activities: [],
  fileWatcher: null
};

// Setup file upload handling
const upload = multer({ 
  dest: path.join(__dirname, 'uploads'),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Utility functions
function logActivity(action, details) {
  const activity = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    action,
    details
  };
  agentState.activities.unshift(activity);
  if (agentState.activities.length > 100) {
    agentState.activities = agentState.activities.slice(0, 100);
  }
  console.log(`[AGENT] ${action}: ${details}`);
}

function logError(error, context = '') {
  const errorLog = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    error: error.message || error,
    context,
    stack: error.stack
  };
  agentState.errors.unshift(errorLog);
  if (agentState.errors.length > 50) {
    agentState.errors = agentState.errors.slice(0, 50);
  }
  console.error(`[AGENT ERROR] ${context}: ${error.message || error}`);
}

// Initialize file monitoring
function initializeFileMonitoring() {
  if (agentState.fileWatcher) {
    agentState.fileWatcher.close();
  }
  
  agentState.fileWatcher = chokidar.watch(DOCUMENTS_DIR, {
    ignored: /node_modules/,
    persistent: true,
    ignoreInitial: false
  });

  agentState.fileWatcher
    .on('add', filePath => {
      logActivity('FILE_ADDED', `File detected: ${path.basename(filePath)}`);
      agentState.monitoredFiles.add(filePath);
    })
    .on('change', filePath => {
      logActivity('FILE_CHANGED', `File updated: ${path.basename(filePath)}`);
    })
    .on('unlink', filePath => {
      logActivity('FILE_REMOVED', `File deleted: ${path.basename(filePath)}`);
      agentState.monitoredFiles.delete(filePath);
    })
    .on('error', error => {
      logError(error, 'File monitoring');
    });
}

// Agent main dashboard
app.get('/agent', (req, res) => {
  const docs = Array.from(agentState.documents.values());
  const recentActivities = agentState.activities.slice(0, 10);
  const recentErrors = agentState.errors.slice(0, 5);
  
  res.send(`
    ${STYLE}
    <style>
      .agent-dashboard { max-width: 1200px; margin: 0 auto; padding: 20px; }
      .card { background: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
      .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
      .stat-item { text-align: center; background: white; padding: 15px; border-radius: 5px; }
      .error { color: #d32f2f; }
      .success { color: #2e7d32; }
      .activity-log { max-height: 300px; overflow-y: auto; font-size: 12px; }
      .btn { padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; display: inline-block; }
      .btn:hover { background: #0056b3; }
    </style>
    <body>
      <div class="agent-dashboard">
        <h1>📋 Document Management Agent</h1>
        <p>An intelligent agent for copying, pasting, and monitoring text documents with ChatGPT integration.</p>
        
        <div class="stats">
          <div class="stat-item">
            <h3>${docs.length}</h3>
            <p>Documents Managed</p>
          </div>
          <div class="stat-item">
            <h3>${agentState.monitoredFiles.size}</h3>
            <p>Files Monitored</p>
          </div>
          <div class="stat-item">
            <h3>${agentState.activities.length}</h3>
            <p>Total Activities</p>
          </div>
          <div class="stat-item">
            <h3 class="${agentState.errors.length > 0 ? 'error' : 'success'}">${agentState.errors.length}</h3>
            <p>Recent Errors</p>
          </div>
        </div>

        <div class="card">
          <h2>Quick Actions</h2>
          <a href="/agent/documents" class="btn">📄 Manage Documents</a>
          <a href="/agent/upload" class="btn">📤 Upload Document</a>
          <a href="/agent/monitor" class="btn">🔍 File Monitor</a>
          <a href="/agent/api/status" class="btn">🔌 API Status</a>
        </div>

        <div class="card">
          <h2>Recent Activity</h2>
          <div class="activity-log">
            ${recentActivities.length > 0 ? 
              recentActivities.map(activity => 
                `<div><strong>${new Date(activity.timestamp).toLocaleString()}</strong> - ${activity.action}: ${activity.details}</div>`
              ).join('') : 
              '<p>No recent activity</p>'
            }
          </div>
        </div>

        ${recentErrors.length > 0 ? `
        <div class="card">
          <h2 class="error">Recent Errors</h2>
          <div class="activity-log">
            ${recentErrors.map(error => 
              `<div class="error"><strong>${new Date(error.timestamp).toLocaleString()}</strong> - ${error.context}: ${error.error}</div>`
            ).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </body>
  `);
});

// Document management interface
app.get('/agent/documents', (req, res) => {
  const docs = Array.from(agentState.documents.values());
  
  res.send(`
    ${STYLE}
    <style>
      .documents-page { max-width: 1200px; margin: 0 auto; padding: 20px; }
      .doc-list { display: grid; gap: 15px; }
      .doc-item { background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 15px; }
      .doc-actions { margin-top: 10px; }
      .btn { padding: 8px 16px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px; font-size: 12px; }
      .btn-small { padding: 5px 10px; font-size: 11px; }
      .btn-danger { background: #dc3545; }
      .btn-success { background: #28a745; }
      .no-docs { text-align: center; color: #666; margin: 40px 0; }
    </style>
    <body>
      <div class="documents-page">
        <h1>📄 Document Management</h1>
        <p><a href="/agent" class="btn">← Back to Dashboard</a> <a href="/agent/upload" class="btn btn-success">+ Upload New Document</a></p>
        
        <div class="doc-list">
          ${docs.length > 0 ? 
            docs.map(doc => `
              <div class="doc-item">
                <h3>${doc.name}</h3>
                <p><strong>Size:</strong> ${doc.size} bytes | <strong>Modified:</strong> ${new Date(doc.lastModified).toLocaleString()}</p>
                <p>${doc.content.substring(0, 200)}${doc.content.length > 200 ? '...' : ''}</p>
                <div class="doc-actions">
                  <a href="/agent/documents/${doc.id}/view" class="btn btn-small">View</a>
                  <a href="/agent/documents/${doc.id}/edit" class="btn btn-small">Edit</a>
                  <a href="/agent/api/documents/${doc.id}/copy" class="btn btn-small">Copy</a>
                  <a href="/agent/documents/${doc.id}/delete" class="btn btn-small btn-danger" onclick="return confirm('Delete this document?')">Delete</a>
                </div>
              </div>
            `).join('') : 
            '<div class="no-docs"><h3>No documents yet</h3><p>Upload your first document to get started!</p></div>'
          }
        </div>
      </div>
    </body>
  `);
});

// Upload form
app.get('/agent/upload', (req, res) => {
  res.send(`
    ${STYLE}
    <style>
      .upload-page { max-width: 800px; margin: 0 auto; padding: 20px; }
      .upload-form { background: #f9f9f9; padding: 30px; border-radius: 8px; border: 1px solid #ddd; }
      .form-group { margin-bottom: 20px; }
      .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
      .form-group input, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
      .form-group textarea { height: 200px; font-family: monospace; }
      .btn { padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
      .btn:hover { background: #0056b3; }
      .btn-secondary { background: #6c757d; text-decoration: none; display: inline-block; }
    </style>
    <body>
      <div class="upload-page">
        <h1>📤 Upload Document</h1>
        <p><a href="/agent/documents" class="btn btn-secondary">← Back to Documents</a></p>
        
        <form action="/agent/api/documents" method="POST" enctype="multipart/form-data" class="upload-form">
          <div class="form-group">
            <label for="name">Document Name:</label>
            <input type="text" id="name" name="name" required placeholder="Enter document name">
          </div>
          
          <div class="form-group">
            <label for="file">Upload File:</label>
            <input type="file" id="file" name="file" accept=".txt,.md,.json,.js,.py,.html,.css">
            <small>Optional: Upload a text file (10MB max)</small>
          </div>
          
          <div class="form-group">
            <label for="content">Or Enter Content Directly:</label>
            <textarea id="content" name="content" placeholder="Enter your document content here..."></textarea>
          </div>
          
          <button type="submit" class="btn">Create Document</button>
        </form>
      </div>
    </body>
  `);
});

// File monitoring status
app.get('/agent/monitor', (req, res) => {
  const monitoredFiles = Array.from(agentState.monitoredFiles);
  
  res.send(`
    ${STYLE}
    <style>
      .monitor-page { max-width: 1000px; margin: 0 auto; padding: 20px; }
      .file-list { background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd; }
      .file-item { padding: 10px; margin: 5px 0; background: white; border-radius: 4px; border-left: 4px solid #28a745; }
      .status { color: #28a745; font-weight: bold; }
      .btn { padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px; }
    </style>
    <body>
      <div class="monitor-page">
        <h1>🔍 File Monitor Status</h1>
        <p><a href="/agent" class="btn">← Back to Dashboard</a></p>
        
        <div class="file-list">
          <h2>Monitoring Status: <span class="status">ACTIVE</span></h2>
          <p>Watching directory: <code>${DOCUMENTS_DIR}</code></p>
          
          <h3>Monitored Files (${monitoredFiles.length}):</h3>
          ${monitoredFiles.length > 0 ? 
            monitoredFiles.map(filePath => 
              `<div class="file-item">${path.basename(filePath)} <small>(${filePath})</small></div>`
            ).join('') :
            '<p>No files currently being monitored</p>'
          }
        </div>
        
        <h2>Recent File Activities</h2>
        <div class="file-list">
          ${agentState.activities
            .filter(a => a.action.startsWith('FILE_'))
            .slice(0, 20)
            .map(activity => 
              `<div class="file-item"><strong>${new Date(activity.timestamp).toLocaleString()}</strong> - ${activity.action}: ${activity.details}</div>`
            ).join('') || '<p>No file activity yet</p>'
          }
        </div>
      </div>
    </body>
  `);
});

// API Endpoints

// Get agent status
app.get('/agent/api/status', (req, res) => {
  res.json({
    status: 'active',
    documents: agentState.documents.size,
    monitoredFiles: agentState.monitoredFiles.size,
    activities: agentState.activities.length,
    errors: agentState.errors.length,
    uptime: process.uptime()
  });
});

// Create document
app.post('/agent/api/documents', upload.single('file'), async (req, res) => {
  try {
    const { name, content } = req.body;
    let documentContent = content || '';
    
    // If file uploaded, read its content
    if (req.file) {
      documentContent = await fs.readFile(req.file.path, 'utf8');
      await fs.remove(req.file.path); // Clean up uploaded file
    }
    
    if (!documentContent.trim()) {
      return res.status(400).json({ error: 'Document content is required' });
    }
    
    const docId = uuidv4();
    const filename = `${docId}.txt`;
    const filePath = path.join(DOCUMENTS_DIR, filename);
    
    // Save to file system
    await fs.writeFile(filePath, documentContent);
    
    // Store metadata
    const document = {
      id: docId,
      name: name || filename,
      filename,
      filePath,
      content: documentContent,
      size: documentContent.length,
      lastModified: new Date().toISOString(),
      created: new Date().toISOString()
    };
    
    agentState.documents.set(docId, document);
    logActivity('DOCUMENT_CREATED', `Created document: ${document.name}`);
    
    res.json({ success: true, document });
  } catch (error) {
    logError(error, 'Creating document');
    res.status(500).json({ error: 'Failed to create document' });
  }
});

// Get all documents
app.get('/agent/api/documents', (req, res) => {
  const documents = Array.from(agentState.documents.values());
  res.json(documents);
});

// Get specific document
app.get('/agent/api/documents/:id', (req, res) => {
  const document = agentState.documents.get(req.params.id);
  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }
  res.json(document);
});

// Copy document content (for ChatGPT integration)
app.get('/agent/api/documents/:id/copy', (req, res) => {
  const document = agentState.documents.get(req.params.id);
  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }
  
  logActivity('DOCUMENT_COPIED', `Copied content from: ${document.name}`);
  
  res.json({
    success: true,
    content: document.content,
    metadata: {
      name: document.name,
      size: document.size,
      lastModified: document.lastModified
    }
  });
});

// Update document
app.put('/agent/api/documents/:id', async (req, res) => {
  try {
    const { content } = req.body;
    const document = agentState.documents.get(req.params.id);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    // Update file
    await fs.writeFile(document.filePath, content);
    
    // Update metadata
    document.content = content;
    document.size = content.length;
    document.lastModified = new Date().toISOString();
    
    logActivity('DOCUMENT_UPDATED', `Updated document: ${document.name}`);
    
    res.json({ success: true, document });
  } catch (error) {
    logError(error, 'Updating document');
    res.status(500).json({ error: 'Failed to update document' });
  }
});

// Delete document
app.delete('/agent/api/documents/:id', async (req, res) => {
  try {
    const document = agentState.documents.get(req.params.id);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    // Remove file
    await fs.remove(document.filePath);
    
    // Remove from memory
    agentState.documents.delete(req.params.id);
    
    logActivity('DOCUMENT_DELETED', `Deleted document: ${document.name}`);
    
    res.json({ success: true });
  } catch (error) {
    logError(error, 'Deleting document');
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

// ChatGPT Integration - Report errors and progress
app.post('/agent/api/chatgpt/report', (req, res) => {
  const { type, message, context } = req.body;
  
  const report = {
    type: type || 'info',
    message,
    context,
    timestamp: new Date().toISOString(),
    errors: agentState.errors.slice(0, 5),
    recentActivities: agentState.activities.slice(0, 10),
    status: {
      documents: agentState.documents.size,
      monitoredFiles: agentState.monitoredFiles.size,
      uptime: process.uptime()
    }
  };
  
  logActivity('CHATGPT_REPORT', `Generated report: ${type} - ${message}`);
  
  res.json({
    success: true,
    report,
    suggestion: "Based on current agent status, everything appears to be functioning normally. Recent activities and any errors have been included in this report."
  });
});

// Initialize the agent
logActivity('AGENT_STARTED', 'Document Management Agent initialized');
initializeFileMonitoring();

// Add link to agent from main page
app.get("/", (_, res) => res.send(`
  <h1>Hi!</h1>
  <a href="/whatisaserver">Visit /whatisaserver to get started!</a><br><br>
  <a href="/agent">🤖 Open Document Management Agent</a>
`));

app.listen(3000);
