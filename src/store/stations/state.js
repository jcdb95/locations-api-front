export default {
    list: [],
    selectedStation:null,
    detailsDialog:false,
    createNewStationDialog:false,
    createNewProduct:false,
    editing:false,
    auth:false,
    creatingDirection:{
        id:null,
        name:null,
        address:null,
        city:null,
        latitude:null,
        longitude:null,
        prices:[],
        products:[],
    },
    creatingProduct:{
        product_id: null,
        product_name:null,
        product_price:null,
        points: []
    }
};
