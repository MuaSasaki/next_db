import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getStockData } from '../lib/stock';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps } from 'next';//GetStaticProps →実稼働環境のビルド時に実行され、ユーザーの操作前に（ページがリロードされた時に）自動的にレンダリング？




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
  stock_num:string
  pro_id:number
}

type StockInfo = {
  stocks:Stock[]
}




export const getStaticProps: GetStaticProps = async () => {//ページできたときに実行される？？
  const allStockData = await getStockData();
  console.log("allStockdata",allStockData);
  // const allStockData = [ { id: 1, stock_num: 25, pro_id: 1 } ];
  return {
    props: {
      allStockData,
    },
  };
};

export default function Home(allStockData:Stock[]) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.stocks}>
        <h1>在庫一覧</h1>
        <ul>
              <li key ={allStockData[0].id}>
                <p>在庫ID:{allStockData[0].id}</p>
                <p>在庫数:{allStockData[0].stock_num}</p>
                <p>商品ID:{allStockData[0].pro_id}</p>
              </li>
          
          {/* {allStockData.map((stock)=>{
            return(
              <li key ={stock.id}>
                <p>在庫ID:{stock.id}</p>
                <p>在庫数:{stock.stock_num}</p>
                <p>商品ID:{stock.pro_id}</p>
              </li>
            )
          })} */}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
      </section>
    </Layout>
  );
}
