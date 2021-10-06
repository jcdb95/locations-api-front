<template>
    <transition name="modal">
        <div class="modal-mask fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center">
            <div class="bg-white w-full max-w-lg h-auto p-8 m-6 rounded-md flex flex-col mx-auto justify-between">
                <div class="grid grid-flow-row grid-rows-1 gap-3 items-start justify-center text-left text-base">
                    <div><span class="text-xl font-bold pr-1">Station Name:</span> {{ selectedStation.name }}</div>
                    <div>
                        <span class="text-xl font-bold pr-1">Station Address:</span> {{ selectedStation.address }},
                        {{ selectedStation.city }}
                    </div>
                    <div class="">
                        <div class="text-xl font-bold underline pb-2">
                            Prices:
                        </div>
                        <div v-for="(price, index) in selectedStation.prices" class="flex flex-col" :key="index">
                            <div><b>Product:</b> {{ price.product_id }}</div>
                            <div><b>Price:</b> {{ price.price }} {{ price.currency }}</div>
                        </div>
                    </div>
                    <div class="">
                        <div class="text-xl font-bold underline pb-2">
                            Products:
                        </div>
                        <div v-for="(product, index) in selectedStation.products" class="flex flex-col" :key="index">
                            <div><b>Product:</b> {{ product.product_id }}</div>
                            <div v-if="product.points">
                                <div v-for="(point, index_point) in product.points" :key="index_point">
                                    <div class="flex flex-row items-center py-1">
                                        Point {{ point.id }}
                                        <div
                                            :class="{ 'bg-green-400': point.status == 'available' }"
                                            class="h-3 w-3 mx-3 bg-red-400 rounded-full"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="auth"
                    @click="editStation"
                    class="w-auto m-3 p-2  bg-blue-600 text-white flex items-center justify-center rounded-md shadow-md font-secondary-regular hover:shadow-lg md:transition-all md:duration-200 cursor-pointer font-bold"
                >
                    Edit Station
                </div>
                <div
                    v-if="auth"
                    @click="deleteStation"
                    class="w-auto m-3 p-2  bg-blue-600 text-white flex items-center justify-center rounded-md shadow-md font-secondary-regular hover:shadow-lg md:transition-all md:duration-200 cursor-pointer font-bold"
                >
                    Delete Station
                </div>
                <div
                    @click="closeModal"
                    class="w-auto m-3 p-2 mt-8 bg-yellow-600 text-white flex items-center justify-center rounded-md shadow-md font-secondary-regular hover:shadow-lg md:transition-all md:duration-200 cursor-pointer font-bold"
                >
                    Close
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    methods: {
        closeModal() {
            this.$store.commit('stations/detailsDialog', false);
            this.$store.commit('stations/selectedStation', null);
        },
        editStation(){
            this.$store.commit('stations/editStation');
            this.$store.commit('stations/createNewStationDialog', true);
        },
        deleteStation(){
            this.$store.commit('stations/popStation', this.selectedStation.id);
            this.$store.commit('stations/detailsDialog', false);
            this.$store.commit('stations/selectedStation', null);

            // this.$store.dispatch('stations/deleteStation', {id: this.selectedStation.id})
            // .finally(()=>{
            //     this.$store.commit('stations/detailsDialog', false);
            //     this.$store.commit('stations/selectedStation', null);
            // })
        }
    },

    computed: {
        ...mapGetters({
            selectedStation: 'stations/selectedStation',
            auth: 'stations/auth'
        }),
    },
};
</script>

<style>
.modal-mask {
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}
</style>
