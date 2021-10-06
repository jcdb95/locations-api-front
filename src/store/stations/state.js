export default {
    list: [],
    selectedStation:null,
    detailsDialog:false,
    createNewStationDialog:false,
    editStation:false,
    createNewProduct:false,
    editing:false,
    auth:true,
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
    updatingStation:{
        location_id: null,
        new_product_price:null,
        product_id:null,
        new_location_name:null,
    },
    creatingProduct:{
        product_id: null,
        product_name:null,
        product_price:null,
        points: []
    }
};
