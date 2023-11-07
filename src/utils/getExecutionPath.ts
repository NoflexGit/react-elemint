import { dirname } from 'path';
import { fileURLToPath } from 'url';

const getExecutionPath = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  return dirname(__dirname);
};

export default getExecutionPath;
