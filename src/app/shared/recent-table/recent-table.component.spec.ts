import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTableComponent } from './recent-table.component';

describe('RecentTableComponent', () => {
  let component: RecentTableComponent;
  let fixture: ComponentFixture<RecentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
