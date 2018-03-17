'use strict';

const StreamInput = require('./stream-input');
const FileInput = require('./file-input');
const message = require('../../config/message');
const util = require('util');

/**
 * Object literals to create Input
 */
const inputCreationFn = {
    "FILE": path => {
        return new FileInput(path);
    },
    "STREAM": path => {
        return new StreamInput(path);
    }
}

/**
 * Input factory to get input based on the input type
 */
class InputFactory {
    /**
     * Return the Input instance
     * 
     * @param {String} type The input type @see InputType
     * @param {String} path The input path
     * @returns The Input instance
     */
    static getInput(type, path) {
        const creationFn = inputCreationFn[type];
        if (creationFn) {
            return creationFn(path);
        }
        throw new Error(util.format(message.type_not_supported, 'input'));
    }
}

module.exports = InputFactory;