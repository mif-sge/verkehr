'use strict';

var fs = require('fs');
var path = require('path');

class PluginCollector {

    collect(relDir) {
        return new Promise((resolve, reject) => {
            fs.readdir(relDir, (err, items) => {
                if(err) {
                    reject();
                }
                
                resolve(items.map(v => path.join(__dirname, '../', relDir, v, 'index')));
            })
        });
    }
};

module.exports = PluginCollector;