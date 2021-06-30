import { Component, h, Prop } from '@stencil/core';
import { VehicleApi, Vehicle } from '../../services/vehicle'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  @Prop({ mutable: true }) vehicles = Array<Vehicle>();
  @Prop({ mutable: true }) found_error = false;

  async componentDidLoad() {
    let api = new VehicleApi();
    let vehicles = await api.getVehicles();

    if (vehicles == null) {
      // Create Error Message
      this.found_error = true;
    } else {
      this.vehicles = vehicles;
    }
  }

  render() {
    return (
      <div class="app-home">
        <div class="row">
          <table class="col-12">
            <tr id="table-header">
              <th>VIN</th>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Trim</th>
            </tr>
            { this.vehicles.map(( vehicle ) => 
                <tr>
                  <td>{ vehicle.vin }</td>
                  <td>{ vehicle.year }</td>
                  <td>{ vehicle.make }</td>
                  <td>{ vehicle.model }</td>
                  <td>{ vehicle.trim }</td>
                </tr>
            )}
          </table>
        </div>
      </div>
    );
  }
}
