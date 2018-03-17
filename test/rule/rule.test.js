'use strict';

const assert = require('chai').assert;
const Rule = require('../../lib/rule/rule');

describe('Rule class', function () {

    it('rule is created successfully', function () {
        const rule = new Rule();
        assert.notStrictEqual(rule, undefined);
    });

    it('rule is created with html as root tag', function () {
        const rule = new Rule();
        assert.equal(rule.rootTag, 'html');
    });

    it('rule is created with the given rootTag property', function () {
        const rule = new Rule('head');
        assert.equal(rule.rootTag, 'head');
    });

    it('rule is created with null of dom property', function () {
        const rule = new Rule();
        assert.strictEqual(rule.dom, null);
    });

    it('rule is created with false of isValid property', function () {
        const rule = new Rule();
        assert.strictEqual(rule.isValid, false);
    });
});