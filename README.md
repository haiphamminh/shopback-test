<h1 align="center">shopback-test</h1>
<h5 align="center">A Node.js package scan a HTML content and show all of SEO defects.</h5>

<br />

```js
const { Validator, InputType, OutputType } = require('shopback-test');
const config = require('./config'); // see Custom Configuration for more details
const validator = new Validator(config);

// Skip predefined 1-index based rules
validator.skipRules([1,4,5]);

// Set input type. There are 2 types: FILE and STREAM. It's by default FILE
validator.setInput(InputType.STREAM);

// Set output type. There are 3 types: CONSOLE, FILE and STREAM. It's by default CONSOLE
validator.setOutput(OutputType.FILE);

validator
  .validate()
  .then(async () => await validator.getResult())
  .catch(err => console.error(err));
```

## Requirements
Node.js 8.0 or greater

## Installation
`npm install shopback-test`

## Predefined Rules
1. Detect if there are any `<img />` tags without `alt` attribute<br />
2. Detect if there are any `<a />` tags without `rel` attribute<br />
3. Detect if there is any header that doesn’t have `<title>` tag<br />
4. Detect if there is any header that doesn’t have `<meta name="descriptions" … />` tag<br />
5. Detect if there is any header that doesn’t have `<meta name="keywords" … />` tag<br />
6. Detect if there are more than 15 `<strong>` tag in HTML <br />
7. Detect if a HTML have more than one `<h1>` tag<br />

## API

### Custom Configuration
Cloning configuration from config/config.js of shopback-test module as a custom configuration in your Nodejs project, then change the value of properties as you desire.<br/>
If no custom configuration isn't given, the default configuration in the module will be used instead.

```js
const { Validator, InputType, OutputType } = require('shopback-test');
const config = require('./config');
const validator = new Validator(config);
```

### Rule
```js
const {
    TagExistenceRule,
    TagExistenceWithAttrRule,
    TagLimitCountRule,
    TagWithoutAttrCountRule
} = require('shopback-test');

new TagExistenceRule('head', 'title');
new TagExistenceWithAttrRule('head', 'img', 'alt');
new TagExistenceWithAttrRule('head', 'meta', 'name', 'description');
new TagLimitCountRule('', 'strong', 15);
new TagLimitCountRule('', 'h1', 1);
new TagWithoutAttrCountRule('', 'img', 'alt');
new TagWithoutAttrCountRule('', 'a', 'rel');

// Add rules
validator.addRule(new TagExistenceRule('head', 'title'));
validator.addRule(new TagExistenceWithAttrRule('head', 'img', 'alt'));
```

### Input
There are 2 input types: FILE and STREAM. By default FILE, only invole setInput method of Validator in case of changing the input type. <br/>
The input path is configured in the config.js file by input_path.
```js
const { InputType } = require('shopback-test');
validator.setInput(InputType.FILE); // or InputType.STREAM.
```

### Output
There are 3 output types: CONSOLE, FILE and STREAM. By default CONSOLE, only invole setOutput method of Validator in case of changing the output type.<br/>
The output path is configured in the config.js file by output_path.
```js
const { OutputType } = require('shopback-test');
validator.setOutput(OutputType.FILE);
```

### Validator
#### constructor(skipPredefinedRules)
All predefined rules is by default added (skipPredefinedRules = false)
```js
const { Validator } = require('shopback-test');
const validator = new Validator(true); // skip all predefined rules
```

#### skipRules(indexes)
Skip one-index based rules
```js
validator.skipRules([1,4,5]);
```

#### addRule(rule)
```js
validator.addRule(new RuleExistTag('head', 'title'));
```

#### validate() && getResult()
```js
validator
  .validate()
  .then(async () => await validator.getResult())
  .catch(err => console.error(err));
```

## Custom Rules
```js
const { Rule } = require('shopback-test');

class NewRule extends Rule {
  constructor(rootTag, ...params) {
    super(rootTag);
    ...
  }

  validate() {
    // Write logic
    this.isValid = true; // or false
  }

  error() {
    return !this.isValid ? `Error message` : '';
  }
}

validator.addRule(new NewRule(rootTag, ...params));
```

## Unit testing
Run `npm test` or `mocha .\test\*\*test.js` in the shopback-test module.