import { Component, computed, HostListener, OnInit, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from './services/photo.service';
import { PhotoCardComponent } from './components/photo-card/photo-card';
import { SearchComponent } from './components/search/search';
import { PhotoDialogComponent } from './modal-dialogs/photo-dialog/photo-dialog';
import { Photo } from './models/photo.interface';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PhotoCardComponent, SearchComponent, PhotoDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnInit {
  protected readonly title = signal('Photo-gallery');
  @ViewChild('searchComponent') searchComponent!: SearchComponent;

  scrollY = signal(0);
  currentPhotoIndex = signal<number>(0);
  showPhotoModalDialog: boolean = false;
  searchOnFocusMode = signal<boolean>(false);
  showScrollToTop = computed(() => this.scrollY() > 300);
  lastScrollTime: number = 0;

  private readonly photosPerPage = 9;

  constructor(public photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    //Apply CSS on scroll
    if (this.searchOnFocusMode() && this.searchComponent) {
      requestAnimationFrame(() => this.searchComponent.onFocus());
    }

    //Measuring scrollPosition to exceed 300px in order to show movetotop button
    const now = performance.now();
    if (now - this.lastScrollTime >= 16) {
      // 60fps throttle
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      this.scrollY.set(scrollTop);
      this.lastScrollTime = now;
    }
  }

  onSearchFocusChange(isFocusOn: boolean): void {
    this.searchOnFocusMode.set(isFocusOn);
    console.log('triggered from search componnet');
  }

  scrollToTop(): void {
    console.log('Scrolling to Top');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  loadPhotos(): void {
    this.photoService.loadInitialPhotos().subscribe();
  }

  resetAndLoadPhotos(): void {
    this.photoService.resetAndReload().subscribe();
  }

  loadMorePhotos(): void {
    this.photoService.loadMorePhotos().subscribe();
  }

  openPhotoDialog(index: number): void {
    this.showPhotoModalDialog = true;
    this.currentPhotoIndex.set(index);
  }

  closeModalDialog(closeModal: boolean) {
    this.showPhotoModalDialog = !closeModal;
  }
}
