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
    // return await axios.get(url)
    // .then((res) => {
    //   // const data = res.data as Stock[];
    //   const data = await res.json()
    //     return data;
    // }).catch((err)=>{console.error(err)
    // })
  }