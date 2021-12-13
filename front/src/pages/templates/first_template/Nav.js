import React from 'react'
import { useNavigate } from "react-router-dom";
import cartSvg from '../../../images/cart.svg'
import Badge from '@material-ui/core/Badge';

export default function Nav({ordersNum}) {
    const navigate = useNavigate()
    const [modal, setModal] = React.useState(false)
    const [count, setCount] = React.useState(localStorage.length);

    React.useEffect(() => {
        modal ? document.body.classList.add("body_stop_scroll"): document.body.classList.remove("body_stop_scroll")
    }, [modal]);

    React.useEffect(() => {
        setCount(localStorage.length)
    }, [ordersNum]);


    return (
        <div>
            
            <div className="nav">
                <div className='cart' onClick={()=> navigate('/cart')}>
                    <Badge color="secondary" badgeContent={count} ></Badge>
                    <img src={cartSvg}/>
                </div>
                <div className='b_menu' onClick={()=> navigate('/menu/id/id')}>
                   <svg width="16" height="16" viewBox="0 0 24 26" fill="currentColor" _css4="rotate(360deg)"><path d="M6.92 1c.255 0 .509.138.636.275l10.158 11.157c.381.413.381.964 0 1.377L7.683 24.69c-.381.413-.89.413-1.27 0-.381-.413-.381-.964 0-1.377l9.396-10.192L6.287 2.652c-.381-.413-.381-.964 0-1.378A.932.932 0 016.92 1z" fill="null" stroke="null" strokeWidth="0.25"></path></svg>
                </div>
                <div className="logo">
                    <img height='50' src="https://finedine.imgix.net/2PvyB5mz/e3366f56-9994-4763-b1bb-a614ab4bc131.png?auto=format,&fit=max&w=640&h=320&dpr=3"/>
                </div>
                <div className="b_menu" onClick={()=> setModal(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#575962"><path fillRule="evenodd" clipRule="evenodd" d="M0 5.59C0 4.989.488 4.5 1.09 4.5h21.82a1.09 1.09 0 110 2.182H1.09A1.09 1.09 0 010 5.59zM0 12.136c0-.602.488-1.09 1.09-1.09h21.82a1.09 1.09 0 110 2.181H1.09A1.09 1.09 0 010 12.137zM10.91 18.682c0-.603.488-1.091 1.09-1.091h10.91a1.09 1.09 0 110 2.182H12a1.09 1.09 0 01-1.09-1.091z" fill="null"></path></svg>
                </div>
            </div>

            <div className={ modal? 'slide_nav' : 'slide_nav none'}>
                <div style={{float:'left'}} className="b_menu" onClick={()=> setModal(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#575962"><g clipPath="url(#icon-close_svg__clip0)" fill="null"><path d="M1.24 24a1.235 1.235 0 01-.872-2.108L21.898.362a1.235 1.235 0 111.746 1.746l-21.53 21.53c-.242.24-.558.362-.874.362z"></path><path d="M22.771 24c-.316 0-.631-.12-.872-.362L.368 2.108A1.235 1.235 0 012.114.362l21.53 21.53A1.235 1.235 0 0122.772 24z"></path></g><defs><clipPath id="icon-close_svg__clip0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg> 
                </div>

                <div className='languages_div'>
                    <p>اللغة <span>(AR)</span></p>
                    <p>اللغة <span>(EN)</span></p>

                    <hr/>
                </div>

                <div className='contact_div'>
                    {/* <a href="tel:+966555720204"> */}
                    <a href="tel:+966555">
                    <button>
                        <div>
                            <span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.982 17.25l-4.292-2.785a2.221 2.221 0 00-3.093.667l-.568.89c-1.004-.347-2.596-1.115-4.266-2.785-1.67-1.67-2.44-3.261-2.786-4.265l.89-.568a2.21 2.21 0 00.98-1.412 2.198 2.198 0 00-.311-1.677L6.75 1.02A2.225 2.225 0 003.68.35l-1.046.667a4.485 4.485 0 00-1.157 1.08C-1.515 6.3.163 13.404 5.38 18.62 8.748 21.988 13.053 24 16.893 24c1.919 0 3.653-.512 5.014-1.48l.032-.025a4.5 4.5 0 001.054-1.141l.663-1.037a2.237 2.237 0 00-.674-3.067zm-.423 2.37l-.654 1.025a3.183 3.183 0 01-.774.833c-1.137.8-2.6 1.223-4.237 1.223-3.505 0-7.465-1.87-10.597-5C1.534 12.94-.086 6.571 2.52 2.872a3.154 3.154 0 01.824-.768l1.035-.66a.951.951 0 011.282.283l2.788 4.298a.923.923 0 01-.28 1.284l-1.309.835a.65.65 0 00-.276.72c.355 1.28 1.208 3.238 3.262 5.291 2.053 2.053 4.01 2.906 5.291 3.261a.653.653 0 00.721-.276l.835-1.308a.944.944 0 011.288-.279l4.296 2.787a.934.934 0 01.283 1.28z" fill="null"></path></svg>
                            </span>
                            <span>اتصل بالمطعم</span>
                        </div>
                    </button>
                    </a>
                </div>
            </div>

        </div>
    )
}
