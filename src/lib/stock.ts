import axios from 'axios';
import { StockGetType } from '@/types/get';
import { StockPostType } from '@/types/post';

export async function getStockData() {
  try{
      const url = "http://localhost:3000/api/stocks";
      const res = await axios.get(url);
      const data = await res.data as StockGetType[];
      return data;
    }catch(err){
      console.error(err)
    }
  }

export async function postStockData(postData:StockPostType){
  try{
    const url = "http://localhost:3000/api/stocks";
    const data = postData;
    const res = await axios.post(url,data);
    return res.data;
  }catch(err){
    console.error(err)
  }
}