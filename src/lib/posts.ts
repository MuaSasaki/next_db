//このページはMDを扱うために作成（チュートリアルでは解説なし。）
import fs from 'fs';//ファイルシステムからファイルを読み取れるNode.jsモジュール
import path from 'path';//ファイルパスを操作できる
import matter from 'gray-matter';//マークダウンのメタデータ解析
import { remark } from 'remark';
import html from 'remark-html';
import axios from 'axios';
import { af } from 'date-fns/locale';

const postsDirectory = path.join(process.cwd(), 'posts');

/*
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)
const API_TEST =() =>{

  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
*/

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
type ResolveRes = {
  id:string,
  date:string,
  title:string,
  contentHtml:any
}
export async function getPostData2(id: string) {
  const url = `/api/posts/${id}`;
  const data = {a:"b"}
  await axios.post(url,data)
  .then((res) => {
    const status = res.status;
    const data = res.data;
    if(status === 200){
      return data;
    }else {
      return data;
    }
  }).cathch((err)=>{
    console.error(err)
  })

//   let res ={} as ResolveRes | RejectRes
//   const url = `/api/posts/${id}`;
//   fetch(url).then((res)=>{
//     res = {
//       id:"a",date:"b",title:"c",contentHtml:"d"
//     }as ResolveRes
//   }).catch((err) => {console.error(err)
//   res = {} as RejectRes})

//   return res;
//   // Combine the data with the id and contentHtml
//   return {
//     id,
//     contentHtml,
//     ...(matterResult.data as { date: string; title: string }),
//   };
// }