import axios from "axios";
import { ProductGetType } from "@/types/productType";


export const getProductData = async() =>{
  try{
      const url = `http://localhost:3000/api/product`;
      // const url = `http://localhost:3000/api/products/1`;
      const res = await axios.get(url);
      console.log("Res is ",res)
      const data = await res.data as ProductGetType[]
      console.log("Data Type is ", data)
      return data;
    }catch(err){
      console.error(err)
    }
  }

export const putProductData = async(putData:ProductGetType) =>{
  try{
    const url = `http://localhost:3000/api/product/${putData.id}`;
    // const url = `http://localhost:3000/api/products/1`;
    const res = await axios.put(url,putData);
    console.log("Res is ",res)
    const data = await res.data as ProductGetType[]
    console.log("Data Type is ", data)
    return data;
  }catch(err){
    console.error(err)
  }
}