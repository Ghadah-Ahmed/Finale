import React from 'react'
import { useLocation, Link, useNavigate } from "react-router-dom";
import Barcode from './Barcode';
import Menu from './Menu';
import Orders from './Orders';
import barcode from '../../../images/barcode.svg';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import bell from '../../../images/bell.gif';
import bellS from '../../../images/bell.svg';
import jwt_decode from "jwt-decode";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function  Branch() {
    const navigate = useNavigate()
    let query = useQuery();
    const [notification, setNotification] = React.useState(false);
    const storedToken = localStorage.getItem("token");

    React.useEffect(() => {
        if (storedToken) {
          let decodedData = jwt_decode(storedToken, { payload: true });
          let expirationDate = decodedData.exp;
          var current_time = Date.now() / 1000;
          if (expirationDate < current_time || decodedData.role != 'branch') {
            logOut();
          }
        }else if(!storedToken){
            navigate('/login')
          }
    }, []);

    React.useEffect(() => {
        document.body.classList.add("body_stop_scroll");
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }


    return (
        <div className='dashBoard' dir='ltr'>
                <div className='side_menu'>
                    <div>
                        <div className="logo">
                            <img height='50' src="https://finedine.imgix.net/2PvyB5mz/e3366f56-9994-4763-b1bb-a614ab4bc131.png?auto=format,&fit=max&w=640&h=320&dpr=3"/>
                        </div>
                        <Link to={`?section=orders`}>
                        <div className='b_menu'>
                            { !notification? <img src={bellS}/>
                             : <img width='20' src={bell}/>}
                        </div>
                        </Link>
                        <Link to={`?section=menu`}>
                        <div className='b_menu'>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#575962"><path fillRule="evenodd" clipRule="evenodd" d="M0 5.59C0 4.989.488 4.5 1.09 4.5h21.82a1.09 1.09 0 110 2.182H1.09A1.09 1.09 0 010 5.59zM0 12.136c0-.602.488-1.09 1.09-1.09h21.82a1.09 1.09 0 110 2.181H1.09A1.09 1.09 0 010 12.137zM10.91 18.682c0-.603.488-1.091 1.09-1.091h10.91a1.09 1.09 0 110 2.182H12a1.09 1.09 0 01-1.09-1.091z" fill="null"></path></svg>
                        </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={`?section=barcode`}>
                            <div className='b_menu'>
                                <img src={barcode} />
                            </div>
                        </Link>
                        <div className='b_menu'>
                            <LogoutRoundedIcon onClick={() => logOut()}/>
                        </div>
                    </div>
                </div>
                <Child setNotification={setNotification} section={query.get("section")} />
        </div>
    )
}

function Child({ section, setNotification }) {

    const switchSection = () => {

        switch(section) {
            case 'orders':
              return <Orders setNotification={setNotification}/>
              break;
            case 'menu':
                return <Menu/>
                break;
            case 'barcode':
                return <Barcode source='Branch'/>
                break;
            default:
                return <h1>Welcom to dashboard!</h1>
          }
    }
    return (
      <div>
        {switchSection()}
      </div>
    );
  }