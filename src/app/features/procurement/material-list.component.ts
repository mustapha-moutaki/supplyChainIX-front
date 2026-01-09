// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MaterialApi } from '../../api/material.api';
// import { RawMaterial } from '../../core/models/material.model';

// @Component({
//   selector: 'app-material-list',
//   standalone: true,
//   imports: [CommonModule], // import CommonModule for ngIf and ngFor
//   template: `
//     <h2> RawMaterial List </h2>
    
//    <!-- display loading message while materials are being fetched -->
//     <div *ngIf="materials.length === 0">Loading ...</div>

//     <ul>
//       <li *ngFor="let item of materials">
//         {{ item.name }} - quantity: {{ item.quantity }} {{ item.unit }}
//         <span *ngIf="item.quantity <= item.criticalLevel" style="color: red;">
//           ( stock criticalLevel !)
//         </span>
//       </li>
//     </ul>
//   `
// })
// export class MaterialListComponent implements OnInit { // implement OnInit for lifecycle hook
//   private materialApi = inject(MaterialApi); // inject the MaterialApi service
//   materials: RawMaterial[] = [];

//   ngOnInit() {
//     //when the component initializes, fetch the materials
//     this.materialApi.getAll().subscribe({
//       next: (data) => {
//         this.materials = data;
//         console.log('Data success', data);
//       },
//       error: (err) => {
//         console.error('Error happend loading data ', err);
//       }
//     });
//   }
// }