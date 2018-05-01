const amphtmlValidator = require('amphtml-validator');
const utl = require('./amphtml-validator-extra-utility');
const defaultOption = {
    auth: {
        user: '',
        password: ''
    },
    progress: null
};

/**
 * validateHtml
 * @param {string} html - AMP HTML source.
 * @return {Promise}
 */
const validateHtml = function (html) {
    return new Promise((resolve, reject) => {
        try {
            amphtmlValidator.getInstance().then((validator) => {
                resolve(validator.validateString(html));
            }).catch((error) => {
                throw error;
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * setQueueValidate
 * @param {array} urls - AMP Page URL.
 * @return {array}
 */
const setQueueValidate = function (getSourceFunc, urls, option) {
    let queue = [];

    if (typeof urls === 'string') {
        urls = [urls];
    }

    urls.forEach((url) => {
        queue.push(new Promise((resolve) => {
            getSourceFunc(url).then((html) => {
                return validateHtml(html);
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                resolve(error);
            });
        }));
    });

    if (typeof option.progress === 'function') {
        utl.setProgress(queue, option.progress);
    }

    return queue;
};

/**
 * validateFile
 * @param {string} urls - AMP HTML file path.
 * @return {Promise}
 */
const validateFile = function (urls, option) {
    option = Object.assign(defaultOption, option);

    let queue = setQueueValidate(utl.getSourceFile, urls, option);

    return Promise.all(queue);
};

/**
 * validateUrl
 * @param {string|boolean} urls - AMP Page URL.
 * @param {function} option.progress - Progress callback function.
 * @return {Promise}
 */
const validateUrl = function (urls, option) {
    option = Object.assign(defaultOption, option);

    let queue = setQueueValidate(utl.getSourceUrl, urls, option);

    return Promise.all(queue);
};

exports.validateHtml = validateHtml;
exports.validateUrl = validateUrl;
exports.validateFile = validateFile;
