import path from 'path';

const getTargetFolderPath = (componentName: string) => {
  return path.join(process.cwd(), componentName);
};

export default getTargetFolderPath;
