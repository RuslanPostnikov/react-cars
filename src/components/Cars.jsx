import {useCallback, useEffect, useRef, useState} from "react";
import {URL} from "../shared/url";
import axios from "axios";
import './Cars.scss';
import Car from "./Car";
import Loader from "./UI/Loader";
import SearchInput from "./UI/SearchInput";

const Cars = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [ price, setPrice ] = useState(null);
    const [checkboxes, setCheckboxes] = useState({
        Toyota: false,
        Chevrolet: false,
        Audi: false
    });
    const rangeRef = useRef();

    const fetchCars = async (arr) => {
        try {
            let response =  await axios.get(URL + arr);
            let newArr = [];
            response.data.map((car, index) => {
                return newArr.push({
                    carMake: car.carMake,
                    carModel: car.carModel,
                    price: +car.price.slice(1, -3),
                    id: index
                })
            })
            setCars(newArr)
        } catch (e) {
            console.log(e);
        }
        setIsLoaded(true);
    }

    const getMinMaxPrice = useCallback(() => {
        if(rangeRef.current?.min) {
            rangeRef.current.min = String(Math.min(...cars.map(item => item.price)));
            rangeRef.current.max = String(Math.max(...cars.map(item => item.price)));
        }
    }, [cars])

    useEffect(() => getMinMaxPrice(), [isLoaded, getMinMaxPrice])

    useEffect(() => fetchCars('/cars.json'), []);


    const addToGarage = async car => {
        await axios.get(URL + '/garage.json').then(async r => {
            if(!r.data || !Object.values(r.data)?.find(el => el.id === car.id)) {
                await axios.post(URL + '/garage.json', car);
                alert('Car was added to Garage');
            } else {
                alert('Car is already in Garage');
            }
        });
    }

    const handlePriceInput = (e) => {
        setPrice( e.target.value );
    }

    const handleCheckbox = (e) => {
        let carMake = e.target.value;
        let checked = e.target.checked
        setCheckboxes(prevState => {
            return {...prevState, [carMake]: checked}
        });
    }

    const filterByNameCb = val => {
        if (!searchTerm) {
            return val
        } else if (
            val.carMake.toLowerCase().includes(searchTerm.toLowerCase())
            || val.carModel.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return val
        }
        return null
    }

    const filterByPriceCb = value => {
        if (!price) return value;
        return value.price <= +price;
    }

    const filterByCheckboxCb = value => {
        let checkedArray = Object.keys(checkboxes).filter(item => checkboxes[item]);
        if (!checkedArray.length) return value;
        return checkedArray.includes(value.carMake);
    }

    const mapCarsCb = (car, index) => {
        return <Car
            car={car}
            index={index}
            key={index}
            addToGarage={addToGarage}
            btnType={'primary'}
        />
    }

    const renderCheckboxes = (checkboxes) => {
        return Object.keys(checkboxes).map((name, index) => {
            return <label htmlFor={name} key={index}>{name} &nbsp;
                <input
                    type="checkbox"
                    value={name}
                    id={name}
                    checked={checkboxes[name]}
                    onChange={handleCheckbox}/>
            </label>
        })
    }

    return (
        <>
            {!isLoaded
                ? <Loader/>
                : <>
                    <form>
                        <SearchInput setSearchTerm={setSearchTerm} searchTerm={'cars'}/>
                        <div className={'input'}>
                            <input
                                ref={rangeRef}
                                id={'range'}
                                type="range"
                                value={+price}
                                min='0'
                                max='100'
                                onChange={handlePriceInput}
                            />
                            <label htmlFor="range">{price ? price : 'any'}</label>
                            {renderCheckboxes(checkboxes)}
                        </div>
                    </form>
                    <ul className={'list-group'}>
                        {cars
                            .filter(filterByNameCb)
                            .filter(filterByPriceCb)
                            .filter(filterByCheckboxCb)
                            .map(mapCarsCb)
                        }
                    </ul>
                </>
            }
        </>
    );
};

export default Cars;
