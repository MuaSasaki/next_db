'use client';

import { GetStaticProps, InferGetStaticPropsType } from 'next';//GetStaticProps →実稼働環境のビルド時に実行され、ユーザーの操作前に（ページがリロードされた時に）自動的にレンダリング？
import { getProductData } from '@/lib/productDetail';
import { useSearchParams } from 'next/navigation';
import Layout, { siteTitle } from '@/components/layout';
import Head from 'next/head';


// export  const getStaticProps = async () =>{
//   const productId  = Number(useSearchParams());
//   const productData = await getProductData(Number(useSearchParams())
//   return{props:{productData}}
// }

const ProductDetail =({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  const productData = await getProductData(Number(useSearchParams());
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
              <tr>
                  <td>{productData.id}</td>
                  <td>{productData.pro_name}</td>
                  <td>{productData.maker}</td>
                  <td>{productData.category}</td>
                  <td>{productData.price}</td>
              </tr>
          </tbody>
        </table>
    </Layout>
  );
};

export default ProductDetail;