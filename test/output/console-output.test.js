'use strict';

const assert = require('chai').assert;
const ConsoleOutput = require('../../lib/output/console-output');
const message = require('../../config/message');

describe('ConsoleOutput class', function () {

    it('created scuccessfully', function () {
        assert.isDefined(new ConsoleOutput());
    });

    it('has data if set', function () {
        const consoleOutput = new ConsoleOutput();
        consoleOutput.setData('error msg');
        assert.equal(consoleOutput.data, 'error msg');
    });
});