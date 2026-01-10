import { Component } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { Routes } from "@angular/router";

export const authRoutes : Routes = [
    {
        path: 'login',
        component: AuthComponent
    }
]