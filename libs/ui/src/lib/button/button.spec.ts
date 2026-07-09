import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NsButtonComponent } from './button';

@Component({
  standalone: true,
  imports: [NsButtonComponent],
  template: '<ns-button variant="primary">Start assessment</ns-button>',
})
class ButtonHostComponent {}

describe('NsButtonComponent', () => {
  let fixture: ComponentFixture<NsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsButtonComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NsButtonComponent);
  });

  it('renders projected content', async () => {
    const hostFixture = TestBed.createComponent(ButtonHostComponent);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect(hostFixture.nativeElement.textContent).toContain('Start assessment');
  });

  it('supports variants', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.className).toContain('bg-ns-success');
  });

  it('sets primary button text to white explicitly', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.className).toContain('text-white');
  });
});
