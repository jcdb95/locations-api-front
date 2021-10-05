export const setList = (state, data) => {
	const result = data.map(item => {
		return {...item, lat_long: [item.latitude, item.longitude]}
	})
	console.log("RESULT", result)
	state.list = result; 
};

export const selectedStation = (state, data) => {
	state.selectedStation = data;
}

export const detailsDialog = (state, data) => {
	state.detailsDialog = data;
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

// SetLatAndLong

export const SetLatAndLong = (state, data) => {
	state.creatingDirection.latitude = data.lat;
	state.creatingDirection.longitude = data.lng;
}

