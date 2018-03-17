'use strict';

const cheerio = require('cheerio');
const defaultConfig = require('../config/config');
const message = require('../config/message');

const Rule = require('./rule/rule');
const TagExistenceRule = require('./rule/tag-existence-rule');
const TagExistenceWithAttrRule = require('./rule/tag-existence-with-attr-rule');
const TagLimitCountRule = require('./rule/tag-limit-count-rule');
const TagWithoutAttrCountRule = require('./rule/tag-without-attr-count-rule');

const FileInput = require('./input/file-input');
const StreamInput = require('./input/stream-input');
const InputType = require('./input/input-type');
const InputFactory = require('./input/input-factory');

const ConsoleOutput = require('./output/console-output');
const FileOutput = require('./output/file-output');
const StreamOutput = require('./output/stream-output');
const OutputType = require('./output/output-type');
const OutputFactory = require('./output/output-factory');

/**
 * SEO Validator
 */
class Validator {
    constructor(config, skipPredefinedRules) {
        this.config = config || defaultConfig;
        this.input = new FileInput(this.config.input_path);
        this.output = new ConsoleOutput();
        this.dom = null;
        this.rules = [];
        this.errors = [];

        if (!skipPredefinedRules) {
            this.rules = [
                new TagWithoutAttrCountRule('', 'img', 'alt'),
                new TagWithoutAttrCountRule('', 'a', 'rel'),
                new TagExistenceRule('head', 'title'),
                new TagExistenceWithAttrRule('head', 'meta', 'name', 'description'),
                new TagExistenceWithAttrRule('head', 'meta', 'name', 'keywords'),
                new TagLimitCountRule('', 'strong', this.config.strong_tag_limit),
                new TagLimitCountRule('', 'h1', 1)
            ];
        }
    }

    skipRules(indexes) {
        if (indexes) {
            this.rules = this.rules.filter((value, index) => !indexes.includes(index + 1));
        }
    }

    setInput(type) {
        this.input = InputFactory.getInput(type, this.config.input_path);
    }

    setOutput(type) {
        this.output = OutputFactory.getOutput(type, this.config.output_path);
    }

    addRule(rule) {
        rule && this.rules.push(rule);
    }

    async validate() {
        const data = await this.input.read();
        this.dom = cheerio.load(data);

        this.rules.forEach((rule) => {
            rule.setDom(this.dom);
            rule.validate();
            const error = rule.error();
            error && this.errors.push(error);
        });
    }

    async getResult() {
        this.output.setData(this.errors.length ? this.errors.join("\r\n") : message.no_seo_defects);
        await this.output.write();
    }
}

module.exports = {
    Validator,

    Rule,
    TagExistenceRule,
    TagExistenceWithAttrRule,
    TagLimitCountRule,
    TagWithoutAttrCountRule,

    InputType,
    OutputType
};
