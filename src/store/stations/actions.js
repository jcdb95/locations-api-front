import axios from 'axios';

export function getStations(context) {
    return new Promise((resolve, reject) => {
        axios.get('http://ec2-52-14-224-139.us-east-2.compute.amazonaws.com:80/api/locations')
        .then(result => {
            context.commit('setList', result.data.Locations)
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    });
}

export function createStation(context) {
    return new Promise((resolve, reject) => {
        let location = {
            ...context.state.creatingDirection,
            id: Math.floor(Math.random()*90000) + 10000
        }
        console.log(location);
        axios({
            method: 'POST',
            url: `http://ec2-52-14-224-139.us-east-2.compute.amazonaws.com:80/api/locations`,
            data: location,
            headers: {
               'Content-type': 'application/json',
            }
        })
        .then(result => {
            console.log(result)
            resolve();
        })
        .catch(error => {
            reject(error);
        });
    });
}
