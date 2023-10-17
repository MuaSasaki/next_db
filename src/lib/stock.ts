import { Stock } from '@/pages';
import axios from 'axios';

export async function getStockData() {
  try{
      const url = "http://localhost:3000/api/stocks";
      const res = await axios.get(url);
      const data = await res.data as Stock[];
      return data;
    }catch(err){
      console.error(err)
    }
  }

 export type PostStockData = {
  stock_number:number,
  pro_id:number
 } 
export async function postStockData(postData:PostStockData){
  try{
    const url = "http://localhost:3000/api/stocks";
    const data = postData;
    const res = await axios.post(url,data);
    return res.data;
  }catch(err){
    console.error(err)
  }
}