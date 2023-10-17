import { PostStockData, postStockData } from "@/lib/stock"
import { useForm, SubmitHandler } from "react-hook-form"


type Inputs = {
  pro_id: number
  stock_number: number
}


export default function OrderForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data:PostStockData) => {
    console.log("input data",data);
    const res = await postStockData(data);
    console.log(res);
  }


  console.log(watch("stock_number")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <p>商品ID　　　　発注数</p>
      <input {...register("pro_id", { required: true })} />
      {/* errors will return when field validation fails  */}
      

    
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("stock_number",{ required: true })} />


      <input type="submit" />
      <div>
      {errors.pro_id && <span>商品IDは必須です。</span>}
      {errors.stock_number && <span>発注数は必須です。</span>}
      </div>
    </form>
  )
}