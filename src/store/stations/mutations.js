export const setList = (state, data) => {
	if(data.newLocation){
		data.list.push(data.newLocation)
	}
	const result = data.list.map(item => {
		return {...item, lat_long: [item.latitude, item.longitude]}
	})
	state.list = result; 
};

export const selectedStation = (state, data) => {
	console.log(data);
	state.selectedStation = data;
}

export const detailsDialog = (state, data) => {
	state.detailsDialog = data;
}

export const editStation = (state) => {
	state.editing = true
	state.creatingDirection.id = state.selectedStation.id
	state.creatingDirection.name = state.selectedStation.name
	state.creatingDirection.address = state.selectedStation.address
	state.creatingDirection.city = state.selectedStation.city
	state.creatingDirection.latitude = state.selectedStation.latitude
	state.creatingDirection.longitude = state.selectedStation.longitude
	state.creatingDirection.prices = state.selectedStation.prices
	state.creatingDirection.products = state.selectedStation.products
}

export const createNewStationDialog = (state, data) => {
	state.createNewStationDialog = data;
}

export const createNewProduct = (state, data) => {
	state.createNewProduct = data;
}

export const editing = (state, data) => {
	state.editing = data;
}

export const auth = (state, data) => {
	state.auth = data;
}

export const updateLocationData = (state, data) => {
    if (data.key) {
		state.creatingDirection[data.key] = data.val;
    }
};

export const updateProductData = (state, data) => {
    if (data.key) {
		state.creatingProduct[data.key] = data.val;
    }
};


export const cleanCreatingStation = state => {
	state.creatingDirection = {
        id:null,
        name:null,
        address:null,
        city:null,
        latitude:null,
        longitude:null,
        prices:[],
        products:[],
    }
}

export const cleanCreatingProduct = state => {
	state.creatingProduct = {
        product_id:null,
        product_name:null,
        product_price:null,
        points: []
    }
}


// addProductToStation

export const addProductToStation = (state, data) => {
	
	// state.creatingProduct.points = data.points;

	let points = data.points.map(item => {
		return { 
			id:item.id,
			status: item.status ? 'available' : 'not_available'
		}
	})

	let price = {
		price: Number(state.creatingProduct.product_price),
		currency: 'CHF',
		product_id: state.creatingProduct.product_name.toUpperCase()
	}

	let product = {
		product_id: state.creatingProduct.product_name.toUpperCase(),
		points: points

	}

	state.creatingDirection.prices.push(price);
	state.creatingDirection.products.push(product);

}

export const SetLatAndLong = (state, data) => {
	state.creatingDirection.latitude = data.lat;
	state.creatingDirection.longitude = data.lng;
}

export const addStationToList = (state, data) => {
	state.list.push(data);
}

export const editPrice = (state, data) => {
	state.creatingDirection.prices[data.index].price = data.val
}

export const popStation = (state, data) => {
	state.list = state.list.filter(el => { return el.id != data; });
}