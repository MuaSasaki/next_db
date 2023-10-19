import axios from "axios";
import { ProductGetType } from "@/types/productType";

export const getProductData = async(productId:string) =>{
    try{
        const url = `http://localhost:3000/api/products/${productId}`;
        // const url = `http://localhost:3000/api/products/1`;
        const res = await axios.get(url);
        console.log("Res is ",res)
        const data = await res.data as ProductGetType[]
        console.log("Data Type is ",typeof data)
        return data;
      }catch(err){
        console.error(err)
      }
    }

