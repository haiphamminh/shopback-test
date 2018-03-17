'use strict';

const Rule = require('./rule');

/**
 * The rule of a number of tags without attribute
 */
class TagWithoutAttrCountRule extends Rule {
    constructor(rootTag, tag, attr) {
        super(rootTag);
        this.tag = tag;
        this.attr = attr;
    }

    validate() {
        this.total = this.dom(`${this.rootTag} ${this.tag}:not([${this.attr}])`).length;
        this.isValid = !this.total;
    }

    error() {
        const errorMsg = `There are ${this.total} <${this.tag}> tag without ${this.attr} attribute`;
        return this.isValid ? '' : errorMsg;
    }
}

module.exports = TagWithoutAttrCountRule;