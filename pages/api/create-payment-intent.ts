import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "./auth/[...nextauth]";
import { AddCartIn } from "@/app/product/AddToCartButton";
import { CartProps } from "@/app/components/Product";
import { Prisma, PrismaClient } from "@prisma/client";


const stripe = new Stripe(process.env.SECRET_KEY as string, {apiVersion: '2022-11-15'});
const prisma = new PrismaClient();

const calculateOrderAmount = (items: AddCartIn[]) => {
    const totalPrice = items?.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!
    }, 0)

    return totalPrice
}

export default async function handler(req: NextApiRequest, res : NextApiResponse){
    const userSession = await getServerSession(req,res,authOptions)
    if (!userSession?.user){
        res.status(403).json({message: 'Not logged in'})
        return
    }

    //Extract data from body 
    const { items, payment_intent_id } = req.body

    const orderData = {
        user: {connect: {id: userSession.user?.id}},
        amount: calculateOrderAmount(items),
        currency: 'usd',
        status: 'pending',
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map((item) => ({
                name: item.name,
                description: item.description || null,
                unit_amount: parseFloat(item.unit_amount),
                image: item.image,
                quantity: item.quantity
            }))
        }
    }

    // Check if payment intent exists then update the order
    if (payment_intent_id){
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
        if(current_intent){
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id,
                
                { amount: calculateOrderAmount(items) })

                //Fetch order with product ids

                const existing_order = await prisma.order.findFirst({
                    where: {paymentIntentID: updated_intent.id},
                    include: {products: true}
                })
                if(!existing_order){
                    res.status(400).json({message: "Invalid Payment Intent" })
                }

                // Update existing order


                const updated_order = await prisma.order.update({
                    where: {paymentIntentID: updated_intent.id},
                    data: {
                        amount: calculateOrderAmount(items),
                        products: {
                            deleteMany: {},
                            create: items.map((item) => ({
                                name: item.name,
                                description: item.description || null,
                                unit_amount: parseFloat(item.unit_amount),
                                image: item.image,
                                quantity: item.quantity
                            }))
                        }
                    }
                })
                res.status(200).json({paymentIntent: updated_intent})
                
                return
        }

//else create a new order
    }else{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: 'usd',
            automatic_payment_methods: {enabled: true}
        })

        orderData.paymentIntentID = paymentIntent.id
        const newOrder = await prisma.order.create({
            data: orderData
        })
        res.status(200).json({paymentIntent})

    }



    

   



}