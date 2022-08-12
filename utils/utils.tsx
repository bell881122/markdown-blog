import fs from 'fs';
import matter from 'gray-matter';
import { defaultImage } from 'config/config';

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
  file.data.coverImage = file.data.coverImage || defaultImage;
  return file;
}

export function getMdFileData(pathArr: string[]) {
  if (!pathArr[pathArr.length - 1].endsWith(".md"))
    return null;

  const filePath = `posts/${pathArr.join("/")}`;
  const { data } = getMdFile(filePath);

  if (data.draft || !data.title)
    return null;

  const lastModifiedDate = fs.statSync(filePath).mtime;
  const lastModified = `${lastModifiedDate.getFullYear()}-${(lastModifiedDate.getMonth() + 1).toString().padStart(2, '0')}-${lastModifiedDate.getDate().toString().padStart(2, '0')}`;
  return {
    slug: pathArr,
    data,
    lastModified,
  }
}