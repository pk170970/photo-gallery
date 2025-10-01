import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDialog } from './photo-dialog';

describe('PhotoDialog', () => {
  let component: PhotoDialog;
  let fixture: ComponentFixture<PhotoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
