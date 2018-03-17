'use strict';

const fs = require('fs');
const Input = require('./input');
const message = require('../../config/message');

/**
 * Load a HTML file using FileSystem
 */
class FileInput extends Input {
    /**
     * Contructor
     * 
     * @param {String} path The input HTML file's path
     */
    constructor(path) {
        if (!path) {
            throw new Error(message.input_path_missed);
        }
        super();
        this.path = path;
    }

    /**
     * Read the input HTML file asynchronously
     */
    readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) return reject(err);
                resolve(data);
            })
        })
    }

    /**
     * Read the input HTML file asynchronously
     */
    async read() {
        this.data = await this.readFile(this.path);
        return this.data;
    }
}

module.exports = FileInput;