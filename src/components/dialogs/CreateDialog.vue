<template>
    <transition name="modal">
        <div class="modal-mask fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center">
            <div class="bg-white w-auto h-auto p-8 m-6 rounded-md flex flex-col mx-auto justify-between">
                <div class="text-3xl font-bold text-left">
                    Add a new station
                </div>
                <div class="flex flex-col py-3">
                    <input
                        class="bg-gray-200 my-3 p-2 outline-none rounded-md shadow-md"
                        type="text"
                        v-model="name"
                        placeholder="Name"
                    />
                    <input
                        class="bg-gray-200 my-3 p-2 outline-none rounded-md shadow-md"
                        type=""
                        v-model="address"
                        placeholder="Address"
                    />
                    <input
                        class="bg-gray-200 my-3 p-2 outline-none rounded-md shadow-md"
                        type="text"
                        v-model="city"
                        placeholder="City"
                    />
					<div v-if="products.length" class="flex flex-col items-start flex-nowrap">
						Products: <br/>
						<ul v-for="(price, index) in prices" :key="index">
							- {{ price.product_id }}, {{ price.price }} CHF
						</ul>
					</div>
                    <button
                        @click="addNewProduct"
                        class="w-full p-2 my-3 bg-blue-400 text-white flex items-center justify-center rounded-md shadow-md font-secondary-regular hover:shadow-lg md:transition-all md:duration-200 cursor-pointer font-bold"
                    >
                        Add new product
                    </button>
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
                        Create new station
                    </button>
                    <button
                        @click="closeModal"
                        class="w-full p-2 bg-red-600 text-white flex items-center justify-center rounded-md shadow-md font-secondary-regular hover:shadow-lg md:transition-all md:duration-200 cursor-pointer font-bold"
                    >
                        Close
                    </button>
                </div>
            </div>
            <add-new-product-dialog v-if="$store.getters['stations/createNewProduct']" />
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import AddNewProductDialog from './AddNewProductDialog.vue';
export default {
	data() {
		return {
			errors:false,
			errors_list:[]
		}
	},
    components: { AddNewProductDialog },
    methods: {
        closeModal() {
            this.$store.commit('stations/createNewStationDialog', false);
            this.$store.commit('stations/cleanCreatingStation');
			this.$store.commit('stations/cleanCreatingProduct');

        },
        runValidations() {
            this.errors = false
			this.errors_list = []

			
			if (this.name && this.address && this.city && this.products.length) {
				this.$store.dispatch('stations/createStation');
			}

			if(!this.products.length){
				this.errors = true
				this.errors_list.push('No product was added.');
			}
			
			if (!this.name) {
				this.errors = true
				this.errors_list.push('Station name is required.');
			}
			if (!this.address) {
				this.errors = true
				this.errors_list.push('Station address is required.');
			}
			if (!this.city) {
				this.errors = true
				this.errors_list.push('Station city is required.');
			}
        },
        addNewProduct() {
            this.$store.commit('stations/createNewProduct', true);
        },
    },

    computed: {
        ...mapGetters({
            selectedStation: 'stations/selectedStation',
			products: 'stations/products',
			prices: 'stations/prices'
        }),
        name: {
            get() {
                return this.$store.getters['stations/creatingDirection'].name;
            },
            set(newValue) {
                return this.$store.commit('stations/updateLocationData', { key: 'name', val: newValue });
            },
        },
        address: {
            get() {
                return this.$store.getters['stations/creatingDirection'].address;
            },
            set(newValue) {
                return this.$store.commit('stations/updateLocationData', { key: 'address', val: newValue });
            },
        },
        city: {
            get() {
                return this.$store.getters['stations/creatingDirection'].city;
            },
            set(newValue) {
                return this.$store.commit('stations/updateLocationData', { key: 'city', val: newValue });
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
