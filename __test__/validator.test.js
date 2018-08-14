const amphtmlValidator = require('../lib/amphtml-validator-extra');
const urls = [
    'https://www.ampproject.org/learn/overview/',
    'https://www.ampproject.org/docs/reference/components',
    'https://www.ampproject.org/docs/reference/common_attributes'
];
const files = [
    './__test__/src/pass.html',
    './__test__/src/fail.html'
];

describe('validateUrl()', () => {
    test('Case: PASS', () => {
        amphtmlValidator.validateUrl(urls).then((result) => {
            expect(result[0].status).toBe('PASS');
        });
    });

    test('Case: FAIL', () => {
        amphtmlValidator.validateUrl(urls).then((result) => {
            expect(result[1].status).toBe('FAIL');
        });
    });
});

describe('validateFile()', () => {
    test('PASS', () => {
        amphtmlValidator.validateFile(files).then((result) => {
            expect(result[0].status).toBe('PASS');
        });
    });

    test('FAIL', () => {
        amphtmlValidator.validateFile(files).then((result) => {
            expect(result[1].status).toBe('FAIL');
        });
    });
});
