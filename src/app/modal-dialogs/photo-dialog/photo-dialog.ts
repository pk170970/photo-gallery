import { Component, input, output, OnInit, Inject, computed, signal, HostListener, inject, effect } from '@angular/core';
import { Photo } from '../../models/photo.interface';
import { PhotoService } from '../../services/photo.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'photo-dialog',
  imports: [],
  templateUrl: './photo-dialog.html',
  styleUrl: './photo-dialog.scss',
})
export class PhotoDialogComponent {
  photoService = inject(PhotoService);
  likeService = inject(LikeService);

  initialIndex = input.required<number>();
  closeModalEvent = output<boolean>();
  currentIndex = signal<number>(0);
  photoInfo = computed(()=>{
    return this.photoService.photos().length > 0 ? this.photoService.photos()[this.currentIndex()] : null;
  });

  constructor(){
    effect(()=>{
      this.currentIndex.set(this.initialIndex());
    })
  }


  closeModal(): void {
    this.closeModalEvent.emit(true);
  }

  toggleLike(id:number):void{
    this.likeService.toggleLike(id);
    this.closeModal();
  }

  previousPhotoInfo(): void {
    if (this.currentIndex() <= 0) {
      console.log('Cannot go back as this is first photo');
      return;
    }
    this.currentIndex.set(this.currentIndex()-1);
  }

  nextPhotoInfo(): void {
    if(this.currentIndex() === this.photoService.photos().length-1){
      console.log('We are done with all the photos');
      return;
    }
    this.currentIndex.set(this.currentIndex()+1);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event:KeyboardEvent):void{
    if(event.key === "Escape"){
      this.closeModal();
    }
    if(event.key === "ArrowLeft"){
      this.previousPhotoInfo();
    }
    if(event.key === "ArrowRight"){
      this.nextPhotoInfo();
    }
  }
}
