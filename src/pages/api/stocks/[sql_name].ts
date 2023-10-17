import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import  prisma  from '../../../lib/Prisma';
import { useRouter } from 'next/router';



const getHandler = async (
    sql_name:string|string[]|undefined,req:NextApiRequest,res:NextApiResponse
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
    sql_name:string|string[]|undefined,req:NextApiRequest,res:NextApiResponse
) =>{

};


const handler: NextApiHandler = (req,res) =>{
    const router = useRouter();
    const {sql_name} = router.query;
    switch(req.method){
        case 'GET':
            getHandler(sql_name,req, res);
            break;
        case 'POST':
            postHandler(sql_name,req, res);
            break;
        default:
            return res.status(405).json({error:'Method not allowed.'});
    }
};

export default handler;