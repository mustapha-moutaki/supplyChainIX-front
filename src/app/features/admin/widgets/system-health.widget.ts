import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-system-health-widget',
    template: `
        <div class="widget">
            <h3>System Health</h3>
            <p>Status: <span [class.healthy]="isHealthy">{{ status }}</span></p>
            <button (click)="refresh()">Refresh</button>
        </div>
    `,
    styles: [`
        .widget {
            border: 1px solid #ccc;
            padding: 16px;
            border-radius: 4px;
        }
        .healthy {
            color: green;
        }
    `]
})
export class SystemHealthWidget implements OnInit {
    status: string = 'Loading...';
    isHealthy: boolean = false;

    ngOnInit() {
        this.checkHealth();
    }

    checkHealth() {
        // Simulate API call
        this.isHealthy = Math.random() > 0.5;
        this.status = this.isHealthy ? 'Healthy' : 'Warning';
    }

    refresh() {
        this.checkHealth();
    }
}