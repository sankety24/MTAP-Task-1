import "./Clothes.css"
import shoes from "./Shoesdata"
import React, { useEffect, useState } from 'react'

const Shoes = () => {
const [cloth,setClothes]=useState(shoes)
const [loading,setLoading]=useState(false)
const filterCloth = (e) => {
  const sorting = e.target.value;
  let arr = [...cloth]

  if (sorting === "low") {
    arr.sort((a,b) => a.price - b.price);
    setClothes(arr);
  }
  if(sorting==="high") {
    arr.sort((a,b) => b.price - a.price);
    setClothes(arr);
  }
  if(sorting==="asc"){
   arr.sort((function(a,b){
  if(a.title>b.title) return 1;
  if(a.title<b.title) return -1;
return 0
   }))
   setClothes(arr);
  }

   if(sorting==="dsc"){
   arr.sort((function(a,b){
  if(b.title>a.title) return 1;
  if(b.title<a.title) return -1;
return 0
   }))
   setClothes(arr);
  }
  
}
    
  return (
    <div>
        <div className='main'>
            
            <div className='product'>
              <div className='product-child1'>
                <p>Women's Shoes <span style={{fontSize:"12px",color:"grey",marginLeft:"10px"}}>{cloth.length} products</span></p>
                 <div style={{display:"flex",justifyContent:"space-evenly"}}>
                    
                    <label style={{marginTop:"5px"}}>Sort:</label>
            <select
    
          style={{
            width: "140px",
            border: "2px solid blue",
            borderRadius:"5px",
            marginLeft: "10px",
            height:"30px",
           fontSize:"12px",
          }}
               onChange={filterCloth} >
          <option value="featured">Featured</option>
                                <option value="low">Price:Low to High</option>
                                <option value="high">Price:High to Low</option>
                                <option value="asc" >A-Z</option>
                                <option value="dsc" >Z-A</option>


                    </select>
                   
                 </div>
              </div>
             
              <div className="clothData">
                {cloth.length>0 && cloth.map((data)=>(
                    <div key ={data.id} className="cloth">
                        <div className="image"> <img src={data.img1} alt=""/></div>
                        <div> <h1>{data.title}</h1></div>
                        <div><p>${data.price}</p></div>
                        {data.id%2==0?<div style={{ display: "flex",marginTop:"5px" }}> 
                          <img  width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" />
                          <img width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" /> 
                           <img  width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" />
                           <img  width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" />
                           </div>:<div style={{ display: "flex", margintop: "10px" }}>
                           <img   width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" />
                            <img  width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" />  
                            <img  width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" />
                            <img   width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" />  
                            <img  width="5%" src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg" />
                       </div>}

                        </div>
                ))}
                
              </div>

                

            </div>
        </div>
        </div>
  )
}

export default Shoes