import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import  prisma  from '../../../lib/Prisma';
// import { useRouter } from 'next/router';



const getHandler = async (
    _:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const resUser = await prisma.stock
    .findMany()
    .catch((err => {
        statusCode  = 500;
        console.log(err);
        return {error:'Failed to read'};
    }))
    .finally(async () => {
        await prisma.$disconnect();
    })

    res.status(statusCode).json(resUser)
};

const postHandler = async (
    _:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const resUser = await prisma.stock
    .findMany()
    .catch((err => {
        statusCode  = 500;
        console.log(err);
        return {error:'Failed to read'};
    }))
    .finally(async () => {
        await prisma.$disconnect();
    })

    res.status(statusCode).json(resUser)
};


const handler: NextApiHandler = (req,res) =>{
    // const router = useRouter();
    // const {stock_data} = router.query;
    switch(req.method){
        case 'GET':
            getHandler(req, res);
            break;

        default:
            return res.status(405).json({error:'Method not allowed.'});
    }
};

export default handler;