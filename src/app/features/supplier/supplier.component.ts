import { Component, OnInit, signal, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../core/service/supplier.service';
import { Supplier } from '../../core/models/supplier.model';
import { CreateSupplierComponent } from '../../shared/modal/supplier-modals/create-modal/create-supplier.component';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, CreateSupplierComponent],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  private supplierService = inject(SupplierService);

  suppliers = signal<Supplier[]>([]);
  loading = signal<boolean>(false);

  // THIS controls the modal
  isCreateModalOpen = signal(false);

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading.set(true);
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  //  open modal
  openCreateModal() {
     this.selectedSupplier.set(null);  
    this.isCreateModalOpen.set(true);
  }

  //  close modal
  closeCreateModal() {
    this.isCreateModalOpen.set(false);
  }

  // to update the list
  onSupplierCreated(supplier: Supplier) {

   this.suppliers.update(list => [...list, supplier]);
}

  deleteSupplier(id: string | undefined) {
      if (!id) return;

  this.supplierService.deleteSupplier(id).subscribe({
    next: () => {
  
      this.suppliers.update(list => list.filter(s => s.id !== id));
    
    },
    error: (err) => {
      console.log("Failed to delete this supplier", err);
    }
  });
}


// edit supplier
editSupplier(id:string, supplier:Supplier){
  this.supplierService.editSupplier(id, supplier).subscribe({
    next: ()=>{
        this.loadSuppliers();
        console.log("the data refreshed successfully ")
    },
    error:(err)=>{
      console.log("Failed to update the data of this user ", err)
    }
  })
}


selectedSupplier = signal<Supplier | null>(null);
openEditModal(supplier: Supplier) {
  this.selectedSupplier.set(supplier);   // store selected supplier
  this.isCreateModalOpen.set(true);      // open modal
}

}
