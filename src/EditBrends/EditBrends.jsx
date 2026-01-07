import { useEffect, useState } from "react"
import "./EditBrends.scss"

const EditBrends = ({brend, onClose}) => {
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



    const handelSubmit = (e)=>{
        e.preventDefault()

        const upDateBrend = {
            ...brend,
            brandName: isForm.brandName,
        }
        // shu yerda patch qilinadi
        console.log(upDateBrend);
        


        onClose()
    }


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