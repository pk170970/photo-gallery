import { Component, ElementRef, ViewChild, OnInit, OnDestroy, output } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'search-photo',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class SearchComponent implements OnInit, OnDestroy{
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  private onFocusMode : boolean = false;
  @ViewChild('searchinput') searchInputElement!: ElementRef;

  focusChange = output<boolean>();

  //Another way to handle debouncing
  // private debounceSearchFunction!: (query: string) => void;


  constructor(public photoService: PhotoService){

  }

  ngOnInit(): void {
    this.setUpSearchQuery();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(event: Event):void{
    const currentTime = Date.now();
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.searchSubject.next(query);
    //Another way to handling debouncing
    // this.debounceSearchFunction(query);
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

    //Another way to handle debouncing
    // const searchCallBack = (input:string) =>{
    //   console.log('input typed', input);
    //   this.photoService.setSearchQuery(input);
    // }
    // this.debounceSearchFunction = this.photoService.debounceService(searchCallBack,300);
    // console.log('debounceSearchFunction', this.debounceSearchFunction);
  }

  onFocus(){
    this.onFocusMode = true;
    this.focusChange.emit(this.onFocusMode);
    if(this.searchInputElement.nativeElement){
      const height = window.scrollY + window.innerHeight; // fixed value
      this.searchInputElement.nativeElement.style.outline = `solid black ${height}px`;
    }
  }

  onBlur(){
    this.onFocusMode = false;
    this.focusChange.emit(this.onFocusMode);
    this.searchInputElement.nativeElement.style.outline = "none";
  }

  clearSearch(){
    this.photoService.clearSearch();
  }
}
