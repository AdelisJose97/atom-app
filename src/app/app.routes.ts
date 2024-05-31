import { Routes } from "@angular/router";

import { LoginComponent } from "./modules/login/login.component";
import { TasksComponent } from "./modules/tasks/tasks.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "tasks",
        component: TasksComponent,
    }
];
