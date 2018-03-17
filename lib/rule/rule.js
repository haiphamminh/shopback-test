'use strict';

const config = require('../../config/config');

/**
 * Base Rule
 */
class Rule {
    /**
     * Constructor 
     * 
     * @param {String} rootTag The root tag from which to find child tags. Its value is by default html
     */
    constructor(rootTag) {
        this.rootTag = rootTag ? rootTag : config.root_tag;
        this.dom = null;
        this.isValid = false;
    }

    /**
     * Set DOM
     * 
     * @param {*} dom The DOM of the HTML file
     */
    setDom(dom) {
        this.dom = dom;
    }

    validate() { }

    error() { }
}

module.exports = Rule;