'use strict';

const waterfall = require('..');
const assert = require('assert').strict;

assert.strictEqual(waterfall(), 'Hello from waterfall');
console.info('waterfall tests passed');
