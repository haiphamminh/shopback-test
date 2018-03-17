'use strict';

const assert = require('chai').assert;
const TagExistenceRule = require('../../lib/rule/tag-existence-rule');
const cheerio = require('cheerio');

describe('TagExistenceRule class', function () {
    describe('TagExistenceRule constructor', function () {

        it('rule is created successfully', function () {
            const rule = new TagExistenceRule('', '');
            assert.notStrictEqual(rule, undefined);
        });

        it('rule is created with html as root tag', function () {
            const rule = new TagExistenceRule('', '');
            assert.equal(rule.rootTag, 'html');
        });

        it('rule is created with the given rootTag property', function () {
            const rule = new TagExistenceRule('head', '');
            assert.equal(rule.rootTag, 'head');
        });

        it('rule is created with null of dom property', function () {
            const rule = new TagExistenceRule('', '');
            assert.strictEqual(rule.dom, null);
        });

        it('rule is created with false of isValid property', function () {
            const rule = new TagExistenceRule('', '');
            assert.strictEqual(rule.isValid, false);
        });

        it('rule is created with empty tag property', function () {
            const rule = new TagExistenceRule('', '');
            assert.strictEqual(rule.tag, '');
        });
    });

    describe('validate method', function () {
        const dom = cheerio.load('<html><head></head><body></body></html>');

        it('isValid property is true as body tag must exist in html string', function () {
            const rule = new TagExistenceRule('', 'body');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, true);
        });

        it('isValid is false as the <head> tag does not have <title> tag', function () {
            const rule = new TagExistenceRule('head', 'title');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, false);
        });
    });

    describe('error method', function () {
        const dom = cheerio.load('<html><head></head><body></body></html>');

        it('no error message as body tag must exist in html string', function () {
            const rule = new TagExistenceRule('', 'body');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), '');
        });

        it('there is an error message as the <head> tag does not have <title> tag', function () {
            const rule = new TagExistenceRule('head', 'title');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), 'The <head> doesn\'t have <title> tag');
        });
    });
});