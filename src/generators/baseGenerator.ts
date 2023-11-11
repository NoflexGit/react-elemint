import path from 'path';
import { TEMPLATES_DIR } from '../constants/index.js';
import getExecutionPath from '../utils/getExecutionPath.js';
import Handlebars from 'handlebars';
import fs from 'fs';

class BaseGenerator {
  protected readAndCompileTemplate(templateName: string, data: any): string {
    const __dirname = getExecutionPath();
    const templatePath = path.join(__dirname, TEMPLATES_DIR, templateName);
    const template = fs.readFileSync(templatePath, 'utf8');
    const templateCompile = Handlebars.compile(template);
    return templateCompile(data);
  }
}

export default BaseGenerator;
