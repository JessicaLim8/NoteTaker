const fs = require('fs');
const inquirer = require('inquirer');
const fileExists = require('../util/fileExists');
const makeFile = require('../util/makeFile');
const error = require('../util/error');
const dir = `${require('os').homedir()}/.terminote/`;

module.exports = (args) => {
  let filename = args.f || args.file;
  if (!filename) {
    error('Error! Please put a -f flag in front of your filename', true);
  }
  else if (!filename.includes('.json')) {
    filename += '.json';
  }
  if (!fileExists(filename)) {
    inquirer.prompt([{
      type: 'confirm',
      name: 'response',
      message: `The file "${filename}" does not exist yet, are you sure you would like to continue?`,
      default: true,
    }]).then((answer) => {
      if (answer.response) {
        makeFile(args);
      }
      else {
        error('', true, 0);
      }
    });
  }
  fs.writeFile((dir + 'default.json'), JSON.stringify(filename), (err) => err && console.error(err));
};

