const request = require('request');
const fs = require('fs');

/**
 * isBuffer
 * @param {object} obj - Target Object.
 * @return {boolean}
 */
const isBuffer = function (obj) {
    if (
        obj &&
        obj !== null &&
        obj.constructor !== null &&
        typeof obj.constructor.isBuffer === 'function' &&
        obj.constructor.isBuffer(obj)
    ) {
        return true;
    }

    return false;
};

/**
 * getSourceUrl
 * @param {string} url - AMP Page URL.
 * @return {Promise}
 */
const getSourceUrl = function (url) {
    return new Promise((resolve, reject) => {
        request.get({
            url: url
        }, (requestError, response, body) => {
            if (requestError) {
                reject(requestError);
            }

            resolve(body);
        });
    });
};

/**
 * getSourceFile
 * @param {string} url - AMP Page URL.
 * @return {Promise}
 */
const getSourceFile = function (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error, source) => {
            if (error) {
                reject(error);
            }

            if (isBuffer(source)) {
                source = source.toString();
            }

            resolve(source);
        });
    });
};

/**
 * setProgress
 * @param {array} queue - Task queue.
 * @return {Promise|boolean}
 */
const setProgress = function (queue, callback) {
    if (
        !queue ||
        queue.length <= 0
    ) {
        return false;
    }

    let progress = {
        index: 0,
        max: queue.length
    };

    queue.forEach((job) => {
        job.then(() => {
            progress.index++;

            if (typeof callback === 'function') {
                callback(progress);
            }
        });
    });

    return queue;
};

exports.isBuffer = isBuffer;
exports.setProgress = setProgress;
exports.getSourceUrl = getSourceUrl;
exports.getSourceFile = getSourceFile;
