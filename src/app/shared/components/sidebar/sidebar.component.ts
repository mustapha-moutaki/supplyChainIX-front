import { Component, inject } from "@angular/core";
import { AuthService } from "../../../core/service/auth.service";
import { RouterLink } from "@angular/router";
@Component({
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    imports: [RouterLink]
})
export class SidebarComponent{
    private auth  = inject(AuthService)
    role = this.auth.getRole()
}