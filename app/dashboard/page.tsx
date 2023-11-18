import React from 'react'
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import formatPrice from '@/utils/PriceFormat';
import Image from 'next/image';


const revalidate = 0


const fetchOrders = async() => {
const prisma = new PrismaClient()

const user = await getServerSession(authOptions)

if (!user){
    return null}

 // find all the user's orders
 const orders = await prisma.order.findMany({
  where: {
      userId: user?.user?.id
  },
  include: {
      products: true
  },
})
return orders

}



const Dashboard = async() => {
  const orders = await fetchOrders()
  if(orders === null)
    return <div>You Need To Be Logged In To View</div>
  
    if(orders.length === 0){
      return <div>No Orders Placed</div>
    }
  return (
    <div>
     
      {orders.length === 0 ?  <h1 className='text-bold'> No Orders</h1> :  
      <h1 className='text-bold'> Your Orders</h1>}

      <div>
      {orders.map((order)=>(
        <div key={order.id} className='rounded-lg p-8 my-12 bg-base-200'>
          <h2>Order Reference: {order.id}</h2>
          <p className='text-md py-2'>
            Status: {" "}
            <span className={`${
              order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
            } text-white py-1 rounded-md px-2 mx-2 text-sm`}>
              {order.status}

            </span>
          </p>
          <p className='font-medium'>
            Total: {formatPrice(order.amount)}
          </p>
          <p>Time: {new Date(order.createdDate).toString()}</p>
          <div className='flex gap-8'>
            {order.products.map((product) => (
              <div className='py-2' key={product.id} >
                <h2 className='py-2'>{product.name}</h2>
                <div>
                  <Image src={product.image!} alt={product.name}
                   width={36} height={36}/>
                   <p>{formatPrice(product.unit_amount)}</p>
                   <p>Quantity: {product.quantity}</p>
                </div>

              </div>
            ))}

          </div>

        </div>
      ))}
      </div>

    </div>
  )
}

export default Dashboard