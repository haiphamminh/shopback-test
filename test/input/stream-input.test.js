'use strict';

const ReadStream = require('fs').ReadStream;
const assert = require('chai').assert;
const StreamInput = require('../../lib/input/stream-input');
const message = require('../../config/message');

describe('StreamInput class', function () {

    it('error when no input path is given', function () {
        assert.throws(() => new StreamInput(), message.input_path_missed);
    });

    it('the stream property is set when an input path is given', function () {
        const streamInput = new StreamInput(__dirname + '/file.html');
        assert.instanceOf(streamInput.stream, ReadStream);
    });

    it('the data property is set after reading file', function () {
        const streamInput = new StreamInput(__dirname + '/file.html');
        streamInput
            .read()
            .then(() => assert.notStrictEqual(streamInput.data, ''));
    });

    it('error after reading a non-existing file', function () {
        const streamInput = new StreamInput(__dirname + '/nonexistingfile.html');
        streamInput
            .read()
            .then(
                result => {
                    throw new Error('Unexpectedly fulfilled');
                },
                err => {
                    assert.isDefined(err);
                });
    });
});