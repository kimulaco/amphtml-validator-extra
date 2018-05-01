const amphtmlValidator = require('../lib/amphtml-validator-extra');

describe('amphtmlValidator', () => {
    test('validateUrl()', () => {
        const urls = [
            'https://www.ampproject.org/learn/overview/',
            'https://www.ampproject.org/docs/reference/components',
            'https://www.ampproject.org/docs/reference/common_attributes'
        ];

        amphtmlValidator.validateUrl(urls).then((result) => {
            expect(result[0].status).toBe('PASS');
        });
    });

    test('validateFile()', () => {
        const urls = [
            './__test__/src/pass.html',
            './__test__/src/fail.html'
        ];

        amphtmlValidator.validateFile(urls).then((result) => {
            expect(result[0].status).toBe('PASS');
        });
    });
});
