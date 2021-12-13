import React from 'react'
import { Link } from 'react-router-dom'

export default function Sections({section}) {

    const clickOnSection = (e) =>{
        var container = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.styles-module_slider__o0fqa').children;
        for (let index = 0; index < container.length; index++) {
            const element = container[index];
            element.getElementsByTagName('hr')[0].classList.add('none')
            element.getElementsByTagName('p')[0].classList.remove('active')

        }
        e.target.parentElement.parentElement.getElementsByTagName('hr')[0].classList.remove('none')
        e.target.parentElement.parentElement.getElementsByTagName('p')[0].classList.add('active')

    }


    return (
        <Link to={`?section=${section._id}`} className='menu_section' onClick={(e)=> clickOnSection(e)}>
            <div>
                <img  src={section.image}/>
            </div>
            <div>
                <p>{section.name}</p>
                <hr className='none'/> 
            </div>   
        </Link>
    )
}
