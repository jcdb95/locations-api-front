export const list = state => {
    return state.list;
};

export const selectedStation = state => {
    return state.selectedStation;
};

export const detailsDialog = state => {
    return state.detailsDialog;
};

export const createNewStationDialog = state => {
    return state.createNewStationDialog;
};

export const createNewProduct = state => {
    return state.createNewProduct;
};

export const editing = state => {
    return state.editing;
};

export const auth = state => {
    return state.auth;
};

export const creatingDirection = state => {
    return state.creatingDirection;
};

export const creatingProduct = state => {
    return state.creatingProduct;
};

export const products = state => {
    return state.creatingDirection.products;
};

export const prices = state => {
    return state.creatingDirection.prices;
};