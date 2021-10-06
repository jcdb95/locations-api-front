import axios from 'axios';

export function getStations(context) {
    return new Promise((resolve, reject) => {
        axios.get('http://ec2-3-144-146-116.us-east-2.compute.amazonaws.com:3000/api/locations')
        .then(result => {
            context.commit('setList', { list: result.data.Locations })
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
        
        axios.post('http://ec2-3-144-146-116.us-east-2.compute.amazonaws.com:3000/api/locations', location)
        .then(result => {
            console.log(result)
            resolve();
        })
        .catch(error => {
            reject(error);
        });

        context.commit('setList', { newLocation: location, list: context.state.list });
        context.commit('cleanCreatingStation');
        context.commit('createNewStationDialog', false);
        context.commit('cleanCreatingProduct');


    });
}

export function updateStation(context) {
    return new Promise((resolve, reject) => {
        let promises = []
        console.log("update station called")
        context.state.creatingDirection.prices.forEach(element => {
            let promise = new Promise((resolve, reject)=>{
                let updateStation = {
                    location_id: context.state.creatingDirection.id,
                    new_product_price: element.price,
                    product_id: element.product_id,
                    new_location_name: context.state.creatingDirection.name
                }
                
                axios.patch('http://ec2-3-144-146-116.us-east-2.compute.amazonaws.com:80/api/locations', updateStation)
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                });
            })
            promises.push(promise)
        });

        Promise.all(promises).then((values) => {
            resolve(values);
        }).catch(error => {
            reject(error);
        })

    });
}

export function deleteStation(context, data) {
                
    

    return new Promise((resolve, reject) => {
        axios.delete('http://ec2-3-144-146-116.us-east-2.compute.amazonaws.com:80/api/locations', {
            location_id: data.id
        })
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });
    });
}


export function getAuth() {
    return new Promise((resolve, reject) => {
        axios.delete('http://ec2-3-144-146-116.us-east-2.compute.amazonaws.com:80/api/auth', {
            user: 'jcdb',
            pass: 'qqwweerrttyy12@@'
        })
        .then(result => {
            resolve(result.auth);
        })
        .catch(error => {
            reject(error);
        });
    });
}