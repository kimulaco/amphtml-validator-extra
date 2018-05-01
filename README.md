# amphtml-validator-extra(Beta Version)

Enhanced package of [amphtml-validator](https://www.npmjs.com/package/amphtml-validator).

It is possible to designate multiple URLs and file paths and verify them all together.

## Use

```js
const amphtmlValidator = require('./amphtml-validator-extra.js');
const urls = [
    'https://example.com/article-01.html?amp',
    'https://example.com/article-02.html?amp',
    'https://example.com/article-03.html?amp'
];

amphtmlValidator.validateUrl(urls).then((result) => {
    console.log(result);
    // [
    //   status: 'PASS'
    //   errors: [...]
    // ],
    // [
    //   status: 'FAIL',
    //   errors: [...]
    // ]
});
```

## Methods

### validateHtml

```js
amphtmlValidator.validateHtml('<html amp>...</html>').then((result) => {
    console.log(result);
});
```

|Argment|Type|Description|
|:-|:-|:-|
|html|string|AMP HTML sourde|

### validateUrl

```js
let urls = [
    'https://example.com/article-01.html?amp',
    'https://example.com/article-02.html?amp',
    'https://example.com/article-03.html?amp'
];

amphtmlValidator.validateUrl(urls).then((result) => {
    console.log(result);
});
```
|Argment|Type|Description|
|:-|:-|:-|
|urls|array or string|AMP Page URL.|
|option.progress|function|Progress callback function.|

### validateFile

```js
let urls = [
    './test/article-01.html',
    './test/article-02.html',
    './test/article-03.html'
];

amphtmlValidator.validateFile(urls).then((result) => {
    console.log(result);
});
```

|Argment|Type|Description|
|:-|:-|:-|
|urls|array or string|AMP Page URL.|
|option.progress|function|Progress callback function.|

## Option

Progress callback function.

### progress

```js
let urls = [
    'https://example.com/article-01.html?amp',
    'https://example.com/article-02.html?amp',
    'https://example.com/article-03.html?amp'
];
let option = {
    progress: (progress) => {
        console.log(`${progress.index} / ${progress.max}`);
    }
};

amphtmlValidator.validateUrl(urls, option).then((result) => {
    console.log(result);
    /*
     * 1 / 3
     * 2 / 3
     * 3 / 3
     */
});
```

### basic

Basic auth.

```js
let urls = [
    'https://example.com/auth/article-01.html?amp',
    'https://example.com/auth/article-02.html?amp',
    'https://example.com/auth/article-03.html?amp'
];
let option = {
    basic: {
        user: 'username',
        password: 'username'
    }
};

amphtmlValidator.validateUrl(urls, option).then((result) => {
    console.log(result);
});
```

## Futureed

- Basic Auth
- File path format
- amphtml-validator instance

## Lisence

[MIT Lisence]()
