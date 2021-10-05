<template>
    <div class="h-screen flex flex-col items-center w-full">
        <l-map
            ref="map"
            class="w-full h-full z-20"
            :zoom="zoom"
            :center="center"
            @click="addMarker"
            @update:center="centerUpdated"
        >
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker
                v-for="(station, index) in list"
                :key="index"
                :lat-lng="station.lat_long"
                @click="openDetailDailog(station)"
            >
            </l-marker>
        </l-map>
        
        <detail-dialog v-if="$store.getters['stations/detailsDialog']" />
        <create-dialog v-if="$store.getters['stations/createNewStationDialog']" />
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { mapGetters } from 'vuex';
import DetailDialog from './dialogs/DetailDialog.vue';
import CreateDialog from './dialogs/CreateDialog.vue';

export default {
    data() {
        return {
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            zoom: 13,
            center: [47.3842043, 8.5342508],
            markerLatLng: [47.367348257, 8.4942242729],
            provider: null,
        };
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        DetailDialog,
        CreateDialog
    },
    mounted() {
        this.$store
            .dispatch('stations/getStations')
            .then(() => {
                console.log(this.$store.getters['stations/list']);
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        centerUpdated(center) {
            this.center = center;
        },
        openDetailDailog(station) {
            this.$store.commit('stations/detailsDialog', true);
            this.$store.commit('stations/selectedStation', station);
        },
        addMarker(event) {
            console.log(event);
            this.$store.commit('stations/SetLatAndLong', event.latlng);
            this.$store.commit('stations/createNewStationDialog', true);
        },
    },
    computed: {
        ...mapGetters({ list: 'stations/list' }),
    },
};
</script>
