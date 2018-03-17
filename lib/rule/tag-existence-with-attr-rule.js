'use strict';

const Rule = require('./rule');

/**
 * The rule of an existence tag with attribute
 */
class TagExistenceWithAttrRule extends Rule {
    constructor(rootTag, tag, attr, value) {
        super(rootTag);
        this.tag = tag;
        this.attr = attr;
        this.value = value;
    }

    validate() {
        this.isValid = this.dom(`${this.rootTag} ${this.tag}[${this.attr}*=${this.value}]`).length > 0;
    }

    error() {
        const errorMsg = `The <${this.rootTag}> doesn't have <${this.tag} ${this.attr}="${this.value}"> tag`;
        return this.isValid ? '' : errorMsg;
    }
}

module.exports = TagExistenceWithAttrRule;