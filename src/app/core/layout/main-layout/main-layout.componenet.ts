import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";


@Component({
    standalone: true,
    selector:'app-main-layout',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
    templateUrl:'./main-layout.component.html',
    // styleUrls:['./main-layout.component.scss']
})

export class MianLayoutComponent {}