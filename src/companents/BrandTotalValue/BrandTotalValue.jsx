import { useGetBrandsQuery } from "../../context/api/brandsApi";
import "./BrandTotalValue.scss"


const BrandTotalValue = ({brend}) => {
    const {data: products} = useGetBrandsQuery()
    
    const filterProducts = products.filter((p) => p.category?.id == brend.id)
    console.log(filterProducts);
    
  return (
    <div >
        {/* <p>{filterProducts.count}</p> */}
    </div>
  )
}

export default BrandTotalValue