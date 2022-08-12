import fs from 'fs';
import matter from 'gray-matter';

type pathsArr = {
  params: {
    slug: string[];
  };
}[];

export function recurseAllPaths(path: string): pathsArr {
  const files = fs.readdirSync(path, { withFileTypes: true });
  return files.flatMap(file => {
    if (file.name.endsWith(".md")) {
      return getFilePath(path, file)
    } else {
      const currentPath = getFilePath(path, file)
      return [currentPath, ...recurseAllPaths(`${path}/${file.name}`)]
    }
  })
}

export function getFilePath(path: string, file: fs.Dirent) {
  const filepathArr = `${path}/${file.name}`.replace("posts/", "").split("/")
  return { params: { slug: [...filepathArr] } }
}

export function getMdFile(filePath: string) {
  const file = matter(fs.readFileSync(filePath, 'utf-8'));
  return file;
}