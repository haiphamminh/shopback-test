'use strict';

const ConsoleOutput = require('./console-output');
const StreamOutput = require('./stream-output');
const FileOutput = require('./file-output');
const OutputType = require('./output-type');
const message = require('../../config/message');
const util = require('util');

/**
 * Object literals to create Output
 */
const outputCreationFn = {
    "CONSOLE": () => {
        return new ConsoleOutput();
    },
    "FILE": path => {
        return new FileOutput(path);
    },
    "STREAM": path => {
        return new StreamOutput(path);
    }
}

/**
 * Output factory to get output based on the output type
 */
class OutputFactory {
    /**
     * Return the Output instance
     * 
     * @param {String} type The output type @see OutputType
     * @param {String} path The input path
     * @returns The Output instance
     */
    static getOutput(type, path) {
        const creationFn = outputCreationFn[type];
        if (creationFn) {
            return creationFn(path);
        }
        throw new Error(util.format(message.type_not_supported, 'output'));
    }
}

module.exports = OutputFactory;