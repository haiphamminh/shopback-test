'use strict';

const Rule = require('./rule');

/**
 * The rule of a tag with limitation
 */
class TagLimitCountRule extends Rule {
    constructor(rootTag, tag, limit) {
        super(rootTag);
        this.tag = tag;
        this.limit = limit;
    }

    validate() {
        this.isValid = this.dom(`${this.rootTag} ${this.tag}`).length <= this.limit;
    }

    error() {
        const errorMsg = `The <${this.rootTag}> have more than ${this.limit} <${this.tag}> tag`;
        return this.isValid ? '' : errorMsg;
    }
}

module.exports = TagLimitCountRule;