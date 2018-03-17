'use strict';

const Output = require('./output');

/**
 * Console output
 */
class ConsoleOutput extends Output {
    constructor() {
        super();
    }

    /**
     * Write the result to console
     */
    async write() {
        console.log(this.data);
    }
}

module.exports = ConsoleOutput;