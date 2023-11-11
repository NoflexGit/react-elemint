import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

import { TEMPLATES_DIR } from '../constants/index.js';
import getExecutionPath from '../utils/getExecutionPath.js';

const componentGenerator = (opts) => {
  const __dirname = getExecutionPath();
  
  const componentFilePath = path.join(
    opts.folderPath,
    `${opts.name}.${opts.extension}x`,
  );

  const componentTemplatePath = path.join(
    __dirname,
    TEMPLATES_DIR,
    'component.template.hbs',
  );

  const template = fs.readFileSync(componentTemplatePath, 'utf8');
  const templateCompile = Handlebars.compile(template);
  const content = templateCompile({ name: opts.name, css: false });

  fs.writeFileSync(componentFilePath, content, 'utf8');
};

export default componentGenerator;
