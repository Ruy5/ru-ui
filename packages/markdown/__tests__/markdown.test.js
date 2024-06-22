'use strict';

const markdown = require('..');
const assert = require('assert').strict;

assert.strictEqual(markdown(), 'Hello from markdown');
console.info('markdown tests passed');
