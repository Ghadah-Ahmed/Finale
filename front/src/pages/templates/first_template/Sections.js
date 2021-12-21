import React from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../../App'

export default function Sections({section, setTitle}) {
    const {lang, setLang} = React.useContext(LanguageContext)

    const clickOnSection = (e, name) =>{
        var container = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.styles-module_slider__o0fqa').children;
        for (let index = 0; index < container.length; index++) {
            const element = container[index];
            element.getElementsByTagName('hr')[0].classList.add('none')
            element.getElementsByTagName('p')[0].classList.remove('active')
            // element.getElementsByClassName('section_blur')[0].classList.remove('none')
        }
        e.target.parentElement.parentElement.getElementsByTagName('hr')[0].classList.remove('none')
        e.target.parentElement.parentElement.getElementsByTagName('p')[0].classList.add('active')
        // e.target.parentElement.parentElement.getElementsByClassName('section_blur')[0].classList.add('none')
        setTitle(name[lang])
    }


    return (
        <Link to={`?section=${section._id}`} className='menu_section' onClick={(e)=> clickOnSection(e, section.name)}>
            <div className='section_images_div'>
                <img  src={section.image}></img>
                {/* <div className='section_blur'></div> */}
                {/* <h3 style={{position: 'absolute'}} >{section.name}</h3> */}
            </div>
            <div className='mobile_title'>
                <p>{section.name[lang]}</p>
                <hr className='none'/> 
            </div>   
        </Link>
    )
}
