<template>
    <transition name="modal">
        <div class="modal-mask fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center">
            <div class="bg-white w-auto h-auto p-8 m-6 rounded-md flex flex-col mx-auto justify-between">
                <div class="text-3xl font-bold text-left">
                    Add a new product
                </div>
                <div class="flex flex-col py-3">
                    <input
                        class="bg-gray-200 my-3 p-2 outline-none rounded-md shadow-md"
                        type="text"
                        v-model="product_name"
                        placeholder="Product Name"
                    />
                    <input
                        class="bg-gray-200 my-3 p-2 outline-none rounded-md shadow-md"
                        type="number"
                        v-model="product_price"
                        placeholder="Product Price"
                    />
                    <div class="flex flex-row w-full justify-between my-3">
                        <div
                            v-for="(point, index) in points_available"
                            :key="index"
                            class="grid grid-cols-1 gap-2 items-center justify-center"
                        >
                            <div>Point {{ point.id }}</div>
                            <input
                                type="checkbox"
                                class="mx-auto cursor-pointer"
                                v-model="point.status"
                                name="point_1"
                            />
                        </div>
                    </div>

                    <p class="flex flex-col items-start" v-if="errors">
                        <b>Please correct the following error(s):</b>
                        <ul class="text-left">
                            <li v-for="(error, index) in errors_list" :key="index">{{ error }}</li>
                        </ul>
                    </p>

                </div>
                <div class="grid grid-cols-1 gap-3 my-3 w-full">
                    <button
                        @click="runValidations"
                        class="w-full p-2 bg-green-600 text-white flex items-center justify-center rounded-md shadow-md font-secondary-regular hover:shadow-lg md:transition-all md:duration-200 cursor-pointer font-bold"
                    >
                        Add new product
                    </button>
                    <button
                        @click="closeModal"
                        class="w-full p-2 bg-red-600 text-white flex items-center justify-center rounded-md shadow-md font-secondary-regular hover:shadow-lg md:transition-all md:duration-200 cursor-pointer font-bold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            points_available: [
                {
                    id: 1,
                    status: false,
                },
                {
                    id: 2,
                    status: false,
                },
                {
                    id: 3,
                    status: false,
                },
                {
                    id: 4,
                    status: false,
                },
            ],
            errors_list:[],
            errors:false,
        };
    },
    methods: {
        closeModal() {
            this.$store.commit('stations/createNewProduct', false);
            this.$store.commit('stations/cleanCreatingProduct');
        },
        runValidations() {
            this.errors = false
            this.errors_list = []

            let checkForAvailablePoints = this.points_available.filter( item => {
                return item.status
            })

            if (this.product_name && this.product_price && checkForAvailablePoints) {
                this.$store.commit('stations/createNewProduct', false);
                this.$store.commit('stations/addProductToStation', { points: this.points_available });
                this.$store.commit('stations/cleanCreatingProduct');
            }
            if(!checkForAvailablePoints.length){
                this.errors = true
                this.errors_list.push('No points are available.')
            }
            
            if (!this.product_name) {
                this.errors = true
                this.errors_list.push('Product name required.');
            }
            if (!this.product_price) {
                this.errors = true
                this.errors_list.push('Product price required.');
            }

        },
    },

    computed: {
        ...mapGetters({
            selectedStation: 'stations/selectedStation',
        }),
        product_name: {
            get() {
                return this.$store.getters['stations/creatingProduct'].product_name;
            },
            set(newValue) {
                return this.$store.commit('stations/updateProductData', { key: 'product_name', val: newValue });
            },
        },
        product_price: {
            get() {
                return this.$store.getters['stations/creatingProduct'].product_price;
            },
            set(newValue) {
                return this.$store.commit('stations/updateProductData', { key: 'product_price', val: newValue });
            },
        },
    },
};
</script>

<style>
.modal-mask {
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}
</style>
