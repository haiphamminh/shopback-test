'use strict';

const { Validator, TagExistenceRule, InputType, OutputType } = require('../lib/validator');

const validator = new Validator();
validator.setInput(InputType.FILE);
validator.setOutput(OutputType.STREAM);
validator.addRule(new TagExistenceRule('', 'footer'));

validator
  .validate()
  .then(async () => await validator.getResult())
  .catch(err => console.error(err));
