'use strict';

var fs = require('fs');
var path = require('path');

/**
 * A class containing a mechanism to collect all plugins for dynamic loading.
 */
class PluginCollector {

    /**
     * Collects all plugins found in a directory relative to the root directory.
     * @param {string} relDir Path of the relative directory.
     * @returns {Promise<string>} A promise to all plugin registration files.
     */
    collect(relDir) {
        return new Promise((resolve, reject) => {

            // Reads the given relative directory path.
            fs.readdir(relDir, (err, items) => {
                if(err) {
                    reject();
                }
                
                // Maps all directory names to paths relative to the root directory.
                resolve(items.map(v => path.join(__dirname, '../', relDir, v, 'index')));
            })
        });
    }
};

module.exports = PluginCollector;