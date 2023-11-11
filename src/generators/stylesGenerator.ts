import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

import { TEMPLATES_DIR } from '../constants/index.js';
import getExecutionPath from '../utils/getExecutionPath.js';
import BaseGenerator from './baseGenerator.js';
import writeToFile from '../utils/writeToFile.js';

interface IStylesGenerator {
  generate(): string;
}

export interface IStylesGeneratorOpts {
  folderPath: string;
  name: string;
  extension: 'css' | 'scss';
  useCssModule: boolean;
}

class StylesGenerator extends BaseGenerator implements IStylesGenerator {
  private opts: IStylesGeneratorOpts;

  constructor(opts: IStylesGeneratorOpts) {
    super();
    this.opts = opts;
  }

  generate(): string {
    return this.readAndCompileTemplate('styles.template.hbs', {
      ...this.opts,
    });
  }
}
const generateStyles = (opts: IStylesGeneratorOpts) => {
  const generator = new StylesGenerator(opts);

  const content = generator.generate();
  const hookFilePath = path.join(
    opts.folderPath,
    `${opts.name}.${opts.useCssModule ? 'module.' : ''}${opts.extension}`,
  );
  writeToFile(hookFilePath, content);
};

export default generateStyles;
