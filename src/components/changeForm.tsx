import {postStockData } from "@/lib/stock"
import { useForm, SubmitHandler } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { StockPostType } from "@/types/post";
import router from "next/router";
import { ProductGetType } from "@/types/productType";


const errorScheme = Yup.object().shape({
  pro_id: Yup.number().required("商品IDを入力してください。"),
  stock_number: Yup.number().required("発注数を入力してください。")
})

type Form = Yup.InferType<typeof errorScheme>;

export default function ChangeForm(product:ProductGetType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver:yupResolver(errorScheme)})
  const onSubmit: SubmitHandler<StockPostType> = async (data:Form) => {
    console.log("input data",data);
    const res = await postStockData(data);
    console.log(res);
    router.reload()
  }

  console.log("this is product data from function[changeForm]",product)
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <td>{product.id}</td>
              <td><input type="number" step="1" value = {product.pro_name} id= "pro_id"{...register("pro_id")} /></td>
              <td><input type="number" step="1" id = "stock_number"{...register("stock_number")}/></td>      
            </tr>
          </tbody>
        </table>
        <input type="submit" />
        <div>
          {errors.pro_id && <div>{errors.pro_id.message}</div>}
          {errors.stock_number && <div>{errors.stock_number.message}</div>}
        </div>
      </form>
  )
}