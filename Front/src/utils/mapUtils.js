export const transformGeoJsonToPath = (geometry) => {
    if (!geometry) return [];

    const { type, coordinates } = geometry;

    // Polygon
    if (type === "Polygon") {
        return coordinates[0].map(([lng, lat]) => ({
        lat,
        lng,
        }));
    }

    // MultiPolygon
    if (type === "MultiPolygon") {
        return coordinates[0][0].map(([lng, lat]) => ({
        lat,
        lng,
        }));
    }

    return [];
};
