// Interfaces witht the API backend for vehicles 
export class VehicleApi {
    async getStaticVehicle() {
        try {
            const response = await fetch("https://localhost:5001/api/Vehicle/static", {
                credentials: 'include'
            });
            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.log(err);
        }
    }

    async queryAllVehicles(query: string): Promise<Array<Vehicle>> {
        try {
            const response = await fetch(`https://localhost:5001/api/Vehicle/all/${query}`, {
                credentials: 'include'
            });
            const json = await response.json();
            console.log(json);

            return json;
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    async queryNumberOfVehicles(num: string, query: string): Promise<Array<Vehicle>> {
        try {
            const response = await fetch(`https://localhost:5001/api/Vehicle/${num}/${query}`, {
                credentials: 'include'
            });
            const json = await response.json();
            console.log(json);

            return json;
        } catch (err) {
            console.log(err);

            return null;
        }
    }
}

export interface Vehicle {
    id: string,
    make: string,
    model: string,
    trim: string,
    vin: string,
    year: Number,
}