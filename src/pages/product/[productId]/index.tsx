import Head from 'next/head';
import {NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductGetType } from '@/types/productType';
import Layout, { siteTitle } from '@/components/layout';
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {putProductData} from "@/lib/productDetail"


type FormValues = {
  pro_name: string;
  maker:string;
  category:string;
  price:number;
};

const dataProps:ProductGetType ={
  id : 0,
  pro_name:"",
  maker:"",
  category:"",
  price:0,
}

const schema = yup.object().shape({
  pro_name: yup.string().required("商品名は必須項目です。"),
  maker: yup.string().required("メーカーは必須項目です。"),
  category: yup.string().required("カテゴリーは必須項目です。"),
  price: yup.number().positive().integer().typeError("数値の入力が必要です。").required("価格は必須項目です。"),
})

const ProductDetail:NextPage =() => {
  const [productData,setProductData] = useState<ProductGetType>(dataProps)
  const router = useRouter()

  useEffect(()=>{
    if (router.isReady) {
      const product =router.query.product;
      if (typeof product ===  "string")
      {
        // console.log("router.queryデータ→→→→→→→→",productData)
        // router.reload();
        setProductData(JSON.parse(product))
      }else return;
    };
  },[router]);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit : SubmitHandler<FormValues> = async (data:FormValues) => {
    const putData :ProductGetType= {
      id:productData.id,
      pro_name:data.pro_name,
      maker:data.maker,
      category:data.category,
      price:data.price
    }
    // const jsonPutData = JSON.stringify(putData)
    await putProductData(putData)
  }
  
  console.log(typeof productData.price)

  return(
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
          <form onSubmit={handleSubmit(onSubmit)}>
              <p>商品詳細編集</p>
        <table>
          <thead>
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
              <td>
                <input defaultValue={productData.pro_name} {...register("pro_name")}/>
                {errors["pro_name"] && errors["pro_name"]?.message}
              </td>
              <td>
                <input defaultValue={productData.maker} {...register("maker")}/>
                {errors["maker"] && errors["maker"]?.message}
                </td>
              <td>
                <input defaultValue={productData.category} {...register("category")}/>
                {errors["category"] && errors["category"]?.message}
              </td>
              <td>
                <input defaultValue={productData.price} {...register("price")}/>
                {errors["price"] && errors["price"]?.message}
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" />
        </form>
        {/* <p>{submitData.pro_name ?? submitData.pro_name}</p>
        <p>{submitData.maker ?? submitData.maker}</p>
        <p>{submitData.category ?? submitData.category}</p>
        <p>{submitData.price ?? submitData.price}</p> */}
        
    </Layout>
  );
}

export default ProductDetail;