import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProfessionalsService } from '../services/professionals.service';

import { ProfessionalComponent } from './professional.component';

const MOCKED_PROFESSIONAL = {
  id: 1,
  profileImage: 'url/image',
  location: 'Lisbon',
  hoursDiff: '+1',
  role: 'Psychologist',
  name: 'Professional name',
  rating: 4,
  reviews: 20,
  price: 16000,
  sessionTime: 90,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed magna at enim lacinia tempor eget at dui. Aenean euismod, urna a bibendum vulputate, arcu metus pulvinar risus, id dictum urna tortor et est. Donec varius, libero vitae cursus fermentum, ante lacus fermentum est, vel ultricies ipsum ex vel urna. Aliquam ultrices efficitur sapien id viverra. Quisque ac enim vulputate, congue leo vitae, cursus turpis. Integer ultrices bibendum arcu, in pretium arcu elementum sit amet. Sed neque nibh, accumsan id quam ac, finibus bibendum arcu. Praesent viverra sem tortor, vitae iaculis magna mattis in. Pellentesque accumsan, nunc vel vulputate lobortis, elit odio sollicitudin mi, eget molestie sapien urna vel sapien. Etiam orci turpis, malesuada et fringilla vel, efficitur nec dui. Pellentesque posuere nisl turpis, vitae bibendum quam dictum sit amet. Donec dapibus orci vel tellus pharetra, vitae finibus neque faucibus.',
  periods: [
    new Date('2021-03-17T08:00:00.000Z'),
    new Date('2021-03-17T08:30:00.000Z'),
    new Date('2021-03-18T08:00:00.000Z'),
    new Date('2021-03-18T08:30:00.000Z'),
  ],
};

describe('ProfessionalComponent', () => {
  let component: ProfessionalComponent;
  let fixture: ComponentFixture<ProfessionalComponent>;

  beforeEach(async () => {
    const mockProfessionalsService = jasmine.createSpyObj([
      'getProfessionalById',
    ]);

    mockProfessionalsService.getProfessionalById.and.returnValue(
      of(MOCKED_PROFESSIONAL)
    );

    await TestBed.configureTestingModule({
      providers: [
        { provide: ProfessionalsService, useValue: mockProfessionalsService },
      ],
      declarations: [ProfessionalComponent],
      imports: [HttpClientModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalComponent);
    component = fixture.componentInstance;
    component.professionalId = '1';
    component.professional = MOCKED_PROFESSIONAL;
    component.page = 1;
    component.totalPages = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get empty stars', () => {
    expect(component.getEmptyStars()).toEqual(Array(1));
  });

  it('should get filled stars', () => {
    expect(component.getEmptyStars()).toEqual(Array(1));
  });

  it('should get empty stars', () => {
    expect(component.getEmptyStars()).toEqual(Array(1));
  });

  it('should format date', () => {
    expect(component.formatDate(new Date('2021-03-19T18:30:00.000Z'))).toEqual(
      'MAR 19'
    );
  });

  it('should format date', () => {
    expect(
      component.formatHourAndMinute(new Date('2021-03-19T18:30:00.000Z'))
    ).toEqual('15:30');
  });

  it('should get professional dates', () => {
    expect(component.getProfessionalDates()).toEqual([
      {
        stringDate: 'MAR 17',
        dayOfWeek: 'WED',
      },
      {
        stringDate: 'MAR 18',
        dayOfWeek: 'THU',
      },
    ]);
  });
});
