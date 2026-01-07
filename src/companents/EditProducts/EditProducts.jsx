import "./EditProducts.scss"
import { useState, useEffect } from "react";




const EditProducts = ({product, onClose}) => {

  const [form, setForm] = useState({
    productName: "",
    productRang: "",
    comingPrice: "",
    currentAmount: "",
    camingItogo: "",
    sana: new Date().toISOString(),
  })

  useEffect(()=> {
    if(product){
      setForm({
        productName: product.productName,
        productRang: product.productRang,
        comingPrice: product.comingPrice,
        currentAmount: product.currentAmount,
        camingItogo: product.camingItogo,
        sana: product.sana,
        sizes: product.sizes.map((s)=>({
          size: s.size,
          count: s.count,
        }))
      })
    }
  }, [product])


  const handelChange = (e)=>{
    const {name, value} = e.target
    setForm((prev) => ({...prev, [name]: value}))
  }


 


  const handleEditSizeChange = (sizeName, value)=>{
    setForm((prev)=> ({
      ...prev,
      sizes: prev.sizes.map((s)=>s.size === sizeName
      ? {...s, count: Number(value)}
      : s )
    }))
  }


  const editTotalAmount = form.sizes?.reduce((acc, item)=> acc + (item.count || 0), 0)

  const editTotalItogo = Number(form.comingPrice || 0) * editTotalAmount



   const handelSubmit = (e)=> {
    e.preventDefault()
    const updateProduct = {
      ...product,
      ...form,
      comingPrice: Number(form.comingPrice),
      currentAmount: editTotalAmount,
      camingItogo: editTotalItogo
    }
    // shu yerda patch qilinadi
    console.log(updateProduct);
    
    onClose()
  }


  
  return (
    <div className="editProduct">
      <div className="editProduct-editOverLay">

        <form className="editProduct-editOverLay-editForm"
        onSubmit={handelSubmit}
        >


        <label className="editProduct-editOverLay-editForm-label">
          <span className="editProduct-editOverLay-editForm-label-span">nomi:</span>
          <input className="editProduct-editOverLay-editForm-label-inp" 
          type="text"
          name="productName"
          value={form.productName}
          onChange={handelChange}
          />
        </label>

        <label className="editProduct-editOverLay-editForm-label">
          <span className="editProduct-editOverLay-editForm-label-span">rangi:</span>
          <input className="editProduct-editOverLay-editForm-label-inp" 
          type="text"
          name="productRang"
          value={form.productRang}
          onChange={handelChange}
          />
        </label>



        <label className="editProduct-editOverLay-editForm-label">
          <span className="editProduct-editOverLay-editForm-label-span">narxi:</span>
          <input className="editProduct-editOverLay-editForm-label-inp" 
          type="number"
          name="comingPrice"
          value={form.comingPrice}
          onChange={handelChange}
          />
        </label>


        <div className="editSizes">
          {form.sizes?.map((s)=>(
            <div key={s.size} className="editSizes-editSize">
              <span className="editSizes-editSize-span">{s.size}</span>
              <input className="editSizes-editSize-inp"
              type="number"
              value={s.count}
              onChange={(e)=>{
                handleEditSizeChange(s.size, e.target.value)
              }} />
            </div>
          ))}
        </div>



          <button className="editProduct-editOverLay-editForm-btn" type="submit">saqlash</button>



      </form>
      </div>
    </div>
  )
}

export default EditProducts