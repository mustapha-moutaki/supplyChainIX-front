import { Component, EventEmitter, Input, Output,inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../../../core/models/supplier.model';
import { SupplierService } from '../../../../core/service/supplier.service';
import { subscribe } from 'diagnostics_channel';
@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule], // Important for *ngIf
  templateUrl: './create-supplier.components.html'
})
export class CreateSupplierComponent {

  private supplierService = inject(SupplierService)



  @Input() isOpen: boolean = false; // to receive open/close from parent

  // Output to tell the parent "please close me"
  @Output() close = new EventEmitter<void>();


  @Output() created = new EventEmitter<Supplier>();

  // form data 
  name ='';
  contact ='';
  email = '';
  phone = '';
  rating = 0;
  leadTime = 0;
  meterialsIds: number[] = [0];

  loading = signal(false);
  error = signal('');


  closeModal() {
    this.close.emit();
  }



  saveSupplier(){
    this.loading.set(true);
    this.error.set('');

    const supplier: Supplier ={
   
      name: this.name,
      contact: this.contact,
      email: this.email,
      phone: this.phone,
      rating : this.rating,
      leadTime: this.leadTime,
      materialIds: this.meterialsIds
    };

    this.supplierService.creatSupplier(supplier).subscribe({
      next: (res)=>{
        this.created.emit(res);
        this.loading.set(false);
        this.closeModal();
      },
      error: (err)=>{
        this.error.set('Failed to create supplier');
        this.loading.set(false);
        this.error.set(err)
      }
    });

  }
}