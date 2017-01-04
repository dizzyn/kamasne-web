
var markdown = function(name) {
    var ghm = require("github-flavored-markdown")
    var fs = require('fs');

    var templateFile = fs.readFileSync('./_templates/' + name + '.markdown').toString();
    return ghm.parse(templateFile, "isaacs/npm");
};

var underscore = function(template, data) {
    var _ = require('underscore');
    return _.template(template)(data);
};

module.exports.underscoreTemplate = function(templateFileName, outputFileName, templateData) {
    var fs = require('fs');

    var templateFile = fs.readFileSync(templateFileName).toString();

    templateData.controller = {
        markdown: function(name) {
            return markdown(site, name);
        },
        fsPath: function(scope, folder, file) {
            return generateFSPath(site, scope, folder, file);
        },
        include: function(scope, name) {
            var templateFile = fs.readFileSync('./_templates/' + name + '.us').toString();
            return underscore(templateFile, templateData);
        }
    };

    fs.writeFileSync(outputFileName, underscore(templateFile, templateData));
};
