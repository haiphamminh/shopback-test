'use strict';

const assert = require('chai').assert;
const OutputFactory = require('../../lib/output/output-factory');
const ConsoleOutput = require('../../lib/output/console-output');
const FileOutput = require('../../lib/output/file-output');
const StreamOutput = require('../../lib/output/stream-output');
const OutputType = require('../../lib/output/output-type');
const message = require('../../config/message');
const util = require('util');

describe('OutputFactory class', function () {

    it('error when the type argument is not given', function () {
        assert.throws(() => OutputFactory.getOutput(), util.format(message.type_not_supported, 'output'));
    });

    it('error when the type argument is not given properly', function () {
        assert.throws(() => OutputFactory.getOutput('not_supported_type'), util.format(message.type_not_supported, 'output'));
    });

    it('error when the path argument is not given', function () {
        assert.throws(() => OutputFactory.getOutput(OutputType.FILE), message.output_path_missed);
    });

    it('error when the path argument is not given properly', function () {
        assert.throws(() => OutputFactory.getOutput(OutputType.FILE, ''), message.output_path_missed);
    });

    it('ConsoleOutput is returned when the arguments is given properly', function () {
        const consoleOutput = OutputFactory.getOutput(OutputType.CONSOLE, __dirname + '/output.log');
        assert.instanceOf(consoleOutput, ConsoleOutput, 'consoleOutput is instance of ConsoleOutput');
    });

    it('FileOutput is returned when the arguments is given properly', function () {
        const fileOutput = OutputFactory.getOutput(OutputType.FILE, __dirname + '/output.log');
        assert.instanceOf(fileOutput, FileOutput, 'fileOutput is instance of FileOutput');
    });

    it('StreamOutput is returned when the arguments is given properly', function () {
        const streamOutput = OutputFactory.getOutput(OutputType.STREAM, __dirname + '/output.log');
        assert.instanceOf(streamOutput, StreamOutput, 'fileOutput is instance of StreamOutput');
    });
});