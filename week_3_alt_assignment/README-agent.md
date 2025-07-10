# Document Management Agent

An intelligent agent for copying, pasting, and monitoring text documents with ChatGPT integration. This agent automates typical work tasks involving document management, file monitoring, and progress reporting.

## Features

### 🤖 Core Agent Capabilities
- **Document Management**: Create, read, update, and delete text documents
- **File Monitoring**: Real-time monitoring of document changes using file system watchers
- **Copy/Paste Operations**: Programmatic copy operations for document content
- **Error Tracking**: Comprehensive error logging and reporting
- **Activity Logging**: Detailed activity tracking for all operations

### 🔌 ChatGPT Integration
- **Progress Reporting**: Automated progress reports with current status
- **Error Reporting**: Structured error reports for troubleshooting
- **Status Summaries**: Complete system status including activities and metrics

### 🌐 Web Interface
- **Dashboard**: Real-time overview of agent status and activities
- **Document Manager**: Visual interface for managing documents
- **File Monitor**: Live view of monitored files and recent changes
- **Upload Interface**: Simple form-based document upload

### 📡 REST API
Full REST API for programmatic access to all agent functionality.

## Usage

### Starting the Agent
```bash
npm install
npm start
```

The agent will be available at `http://localhost:3000/agent`

### API Endpoints

#### Agent Status
```
GET /agent/api/status
```
Returns current agent status, document count, and uptime.

#### Document Operations
```
POST /agent/api/documents          # Create document
GET  /agent/api/documents          # List all documents  
GET  /agent/api/documents/:id      # Get specific document
PUT  /agent/api/documents/:id      # Update document
DELETE /agent/api/documents/:id    # Delete document
GET  /agent/api/documents/:id/copy # Copy document content
```

#### ChatGPT Integration
```
POST /agent/api/chatgpt/report
```
Generate comprehensive report for ChatGPT with current status, errors, and activities.

### Web Interface
- **Main Dashboard**: `/agent`
- **Document Management**: `/agent/documents`
- **File Monitor**: `/agent/monitor`
- **Upload Form**: `/agent/upload`

## File Monitoring

The agent automatically monitors the `documents/` directory for:
- New files added
- File modifications
- File deletions

All file system events are logged and available in the activity feed.

## Testing

Run the automated test suite:
```bash
node test-agent.js
```

The test suite validates:
- ✅ Agent API functionality
- ✅ Document CRUD operations
- ✅ Copy/paste functionality
- ✅ File monitoring
- ✅ ChatGPT integration
- ✅ Web interface accessibility
- ✅ Error handling

## Architecture

### Components
- **Express Server**: Web framework and API endpoints
- **File System Monitoring**: Chokidar-based file watching
- **Document Storage**: File system based with metadata tracking
- **Activity Logging**: In-memory activity and error tracking
- **Web UI**: Server-rendered HTML interfaces

### Dependencies
- `express`: Web framework
- `chokidar`: File system monitoring
- `fs-extra`: Enhanced file operations
- `multer`: File upload handling
- `uuid`: Unique ID generation

## Use Cases

### Typical Workflow
1. **Upload Documents**: Add instruction files, templates, or work documents
2. **Monitor Changes**: Agent automatically detects when files are updated
3. **Copy/Paste Operations**: Programmatically copy content between documents
4. **Error Tracking**: Capture and log any issues during operations
5. **Progress Reporting**: Generate reports for ChatGPT with current status

### ChatGPT Integration Example
```javascript
// Report progress to ChatGPT
const report = await fetch('/agent/api/chatgpt/report', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'progress',
    message: 'Completed document review task',
    context: 'Weekly status update'
  })
});
```

## Implementation Details

The agent maintains state in memory for performance and uses the file system for persistent document storage. File monitoring runs continuously in the background, and all activities are logged with timestamps for audit trails.

Perfect for automating the copy/paste/check workflow that typically requires manual intervention, allowing you to focus on higher-level tasks while the agent handles document management automatically.