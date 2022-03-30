import axios from "axios";
import {URL} from "../shared/url";
import {useEffect, useState} from "react";
import Loader from "./UI/Loader";
import SearchInput from "./UI/SearchInput";

const Friends = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [people, setPeople] = useState([]);
    const [friends, setFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [friendsListChange, setFriendsListChange] = useState(false);

    const fetchPeople = async arr => {
        try {
            const response =  await axios.get(URL + arr);
            let fetchedPeople = response.data;
            let newArr = [];
            Object.keys(fetchedPeople).map(id => {
                return newArr.push({...fetchedPeople[id], id})
            });
            setPeople(newArr);
            setIsLoaded(true)
        } catch (e) {
            console.log(e);
        }
    }

    const fetchFriends = async arr => {
        try {
            const response =  await axios.get(URL + arr);
            let fetchedFriends = response.data;
            let newArr = [];
            Object.keys(fetchedFriends).map(fireId => {
                return newArr.push({...fetchedFriends[fireId], fireId})
            });
            setFriends(newArr);
            setIsLoaded(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPeople('/people.json')
    }, [])

    useEffect(() => {
        fetchFriends('/friends.json')
    }, [friendsListChange]);

    const addFriend = async person => {
        await axios.get(URL +'/friends.json').then(async r => {
            if(!r.data || !Object.values(r.data)?.find(el => el.id === person.id)) {
                setFriendsListChange(true);
                await axios.post(URL + '/friends.json', person);
                alert(`${person.firstName} was added to Friends`);
                setFriendsListChange(false);
            } else {
                alert(`${person.firstName} is already your friend`);
            }
        });

    }

    const deleteFriend = async person => {
        try {
            setFriendsListChange(true);
            await axios.delete(URL + `/friends/${person.fireId}.json`);
            alert(`${person.firstName} was deleted from Friends`);
            setFriendsListChange(false);
        } catch (e) {
            console.log(e);
        }
    }

    const filterPeopleCb = val => {
        if(!searchTerm) {
            return val
        } else if(
            val.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            || val.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return val
        }
        return null
    }

    const mapPeopleCb = (item, index) => {
        return <li key={index} className={'list-group-item d-flex justify-content-between align-items-center'}>
            <p className={'m-0'}>{item.firstName} {item.lastName}</p>
            <button className={'btn btn-primary'} onClick={() => addFriend(item, index)}>Add to friends</button>
        </li>
    }

    const mapFriendsCb = (person, index) => {
        return <li key={index}
                   className={'list-group-item d-flex justify-content-between align-items-center'}>
            <p className={'m-0'}>{person.firstName} {person.lastName}</p>
            <button className={'btn btn-danger'} onClick={() => deleteFriend(person)}>Delete Friend</button>
        </li>
    }

    const renderFriends = (friends) => {
        if(friends.length) {
            return friends.map(mapFriendsCb)
        } else {
            return <p>No friends</p>
        }
    }

    return (
        <>
            <SearchInput setSearchTerm={setSearchTerm} searchTerm={'friends'}/>
            <ul className={'list-group'}>
                {
                    !isLoaded ?
                        <Loader/> :
                        searchTerm ?
                            people.filter(filterPeopleCb).map(mapPeopleCb) :
                            renderFriends(friends)
                }
            </ul>
        </>

    );
};

export default Friends;
