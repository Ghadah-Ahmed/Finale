import React from 'react'
import { Link} from 'react-router-dom'

export default function Sections({section}) {

    const clickOnSection = (e) =>{
        var container = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('.styles-module_slider__o0fqa').children;
        for (let index = 0; index < container.length; index++) {
            const element = container[index];
            element.getElementsByTagName('hr')[0].classList.add('none')
        }
        e.target.parentElement.parentElement.getElementsByTagName('hr')[0].classList.remove('none')
    }


    return (
        <Link to={`?section=${section}`} className='menu_section' onClick={(e)=> clickOnSection(e)}>
            <div>
                <img  src='https://finedine.imgix.net/2PvyB5mz/91eaa640-eac7-4537-9b5a-1cff08b4e355.jpg?auto=format,&fit=crop&w=120&h=80&dpr=3'/>
            </div>
            <div>
                <p>بوكسات الفورنايو</p>
                <hr className='none'/> 
            </div>   
        </Link>
    )
}
