const amphtmlValidator = require('amphtml-validator');
const ora = require('ora');
const util = require('./utility');
const defaultOption = {
    auth: {
        user: '',
        password: ''
    },
    progress: null
};
const spinnerOption = {
    text: 'Validating in progress',
    spinner: 'dots',
    color: 'cyan'
};

/**
 * validateHtml
 * @param {string} html - AMP HTML source.
 * @return {Promise}
 */
const validateHtml = function (html) {
    return amphtmlValidator.getInstance().then((validator) => {
        return validator.validateString(html);
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
            getSourceFunc(url, option).then((html) => {
                return validateHtml(html);
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                resolve(error);
            });
        }));
    });

    if (typeof option.progress === 'function') {
        util.setProgress(queue, option.progress);
    }

    return queue;
};

/**
 * validateFile
 * @param {string} urls - AMP HTML file path.
 * @return {Promise}
 */
const validateFile = function (urls, option) {
    const spinner = ora(spinnerOption).start();

    option = Object.assign(defaultOption, option);

    let queue = setQueueValidate(util.getSourceFile, urls, option);

    return Promise.all(queue).then((result) => {
        spinner.stop();

        return result;
    });
};

/**
 * validateUrl
 * @param {string|boolean} urls - AMP Page URL.
 * @param {function} option.progress - Progress callback function.
 * @return {Promise}
 */
const validateUrl = function (urls, option) {
    const spinner = ora(spinnerOption).start();

    option = Object.assign(defaultOption, option);

    let queue = setQueueValidate(util.getSourceUrl, urls, option);

    return Promise.all(queue).then((result) => {
        spinner.stop();

        return result;
    });
};

exports.validateHtml = validateHtml;
exports.validateUrl = validateUrl;
exports.validateFile = validateFile;
