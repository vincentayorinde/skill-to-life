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

  it('primary variant has correct Material style classes', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLElement;
    expect(button.className).toContain('bg-ns-primary');
    expect(button.className).toContain('text-white');
    expect(button.className).toContain('rounded-ns');
  });

  it('secondary variant uses outlined Material style', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLElement;
    expect(button.className).toContain('text-ns-primary');
    expect(button.className).toContain('border-ns-border');
  });

  it('ghost variant has no border and transparent bg', () => {
    fixture.componentRef.setInput('variant', 'ghost');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLElement;
    expect(button.className).toContain('bg-transparent');
    expect(button.className).toContain('text-ns-primary');
  });

  it('success variant has green bg', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLElement;
    expect(button.className).toContain('bg-ns-success');
  });

  it('danger variant has red bg', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLElement;
    expect(button.className).toContain('bg-ns-danger');
  });

  it('disabled button is not clickable', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'))
      .nativeElement as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('renders as anchor when href is provided', () => {
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();
  });
});
