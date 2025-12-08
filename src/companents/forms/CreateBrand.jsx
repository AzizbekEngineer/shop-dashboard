import "./CreateBrand.scss"

const CreateBrand = () => {
  
  return (
    <div className='forma'>
        <form className='forma-form'>
            <label className='forma-form-label'>
                <span>nomi:</span>
                <input type="text" placeholder='nomi:' required />
            </label>
        </form>
    </div>
  )
}

export default CreateBrand