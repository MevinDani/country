import React from 'react'
import { useEffect, useState } from 'react'
import './Home.css'


const Home = () => {
    const [data, setData] = useState([])
    const [firstTwnty, setfirstTwnty] = useState([])
    const getData = async () => {
        const result = await fetch('https://restcountries.com/v3.1/all')
        result.json().then(d => setData(d))
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setfirstTwnty(data.slice(0, 15));
    }, [data])

    console.log(firstTwnty)
    return (
        <div className='home-cont'>
            {firstTwnty ?
                firstTwnty.map((item, index) => {
                    const firstCurrency = Object.values(item.currencies)[0];
                    const language = Object.values(item.languages)
                    return (
                        <div className='item'>
                            <div className='flag-cont'><img src={item.flags.png} alt="" /></div>
                            <div className='item-cont'>
                                <div className='name'>Name: <strong>{item.name.common}</strong></div>
                                <div className='continent'>Continent: <strong>{item.continents[0]}</strong></div>
                                <div className='population'>Population: <strong>{item.population}</strong></div>
                                <div className='currency'>Currency: <strong>{firstCurrency.name}</strong></div>
                                <div className='lang'>Language: <strong>{language[0]}</strong></div>
                            </div>
                        </div>

                    )
                }) : ""
            }
        </div>
    )
}

export default Home