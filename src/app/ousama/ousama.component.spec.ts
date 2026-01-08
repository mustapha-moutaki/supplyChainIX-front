import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OusamaComponent } from './ousama.component';

describe('OusamaComponent', () => {
  let component: OusamaComponent;
  let fixture: ComponentFixture<OusamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OusamaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OusamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
