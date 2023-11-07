#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { program } from 'commander';
import getFolderPath from './utils/getTargetFolderPath.js';
import getExecutionPath from './utils/getExecutionPath.js';
import { TEMPLATES_DIR } from './constants/index.js';

const generateContent = (templatePath: string, name: string): string => {
  const template = fs.readFileSync(templatePath, 'utf8');
  return template.replace(/__COMPONENT_NAME__/g, name);
};

program
  .name('react-elemint')
  .version('0.0.1')
  .description('CLI to generate React component folders with templates')
  .option('-n, --name <name>', 'Set the component name', 'Component')
  .option('-e, --extension <type>', 'Set the file type (ts or js)', 'ts')
  .option('-c, --css <type>', 'Include CSS file (none, css, scss)', 'none')
  .parse(process.argv);

const options = program.opts();

const __dirname = getExecutionPath();

const createComponent = async () => {
  const { name, extension } = options;

  const folderPath = getFolderPath(name);

  const componentFilePath = path.join(folderPath, `${name}.${extension}x`);

  fs.ensureDirSync(folderPath);
  const componentTemplatePath = path.join(
    __dirname,
    TEMPLATES_DIR,
    'ts',
    'component.tsx',
  );

  const componentContent = generateContent(componentTemplatePath, name);

  fs.writeFileSync(componentFilePath, componentContent, 'utf8');

  const indexFilePath = path.join(folderPath, `index.ts`);
  const indexTemplatePath = path.join(__dirname, 'templates', 'ts', 'index.ts');
  const indexContent = generateContent(indexTemplatePath, name);
  fs.writeFileSync(indexFilePath, indexContent, 'utf8');

  console.log(
    chalk.green(`Component ${chalk.bold(name)} created successfully!`),
  );
};

createComponent().catch((err) => {
  console.error(err);
  process.exit(1);
});
