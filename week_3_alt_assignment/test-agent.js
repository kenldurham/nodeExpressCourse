/**
 * Simple tests for the Document Management Agent
 * Run with: node test-agent.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Test configuration
const HOST = 'localhost';
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}`;

// Test utilities
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = {
            statusCode: res.statusCode,
            headers: res.headers,
            body: res.headers['content-type']?.includes('application/json') ? JSON.parse(body) : body
          };
          resolve(response);
        } catch (error) {
          resolve({ statusCode: res.statusCode, headers: res.headers, body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test suite
class AgentTester {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
    this.documentId = null;
  }

  test(name, testFn) {
    this.tests.push({ name, testFn });
  }

  async run() {
    console.log('🤖 Running Document Management Agent Tests\n');
    
    for (const { name, testFn } of this.tests) {
      try {
        console.log(`Testing: ${name}`);
        await testFn();
        console.log(`✅ PASS: ${name}\n`);
        this.passed++;
      } catch (error) {
        console.log(`❌ FAIL: ${name}`);
        console.log(`   Error: ${error.message}\n`);
        this.failed++;
      }
    }

    console.log(`\n📊 Test Results:`);
    console.log(`   Passed: ${this.passed}`);
    console.log(`   Failed: ${this.failed}`);
    console.log(`   Total:  ${this.tests.length}`);
    
    if (this.failed === 0) {
      console.log('\n🎉 All tests passed!');
    } else {
      console.log('\n⚠️  Some tests failed.');
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
}

// Initialize tester
const tester = new AgentTester();

// Test 1: Agent status endpoint
tester.test('Agent Status API', async () => {
  const response = await makeRequest('GET', '/agent/api/status');
  
  tester.assert(response.statusCode === 200, 'Status endpoint should return 200');
  tester.assert(response.body.status === 'active', 'Agent should be active');
  tester.assert(typeof response.body.documents === 'number', 'Documents count should be a number');
  tester.assert(typeof response.body.uptime === 'number', 'Uptime should be a number');
});

// Test 2: Create document
tester.test('Create Document', async () => {
  const testDoc = {
    name: 'test-automation-doc',
    content: 'This is a test document created by automation.\n\nIt contains:\n- Sample instructions\n- Test data\n- Monitoring targets'
  };
  
  const response = await makeRequest('POST', '/agent/api/documents', testDoc);
  
  tester.assert(response.statusCode === 200, 'Document creation should return 200');
  tester.assert(response.body.success === true, 'Creation should be successful');
  tester.assert(response.body.document.name === testDoc.name, 'Document name should match');
  tester.assert(response.body.document.content === testDoc.content, 'Document content should match');
  tester.assert(typeof response.body.document.id === 'string', 'Document should have an ID');
  
  // Store for later tests
  tester.documentId = response.body.document.id;
});

// Test 3: Retrieve document
tester.test('Retrieve Document', async () => {
  if (!tester.documentId) {
    throw new Error('No document ID available from creation test');
  }
  
  const response = await makeRequest('GET', `/agent/api/documents/${tester.documentId}`);
  
  tester.assert(response.statusCode === 200, 'Document retrieval should return 200');
  tester.assert(response.body.id === tester.documentId, 'Retrieved document should have correct ID');
  tester.assert(response.body.name === 'test-automation-doc', 'Retrieved document should have correct name');
});

// Test 4: Copy document content
tester.test('Copy Document Content', async () => {
  if (!tester.documentId) {
    throw new Error('No document ID available from creation test');
  }
  
  const response = await makeRequest('GET', `/agent/api/documents/${tester.documentId}/copy`);
  
  tester.assert(response.statusCode === 200, 'Copy operation should return 200');
  tester.assert(response.body.success === true, 'Copy should be successful');
  tester.assert(typeof response.body.content === 'string', 'Copy should return content');
  tester.assert(response.body.metadata.name === 'test-automation-doc', 'Copy should include metadata');
});

// Test 5: Update document
tester.test('Update Document', async () => {
  if (!tester.documentId) {
    throw new Error('No document ID available from creation test');
  }
  
  const updatedContent = 'This is UPDATED content for the test document.\n\nUpdated at: ' + new Date().toISOString();
  const response = await makeRequest('PUT', `/agent/api/documents/${tester.documentId}`, { content: updatedContent });
  
  tester.assert(response.statusCode === 200, 'Document update should return 200');
  tester.assert(response.body.success === true, 'Update should be successful');
  tester.assert(response.body.document.content === updatedContent, 'Document content should be updated');
});

// Test 6: List all documents
tester.test('List All Documents', async () => {
  const response = await makeRequest('GET', '/agent/api/documents');
  
  tester.assert(response.statusCode === 200, 'Documents list should return 200');
  tester.assert(Array.isArray(response.body), 'Response should be an array');
  tester.assert(response.body.length >= 1, 'Should have at least one document');
  
  const ourDoc = response.body.find(doc => doc.id === tester.documentId);
  tester.assert(ourDoc !== undefined, 'Our test document should be in the list');
});

// Test 7: ChatGPT integration
tester.test('ChatGPT Integration', async () => {
  const reportData = {
    type: 'test',
    message: 'Testing agent integration',
    context: 'Automated test suite'
  };
  
  const response = await makeRequest('POST', '/agent/api/chatgpt/report', reportData);
  
  tester.assert(response.statusCode === 200, 'ChatGPT report should return 200');
  tester.assert(response.body.success === true, 'Report should be successful');
  tester.assert(response.body.report.type === 'test', 'Report should include sent data');
  tester.assert(Array.isArray(response.body.report.recentActivities), 'Report should include activities');
  tester.assert(typeof response.body.report.status === 'object', 'Report should include status');
});

// Test 8: Web interface accessibility
tester.test('Web Interface Accessibility', async () => {
  // Test main agent dashboard
  const dashboardResponse = await makeRequest('GET', '/agent');
  tester.assert(dashboardResponse.statusCode === 200, 'Dashboard should be accessible');
  tester.assert(dashboardResponse.body.includes('Document Management Agent'), 'Dashboard should contain title');
  
  // Test documents page
  const docsResponse = await makeRequest('GET', '/agent/documents');
  tester.assert(docsResponse.statusCode === 200, 'Documents page should be accessible');
  tester.assert(docsResponse.body.includes('Document Management'), 'Documents page should contain title');
  
  // Test file monitor
  const monitorResponse = await makeRequest('GET', '/agent/monitor');
  tester.assert(monitorResponse.statusCode === 200, 'Monitor page should be accessible');
  tester.assert(monitorResponse.body.includes('File Monitor Status'), 'Monitor page should contain title');
});

// Test 9: Delete document (cleanup)
tester.test('Delete Document', async () => {
  if (!tester.documentId) {
    throw new Error('No document ID available from creation test');
  }
  
  const response = await makeRequest('DELETE', `/agent/api/documents/${tester.documentId}`);
  
  tester.assert(response.statusCode === 200, 'Document deletion should return 200');
  tester.assert(response.body.success === true, 'Deletion should be successful');
  
  // Verify document is actually deleted
  const getResponse = await makeRequest('GET', `/agent/api/documents/${tester.documentId}`);
  tester.assert(getResponse.statusCode === 404, 'Deleted document should return 404');
});

// Run tests
if (require.main === module) {
  // Check if server is running
  makeRequest('GET', '/agent/api/status')
    .then(() => {
      console.log('✅ Server is running, starting tests...\n');
      return tester.run();
    })
    .catch(() => {
      console.log('❌ Server is not running. Please start the server with: npm start');
      process.exit(1);
    });
}

module.exports = { AgentTester, makeRequest };