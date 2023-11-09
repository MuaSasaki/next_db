import * as yup from 'yup';
import router from "next/router";
import {postStockData } from "@/lib/stock"
import { StockPostType } from "@/types/post";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form"

type FormValues = {
  pro_id: number;
  stock_number:number;
};

const errorScheme = yup.object().shape({
  pro_id: yup.number().positive().integer().typeError("数値の入力が必要です。").required("商品IDは必須項目です。"),
  stock_number: yup.number().positive().integer().typeError("数値の入力が必要です。").required("発注数は必須項目です。")
})



export default function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver:yupResolver(errorScheme)})
  const onSubmit: SubmitHandler<StockPostType> = async (data:FormValues) => {
    console.log("input data",data);
    const res = await postStockData(data);
    console.log(res);
    router.reload()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span>商品ID</span>
        <input {...register("pro_id")} />
        <span>発注数</span>
        <input {...register("stock_number")}/>
        <input type="submit" />
        <div>
          {errors["pro_id"] && errors["pro_id"]?.message}
          {errors["stock_number"] && errors["stock_number"]?.message}
        </div>
      </form>
    </>
  )
}