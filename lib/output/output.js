'use strict'

/**
 * Base Output class
 */
class Output {
    constructor() {
        this.data = '';
    }

    /**
     * Set the result of SEO detection
     * 
     * @param {String} data The error message or empty
     */
    setData(data) {
        this.data = data;
    }

    /**
     * Write the result to the output file
     */
    async write() { }
}

module.exports = Output;