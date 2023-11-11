import BaseGenerator from './baseGenerator.js';
import writeToFile from '../utils/writeToFile.js';

import path from 'path';

interface IComponentGenerator {
  generate(): string;
}

export interface IComponentGeneratorOpts {
  folderPath: string;
  name: string;
  extension: 'ts' | 'js';
  useCssModule: boolean;
  cssExtension: 'css' | 'scss';
  useCss: boolean;
}

class ComponentGenerator extends BaseGenerator implements IComponentGenerator {
  private opts: IComponentGeneratorOpts;

  constructor(opts: any) {
    super();
    this.opts = opts;
  }

  generate(): string {
    return this.readAndCompileTemplate('component.template.hbs', {
      ...this.opts,
    });
  }
}
const generateComponent = (opts: IComponentGeneratorOpts) => {
  const generator = new ComponentGenerator(opts);

  const content = generator.generate();
  const hookFilePath = path.join(
    opts.folderPath,
    `${opts.name}.${opts.extension}x`,
  );
  writeToFile(hookFilePath, content);
};

export default generateComponent;
