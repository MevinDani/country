import React from 'react'
import { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';


const Home = () => {

    const [data, setData] = useState([])
    const [firstTwnty, setfirstTwnty] = useState([])
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState([]);

    const getData = async () => {
        const result = await fetch('https://restcountries.com/v3.1/all')
        result.json().then(d => setData(d))
    }

    const getSearchCountry = async () => {
        const searchItem =
            data.filter(item => item.name.common.toLowerCase().includes(search.toLowerCase()))
        setFilteredData(searchItem);
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setfirstTwnty(data.slice(0, 15));
    }, [data])

    useEffect(() => {
        getSearchCountry()
    }, [search, data])

    return (
        <div className='main-cont'>
            <div class="search-container">
                <input onChange={(e) => setSearch(e.target.value)} type="text" class="search-input" placeholder="Search..." />
                {/* <button class="search-button">Search</button> */}
            </div>
            <div className='home-cont'>
                {(search && filteredData) ?
                    filteredData.map((item, index) => {

                        const currencies = item.currencies;
                        const firstCurrency = currencies && typeof currencies === 'object' ? Object.values(currencies)[0] : null;

                        const languages = item.languages;
                        const language = languages ? Object.values(languages) : [];

                        return (
                            <Link to={`viewcountry/${item.name.common}`} style={{ textDecoration: 'none' }}>
                                <div className='item'>
                                    <div className='flag-cont'><img src={item.flags.png} alt="" /></div>
                                    <div className='item-cont'>
                                        <div className='name'>Name: <strong>{item.name.common}</strong></div>
                                        <div className='continent'>Continent: <strong>{item.continents[0]}</strong></div>
                                        <div className='population'>Population: <strong>{item.population}</strong></div>
                                        <div className='currency'>Currency: <strong>{firstCurrency ? firstCurrency.name : ''}</strong></div>
                                        <div className='lang'>Language: <strong>{language.length > 0 ? language[0] : ''}</strong></div>
                                    </div>
                                </div>
                            </Link>

                        )
                    }) :
                    firstTwnty.map((item, index) => {
                        const firstCurrency = Object.values(item.currencies)[0];
                        const language = Object.values(item.languages)
                        return (
                            <Link to={`viewcountry/${item.name.common}`} style={{ textDecoration: 'none' }}>
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
                            </Link>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home