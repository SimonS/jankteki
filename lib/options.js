function loadOptions () {
    return new Promise(function (resolve, reject) {
        // TODO - don't query storage on every mutate. Cache internally?
        chrome.storage.sync.get(['options'], function (items) {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            resolve(items['options']);
        });
    });
}

var options = {
    loadOptions: loadOptions
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = options;
}
