import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import  prisma  from '../../../lib/Prisma';
import { ProductGetType } from '@/types/productType';


const getHandler = async (
    _:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const resStock = await prisma.product
    .findMany()
    .then((res) => {
        return res;
    })
    .catch((err) => {
        statusCode  = 500;
        console.log(err);
        return {error:'Failed to read'};
    })
    .finally(async () => {
        await prisma.$disconnect();
    })

    res.status(statusCode).json(resStock)
};

// const putHandler = async (
//     req:NextApiRequest,res:NextApiResponse
// )=>{
//     let statusCode = 200;
//     const body:ProductGetType = req.body
//     const resStock = await prisma.product
//     .update({
//         where:{
//             pro_id:(body.id,)
//         },
//         data:{
//             body.pro_name,
//         }
//     })
//     .then((res) => {
//         return res;
//     })
//     .catch((err) => {
//         statusCode  = 500;
//         console.log(err);
//         return {error:'Failed to read'};
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     })

//     res.status(statusCode).json(resStock)
// };

const handler: NextApiHandler = (req,res) =>{
    
    switch(req.method){
        case 'GET':
            getHandler(req, res);
            break;

        default:
            return res.status(405).json({error:'Method not allowed.'});
    }
};

export default handler;