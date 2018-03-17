'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const fs = require('fs');
const { Validator, TagExistenceRule, TagLimitCountRule, TagWithoutAttrCountRule, } = require('../../lib/validator');
const FileInput = require('../../lib/input/file-input');
const ConsoleOutput = require('../../lib/output/console-output');
const Rule = require('../../lib/rule/rule');
const defaultConfig = require('../../config/config');
const customConfig = require('./config');

describe('Validator class', function () {
    describe('Constructor', function () {
        it('created successfully without args', function () {
            assert.isDefined(new Validator());
        });

        it('default config is used instead if no args is with constructor', function () {
            const validator = new Validator();
            assert.deepEqual(validator.config, defaultConfig);
        });

        it('created with custom configuration', function () {
            const validator = new Validator(customConfig);
            assert.notDeepEqual(validator.config, defaultConfig);
        });

        it('input property is instance of FileInput by default', function () {
            const validator = new Validator();
            assert.instanceOf(validator.input, FileInput);
        });

        it('output property is instance of FileInput by default', function () {
            const validator = new Validator();
            assert.instanceOf(validator.output, ConsoleOutput);
        });

        it('dom property must be null', function () {
            const validator = new Validator();
            assert.isNull(validator.dom);
        });

        it('errors property has zero size', function () {
            const validator = new Validator();
            assert.isEmpty(validator.errors);
        });

        it('rules propertyis empty if all predefined rules are skipped', function () {
            const validator = new Validator(customConfig, true);
            assert.isEmpty(validator.rules);
        });

        it('rules property\'s length is 7 if all predefined rules aren\'t skipped', function () {
            const validator = new Validator();
            assert.equal(validator.rules.length, 7);
        });
    });

    describe('skipRules method', function () {
        it('no rules is skipped if parameter is undefined', function () {
            const validator = new Validator();
            validator.skipRules();
            assert.equal(validator.rules.length, 7);
        });

        it('no rules is skipped if parameter is an empty array', function () {
            const validator = new Validator();
            validator.skipRules([]);
            assert.equal(validator.rules.length, 7);
        });

        it('rules are skipped if parameter is one-index based array', function () {
            const validator = new Validator();
            validator.skipRules([1, 4, 5]);
            assert.equal(validator.rules.length, 4);
            assert.instanceOf(validator.rules[0], TagWithoutAttrCountRule);
            assert.instanceOf(validator.rules[1], TagExistenceRule);
            assert.instanceOf(validator.rules[2], TagLimitCountRule);
            assert.instanceOf(validator.rules[3], TagLimitCountRule);
        });
    });

    describe('addRule method', function () {
        it('no rule is added if parameter is undefined', function () {
            const validator = new Validator();
            validator.addRule(undefined);
            assert.equal(validator.rules.length, 7);
        });

        it('no rule is added if parameter is null', function () {
            const validator = new Validator(null);
            validator.addRule();
            assert.equal(validator.rules.length, 7);
        });

        it('a new rule is added if parameter is valid', function () {
            const validator = new Validator(null);
            validator.addRule(new Rule());
            assert.equal(validator.rules.length, 8);
        });
    });

    describe('validate method', function () {
        let validator = null;
        let readStub = null;
        beforeEach(function () {
            validator = new Validator();
            readStub = sinon.stub(validator.input, "read");
        });

        afterEach(function () {
            readStub.restore();
        });

        it('errors property has items', function () {
            readStub.returns('<html></html>');
            validator
                .validate()
                .then(() => assert.isNotEmpty(validator.errors));
        });

        it('no errors when the HTML is good', function () {
            const data =
                `<html>
                    <head>
                        <title>This is a good HTML page</title>
                        <meta name="description" content="" />
                        <meta name="keywords" content="" />
                    </head>
                    <body>
                        <h1>Good HTML</h1>
                        <strong>Good HTML</strong>
                        <a href="." rel="random link">A link</a>
                        <img src="." alt="random desc" />
                    </body>
                </html>`;
            readStub.returns(data);
            validator
                .validate()
                .then(() => assert.isEmpty(validator.errors));
        });
    });

    describe('getResult method', function () {
        const validator = new Validator();

        before(function () {
            sinon.stub(validator.output, 'write');
        });

        it('the data of the output property is not empty if any error', function () {
            validator.errors = ['err1', 'err2', 'err3'];
            validator
                .getResult()
                .then(() => assert.equal(validator.output.data, validator.errors.join('\r\n')));
        });
    });
});

