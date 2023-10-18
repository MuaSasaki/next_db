import axios from "axios";

type ProductGetType = {
    id:number,
    pro_name:string,
    maker:string,
    category:string,
    price:number
}
export async function getProductData(productId:number) {
    try{
        const url = `http://localhost:3000/api/products/${productId}`;
        const res = await axios.get(url);
        const data = await res.data as ProductGetType;
        return data;
      }catch(err){
        console.error(err)
      }
    }