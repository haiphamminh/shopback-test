'use strict';

const assert = require('chai').assert;
const TagLimitCountRule = require('../../lib/rule/tag-limit-count-rule');
const cheerio = require('cheerio');

describe('TagLimitCountRule class', function () {
    describe('TagLimitCountRule constructor', function () {

        it('rule is created successfully', function () {
            const rule = new TagLimitCountRule('', 'h1', 1)
            assert.notStrictEqual(rule, undefined);
        });

        it('rule is created with html as root tag', function () {
            const rule = new TagLimitCountRule('', 'h1', 1)
            assert.equal(rule.rootTag, 'html');
        });

        it('rule is created with the given rootTag property', function () {
            const rule = new TagLimitCountRule('body', 'h1', 1)
            assert.equal(rule.rootTag, 'body');
        });

        it('rule is created with null of dom property', function () {
            const rule = new TagLimitCountRule('', 'h1', 1)
            assert.strictEqual(rule.dom, null);
        });

        it('rule is created with false of isValid property', function () {
            const rule = new TagLimitCountRule('', 'h1', 1)
            assert.strictEqual(rule.isValid, false);
        });

        it('rule is created with empty tag property', function () {
            const rule = new TagLimitCountRule('', '', 1)
            assert.strictEqual(rule.tag, '');
        });

        it('rule is created with empty limit property', function () {
            const rule = new TagLimitCountRule('', 'h1')
            assert.strictEqual(rule.limit, undefined);
        });
    });

    describe('validate method', function () {
        it('isValid property is true as a number of H1 tags does not exceed the limit 1', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <h1>Good HTML</h1>
                    </body>
                </html>`
            );
            const rule = new TagLimitCountRule('', 'h1', 1)
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, true);
        });

        it('isValid property is true as a number of STRONG tags does not exceed the limit 3', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <h1>Good HTML</h1>
                        <strong>Good HTML</strong>
                        <strong>Good HTML</strong>
                    </body>
                </html>`
            );
            const rule = new TagLimitCountRule('', 'strong', 3)
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, true);
        });


        it('isValid property is false as a number of H1 tags does exceed the limit 1', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <h1>Good HTML</h1>
                        <h1>Good HTML</h1>
                    </body>
                </html>`
            );
            const rule = new TagLimitCountRule('', 'h1', 1)
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, false);
        });

        it('isValid property is false as a number of STRONG tags does exceed the limit 3', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <h1>Good HTML</h1>
                        <strong>Good HTML</strong>
                        <strong>Good HTML</strong>
                        <strong>Good HTML</strong>
                        <strong>Good HTML</strong>
                    </body>
                </html>`
            );
            const rule = new TagLimitCountRule('', 'strong', 3)
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, false);
        });
    });

    describe('error method', function () {
        it('no error message as a number of H1 tags does not exceed the limit 1', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <h1>Good HTML</h1>
                    </body>
                </html>`
            );
            const rule = new TagLimitCountRule('', 'h1', 1)
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), '');
        });

        it('no error message as a number of STRONG tags does not exceed the limit 3', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <h1>Good HTML</h1>
                        <strong>Good HTML</strong>
                        <strong>Good HTML</strong>
                    </body>
                </html>`
            );
            const rule = new TagLimitCountRule('', 'strong', 3)
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), '');
        });


        it('there is an error message as a number of H1 tags does exceed the limit 1', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <h1>Good HTML</h1>
                        <h1>Good HTML</h1>
                    </body>
                </html>`
            );
            const rule = new TagLimitCountRule('', 'h1', 1)
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), 'The <html> have more than 1 <h1> tag');
        });

        it('there is an error message as a number of STRONG tags does exceed the limit 3', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <h1>Good HTML</h1>
                        <strong>Good HTML</strong>
                        <strong>Good HTML</strong>
                        <strong>Good HTML</strong>
                        <strong>Good HTML</strong>
                    </body>
                </html>`
            );
            const rule = new TagLimitCountRule('', 'strong', 3)
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), 'The <html> have more than 3 <strong> tag');
        });
    });
});