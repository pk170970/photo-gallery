import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Photo } from '../../models/photo.interface';

@Component({
  selector: 'photo-card',
  imports: [CommonModule],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss'
})
export class PhotoCardComponent{
  // @Input({ required: true }) photo!: Photo;
  photo = input.required<Photo>();
}
