import { Component, computed, inject } from "@angular/core";
import { AuthService } from "../../core/service/auth.service";


@Component({
    standalone: true,
    selector:'app-dashboard',
    templateUrl:'./dashboard.component.html',
    // styleUrls:['./dashboard.component.scss']
})
export class DashboardComponent{
    private auth = inject(AuthService);
    role = computed(()=> this.auth.getRole())
}