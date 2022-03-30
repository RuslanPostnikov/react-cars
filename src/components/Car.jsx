const Car = ({car, index, addToGarage, deleteFromGarage, btnType}) => {
    return (
        <li className={'list-group-item car'}>
            <h5>{car.carMake}</h5>
            <h5>{car.carModel}</h5>
            <h5>&euro; {car.price}</h5>
            {addToGarage
                ? <button
                className={`btn btn-${btnType}`}
                onClick={() => addToGarage(car, index)}
                >Add</button>
                : <button
                    className={`btn btn-${btnType}`}
                    onClick={() => deleteFromGarage(car.id)}
                >Delete</button>
            }
        </li>
    );
};

export default Car;
