import axios from "axios";
import { ProductGetType } from "@/types/productType";

export const getProductData = async(productId:string) =>{
    try{
        const url = `http://localhost:3000/api/products/${productId}`;
        // const url = `http://localhost:3000/api/products/1`;
        const res = await axios.get(url);
        const data = await res.data as ProductGetType;
        console.log("Data is ",data)
        return data;
      }catch(err){
        console.error(err)
      }
    }