'use strict';

const fs = require('fs');
const Output = require('./output');
const message = require('../../config/message');

/**
 * FileSystem Output 
 */
class FileOutput extends Output {
    /**
     * 
     * @param {String} path The output path 
     */
    constructor(path) {
        if (!path) {
            throw new Error(message.output_path_missed);
        }
        super();
        this.path = path;
    }

    /**
     * Write the result to FileSystem
     */
    async write() {
        await fs.writeFile(this.path, this.data, 'utf8', err => { });
    }
}

module.exports = FileOutput;