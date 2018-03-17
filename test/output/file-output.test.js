'use strict';

const assert = require('chai').assert;
const FileOutput = require('../../lib/output/file-output');
const message = require('../../config/message');

describe('FileOutput class', function () {

    it('error when no output path is given', function () {
        assert.throws(() => new FileOutput(), message.output_path_missed);
    });

    it('the path property is set when an output path is given', function () {
        const path = __dirname + '/output.log';
        const fileOutput = new FileOutput(path);
        assert.equal(fileOutput.path, path);
    });

    it('the data property is set after writing file', function () {
        const path = __dirname + '/output.log';
        const fileOutput = new FileOutput(path);
        fileOutput.setData('errormsg')
        fileOutput
            .write()
            .then(() => {
                const fs = require('fs');
                fs.readFile(path, (err, data) => {
                    assert.equal(data, 'errormsg');
                });
            });
    });

    it('the data property is set after writing a non-existing file', function () {
        const path = __dirname + '/nonexistingoutput.log';
        const fileOutput = new FileOutput(path);
        fileOutput.setData('errormsg');
        fileOutput
            .write()
            .then(() => {
                const fs = require('fs');
                fs.readFile(path, (err, data) => {
                    assert.equal(data, 'errormsg');
                });
            });
    });
});