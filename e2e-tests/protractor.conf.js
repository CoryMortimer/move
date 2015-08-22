exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

//  baseUrl: 'http://localhost:8000/app/',
  baseUrl: 'http://127.0.0.1:51496/app/index.html',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
