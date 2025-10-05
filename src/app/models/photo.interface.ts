// src/app/models/photo.interface.ts - MINIMAL INTERFACES
export interface Photo {
  id: number;
  author: string;
  likes: number;
  views: number;
  image: string;
  isLiked:boolean;
}

export interface ApiPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
}
