#!/usr/bin/env node

const { exec, execSync } = require('child_process');
const fs = require('fs');
const { prompt } = require('inquirer');
const path = require('path');
const chalk = require('chalk');

const boilerPlate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="./style.css"/>
  <title>BurakBey</title>
</head>
<body>
  <script src="./script.js"></script>
</body>
</html>`;

prompt([
  {
    type: 'list',
    name: 'theme',
    message: 'Hello boss, what do you want to work on today?',
    choices: ['Old School Html/Css/JS', "Let's create a React app"],
  },
]).then((answer) => {
  if (answer.theme.startsWith('O')) {
    prompt([
      {
        type: 'input',
        name: 'projectPath',
        message: 'Okay boss, can you specify a location for your project?',
        default: '/home/burak/Desktop',
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of the project?',
      },
    ]).then((answer) => {
      createdPath = path.join(answer.projectPath, answer.projectName);
      fs.mkdirSync(createdPath);
      fs.writeFileSync(path.join(createdPath, 'index.html'), boilerPlate);
      fs.writeFileSync(path.join(createdPath, 'style.css'), '');
      fs.writeFileSync(path.join(createdPath, 'script.js'), '');
      console.log(chalk.green.bold.inverse('Project Folder Created...'));
      exec(`code ${createdPath}`);
    });
  } else if (answer.theme.startsWith('L')) {
    prompt([
      {
        type: 'input',
        name: 'projectPath',
        message: 'Okay boss, can you specify a location for your project?',
        default: '/home/burak/Desktop',
      },
      {
        type: 'input',
        name: 'reactAppName',
        message: 'What is the name of the project',
      },
    ]).then((answer) => {
      console.log(chalk.blue.bold('this process may take a while...'));
      execSync(
        `cd ${answer.projectPath}; npx create-react-app ${answer.reactAppName}`
      );
      console.log(chalk.green.bold.inverse('React App Created...'));
      execSync(`code ${answer.projectPath}/${answer.reactAppName}`);
    });
  }
});
