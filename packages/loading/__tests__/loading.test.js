'use strict';

const loading = require('..');
const assert = require('assert').strict;

assert.strictEqual(loading(), 'Hello from loading');
console.info('loading tests passed');
