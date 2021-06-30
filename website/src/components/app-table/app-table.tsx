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
  @Prop({ mutable: true }) records_selected: string = "10";
  @Prop({ mutable: true }) search_query: string = "";

  async componentDidLoad() {
    await this.queryVehicles();
  }

  async handleNumberOfCarsChange(event: Event) {
    // Get the new value
    let value = (document.getElementById("number-cars") as HTMLInputElement).value;

    if (value == null) {
      this.found_error = true;
    } else {
      this.records_selected = value.toLowerCase();
      this.queryVehicles();
    }
  }

  async handleSearch(event: Event) {
    let query = (document.getElementById("search-bar") as HTMLInputElement).value;

    if (query == null) {
      this.found_error = true;
    } else {
      this.search_query = query;
      this.queryVehicles();
    }
  }

  async queryVehicles() {
    let vehicles;

    if (this.records_selected == "all") {
      vehicles = await this.api.queryAllVehicles(this.search_query);
    } else {
      vehicles = await this.api.queryNumberOfVehicles(this.records_selected, this.search_query);
    }

    if (vehicles == null) {
      this.found_error = true;
    } else {
      this.found_error = false;
      this.vehicles = vehicles;
    }
  }

  render() {
    let error_message;
    if (this.found_error) {
      error_message = <div class="row u-justify-center" >
                        <div class="col-6 h-10 bg-danger">
                          <p>There was an error processing your request. Please try again, or contact ...</p>
                        </div>
                      </div>
    } else {
      error_message = null;
    }

    return (
      <div class="app-table">
        { error_message }

        {/* Search bar and Records per page */}
        <div class="row u-items-flex-end">
          <div class="col-8 v-pad">
            <div class="nested-row u-items-center">
              <div class="col-8 ignore-screen">
                <input id="search-bar" type="text" placeholder="Search.."></input>
              </div>
              <div class="col-4 ignore-screen">
                <button class="m-0" onClick={(e) => this.handleSearch(e) }>Search</button>
              </div>
            </div>
          </div>

          <div class="col-4 v-pad">
            <div class="nested-row u-items-center">
              <div class="col-6 justify-right ignore-screen">
                <p class="no-margin"><b>Number of Records</b></p>
              </div>
              <div class="col-4 ignore-screen">
                <label htmlFor="numberOfCars"></label>

                <select name="numberOfCars" id="number-cars" onChange={(e) => this.handleNumberOfCarsChange(e)} >
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
