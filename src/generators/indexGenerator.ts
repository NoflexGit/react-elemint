import BaseGenerator from './baseGenerator.js';
import writeToFile from '../utils/writeToFile.js';

import path from 'path';

interface IIndexGenerator {
  generate(): string;
}

export interface IIndexGeneratorOpts {
  folderPath: string;
}

class IndexGenerator extends BaseGenerator implements IIndexGenerator {
  private opts: IIndexGeneratorOpts;

  constructor(opts: any) {
    super();
    this.opts = opts;
  }

  generate(): string {
    return this.readAndCompileTemplate('index.template.hbs', {
      ...this.opts,
    });
  }
}
const generateIndex = (opts: IIndexGeneratorOpts) => {
  const generator = new IndexGenerator(opts);

  const content = generator.generate();
  const filePath = path.join(opts.folderPath, `index.ts`);
  writeToFile(filePath, content);
};

export default generateIndex;
