import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';//GetStaticProps →実稼働環境のビルド時に実行され、ユーザーの操作前に（ページがリロードされた時に）自動的にレンダリング？
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { StockGetType } from '@/types/get';
import { getStockData } from '../lib/stock';
import OrderForm from "../components/orderForm"
import router from 'next/router';


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
      {/* <section className={utilStyles.stocks}> */}
        <table>
          <thead>
            <tr>
              <th>商品在庫</th>
            </tr>
            <tr>
              <th>在庫ID</th>
              <th>在庫数</th>
              <th>商品ID</th>
            </tr>
          </thead>
          <tbody>
          {allStockData && allStockData.map((stock:StockGetType)=>{
            return(
              <tr key ={stock.id} onClick={() => router.push(`/product/`)}>
                  <td>{stock.id}</td>
                  <td>{stock.stock_num}</td>
                  <td>{stock.pro_id}</td>
              </tr>
            )
            })}
          </tbody>
        </table>
      {/* </section> */}
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}> */}
        <OrderForm/>
      {/* </section> */}
    </Layout>
  );
}
