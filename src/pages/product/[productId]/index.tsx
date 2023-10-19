import Head from 'next/head';
import {NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout, { siteTitle } from '@/components/layout';
import {getProductData} from "@/lib/productDetail"
import { ProductGetType } from '@/types/productType';
import { useEffect, useState } from 'react';


const ProductDetail:NextPage =() => {
  const [productData, setProductData] = useState<ProductGetType>({} as ProductGetType)
  const router = useRouter()
  const {productId} =router.query;

  useEffect(() => {
    console.log("1");
    (async() => {
      console.log("2",productId,typeof productId);
      if(!(typeof productId === "string"))return;
      console.log("3");
      const _productData = await getProductData(productId)
      console.log("_productData",_productData)
      if(!_productData) return;
      setProductData(_productData)
      console.log("productData!!!!!!",_productData)
    })()
  },[productId])

  useEffect(() => {
    if(!productData) return;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!",productData)
  },[productData])
  console.log("table in the ->",productData)

  return(
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <section className={utilStyles.stocks}> */}
        <table>
          <thead>
            <tr>
              <th>商品詳細</th>
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
                <td>{String(productData)}</td>
                <td>{String(productData.pro_name)}</td>
                <td>{String(productData.maker)}</td>
                <td>{String(productData.category)}</td>
                <td>{String(productData.price)}</td>
              </tr>
          </tbody>
        </table>
    </Layout>
  );
}

export default ProductDetail;