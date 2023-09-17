import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Country.css'


const CountryView = () => {

    const params = useParams()
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([]);

    const getData = async () => {
        const result = await fetch('https://restcountries.com/v3.1/all')
            .then(result => result.json())
            .then(d => setFilteredData(d.filter(item => item.name.common.toLowerCase().includes(params.id.toLowerCase().trim()))))

    }

    useEffect(() => {
        getData()
    }, [])


    console.log(filteredData)

    return (
        filteredData.map((item, index) => {
            const firstCurrency = Object.values(item.currencies)[0];
            const language = Object.values(item.languages)
            return (
                <>
                    <div className='count-cont'>
                        <div className='count-item'>
                            <div className='count-flag-cont'><img src={item.flags.png} alt="" /></div>
                            <div className='count-item-cont'>
                                <div className='count-name'><strong>{item.name.common}</strong></div>
                                <div><p>{item.flags.alt}</p></div>
                                <div className='count-continent'>Continent: <strong>{item.continents[0]}</strong></div>
                                <div className='count-population'>Population: <strong>{item.population}</strong></div>
                                <div className='count-currency'>Currency: <strong>{firstCurrency.name}</strong></div>
                                <div className='count-lang'>Language: <strong>{language[0]}</strong></div>
                            </div>
                        </div>
                        <div className='count-other'>
                            <div className='c-1'>
                                <div>Capital: <strong>{item.capital[0]}</strong></div>
                                <div>Official Name: <strong>{item.name.official}</strong></div>
                                <div>Independent: <strong>{item.independent ? 'Independent Country' : 'Not Independent'}</strong></div>
                                <div>Region: <strong>{item.region}</strong></div>
                                <div>startOfWeek: <strong>{item.startOfWeek}</strong></div>
                                <div>status: <strong>{item.status}</strong></div>
                                <div>subregion: <strong>{item.subregion}</strong></div>
                                <div>unMember:<strong>{item.unMember ? 'Yes' : 'No'}</strong></div>
                            </div>
                            <div className='c-2'>
                                <div><strong>CoatOfArms</strong></div>
                                <div className='coa'><img src={item.coatOfArms.png} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </>
            )
        })
    )
}

export default CountryView