import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [products,SetProducts] = useState([]);
  const [page,SetPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data  = await res.json();

    if(data && data.products){
      SetProducts(data.products);
    }
    // console.log(data);
  }

  console.log(products);

  useEffect(() => {
    fetchProducts();
  },[]);

  const selectPageHandler = (selectedPage) => {
    if(selectedPage>=1 && selectedPage<=products.length/10 && selectedPage!=page){
      SetPage(selectedPage);
    }
  }

  return (
    <>
    <div>
      {
      products.length>0 && <div className='products'>
        {
          products.slice(page*10-10,page*10).map((prod) => {
            return <span className='products__single' key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title}></img>
              <span>{prod.title}</span>
            </span>
          })
        }
      </div>
      }
      {
        products.length>0 && <div className='pagination'>
          <span 
          onClick={() => selectPageHandler(page-1)} 
          className={page>1 ? "":"pagination__disable"} >⬅️</span>
          {
            [...Array(products.length/10)].map((_,i) =>{
              return <span 
              className={page===i+1?"pagination__selected":""}
              onClick={() => selectPageHandler(i+1)} 
              key={i}>
                {i+1}
                </span>
            })
          }
          <span
            onClick={() => selectPageHandler(page+1)}
            className={page<products.length/10 ? "":"pagination__disable"} >➡️</span>
        </div>
      }
    </div>
    </>
  );
}

export default App;
