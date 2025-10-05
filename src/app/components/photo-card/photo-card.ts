import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, input, ViewChild} from '@angular/core';
import { Photo } from '../../models/photo.interface';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'photo-card',
  imports: [CommonModule],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss'
})
export class PhotoCardComponent {
  private likeService = inject(LikeService);
  
  @ViewChild('heartText') private heartText!: ElementRef;
  photo = input.required<Photo>();
  isLiked = computed(()=> this.likeService.isLiked(this.photo().id));


  toggleLike(event:Event):void{
    event.stopPropagation();
    this.likeService.toggleLike(this.photo().id);
  }
}
