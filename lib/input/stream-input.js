'use strict';

const fs = require('fs');
const Input = require('./input');
const message = require('../../config/message');

/**
 * Load a HTML file using Stream
 */
class StreamInput extends Input {
    /**
     * Constructor
     * 
     * @param {String} path The input HTML file's path 
     */
    constructor(path) {
        if (!path) {
            throw new Error(message.input_path_missed);
        }
        super();
        this.stream = fs.createReadStream(path);
    }

    getStream() {
        return new Promise((resolve, reject) => {
            this.stream.on('data', chunk => {
                this.data += chunk;
            })

            this.stream.on('error', err => {
                reject(err);
            })

            this.stream.on('end', () => {
                resolve();
            })
        })
    }

    /**
     * Read the HTML file by Stream
     */
    async read() {
        await this.getStream();
        return this.data;
    }
}

module.exports = StreamInput;