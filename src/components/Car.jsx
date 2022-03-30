import {useAuth} from "../shared/AuthContext";

const Car = ({car, index, addToGarage, deleteFromGarage, btnType}) => {
    const {auth} = useAuth();

    const renderButton = () => {
        if(addToGarage) {
            return <button
                className={`btn btn-${btnType}`}
                onClick={() => addToGarage(car, index)}
            >Add</button>
        } else {
            return <button
                className={`btn btn-${btnType}`}
                onClick={() => deleteFromGarage(car.fireId)}
            >Delete</button>
        }

    }

    return (
        <li className={'list-group-item car'}>
            <h5>{car.carMake}</h5>
            <h5>{car.carModel}</h5>
            <h5>&euro; {car.price}</h5>
            {auth ? renderButton() : null}
        </li>
    );
};

export default Car;
