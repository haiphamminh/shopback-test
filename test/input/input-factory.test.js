'use strict';

const assert = require('chai').assert;
const InputFactory = require('../../lib/input/input-factory');
const FileInput = require('../../lib/input/file-input');
const StreamInput = require('../../lib/input/stream-input');
const InputType = require('../../lib/input/input-type');
const message = require('../../config/message');
const util = require('util');

describe('InputFactory class', function () {

    it('error when the type argument is not given', function () {
        assert.throws(() => InputFactory.getInput(), util.format(message.type_not_supported, 'input'));
    });

    it('error when the type argument is not given properly', function () {
        assert.throws(() => InputFactory.getInput('not_supported_type'), util.format(message.type_not_supported, 'input'));
    });

    it('error when the path argument is not given', function () {
        assert.throws(() => InputFactory.getInput(InputType.FILE), message.input_path_missed);
    });

    it('error when the path argument is not given properly', function () {
        assert.throws(() => InputFactory.getInput(InputType.FILE, ''), message.input_path_missed);
    });

    it('FileInput is returned when the arguments is given properly', function () {
        const fileInput = InputFactory.getInput(InputType.FILE, __dirname + '/file.html');
        assert.instanceOf(fileInput, FileInput, 'fileInput is instance of FileInput');
    });

    it('StreamInput is returned when the arguments is given properly', function () {
        const streamInput = InputFactory.getInput(InputType.STREAM, __dirname + '/file.html');
        assert.instanceOf(streamInput, StreamInput, 'streamInput is instance of StreamInput');
    });
});