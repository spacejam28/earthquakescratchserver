class EarthquakeAlerts {
    getInfo() {
        return {
            id: 'earthquakeAlerts',
            name: 'Earthquake Alerts',
            blocks: [
                {
                    opcode: 'getLatestEarthquake',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'latest earthquake',
                    disableMonitor: true
                }
            ]
        };
    }

    async getLatestEarthquake() {
        try {
            const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
            const data = await response.json();
            const latestEarthquake = data.features[0];
            const magnitude = latestEarthquake.properties.mag;
            const place = latestEarthquake.properties.place;
            return `Magnitude ${magnitude} earthquake at ${place}`;
        } catch (error) {
            console.error('Error fetching earthquake data:', error);
            return 'Error fetching data';
        }
    }
}

Scratch.extensions.register(new EarthquakeAlerts());
