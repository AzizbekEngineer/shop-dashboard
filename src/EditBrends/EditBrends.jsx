import { useEffect, useState } from "react"
import "./EditBrends.scss"
import {
  useUpdateBrandMutation,
} from "../../src/context/api/brandsApi";

const EditBrends = ({brend, onClose}) => {
      const [upDateBrand] = useUpdateBrandMutation();
    
    // console.log(brend);
    

    const [isForm, setIsForm] = useState({
        brandName: ""
    })


    useEffect(()=>{
        if(brend){
            setIsForm({
                brandName: brend.brandName,
            })
        }
    }, [brend])



    const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      await upDateBrand({
        id: brend.id,
        body: { brandName: isForm.brandName },
      }).unwrap();

      onClose();
    } catch (error) {
      console.error("Brand update failed:", error);
    }
  };


  return (
    <div className="editBrends">
         <form className="editBrends-forma" onSubmit={handelSubmit}>
                    <label className="editBrends-forma-label">
                      <span className="editBrends-forma-label-span">brend nomini o'zgartiring!</span>
                      <input className="editBrends-forma-label-inp" 
                      type="text"
                      required
                      name="brandName"
                      value={isForm.brandName}
                      onChange={(e)=>setIsForm({...isForm, brandName: e.target.value})}
                       />
                    </label>

                    <div className="editBrends-forma-btns">
                        <button className="editBrends-forma-btns-btn">bekor qil</button>
                        <button className="editBrends-forma-btns-btn">saqla</button>
                    </div>
                  </form>
    </div>
  )
}

export default EditBrends