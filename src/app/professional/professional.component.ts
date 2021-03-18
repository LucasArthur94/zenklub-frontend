import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faStar,
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStartOutline } from '@fortawesome/free-regular-svg-icons';
import { Professional } from '../models/professional';
import { ProfessionalsService } from '../services/professionals.service';

const MONTHS: Record<number, string> = {
  0: 'JAN',
  1: 'FEB',
  2: 'MAR',
  3: 'APR',
  4: 'MAY',
  5: 'JUN',
  6: 'JUL',
  7: 'AUG',
  8: 'SEP',
  9: 'OCT',
  10: 'NOV',
  11: 'DEC',
};

const DAYS: Record<number, string> = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
};

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css'],
})
export class ProfessionalComponent implements OnInit {
  MAX_NUMBER_OF_STARS = 5;
  faStar = faStar;
  faStartOutline = faStartOutline;
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowCircleRight = faArrowCircleRight;
  professionalId = '';
  professional = {} as Professional;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private professionalService: ProfessionalsService
  ) {}

  ngOnInit(): void {
    this.professionalId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getProfessionalById(parseInt(this.professionalId));
  }

  // Obtem um carro pelo id
  getProfessionalById(id: number) {
    this.professionalService
      .getProfessionalById(id)
      .subscribe((professional: Professional) => {
        this.professional = professional;
      });
  }

  getNumberOfEmptyStars() {
    return this.MAX_NUMBER_OF_STARS - this.professional.rating;
  }

  getEmptyStars() {
    return Array(this.getNumberOfEmptyStars());
  }

  getStars() {
    return Array(this.professional.rating);
  }

  formatDate(date: Date) {
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
  }

  formatHourAndMinute(date: Date) {
    return `${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  getProfessionalDates() {
    if (!this.professional) return [];

    return this.professional.periods
      .sort()
      .reduce((acc: Array<{ stringDate: string; dayOfWeek: string }>, date) => {
        const parsedDate = new Date(date);

        const formattedDate = this.formatDate(parsedDate);

        if (
          acc.find((existingDate) => existingDate.stringDate === formattedDate)
        )
          return acc;

        return [
          ...acc,
          {
            stringDate: formattedDate,
            dayOfWeek: DAYS[parsedDate.getDay()],
          },
        ];
      }, []);
  }

  getSlots() {
    const professionalDates = this.getProfessionalDates();

    if (!professionalDates.length) return [];

    return professionalDates.map((savedDate) => {
      const professionalValidDates = this.professional.periods.filter(
        (date) => this.formatDate(new Date(date)) === savedDate.stringDate
      );

      return {
        ...savedDate,
        periods: professionalValidDates.map((slot) =>
          this.formatHourAndMinute(new Date(slot))
        ),
      };
    });
  }
}
