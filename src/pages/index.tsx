import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getStockData } from '../lib/stock';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps, InferGetStaticPropsType } from 'next';//GetStaticProps →実稼働環境のビルド時に実行され、ユーザーの操作前に（ページがリロードされた時に）自動的にレンダリング？
import axios from 'axios';




// export const getStaticProps: GetStaticProps = async () => {//ページできたときに実行される？？
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// };
export type Stock = {
  id:number
  stock_num:number
  pro_id:number
}


type Props =  {
  allStockData :Stock[]
}




// export const getStaticProps: GetStaticProps = async () => {//ページできたときに実行される？？
//   const allStockData = await getStockData();
//   // const allStockData = [{ id: 2, stock_num: 30, pro_id: 2 }];
//   console.log("allStockdata",allStockData);
//   // const allStockData = [ { id: 1, stock_num: 25, pro_id: 1 } ];
  
//   return {
//     props: {
//       allStockData
//     },
//   };
// };

export  const getStaticProps = async () =>{
  // const res = await fetch("http://localhost:3000/api/stocks")
  // const allStockData = await res.json()
  // const url = "http://localhost:3000/api/stocks";
  // const res = axios.get(url)
  // const allStockData:Stock[] = (await res).data;
  const allStockData = await getStockData()
  return{props:{allStockData}}
}

// export default function Home({allStockData,}:InferGetStaticPropsType<typeof getStaticProps>) {
export default function Home({allStockData}:Props) {
  // if (typeof allStockData[0] !== "undefined")
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.stocks}>
        <h1>在庫一覧</h1>
        <ul>
          {allStockData && allStockData.map((stock)=>{
            return(
              <li key ={stock.id}>
                <p>在庫ID:{stock.id}</p>
                <p>在庫数:{stock.stock_num}</p>
                <p>商品ID:{stock.pro_id}</p>
              </li>
            )
          })}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
      </section>
    </Layout>
  );
}
