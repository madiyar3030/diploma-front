<template>
    <div>
        <p class="font-weight-bold p18">Адрес и время:</p>
        <div class="flex">
            <FormulateInput
                class="mr-4"
                name="country"
                :options="regions"
                type="select"
                placeholder="Регион"
            />
            <FormulateInput
                :options="cities"
                type="select"
                placeholder="Город"
                name="cities"
            />
        </div>
        <FormulateInput
            type="date"
            name="date"
            placeholder="Выберите дату"
            validation="required"
        />
        <FormulateInput
            type="time"
            name="hour"
            placeholder="Выберите время"
            validation="required"
        />
        <FormulateInput
            type="hidden"
            name="to_lat"
            placeholder="Выберите время"
            validation="required"
            v-model="marker.lng"
        />
        <FormulateInput
            type="hidden"
            name="to_lng"
            placeholder="Выберите время"
            validation="required"
            v-model="marker.lng"
        />
        <small>Можете указать на карте</small>
        <GmapMap
            @click="mapRclicked"
            :center="center"
            :zoom="15"
            map-type-id="terrain"
            style="width: 100%; height: 300px; margin: 20px 0 4rem;"
        >
            <GmapMarker
                :position="marker"
                :clickable="true"
            />
            <GmapMarker
                icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                :position="markers"
                :clickable="true"
            />
        </GmapMap>
        <FormulateInput
            type="text"
            name="from"
            placeholder="Откуда"
            validation="required"
            v-model="from"
        />
        <FormulateInput
            v-if="$route.params.name !== 'material'"
            type="text"
            name="to"
            placeholder="Куда"
            v-model="to"
            validation="required"
        />
        <FormulateInput
            v-if="$route.params.name === 'transport'"
            :options="cities"
            type="select"
            placeholder="Куда город"
            name="to_city_id"
            validation="required"
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from 'axios'
    export default {
        data() {
            return {
                marker: {},
                markers: {},
                center: { lat: 43.237998, lng: 76.911768 },
                from: '',
                to: '',
                count: 0
            }
        },
        computed: {
            ...mapGetters([
                'CITIES',
                'REGIONS',
            ]),
            cities(){
                return this.repeat(this.CITIES)
            },
            regions(){
                return this.repeat(this.REGIONS)
            },
        },
        methods: {
             mapRclicked(mouseArgs) {
                // this.marker = { lat: 43.237998, lng: 76.911768 }
                // console.log(this.marker)
                let latlng
                console.log(this.count)
                if(this.count === 0){
                    const createdMarker = this.addMarker();
                    createdMarker.lat = mouseArgs.latLng.lat();
                    createdMarker.lng = mouseArgs.latLng.lng();
                    latlng = this.marker.lat + ',' + this.marker.lng;
                    this.marker = {lat: this.marker.lat, lng: this.marker.lng}
                    this.count++;
                }
                else if(this.count === 1){
                    const createdMarker = this.addMarkers();
                    createdMarker.lat = mouseArgs.latLng.lat();
                    createdMarker.lng = mouseArgs.latLng.lng();
                    latlng = this.markers.lat + ',' + this.markers.lng;
                    this.markers = {lat: this.markers.lat, lng: this.markers.lng}
                    this.count = 0;
                }
                // latlng = '43.248369, 76.905925'
                // console.log(latlng)
                axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                    params: {
                        latlng: latlng,
                        key: 'AIzaSyBhFliSpjTKO3hamDSHMFz8JmbAj7Nwe9U'
                    }
                })
                .then(response => {
                    console.log(response)
                    console.log(this.count)
                    if(this.count === 1)
                        this.from = response.data.results[0].address_components[1].long_name + ' ' + response.data.results[0].address_components[0].long_name;
                    if(this.count === 0)
                        this.to = response.data.results[0].address_components[1].long_name + ' ' + response.data.results[0].address_components[0].long_name;
                    // this.addNewAddressHome = response.data.results[0].address_components[0].long_name;
                })
                
            },
            addMarker: function addMarker() {
                return this.marker;
            },
            addMarkers: function addMarkers() {
                return this.markers;
            },
        },     
        created () {
            this.$store.dispatch('GET_CITIES');
            this.$store.dispatch('GET_REGIONS');
        },
    }
</script>

<style scoped>

</style>