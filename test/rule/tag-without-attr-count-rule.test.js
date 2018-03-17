'use strict';

const assert = require('chai').assert;
const TagWithoutAttrCountRule = require('../../lib/rule/tag-without-attr-count-rule');
const cheerio = require('cheerio');

describe('TagWithoutAttrCountRule class', function () {
    describe('TagWithoutAttrCountRule constructor', function () {

        it('rule is created successfully', function () {
            const rule = new TagWithoutAttrCountRule('', 'img', 'alt');
            assert.notStrictEqual(rule, undefined);
        });

        it('rule is created with html as root tag', function () {
            const rule = new TagWithoutAttrCountRule('', 'img', 'alt');
            assert.equal(rule.rootTag, 'html');
        });

        it('rule is created with the given rootTag property', function () {
            const rule = new TagWithoutAttrCountRule('head', 'img', 'alt');
            assert.equal(rule.rootTag, 'head');
        });

        it('rule is created with null of dom property', function () {
            const rule = new TagWithoutAttrCountRule('', 'img', 'alt');
            assert.strictEqual(rule.dom, null);
        });

        it('rule is created with false of isValid property', function () {
            const rule = new TagWithoutAttrCountRule('', 'img', 'alt');
            assert.strictEqual(rule.isValid, false);
        });

        it('rule is created with empty tag property', function () {
            const rule = new TagWithoutAttrCountRule('', '', 'alt');
            assert.strictEqual(rule.tag, '');
        });

        it('rule is created with empty attr property', function () {
            const rule = new TagWithoutAttrCountRule('', '', '');
            assert.strictEqual(rule.attr, '');
        });
    });

    describe('validate method', function () {
        it('isValid property is true as the IMG tag has alt attribute', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <img src="." alt="random desc" />
                    </body>
                </html>`
            );
            const rule = new TagWithoutAttrCountRule('', 'img', 'alt');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, true);
        });

        it('isValid property is false as the IMG tag has no alt attribute', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <img src="."/>
                    </body>
                </html>`
            );
            const rule = new TagWithoutAttrCountRule('', 'img', 'alt');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, false);
        });
    });

    describe('error method', function () {
        it('no error message as the IMG tag has alt attribute', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <img src="." alt="random desc" />
                    </body>
                </html>`
            );
            const rule = new TagWithoutAttrCountRule('', 'img', 'alt');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), '');
        });

        it('there is an error message as the IMG tag has no alt attribute', function () {
            const dom = cheerio.load(
                `<html>
                    <head></head>
                    <body>
                        <img src="."/>
                        <img src="."/>
                    </body>
                </html>`
            );
            const rule = new TagWithoutAttrCountRule('', 'img', 'alt');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), 'There are 2 <img> tag without alt attribute');
        });
    });
});