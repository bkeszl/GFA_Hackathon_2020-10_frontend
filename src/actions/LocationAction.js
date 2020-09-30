export const getNeedyLocation = (
    lat,
    lng
) => {
    return {
        type: 'GET_NEEDY_LOCATION',
        lat,
        lng
    };
};

export const clearNeedyLocation = () => {
    return {
        type: 'CLEAR_NEEDY_LOCATION',
        lat: undefined,
        lng: undefined
    };
};