import {postStockData } from "@/lib/stock"
import { useForm, SubmitHandler } from "react-hook-form"
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { StockPostType } from "@/types/post";
import router from "next/router";


const errorScheme = Yup.object().shape({
  pro_id: Yup.number().required("商品IDを入力してください。"),
  stock_number: Yup.number().required("発注数を入力してください。")
})

type Form = Yup.InferType<typeof errorScheme>;

export default function OrderForm() {
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span>商品ID</span>
        <input type="number" step="1" id = "pro_id"{...register("pro_id")} />
        <span>発注数</span>
        <input type="number" step="1" id = "stock_number"{...register("stock_number")}/>
        <input type="submit" />
      </form>
      <div>
        {errors.pro_id && <div>{errors.pro_id.message}</div>}
        {errors.stock_number && <div>{errors.stock_number.message}</div>}
      </div>
    </>
  )
}