import Head from 'next/head';
import {NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout, { siteTitle } from '@/components/layout';
import {getProductData} from "@/lib/productDetail"
import { ProductGetType } from '@/types/productType';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ChangeForm from '@/components/changeForm';
import { StockPostType } from '@/types/post';
import { postStockData } from '@/lib/stock';


const dataProps:ProductGetType ={
  id : 0,
  pro_name:"",
  maker:"",
  category:"",
  price:0,
}




const ProductDetail:NextPage =() => {
  
  const router = useRouter()

  const [productData,setProductData] = useState<ProductGetType>(dataProps)


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
        <div>
        </div>
    </Layout>
  );
}

export default ProductDetail;