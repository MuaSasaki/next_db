import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';//GetStaticProps →実稼働環境のビルド時に実行され、ユーザーの操作前に（ページがリロードされた時に）自動的にレンダリング？
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { StockGetType } from '@/types/get';
import { getStockData } from '../lib/stock';
import OrderForm from "../components/orderForm"


export  const getStaticProps = async () =>{
  const allStockData = await getStockData()
  return{props:{allStockData}}
}

export default function Home({allStockData,}:InferGetStaticPropsType<GetStaticProps>,) {
  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.stocks}>
        <h1>在庫一覧</h1>
        <ul>
          {allStockData && allStockData.map((stock:StockGetType)=>{
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
        <h2 className={utilStyles.headingLg}>発注フォーム</h2>
        <OrderForm/>
      </section>
    </Layout>
  );
}
