'use strict';

const fs = require('fs');
const assert = require('chai').assert;
const StreamOutput = require('../../lib/output/stream-output');
const message = require('../../config/message');

describe('StreamOutput class', function () {

    it('error when no output path is given', function () {
        assert.throws(() => new StreamOutput(), message.output_path_missed);
    });

    it('the stream property is set when an output path is given', function () {
        const path = __dirname + '/output.log';
        const streamOutput = new StreamOutput(path);
        assert.instanceOf(streamOutput.stream, fs.WriteStream);
    });

    it('the data property is set after writing file', function () {
        const path = __dirname + '/output.log';
        const streamOutput = new StreamOutput(path);
        streamOutput.setData('errormsg')
        streamOutput
            .write()
            .then(() => {
                fs.readFile(path, (err, data) => {
                    assert.equal(data, 'errormsg');
                });
            });
    });

    it('the data property is set after writing a non-existing file', function () {
        const path = __dirname + '/nonexistingoutput.log';
        const streamOutput = new StreamOutput(path);
        streamOutput.setData('errormsg');
        streamOutput
            .write()
            .then(() => {
                fs.readFile(path, (err, data) => {
                    assert.equal(data, 'errormsg');
                });
            });
    });
});