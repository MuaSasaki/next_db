import Head from 'next/head';
import {GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout, { siteTitle } from '@/components/layout';
import {getOnlyProductData, getProductData} from "@/lib/productDetail"
import { ProductGetType } from '@/types/productType';
import { useEffect, useState } from 'react';

export  const getStaticProps = async () =>{
  const ProductData = await getOnlyProductData()
  return{props:{ProductData}}
}

const ProductDetail:NextPage =({ProductData,}:InferGetStaticPropsType<GetStaticProps>,) => {
  // const [productData, setProductData] = useState<ProductGetType>({} as ProductGetType)
  // const router = useRouter()
  // const {productId} =router.query;

  // useEffect(() => {
  //   console.log("1");
  //   (async() => {
  //     console.log("2",productId,typeof productId);
  //     if(!(typeof productId === "string"))return;
  //     console.log("3");
  //     const _productData = await getProductData(productId)
  //     if(!(typeof _productData === "string"))return;
  //     console.log("_productData",_productData[0])
  //     if(!_productData) return;
  //     setProductData(_productData)
  //     // console.log("_productData",productData[0].id)
  //     console.log(_productData)
      
  //   })()
  // },[productId])

  // useEffect(() => {
  //   if(!productData) return;
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!",productData)
  //   // router.reload()
  // },[productData])
  // console.log("table in the ->",JSON.stringify(productData))
  console.log("データ",ProductData)

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
            {ProductData && ProductData.map((stock:ProductGetType)=>{
              return(
                <tr key ={stock.id} 
                // onClick={() => router.push(`/product/${stock.id}`)}
                >
                    <td>{stock.id}</td>
                    <td>{stock.pro_name}</td>
                    <td>{stock.maker}</td>
                    <td>{stock.category}</td>
                    <td>¥{stock.price}</td>
                </tr>
              )
              })}
          </tbody>
        </table>
    </Layout>
  );
}

export default ProductDetail;