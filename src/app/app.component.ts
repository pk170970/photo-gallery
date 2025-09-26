import { Component, computed, ElementRef, HostListener, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from './services/photo.service';
import { PhotoCardComponent } from './components/photo-card/photo-card';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [CommonModule, PhotoCardComponent],
  templateUrl:'./app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly title = signal('photo-gallery-pro');

  @ViewChild('searchinput') searchInputElement!: ElementRef;

  scrollY = signal(0);
  showScrollToTop = computed(()=>this.scrollY() > 300);
  lastScrollTime: number= 0;
  searchSubject = new Subject<string>();
  destroy$ = new Subject<void>();
  onFocusMode : boolean = false;

  private readonly photosPerPage = 9;


  constructor(public photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.loadPhotos();
    this.setUpSearchQuery();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if(this.onFocusMode){
      requestAnimationFrame(()=> this.onFocus());
    }
    const now = performance.now();
    if (now - this.lastScrollTime >= 16) { // 60fps throttle
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      this.scrollY.set(scrollTop);
      this.lastScrollTime = now;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFocus(){
    this.onFocusMode = true;
    if(this.searchInputElement.nativeElement){
      const height = window.scrollY + window.innerHeight; // fixed value
      this.searchInputElement.nativeElement.style.outline = `solid black ${height}px`;
    }
  }

  onBlur(){
    this.onFocusMode = false;
    this.searchInputElement.nativeElement.style.outline = "none";
  }

  scrollToTop():void{
    console.log('Scrolling to Top');
    window.scrollTo({
      top:0,
      behavior:'smooth'
    });
  }

  setUpSearchQuery():void{
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((query)=>{
      console.log('✅ Debounced search executing for:', query);
      this.photoService.setSearchQuery(query);
    })
  }

  onSearch(event: Event):void{
    const currentTime = Date.now();
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.searchSubject.next(query);
  }

  clearSearch(){
    this.photoService.clearSearch();
  }

  loadPhotos(): void {
    this.photoService.loadInitialPhotos().subscribe();
  }

  resetAndLoadPhotos():void{
    this.photoService.resetAndReload().subscribe();
  }

   // Load more photos (next page)
  loadMorePhotos():void{
    this.photoService.loadMorePhotos().subscribe();
  }
}
