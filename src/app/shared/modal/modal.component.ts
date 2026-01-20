import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  @Input() open = false; // the parent controller
  @Output() close = new EventEmitter<void>(); 


  // for edit
  
  onClose(){
    this.close.emit();
  }

}
