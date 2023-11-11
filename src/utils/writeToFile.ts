import fs from 'fs';

const writeToFile = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content, 'utf8');
};

export default writeToFile;
