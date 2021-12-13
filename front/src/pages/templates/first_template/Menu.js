import React from 'react'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Sections from './Sections';
import { useLocation, Link, useNavigate } from "react-router-dom";
import Nav from './Nav';
import axios from 'axios';
import AddButton from './AddButton';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
  
export default function Menu() {
    let query = useQuery();
    const [sections, setSections] = React.useState([])
    const [ordersNum, setOrdersNum] = React.useState(true)

    React.useEffect(() => {
        axios.get(`http://localhost:8080/section`)
        .then(res => {
            setSections(res.data)
        })
    },[])

    return (
        <div>
            { /* ////////////////////////// NAV_SECTION ////////////////////////// */ }
            <Nav ordersNum={ordersNum}/>
            { /* ////////////////////////// SECTIONS_SLIDER ////////////////////////// */ }

            <div className="intro">
                <p className='title'>الـفـورنـايـو </p>
                <p className='description'>نقدم قهوتنا الخاصة، مخبوزات طازجة تشمل انواع مختلفة من الكيك، المعجنات والحلويات الأخرى.</p>
            </div>

            <div dir="ltr">
            <ScrollingCarousel className='scrolling'>
                {sections.map((section, index)=>(
                    <Sections key={index} section={section}/>
                ))}
            </ScrollingCarousel>
            </div>

            <Child section={query.get("section")} setOrdersNum={setOrdersNum} ordersNum={ordersNum}/>

        </div>
    )
}

function Child({ section, ordersNum, setOrdersNum }) {
    const [items, setItems] = React.useState([])

    React.useEffect(() => {
      axios.get(`http://localhost:8080/menu/section/${section}`)
      .then(res => {
        setItems(res.data)
      })
  },[section])


    return (
      <div>
          <div className='items_container'>
          {items?.map((item, index) => (
              <div key={index} className='item_div'>
                  <div className='item_info'>
                    <Link to={'/menu/id/id/detail/' + item._id}>
                      <p style={{fontSize: '16px', lineHeight: '30px'}} className='item_name'>{item.name}</p>
                    </Link>

                      <p style={{fontSize: '13px', lineHeight: '20px', marginBottom: '10px'}} className='item_description'>{item.description}</p>
                      <div style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center', gap: '10'}}>
                        <span style={{fontSize: '14px'}} className='item_price'>{item.price}$</span>
                        <AddButton item={item} setOrdersNum={setOrdersNum} ordersNum={ordersNum}/>
                      </div>
                  </div>
                  <Link to={'/menu/id/id/detail/' + item._id}>
                  <img src={item.image}/>
                  </Link>
              </div>
          ))}
          </div>
      </div>
    );
  }