import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStartOutline } from '@fortawesome/free-regular-svg-icons';
import { Professional } from '../models/professional';
import { ProfessionalsService } from '../services/professionals.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css'],
})
export class ProfessionalComponent implements OnInit {
  MAX_NUMBER_OF_STARS = 5;
  faStar = faStar;
  faStartOutline = faStartOutline;
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
}
