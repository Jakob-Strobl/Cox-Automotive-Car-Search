import { Component, h, Prop } from '@stencil/core';
import { VehicleApi, Vehicle } from '../../services/vehicle'

@Component({
  tag: 'app-table',
  styleUrl: 'app-table.css',
  shadow: false,
})
export class AppTable {
  @Prop() api: VehicleApi = new VehicleApi();
  @Prop({ mutable: true }) vehicles = Array<Vehicle>();
  @Prop({ mutable: true }) found_error = false;

  async componentDidLoad() {
    let vehicles = await this.api.getVehicles();

    if (vehicles == null) {
      // Create Error Message
      this.found_error = true;
    } else {
      this.vehicles = vehicles;
    }
  }

  async handleNumberOfCarsChange(event: Event) {
    // Get the new value
    let value = (document.getElementById("numberOfCars") as HTMLInputElement).value;

    if (value == null) {
      this.found_error = true;
      return;
    }

    let vehicles;
    if (value.toLowerCase() == "all") {
      vehicles = await this.api.getAllVehicles();
    } else {
      vehicles = await this.api.getVehicles(value);
    }

    if (vehicles == null) {
      // Create Error Message
      this.found_error = true;
    } else {
      this.vehicles = vehicles;
    }
  }

  render() {
    return (
      <div class="app-table">
        {/* Search bar and Records per page */}
        <div class="row u-items-flex-end">
          <div class="col-8 v-pad">
            <input type="text" placeholder="Search.."></input>
          </div>

          <div class="col-4 v-pad">
            <div class="nested-row u-items-center">
              <div class="col-6 justify-right ignore-screen">
                <p class="no-margin"><b>Number of Records</b></p>
              </div>
              <div class="col-4 ignore-screen">
                <label htmlFor="numberOfCars"></label>

                <select name="numberOfCars" id="numberOfCars" onChange={(e) => this.handleNumberOfCarsChange(e)} >
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table generated from results */}
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
