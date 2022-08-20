import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApartmentsComponent } from './user-apartments.component';

describe('UserApartmentsComponent', () => {
  let component: UserApartmentsComponent;
  let fixture: ComponentFixture<UserApartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApartmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
