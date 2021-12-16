import React from 'react'
import firebaseDb from "../../../fire";

export default function Button({value, id, obj}) {

    const [color, setColor] = React.useState('#ff8b00')
    const [val, setVal] = React.useState(value)

    React.useEffect(() => {
        switch(value) {
        case 'Active':
            setColor('#ff8b00')
          break;
        case 'Processing':
            setColor('green')
            break;
        case 'Closed':
            setColor('rgba(244, 67, 54, 0.85)')
            break;
        default:
            setColor('#ff8b00')
      }
    }, []);

    const selectStyle =   {
            border: `1px solid ${color}`,
            backgroundColor: `${color}`,
            backgroundImage: `linear-gradient(#fff,#fff),linear-gradient(-135deg, transparent 50%,${color} 50%),linear-gradient(-225deg, transparent 50%, ${color} 50%),linear-gradient(${color} 42%, #fff 42%)`,
    }

    const update = (value) => {
        firebaseDb.child(`orders/${id}`).set(
            {...obj, status: value},
            err => {
                if (err)
                    console.log(err)
            }
        )
    }

    const changeColor = (value)=> {
        switch(value) {
            case 'Active':
                setColor('#ff8b00')
                setVal(value)
            break;
            case 'Processing':
                setColor('green')
                setVal(value)
                break;
            case 'Closed':
                setColor('rgba(244, 67, 54, 0.85)')
                setVal(value)
                break;
            default:
                setColor('#ff8b00')
        }
        update(value)
    }

    return (
            <select value={val} onChange={(e)=> changeColor(e.target.value) } style={selectStyle}>
                <option>Active</option>
                <option>Processing</option>
                <option>Closed</option>
            </select>
    )
}
