#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { program } from 'commander';
import getFolderPath from './utils/getTargetFolderPath.js';
import getExecutionPath from './utils/getExecutionPath.js';
import componentGenerator from './generators/componentGenerator.js';
import stylesGenerator from './generators/stylesGenerator.js';
import Handlebars from 'handlebars';

const generateContent = (templatePath: string, name: string): string => {
  const template = fs.readFileSync(templatePath, 'utf8');
  const templateCompile = Handlebars.compile(template);
  return templateCompile({ name, css: false });
};

program
  .name('react-elemint')
  .version('0.0.1')
  .description('CLI to generate React component folders with templates')
  .option('-n, --name <name>', 'Set the component name', 'Component')
  .option('-e, --extension <type>', 'Set the file type (ts or js)', 'ts')
  .option('-s, --styles <type>', 'Include CSS file (none, css, scss)', 'none')
  .option('-sm, --style_modules', 'Use CSS-modules')
  .parse(process.argv);

const options = program.opts();

const __dirname = getExecutionPath();

const main = async () => {
  const { name, extension, styles: css, style_modules: cssModules } = options;

  const folderPath = getFolderPath(name);

  fs.ensureDirSync(folderPath);

  componentGenerator({
    folderPath,
    name,
    extension,
    isCssModule: cssModules,
    cssExtension: css,
    css: css !== 'none',
  });

  if (css !== 'none') {
    stylesGenerator({
      folderPath,
      name,
      extension: css,
      isCssModule: cssModules,
    });
  }

  const indexFilePath = path.join(folderPath, `index.ts`);
  const indexTemplatePath = path.join(
    __dirname,
    'templates',
    'index.template.hbs',
  );
  const indexContent = generateContent(indexTemplatePath, name);
  fs.writeFileSync(indexFilePath, indexContent, 'utf8');

  console.log(
    chalk.green(`Component ${chalk.bold(name)} created successfully!`),
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
