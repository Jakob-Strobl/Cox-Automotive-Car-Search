import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <div class="row u-items-flex-end">
            <div id="cox-logo" class="col-6 ignore-screen">
              <img src="../assets/Cox-Logo.png"></img>
            </div>
            <div class="col-6 ignore-screen">
              <h1>Vehicle Search</h1>
            </div>
          </div>
        </header>

        {/* Search bar and Records per page */}
        <section></section>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
