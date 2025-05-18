import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

function ItemDetails() {
  const parameters=useParams()
  var product_id=parameters.product_id
  const [details,changeDetails]=useState(null)
  const FetchData=async()=>{
    const data =new FormData()
    data.append("product_id",product_id)
    const response=await axios.post("https://amazon.indianhackerslab.com/get-product-details.php",
      data,{headers:{'Content-Type':'multipart/form-data'}})
    if(response){
      console.log(response)
      changeDetails(response.data.product_data)
    }
  }

  useEffect(()=>{
    FetchData()
  },[product_id])
  return (
    <div>
        {details?
        <>
          <div className='d-flex details-block'>
            <div className='d-flex details-centerblock'>
            <div className='details-image'>
              <img className='itemDetails-image' src={details.images} alt='img-cov'></img>
            </div>
            <div className='details-content'>
              <h4>{details.name}</h4>
              <div className='d-flex discount-details'>
                <p><b>Discount :</b></p>
                <p className='text-warning'><b>&nbsp;{details.discount}%</b></p>
              </div>
              <div className='d-flex price-details'>
              <p><b>Price </b>:&nbsp;&nbsp;<s className='text-danger'>${details.price}</s></p>
              <p className='text-success'>&nbsp;&nbsp;${details.price*(100-details.discount)/100}</p>
              </div>
              <p><b>Brand : </b>{details.brand}</p>
              <div className='backtoback'>
                <button className='btn btn-warning'>Add to cart</button>
                <a href="/electronics" className='btn btn-primary'>Back to products</a>
              </div>
            </div>
            </div>
          </div>
        </>
        :<p>no details</p>}
    </div>
  )
}

export default ItemDetails