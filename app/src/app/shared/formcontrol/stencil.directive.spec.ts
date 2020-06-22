import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StencilDirective } from './stencil.directive';

@Component({
  selector: 'app-testing',
  template: '<evb-range evbStencil></evb-range>'
})
class TestingComponent { }

describe('StencilDirective', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        StencilDirective,
        TestingComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
  }));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
