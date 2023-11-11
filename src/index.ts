#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';
import { program } from 'commander';
import getFolderPath from './utils/getTargetFolderPath.js';
import getExecutionPath from './utils/getExecutionPath.js';
import generateComponent from './generators/componentGenerator.js';
import generateIndex from './generators/indexGenerator.js';
import generateStyles from './generators/stylesGenerator.js';
import './utils/handlebarsHelpers.js';

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

  const useCss = css !== 'none';

  generateComponent({
    folderPath,
    name,
    extension,
    useCssModule: cssModules,
    cssExtension: css,
    useCss,
  });

  if (useCss) {
    generateStyles({
      folderPath,
      name,
      extension: css,
      useCssModule: cssModules,
    });
  }

  generateIndex({
    folderPath,
  });

  console.log(
    chalk.green(`Component ${chalk.bold(name)} created successfully!`),
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
