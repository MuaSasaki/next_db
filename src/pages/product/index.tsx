import Head from 'next/head';
import {GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import router, { useRouter } from 'next/router';
import Layout, { siteTitle } from '@/components/layout';
import {getProductData} from "@/lib/productDetail"
import { ProductGetType } from '@/types/productType';


export  const getStaticProps = async () =>{
  const ProductData = await getProductData()
  return{props:{ProductData}}
}

const ProductDetail:NextPage =({ProductData,}:InferGetStaticPropsType<GetStaticProps>,) => {
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
            {ProductData && ProductData.map((product:ProductGetType)=>{
              return(
                <tr key ={product.id} 
                onClick={() => router.push({
                  pathname:`/product/change`,
                  query:{product:JSON.stringify(product)}
                })}>
                    <td>{product.id}</td>
                    <td>{product.pro_name}</td>
                    <td>{product.maker}</td>
                    <td>{product.category}</td>
                    <td>¥{product.price}</td>
                </tr>
              )
              })}
          </tbody>
        </table>
    </Layout>
  );
}

export default ProductDetail;