'use strict';

const assert = require('chai').assert;
const FileInput = require('../../lib/input/file-input');
const message = require('../../config/message');

describe('FileInput class', function () {

    it('error when no input path is given', function () {
        assert.throws(() => new FileInput(), message.input_path_missed);
    });

    it('the path property is set when an input path is given', function () {
        const path = './file.html';
        const fileInput = new FileInput(path);
        assert.equal(fileInput.path, path);
    });

    it('the data property is set after reading file', function () {
        const fileInput = new FileInput(__dirname + '/file.html');
        fileInput
            .read()
            .then(() => assert.notStrictEqual(fileInput.data, ''));
    });

    it('error after reading a non-existing file', function () {
        const fileInput = new FileInput(__dirname + '/nonexistingfile.html');
        fileInput
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