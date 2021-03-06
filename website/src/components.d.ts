/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Vehicle, VehicleApi } from "./services/vehicle";
export namespace Components {
    interface AppRoot {
    }
    interface AppTable {
        "api": VehicleApi;
        "found_error": boolean;
        "records_selected": string;
        "search_query": string;
        "vehicles": Vehicle[];
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAppTableElement extends Components.AppTable, HTMLStencilElement {
    }
    var HTMLAppTableElement: {
        prototype: HTMLAppTableElement;
        new (): HTMLAppTableElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "app-table": HTMLAppTableElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface AppTable {
        "api"?: VehicleApi;
        "found_error"?: boolean;
        "records_selected"?: string;
        "search_query"?: string;
        "vehicles"?: Vehicle[];
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "app-table": AppTable;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "app-table": LocalJSX.AppTable & JSXBase.HTMLAttributes<HTMLAppTableElement>;
        }
    }
}
