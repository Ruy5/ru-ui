'use strict';

const pagination = require('..');
const assert = require('assert').strict;

assert.strictEqual(pagination(), 'Hello from pagination');
console.info('pagination tests passed');
