import fs from 'fs';
import matter from 'gray-matter';
import { defaultImage } from 'config/config';

type pathsArr = {
  params: {
    slug: string[];
  };
}[];

export function getAllPaths(path: string, recurse: boolean = true): pathsArr {
  const files = fs.readdirSync(path, { withFileTypes: true });
  return files.flatMap(file => {
    if (!recurse) return getFilePath(path, file);
    else {
      if (checkIsMd(file.name)) {
        return getFilePath(path, file)
      } else {
        const currentPath = getFilePath(path, file)
        return [currentPath, ...getAllPaths(`${path}/${file.name}`)]
      }
    }
  })
}

export function getFilePath(path: string, file: fs.Dirent) {
  const filepathArr = `${path}/${file.name}`.replace("posts/", "").split("/")
  return { params: { slug: [...filepathArr] } }
}

export function getMdFile(filePath: string) {
  const file = matter(fs.readFileSync(filePath, 'utf-8'));
  const dir = filePath.split("/")
  if (!file.data.title || file.data.title === "Title") {
    file.data.title = (dir[dir.length - 1]).replace(".md", "");
  }
  const dir1 = dir[1] as keyof typeof defaultImage;
  const defaultImageDir1 = defaultImage[dir1];
  const dir2 = dir[2] as keyof typeof defaultImageDir1;
  const imgUrl = defaultImage[dir1] && (defaultImage[dir1][dir2] || defaultImage[dir1].default) || defaultImage.common.default;
  file.data.coverImage = file.data.coverImage || imgUrl;
  return file;
}

export function getMdFileData(pathArr: string[]) {
  if (!checkIsMd(pathArr[pathArr.length - 1]))
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

export function getRecurseMdFileData(rootPath: string) {
  return getAllPaths(rootPath)
    .map(x => getMdFileData(x.params.slug))
    .filter(post => post);
}

export function checkIsMd(str: string) {
  return str.endsWith(".md")
}

export function checkIsNotDraft(mdPath: string) {
  const { data: { draft, title } } = getMdFile(mdPath);
  return (!draft && title)
}