'use strict';

const Rule = require('./rule');

/**
 * The rule of an existence tag
 */
class TagExistenceRule extends Rule {
    constructor(rootTag, tag) {
        super(rootTag);
        this.tag = tag;
    }

    validate() {
        this.isValid = this.dom(`${this.rootTag} ${this.tag}`).length > 0;
    }

    error() {
        const errorMsg = `The <${this.rootTag}> doesn't have <${this.tag}> tag`;
        return this.isValid ? '' : errorMsg;
    }
}

module.exports = TagExistenceRule;