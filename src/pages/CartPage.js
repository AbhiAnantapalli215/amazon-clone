import React,{useEffect, useState} from 'react'
import Rating from '@mui/material/Rating'
import axios from 'axios'

function CartPage() {
    if(localStorage.getItem("user_id")==='null'){
        window.location.replace("/login")
    }
    const user_id=localStorage.getItem("user_id")
    const [items,changeProducts]=useState(null)
    const [total_amount,addAmount]=useState(0)
    const FetchData=async ()=>{
        const data=new FormData()
        data.append("user_id",user_id)
        const response=await axios.post("https://amazon.indianhackerslab.com/get-carts.php",data,{headers:{'Content-Type':'multipart/form-data'}})
        if(response){
            console.log(response.data)
            changeProducts(response.data.data)
            addAmount(response.data.total_amount)
        }
    }

    const Removedata =async(cart_id) =>{

        const data=new FormData()
        data.append('cart_id',cart_id)
       
        const Response=await axios.post("https://amazon.indianhackerslab.com/delete-cart.php",data,{headers:{"Content-Type":"multipart/form-data"}})
        window.location.replace('/cart')
        if(Response){
            console.log(Response)
        }
    }

    useEffect(()=>{
        FetchData()
    },[user_id])
  return (
    
    <div className='cartpage'>
        <div className='outer-outer-bag'>
        <div className='Outerbag'>
        <h3 className='header-cartpage'>Shopping cart</h3>  
        {items?items.map((item)=>(
                <div className='bag'>
                <div className='cover-div'>
                    <img src={item.images} className="cover" alt='cover-image'></img>
                </div>
                <div className='content-div'>
                    <h5 className='lines-2'>{item.name}</h5>
                    <h6>{item.desciption}</h6>
                    <div className='d-flex price-tag'>
                        <p>${item.price}</p>
                        <p><s>${item.cutoff_price}</s></p>
                        <p className='text-danger'>{item.discount}% OFF</p>
                    </div>
                    <Rating readOnly defaultValue={item.rating} precision={0.5} />
                    <p><small>Delivery by 16 Mar 2025</small></p>
                    <div className='buynowdiscard'>
                        <button className='btn btn-warning'>Buy now</button>
                        <button onClick={() => Removedata(item.cart_id)} className='btn btn-danger'>Discard</button>
                    </div>
                </div>
            </div>
        )):<div> <p><b>No items in cart</b></p> </div>}
        </div>
        <div className='final-price-bag'>
            {items?items.map((item)=>(
                <div className='list-brand'>
                    <div className='list-brand-title'>
                        <h5><small>{item.brand}</small></h5>
                        <p className='lines-1'><small>{item.name}</small></p>
                    </div>
                    <p className='list-brand-price'>${item.price}</p>
                </div>
            )):<div><></></div>}
            <div className='w-100 sub-total'>
                <hr></hr>
                <div className='sub-total-price'>
                    <h5>Subtotal : </h5>
                    <h5><b>${total_amount}</b></h5>
                </div>
                <button className='btn btn-warning w-100 rounded-4'>Proceed to buy</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CartPage
