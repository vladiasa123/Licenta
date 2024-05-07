import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWrittenFormsComponent } from './my-written-forms.component';

describe('MyWrittenFormsComponent', () => {
  let component: MyWrittenFormsComponent;
  let fixture: ComponentFixture<MyWrittenFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyWrittenFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyWrittenFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
