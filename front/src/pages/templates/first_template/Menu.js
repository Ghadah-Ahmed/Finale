import React from 'react'
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Sections from './Sections';
import { useLocation } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
  
export default function Menu() {
    let query = useQuery();
    const [section, setSection] = React.useState(['qq', 'ee', 'gg', 'hh', 'ff', 'kk', 'oo', 'yy'])
    return (
        <div>
            { /* ////////////////////////// NAV_SECTION ////////////////////////// */ }

            <div className="nav">
                <div className='b_menu'>
                   <svg width="16" height="16" viewBox="0 0 24 26" fill="currentColor" _css4="rotate(360deg)"><path d="M6.92 1c.255 0 .509.138.636.275l10.158 11.157c.381.413.381.964 0 1.377L7.683 24.69c-.381.413-.89.413-1.27 0-.381-.413-.381-.964 0-1.377l9.396-10.192L6.287 2.652c-.381-.413-.381-.964 0-1.378A.932.932 0 016.92 1z" fill="null" stroke="null" strokeWidth="0.25"></path></svg>
                </div>
                <div className="logo">
                    <img height='50' src="https://finedine.imgix.net/2PvyB5mz/e3366f56-9994-4763-b1bb-a614ab4bc131.png?auto=format,&fit=max&w=640&h=320&dpr=3"/>
                </div>
                <div className="b_menu">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#575962"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.59C0 4.989.488 4.5 1.09 4.5h21.82a1.09 1.09 0 110 2.182H1.09A1.09 1.09 0 010 5.59zM0 12.136c0-.602.488-1.09 1.09-1.09h21.82a1.09 1.09 0 110 2.181H1.09A1.09 1.09 0 010 12.137zM10.91 18.682c0-.603.488-1.091 1.09-1.091h10.91a1.09 1.09 0 110 2.182H12a1.09 1.09 0 01-1.09-1.091z" fill="null"></path></svg>
                </div>
            </div>

            { /* ////////////////////////// SECTIONS_SLIDER ////////////////////////// */ }

            <div className="intro">
                <p className='title'>الـفـورنـايـو </p>
                <p className='description'>نقدم قهوتنا الخاصة، مخبوزات طازجة تشمل انواع مختلفة من الكيك، المعجنات والحلويات الأخرى.</p>
            </div>

            <div dir="ltr">
            <ScrollingCarousel className='scrolling'>
                {section.map((section)=>(
                    <Sections section={section}/>
                ))}
            </ScrollingCarousel>
            </div>

            <Child section={query.get("section")} />

        </div>
    )
}

function Child({ section }) {
    return (
      <div>
        {section ? (
          <h3>
            {section}
          </h3>
        ) : (
          <h3>There is no name in the query string</h3>
        )}
      </div>
    );
  }