'use strict';

const assert = require('chai').assert;
const TagExistenceWithAttrRule = require('../../lib/rule/tag-existence-with-attr-rule');
const cheerio = require('cheerio');

describe('TagExistenceWithAttrRule class', function () {
    describe('TagExistenceWithAttrRule constructor', function () {

        it('rule is created successfully', function () {
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            assert.notStrictEqual(rule, undefined);
        });

        it('rule is created with html as root tag', function () {
            const rule = new TagExistenceWithAttrRule('', 'meta', 'name', 'description');
            assert.equal(rule.rootTag, 'html');
        });

        it('rule is created with the given rootTag property', function () {
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            assert.equal(rule.rootTag, 'head');
        });

        it('rule is created with null of dom property', function () {
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            assert.strictEqual(rule.dom, null);
        });

        it('rule is created with false of isValid property', function () {
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            assert.strictEqual(rule.isValid, false);
        });

        it('rule is created with empty tag property', function () {
            const rule = new TagExistenceWithAttrRule('head', '', 'name', 'description');
            assert.strictEqual(rule.tag, '');
        });

        it('rule is created with empty attr property', function () {
            const rule = new TagExistenceWithAttrRule('head', 'meta', '', 'description');
            assert.strictEqual(rule.attr, '');
        });

        it('rule is created with empty value of attr property', function () {
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', '');
            assert.strictEqual(rule.value, '');
        });
    });

    describe('validate method', function () {
        it('isValid property is true as the meta tag has name attribute with description value', function () {
            const dom = cheerio.load(
                `<html>
                    <head>
                        <meta name="description" content="" />
                    </head>
                    <body></body>
                </html>`
            );
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, true);
        });

        it('isValid property is false as the head has no the meta tag', function () {
            const dom = cheerio.load(
                `<html>
                    <head>
                    </head>
                    <body></body>
                </html>`
            );
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, false);
        });

        it('isValid property is false as the meta tag has no name attribute', function () {
            const dom = cheerio.load(
                `<html>
                    <head>
                        <meta content="" />
                    </head>
                    <body></body>
                </html>`
            );
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, false);
        });

        it('isValid property is false as the meta tag has name attribute without value', function () {
            const dom = cheerio.load(
                `<html>
                    <head>
                        <meta name="" content="" />
                    </head>
                    <body></body>
                </html>`
            );
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.isValid, false);
        });
    });

    describe('error method', function () {
        it('no error message as the meta tag has name attribute with description value', function () {
            const dom = cheerio.load(
                `<html>
                    <head>
                        <meta name="description" content="" />
                    </head>
                    <body></body>
                </html>`
            );
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), '');
        });

        it('there is an error message as the head has no the meta tag', function () {
            const dom = cheerio.load(
                `<html>
                    <head>
                    </head>
                    <body></body>
                </html>`
            );
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), 'The <head> doesn\'t have <meta name="description"> tag');
        });

        it('there is an error message as the meta tag has no name attribute', function () {
            const dom = cheerio.load(
                `<html>
                    <head>
                        <meta content="" />
                    </head>
                    <body></body>
                </html>`
            );
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), 'The <head> doesn\'t have <meta name="description"> tag');
        });

        it('there is an error message as the meta tag has name attribute without value', function () {
            const dom = cheerio.load(
                `<html>
                    <head>
                        <meta name="" content="" />
                    </head>
                    <body></body>
                </html>`
            );
            const rule = new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
            rule.setDom(dom);
            rule.validate();
            assert.equal(rule.error(), 'The <head> doesn\'t have <meta name="description"> tag');
        });
    });
});