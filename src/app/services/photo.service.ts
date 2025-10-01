import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiPhoto, Photo } from '../models/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private allPhotos = signal<Photo[]>([]);
  isLoading = signal(false);
  isLoadingMore = signal(false);
  hasError = signal(false);
  currentPage = signal(1);
  hasMorePhotos = signal(true);
  
  searchQuery = signal<string>('');
  public photos = computed(()=>{
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.allPhotos();
    if(!query) return all;

    return all.filter(photo => photo.author.toLowerCase().includes(query));
  });

  totalPhotos = computed(() => this.photos().length);
  totalLoadedPhotos = computed(()=> this.allPhotos().length);

  private readonly API_URL = 'https://picsum.photos/v2/list';
  private readonly PAGE_SIZE = 9;

  constructor(private http: HttpClient) { }

  setSearchQuery(query:string){
    console.log('🔍 Search query set to:', query);
    this.searchQuery.set(query);
  }

  loadInitialPhotos(): Observable<Photo[]> {
    console.log('start loading photos');
    if (this.isLoading()) {
      return throwError(() => new Error('Already loading'));
    }
    //Reset state
    this.allPhotos.set([]);
    this.isLoading.set(true);
    this.hasError.set(false);
    this.currentPage.set(1);
    return this.fetchPhotosFromAPI(1).pipe(
      tap(photos => {
        this.allPhotos.set(photos);
        this.hasMorePhotos.set(photos.length >= this.PAGE_SIZE);
        this.isLoading.set(false);
      }),
      catchError(error => this.handleError(error))
    );
  }

  clearSearch(): void {
    console.log('🧹 Clearing search');
    this.searchQuery.set('');
  }

  loadMorePhotos(): Observable<Photo[]> {
    if (!this.hasMorePhotos() || this.isLoadingMore()) return throwError(() => new Error('Cannot load more or photos are still loading'));

    this.isLoadingMore.set(true);
    const nextPage = this.currentPage() + 1;
    return this.fetchPhotosFromAPI(nextPage).pipe(
      tap(newPhotos => {
        this.allPhotos.update(current => [...current, ...newPhotos]);
        this.currentPage.set(nextPage);
        this.hasMorePhotos.set(newPhotos.length >= this.PAGE_SIZE);
        this.isLoadingMore.set(false);
        console.log('✅ More photos loaded. Total:', this.photos().length);
      }),
      catchError(err => this.handleError(err))
    );
  }

  resetAndReload(): Observable<Photo[]> {
    console.log('🔄 Resetting and reloading...');
    return this.loadInitialPhotos();
  }

  fetchPhotosFromAPI(page: number): Observable<Photo[]> {
    const url = `${this.API_URL}?page=${page}&limit=${this.PAGE_SIZE}`;
    console.log('api call:', url);
    return this.http.get<any[]>(url).pipe(
      map(apiPhotos => this.transformPhotos(apiPhotos))
    );
  }

  private transformPhotos(apiPhotos: ApiPhoto[]): Photo[] {
    return apiPhotos.map((apiPhoto, index) => ({
      id: parseInt(apiPhoto.id),
      title: `Beautiful photo ${apiPhoto.id}`,
      author: apiPhoto.author,
      likes: Math.floor(Math.random() * 500) + 50,
      views: Math.floor(Math.random() * 2000) + 100,
      image: `https://picsum.photos/id/${apiPhoto.id}/400/300`
    }));
  }

  private handleError(err: any): Observable<never> {
    console.error('API error', err);
    this.hasError.set(true);
    this.isLoading.set(false);
    this.isLoadingMore.set(false);
    return throwError(() => err);
  }

  // public debounceService(func : Function, delay: number){
  //   console.log('debounce service called');
  //   let timer : any = null;
  //   return (input:string)=>{
  //     console.log('returning function with timer', timer);
  //     if(timer){
  //       clearTimeout(timer);
  //     }
  //     timer = setTimeout(() => {
  //        func(input); 
  //     }, delay);
  //   }
  // }

}
