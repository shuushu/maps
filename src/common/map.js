// "version": "mapbox-gl 0.53.1",
import mapboxgl from 'mapbox-gl';
import MapPOP from '@/components/MapPOP.vue';
import { Vue } from 'vue-property-decorator';
import $axios from '@/service/axiosMap';
// 이미지 처리 플러그인
import Jimp from 'jimp';
// image resource
const imgPin = require('@/assets/ico/network.png');
export class MapAPI {
    init(dom) {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1dXNodSIsImEiOiJjanN3amoyZHYwZnI0M3lvZHV0MTVwb2FkIn0.x8bYu_ex65VY7kjDcbDumA';
        this.maps = new mapboxgl.Map({
            container: dom,
            style: 'http://map.oditto.com/base.json',
            zoom: 12,
            center: [126.9754552, 37.5538168],
            minZoom: 6,
            maxBounds: [
                [113.999034717447, 26.0040346059121],
                [141.996788512063, 44.3355299849598],
            ],
        });
        this.maps.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
        }));
        Vue.prototype.$mapbox = this;
        return this.maps;
    }
    // 맵 요소 삭제
    clearMapLayer(name) {
        if (this.maps.hasImage(name)) {
            this.maps.removeImage(name);
        }
        if (this.maps.getLayer(name)) {
            this.maps.removeLayer(name);
            this.maps.removeSource(name);
        }
        if (this.popup) {
            this.popup.remove();
        }
    }
    ;
    // BASE맵 요소 클릭 E
    clickPOI(e, app) {
        const features = this.maps.queryRenderedFeatures(e.point);
        const { poi_id, name } = features[0].properties;
        const { layout } = features[0].layer;
        const { coordinates } = features[0].geometry;
        this.clearMapLayer('click');
        if (poi_id) {
            let type = layout['icon-image'];
            let isCheck = false;
            const filterStr = ['highway', 'metropolitan', 'seoul_base', 'Feature'];
            for (const row of filterStr) {
                if (row === type) {
                    isCheck = true;
                }
            }
            if (type === undefined || type.length === 0 || isCheck) {
                return false;
            }
            // 이미지 아이콘 조정
            // 지하철
            if (type.indexOf('s_') === 0) {
                type = 'subway';
            }
            else if (features[0].sourceLayer === 'landmark') {
                type = 'sightseeing';
            }
            const geoJson = this.createFeature({
                prefix: 'click',
                content: [{
                        poiId: poi_id,
                        navWgs84Lon: coordinates[0],
                        navWgs84Lat: coordinates[1],
                        stickerFile: type,
                        displayName: name,
                    }],
            });
            // ID overwrite
            geoJson.data.features[0].properties.ID = 'click';
            this.createLayer(geoJson, (layer) => {
                layer.layout['icon-size'] = 0;
            });
            const animateMarker = (options) => {
                const start = performance.now();
                const animate = (time) => {
                    let timeFraction = (time - start) / options.duration;
                    if (timeFraction > 1) {
                        timeFraction = 1;
                    }
                    options.draw(options.timing(timeFraction));
                    const range = Math.round(timeFraction * 100);
                    if (range <= 70) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            };
            // 무분별한 클릭을 막기위해
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                animateMarker({
                    duration: 600,
                    timing: (timeFraction) => {
                        return Math.pow(timeFraction, 2);
                    },
                    draw: (progress) => {
                        const max = 0.5;
                        let value = Number(progress.toFixed(3));
                        value = value >= max ? max : value;
                        if (this.maps.getLayer('click')) {
                            this.maps.setLayoutProperty('click', 'icon-size', value);
                        }
                    },
                });
            }, 100);
            // ajax 맵정보 요청
            $axios.clickPoiDetail({
                poi: poi_id,
                navSeq: 1,
                params: {
                    gpsLat: coordinates[1],
                    gpsLon: coordinates[0],
                },
            }).then((res) => {
                if (res) {
                    // create the popup
                    const templetPop = new Vue({
                        components: { MapPOP },
                        template: `<MapPOP v-bind="data" />`,
                        data() {
                            return { data: { ...res, poi: poi_id } };
                        },
                    }).$mount();
                    this.popup = new mapboxgl.Popup({ offset: 30 }).setDOMContent(templetPop.$el);
                    this.popup.setLngLat(coordinates).addTo(this.maps);
                    this.maps.easeTo({
                        center: coordinates,
                    });
                }
            });
        }
    }
    ;
    // 이미지 불러와서 레이어그리기
    loadImage(params) {
        return new Promise((resolve) => {
            const { ID, src, geo, layout } = params;
            this.maps.loadImage(src, (error, image) => {
                if (image) {
                    this.maps.addImage(ID, image);
                    this.maps.addSource(ID, geo);
                    this.maps.addLayer(layout);
                    resolve();
                }
            });
        });
    }
    // 이미지 흑백으로 바꾸기
    convertGray(path) {
        return new Promise((resolve) => {
            return Jimp.read(path).then((image) => {
                image.grayscale().getBase64(Jimp.MIME_PNG, (err, src) => {
                    resolve(src);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    // 레이어만들기 E
    async createLayer(geo, setLayerFunc) {
        for (let i = 0, contSize = geo.data.features.length; i < contSize; i += 1) {
            const target = geo.data.features[i];
            const { icon, ID, type } = target.properties;
            const layout = this.getLayer();
            let imgPath;
            layout.id = ID;
            layout.source = ID;
            if (setLayerFunc) {
                setLayerFunc(layout);
            }
            switch (type) {
                case 'click':
                    imgPath = require(`@/assets/ico/${icon}.png`);
                    break;
                case 'WISH':
                    imgPath = require(`@/assets/sticker/c_${icon.substr(2)}.png`);
                    break;
                case 'REVIEWS':
                    imgPath = require(`@/assets/sticker/c_${icon.substr(2)}.png`);
                    break;
                default:
                    imgPath = imgPin;
                    break;
            }
            // wish일떄만 흑백 아이콘
            if (type === 'WISH') {
                this.convertGray(imgPath).then((grayImg) => {
                    this.loadImage({ ID, geo, layout, src: grayImg });
                });
            }
            else {
                this.loadImage({ ID, geo, layout, src: imgPath });
            }
        }
    }
    // 구성품만들기 E
    createFeature(res) {
        const { prefix } = res;
        const geoJson = this.getGeoJson();
        // 중복체크
        let temp = '';
        res.content.forEach((item) => {
            const feature = this.getFeature();
            const layerID = prefix ? `${prefix}_${item.poiId}` : item.poiId;
            const lon = item.navWgs84Lon || item.centerWgs84Lon;
            const lat = item.navWgs84Lat || item.centerWgs84Lat;
            if (temp === layerID) {
                return;
            }
            feature.geometry.coordinates = [lon, lat];
            feature.properties['type'] = prefix;
            feature.properties['ID'] = layerID;
            feature.properties['poi'] = item.poiId;
            feature.properties['icon'] = item.stickerFile;
            feature.properties['displayName'] = item.displayName;
            temp = layerID;
            geoJson.data.features.push(feature);
        });
        return geoJson;
    }
    // 마커
    createMarker(data) {
        const { poi, size, icon } = data;
        const el = document.createElement('div');
        const imgs = document.createElement('img');
        const ani1 = document.createElement('span');
        const ani2 = document.createElement('span');
        try {
            imgs.src = require(`@/assets/sticker/c_${icon.substr(2)}.png`);
        }
        catch (e) {
            imgs.src = imgPin;
            imgs.style.width = '34px';
        }
        el.className = 'marker';
        ani1.className = 'ani1';
        ani2.className = 'ani2';
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.appendChild(imgs);
        el.appendChild(ani1);
        el.appendChild(ani2);
        if (this.marker) {
            this.marker.remove();
        }
        // add marker to map
        this.marker = new mapboxgl.Marker(el)
            .setLngLat(poi)
            .addTo(this.maps);
    }
    //
    getGeoJson() {
        return {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [],
            },
        };
    }
    getLayer() {
        return {
            id: 'pk',
            source: 'pk',
            type: 'symbol',
            layout: this.getLayout(),
        };
    }
    getFeature() {
        return {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [0, 0],
            },
        };
    }
    getLayout() {
        return {
            'icon-image': ['get', 'ID'],
            'icon-anchor': 'bottom',
            'icon-size': 0.5,
            'text-field': ['get', 'displayName'],
            'text-anchor': 'top',
            'symbol-placement': 'point',
            'text-size': 11,
            'text-offset': [0, 0.5],
        };
    }
}
//# sourceMappingURL=map.js.map