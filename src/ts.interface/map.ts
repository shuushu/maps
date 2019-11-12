// MAP API에서 사용하는 인터페이스
// The GeoJSON Specification (RFC 7946)
// geo 표준 규격
export interface TsFeature {
	type: string;
	properties: {
		ID: string | number;
		poi: string | number;
		icon: string;
		displayName: string;
		type: string;
	};
	geometry: {
		type: string;
		coordinates: number[],
	}
}

// https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson
// 맵레이어 그리기 큰틀
export interface TsResourceGeoJson {
	type: string;
	data: {
		type: string;
		features: TsFeature [];
	}
}


// https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers
// 맵레이어 옵션
export interface TsLayers {
	'icon-anchor'?: string;
	'icon-size'?: number;
	'text-field'?: any;
	'text-anchor'?: string;
	'text-size'?: number;
	'symbol-placement'?: string;
	'text-offset'?: number [];
	'icon-image'?: string;
}

interface FeatureResource {
	'poiId': number
	'navWgs84Lon': number
	'navWgs84Lat': number
	'stickerFile': string
	'displayName': string
}

export interface TsCreateLayer {
	prefix: string;
	content: any [];
}

export interface TsMarker {
	poi: string [];
	icon: string;
	size: number;
}
