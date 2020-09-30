const needyLocation = {
    lat: undefined,
    lng: undefined
};

export default function locationReducer(state = needyLocation, action) {
    switch (action.type) {
        case 'GET_NEEDY_LOCATION':
            return {
                lat: action.lat,
                lng: action.lng,
            };
        case 'CLEAR_NEEDY_LOCATION':
            return {
                lat: undefined,
                lng: undefined
            };
        default:
            return {
                lat: undefined,
                lng: undefined
            };
    }
}
