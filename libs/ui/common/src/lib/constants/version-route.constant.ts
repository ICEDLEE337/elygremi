import { Route } from "@angular/router";
import { VersionComponent } from "../components/version/version.component";

export const versionRoute: Route = {
    path: 'version', component: VersionComponent, pathMatch: 'full'
};