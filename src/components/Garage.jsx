import axios from "axios";
import {URL} from "../shared/url";
import {useEffect, useState} from "react";
import Car from "./Car";
import Loader from "./UI/Loader";

const Garage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [cars, setCars] = useState([]);

    const fetchCars = async (arr) => {
        try {
            return await axios.get(URL + arr);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchCars('/garage.json').then(r => {
            try {
                let fetchedCars = r.data;
                let newArr = [];
                Object.keys(fetchedCars).map(id => {
                    return newArr.push({...fetchedCars[id], id})
                });
                setCars(newArr);
            } catch (e) {
                console.log(e);
            }
                setIsLoaded(true);
        });
    }, [isLoaded]);

    const deleteFromGarage = async id => {
        try {
            await axios.delete(URL + `/garage/${id}.json`);
            alert('Car was deleted from Garage');
            setIsLoaded(false);
        } catch (e) {
            console.log(e);
        }
        setIsLoaded(true);
    }

    const renderCars = (cars) => {
        if(cars.length) {
            return cars.map((car, index) => {
                return <Car
                    car={car}
                    index={index}
                    key={index}
                    deleteFromGarage={deleteFromGarage}
                    btnType={'danger'}
                />
            })
        } else {
            return <p>No cars in Garage</p>
        }
    }

    return (
            <ul className={'list-group'}>
                {!isLoaded ? <Loader/> : renderCars(cars)}
            </ul>
    );
};

export default Garage;
