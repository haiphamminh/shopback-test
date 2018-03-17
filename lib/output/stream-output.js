'use strict';

const fs = require('fs');
const Output = require('./output');
const message = require('../../config/message');

/**
 * Write Stream
 */
class StreamOutput extends Output {
    /**
     * Contructor
     * 
     * @param {String} path The output path
     */
    constructor(path) {
        if (!path) {
            throw new Error(message.output_path_missed);
        }
        super();
        this.stream = fs.createWriteStream(path);
    }

    /**
     * Write the result to the output file by Stream
     */
    writeStream() {
        return new Promise((resolve, reject) => {
            this.stream.write(this.data);
            this.stream.end();

            this.stream.on('error', err => {
                reject(err);
            })

            this.stream.on('finish', () => {
                resolve();
            });
        });
    }

    async write() {
        await this.writeStream();
    }
}

module.exports = StreamOutput;