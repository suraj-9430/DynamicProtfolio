import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginPage } from './login-page';
import { Loginservice } from './Service/loginservice';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLoginService: jasmine.SpyObj<Loginservice>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLoginService = jasmine.createSpyObj('Loginservice', ['OtpReq', 'Login', 'createUser']);

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Loginservice, useValue: mockLoginService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.loginpageloading).toBe(true);
    expect(component.newregistration).toBe(false);
    expect(component.otpsent).toBe(false);
    expect(component.inceaserow).toBe(1);
    expect(component.projects.length).toBe(1);
  });

  it('should toggle registration view', () => {
    expect(component.newregistration).toBe(false);
    component.newreg();
    expect(component.newregistration).toBe(true);
    expect(component.loginpageloading).toBe(false);
    
    component.newreg();
    expect(component.newregistration).toBe(false);
    expect(component.loginpageloading).toBe(true);
  });

  it('should add new work experience row', () => {
    const initialRow = component.inceaserow;
    component.addnewrow();
    expect(component.inceaserow).toBe(initialRow + 1);
  });

  it('should not exceed 4 work experience rows', () => {
    component.inceaserow = 4;
    component.addnewrow();
    expect(component.inceaserow).toBe(4);
  });

  it('should delete work experience row', () => {
    component.inceaserow = 2;
    component.deleterow();
    expect(component.inceaserow).toBe(1);
  });

  it('should add project', () => {
    const initialLength = component.projects.length;
    component.addProject();
    expect(component.projects.length).toBe(initialLength + 1);
  });

  it('should remove project', () => {
    component.projects = [
      { year: '', title: '', descriptions: ['', '', ''], sitelink: '' },
      { year: '', title: '', descriptions: ['', '', ''], sitelink: '' }
    ];
    const initialLength = component.projects.length;
    component.removeProject(0);
    expect(component.projects.length).toBe(initialLength - 1);
  });

  it('should not remove last project', () => {
    component.projects = [{ year: '', title: '', descriptions: ['', '', ''], sitelink: '' }];
    const initialLength = component.projects.length;
    component.removeProject(0);
    expect(component.projects.length).toBe(initialLength);
  });

  it('should check password length', () => {
    component.selectedReg.password = 'short';
    component._checkpassword();
    expect(component.passwordlength).toBe(false);

    component.selectedReg.password = 'longpassword123';
    component._checkpassword();
    expect(component.passwordlength).toBe(true);
  });

  it('should match passwords', () => {
    component.selectedReg.password = 'password123';
    component.selectedReg.cofirmpassword = 'password123';
    component._checkpassword();
    expect(component.passwordmatched).toBe(true);

    component.selectedReg.cofirmpassword = 'different';
    component._checkpassword();
    expect(component.passwordmatched).toBe(false);
  });
});
