import React from 'react'

export default function Button({value}) {

    const [color, setColor] = React.useState('#ff8b00')

    React.useEffect(() => {
        switch(value) {
        case 'Active':
            setColor('#ff8b00')
          break;
        case 'Processing':
            setColor('green')
            break;
        case 'Closed':
            setColor('red')
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

 const changeColor = (value)=> {
    switch(value) {
        case 'Active':
            setColor('#ff8b00')
          break;
        case 'Processing':
            setColor('green')
            break;
        case 'Closed':
            setColor('red')
            break;
        default:
            setColor('#ff8b00')
      }
 }

    return (
            <select value={value} onChange={(e)=> changeColor(e.target.value) } style={selectStyle}>
                <option>Active</option>
                <option>Processing</option>
                <option>Closed</option>
            </select>
    )
}
