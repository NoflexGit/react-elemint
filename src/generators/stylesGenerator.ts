import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

import { TEMPLATES_DIR } from '../constants/index.js';
import getExecutionPath from '../utils/getExecutionPath.js';

const stylesGenerator = (opts) => {
  const __dirname = getExecutionPath();

  console.log(opts);

  const stylesFilePath = path.join(
    opts.folderPath,
    `${opts.name}.${opts.isCssModule ? 'module.' : ''}${opts.extension}`,
  );

  const componentTemplatePath = path.join(
    __dirname,
    TEMPLATES_DIR,
    'styles.template.hbs',
  );

  const template = fs.readFileSync(componentTemplatePath, 'utf8');
  const templateCompile = Handlebars.compile(template);
  const content = templateCompile({});

  fs.writeFileSync(stylesFilePath, content, 'utf8');
};

export default stylesGenerator;
