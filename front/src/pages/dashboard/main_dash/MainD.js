import React from 'react'
import { useLocation, Link, useNavigate } from "react-router-dom";
import Barcode from '../branch_dash/Barcode';
import barcode from '../../../images/barcode.svg';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import Menu from './Menu';
import Branches from './Branches';
import Statistics from './Statistics';
import Theme from './Theme';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function MainD() {
    let query = useQuery();

    React.useEffect(() => {
        document.body.classList.add("body_stop_scroll");
    }, []);

    return (
        <div className='dashBoard' dir='ltr'>
                <div className='side_menu'>
                    <div>
                        <div className="logo">
                            <img height='50' src="https://finedine.imgix.net/2PvyB5mz/e3366f56-9994-4763-b1bb-a614ab4bc131.png?auto=format,&fit=max&w=640&h=320&dpr=3"/>
                        </div>
                        <Link to={`?section=menu`}>
                        <div className='b_menu'>
                            <FoodBankIcon/>
                        </div>
                        </Link>
                        <Link to={`?section=branches`}>
                        <div className='b_menu'>
                            <DashboardCustomizeOutlinedIcon/>
                            {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="#575962"><path fillRule="evenodd" clipRule="evenodd" d="M0 5.59C0 4.989.488 4.5 1.09 4.5h21.82a1.09 1.09 0 110 2.182H1.09A1.09 1.09 0 010 5.59zM0 12.136c0-.602.488-1.09 1.09-1.09h21.82a1.09 1.09 0 110 2.181H1.09A1.09 1.09 0 010 12.137zM10.91 18.682c0-.603.488-1.091 1.09-1.091h10.91a1.09 1.09 0 110 2.182H12a1.09 1.09 0 01-1.09-1.091z" fill="null"></path></svg> */}
                        </div>
                        </Link>
                        <Link to={`?section=theme`}>
                        <div className='b_menu'>
                            <AutoFixHighIcon sx={{fontWeight: 'lighter' }}/>
                        </div>
                        </Link>
                        <Link to={`?section=statistics`}>
                        <div className='b_menu'>
                            <BarChartIcon sx={{fontWeight: 'lighter' }}/>
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
                            <LogoutRoundedIcon/>
                        </div>
                    </div>
                </div>
                <Child section={query.get("section")} />
        </div>
    )
}

function Child({ section }) {

    const switchSection = () => {

        switch(section) {
            case 'menu':
              return <Menu/>
              break;
            case 'branches':
                return <Branches/>
                break;
            case 'statistics':
                return <Statistics/>
                break;
            case 'theme':
                return <Theme/>
                break;
            case 'barcode':
                return <Barcode source='MainD'/>
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