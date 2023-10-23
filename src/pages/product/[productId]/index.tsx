import Head from 'next/head';
import {NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductGetType } from '@/types/productType';
import Layout, { siteTitle } from '@/components/layout';


const dataProps:ProductGetType ={
  id : 0,
  pro_name:"",
  maker:"",
  category:"",
  price:0,
}

const ProductDetail:NextPage =() => {
  const [productData,setProductData] = useState<ProductGetType>(dataProps)
  const router = useRouter()

  useEffect(()=>{
    if (router.isReady) {
      const product =router.query.product;
      if (typeof product ===  "string")
      {
      setProductData(JSON.parse(product))
      console.log("router.queryデータ→→→→→→→→",productData)
      }else return;
    };
  },[router]);

  return(
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <table>
          <thead>
            <tr>
              <th>商品詳細編集</th>
            </tr>
            <tr>
              <th>商品ID</th>
              <th>商品名</th>
              <th>メーカー</th>
              <th>カテゴリー</th>
              <th>価格</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productData.id}</td>
            </tr>
          </tbody>
        </table>
        <input type="submit" />
    </Layout>
  );
}

export default ProductDetail;