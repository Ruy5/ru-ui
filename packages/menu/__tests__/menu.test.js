'use strict';

const menu = require('..');
const assert = require('assert').strict;

assert.strictEqual(menu(), 'Hello from menu');
console.info('menu tests passed');
