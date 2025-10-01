import { Component, input, output, OnInit, Inject, computed, signal, HostListener } from '@angular/core';
import { Photo } from '../../models/photo.interface';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'photo-dialog',
  imports: [],
  templateUrl: './photo-dialog.html',
  styleUrl: './photo-dialog.scss',
})
export class PhotoDialogComponent implements OnInit {
  initialIndex = input.required<number>();
  closeModalEvent = output<boolean>();
  allPhotos = signal<Photo[]>([]);
  currentIndex = signal<number>(0);
  photoInfo = computed(()=>{
    return this.allPhotos().length > 0 ? this.allPhotos()[this.currentIndex()] : null;
  });

  constructor(public photoService: PhotoService) {}

  closeModal(): void {
    this.closeModalEvent.emit(true);
  }

  ngOnInit(): void {
    this.allPhotos.set(this.photoService.photos());
    this.currentIndex.update(this.initialIndex);
  }

  previousPhotoInfo(): void {
    if (this.currentIndex() <= 0) {
      console.log('Cannot go back as this is first photo');
      return;
    }
    this.currentIndex.set(this.currentIndex()-1);
  }

  nextPhotoInfo(): void {
    if(this.currentIndex() === this.allPhotos().length-1){
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
