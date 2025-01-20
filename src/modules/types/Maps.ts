export type Suggestion = {
  name: string,
  name_preferred: string,
  mapbox_id: string,
  feature_type: string,
  address: string,
  full_address: string,
  place_formatted: string,
  context: {
    country: {
      name: string,
      country_code: string,
      country_code_alpha_3: string
    },
    postcode: {
      id: string,
      name: string
    },
    place: {
      id: string,
      name: string
    },
    street: {
      name: string
    }
  },
  language: string,
  maki: string,
  poi_category: string[],
  poi_category_ids: string[],
  external_ids: {
    dataplor: string
  },
  metadata: Object
}


export type MapFeature = {
  type: string,
  geometry: {
    coordinates: number[],
    type: string
  },
  properties: {
    name: string,
    mapbox_id: string,
    feature_type: string,
    address: string,
    full_address: string,
    place_formatted: string,
    context: {
      country: {
        id: string,
        name: string,
        country_code: string,
        country_code_alpha_3: string
      },
      postcode: {
        id: string,
        name: string
      },
      place: {
        id: string,
        name: string
      },
      locality: {
        id: string,
        name: string
      },
      address: {
        id: string,
        name: string,
        address_number: string,
        street_name: string
      },
      street: {
        id: string,
        name: string
      }
    },
    coordinates: {
      latitude: number,
      longitude: number,
      routable_points: [
        {
          name: string,
          latitude: number,
          longitude: number
        }
      ]
    },
    language: string,
    maki: string,
    poi_category: string[],
    poi_category_ids: string[],
    external_ids: {},
    metadata: {
      wheelchair_accessible: boolean
    },
    operational_status: string
  }
}