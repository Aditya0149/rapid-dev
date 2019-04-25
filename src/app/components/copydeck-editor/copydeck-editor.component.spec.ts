import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopydeckEditorComponent } from './copydeck-editor.component';

describe('CopydeckEditorComponent', () => {
  let component: CopydeckEditorComponent;
  let fixture: ComponentFixture<CopydeckEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopydeckEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopydeckEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
