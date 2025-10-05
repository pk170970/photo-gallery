import { computed, inject, Injectable, signal } from '@angular/core';
import { PhotoService } from './photo.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private photoService = inject(PhotoService);

  // In-memory storage: Signal with Set for fast lookups
  private photoLikeIds = signal<Set<number>>(new Set<number>());

  likedCount = computed(() => this.photoLikeIds().size);

  constructor() {
    //Load persistent likes on startup
    this.loadLikes();
  }

  public isLiked(photoId:number){
    return this.photoLikeIds().has(photoId);
  }

  // Get array of liked IDs (for filtering, returns number[])
  getLikedPhotoIds(): number[] {
    return Array.from(this.photoLikeIds());
  }

  public toggleLike(photoId:number):void{
    const currentLikes = new Set<number>(this.photoLikeIds());
    if(currentLikes.has(photoId)){
      currentLikes.delete(photoId);
    }else{
      currentLikes.add(photoId);
    }

    //update signal which trigger UI update everywhere
    this.photoLikeIds.set(currentLikes);
    this.photoService.updateLikesData(photoId, currentLikes.has(photoId));
    this.saveLikes();
  }

  private loadLikes(): void {
    try {
      const savedLikes = localStorage.getItem('photoLikes');
      if (savedLikes) {
        const likesArray = JSON.parse(savedLikes) as number[];
        const likesSet = new Set<number>(likesArray);
        this.photoLikeIds.set(likesSet);
        console.log('Likes loaded:', likesArray.length);
      }
    } catch (error) {
      console.error('Failed to load likes:', error);
    }
  }

  private saveLikes():void{
    try {
      const likesArray = Array.from(this.photoLikeIds());
      localStorage.setItem('photoLikes', JSON.stringify(likesArray));
      console.log('Likes saved:', likesArray.length);
    } catch (error) {
      console.error('Failed to save likes:', error);
    }
  }
}
