import type { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '../../../lib/Prisma';
import {NextRequest, NextResponse } from 'next/server';

export  const GET = async () => {
    const stocks = await getAllStocks();
    return NextResponse.json(stocks);
}

export const POST = async(request:NextRequest) => {
    const {stock_num} = await request.json();

    await prisma.stock.create({
        data:{
            stock_num:stock_num,
        },
    });

    const stocks = await getAllStocks();
    return NextResponse.json(stocks);
}

export const DELETE =async  (request:NextRequest) => {
    const id = parseInt(request.nextUrl.searchParams.get('id')!);
    
    await prisma.stock.delete({
        where: {
            id:id,
        },
    });


    const stocks = await getAllStocks();
    return NextResponse.json(stocks);
}

const getAllStocks = async() =>{
    const stocks = await prisma.stock.findMany();
    return stocks;
}




