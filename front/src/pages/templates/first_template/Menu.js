import React from 'react'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Sections from './Sections';
import { useLocation, Link, useParams } from "react-router-dom";
import Nav from './Nav';
import axios from 'axios';
import AddButton from './AddButton';
import { LanguageContext } from '../../../App'

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
  
export default function Menu() {
    let query = useQuery();
    const [sections, setSections] = React.useState([])
    const [ordersNum, setOrdersNum] = React.useState(true)
    const [title, setTitle] = React.useState('')
    let { adminId } = useParams();
    const {lang, setLang} = React.useContext(LanguageContext)


    React.useEffect(() => {
        axios.get(`http://localhost:8080/section/admin/${adminId}`)
        .then(res => {
            setSections(res.data)
        })
    },[])

    return (
        <div>
            { /* ////////////////////////// NAV_SECTION ////////////////////////// */ }
            <Nav lang={lang} ordersNum={ordersNum}/>
            { /* ////////////////////////// SECTIONS_SLIDER ////////////////////////// */ }

            <div className="intro">
                <p className='title'>الـفـريـايـدو </p>
                <p className='description'>نقدم قهوتنا الخاصة، مخبوزات طازجة تشمل انواع مختلفة من الكيك، المعجنات والحلويات الأخرى.</p>
            </div>

            <div dir="ltr">
            <ScrollingCarousel className='scrolling'>
                {sections.map((section, index)=>(
                    <Sections setTitle={setTitle} key={index} section={section}/>
                ))}
            </ScrollingCarousel>
            </div>

            <Child section={query.get("section")} title={title} setOrdersNum={setOrdersNum} ordersNum={ordersNum}/>

        </div>
    )
}

function Child({ section, ordersNum, setOrdersNum, title }) {
    const [items, setItems] = React.useState([])
    let { adminId, branchId } = useParams();
    const {lang, setLang} = React.useContext(LanguageContext)

    React.useEffect(() => {
      axios.get(`http://localhost:8080/menu/guest/${adminId}/${branchId}`)
      .then(res => {
        var newArray = res.data.filter(function (el) {
            return el.section === section // Changed this so a home would match
          });
        setItems(newArray)
      })
  },[section])


    return (
      <div>
        <h3 className='menu_title' >{title}</h3>
          <div className='items_container'>
          {items?.map((item, index) => (
              <div key={index} className='item_div'>
                 <div className={ !item.available? 'section_blur': 'none'}></div>
                  <Link to={`/menu/${adminId}/${branchId}/detail/` + item._id}>
                  <img src={item.image}/>
                  </Link>
                  <div  dir={lang === 'ar' ? 'rtl' : "ltr"} style={lang === 'ar' ? {textAlign: 'right'} : {textAlign: 'left'}}  className='item_info'>
                    <Link to={`/menu/${adminId}/${branchId}/detail/` + item._id}>
                      <p style={{fontSize: '16px', lineHeight: '30px'}} className='item_name'>{item.name[lang]}</p>
                    </Link>

                      <p style={{fontSize: '13px', lineHeight: '20px', marginBottom: '10px'}} className='item_description'>{item.description[lang]}</p>
                      <div style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center', gap: '10'}}>
                        <span style={{fontSize: '14px'}} className='item_price'>{item.price}$</span>
                        <AddButton item={item} setOrdersNum={setOrdersNum} ordersNum={ordersNum}/>
                      </div>
                  </div>
              </div>
          ))}
          </div>
      </div>
    );
  }