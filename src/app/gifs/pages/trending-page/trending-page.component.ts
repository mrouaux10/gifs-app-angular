import { Component, inject } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifSkeletonComponent } from '../../components/gif-skeleton/gif-skeleton.component';
import { ErrorStateComponent } from '../../components/error-state/error-state.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { GifsStore } from '../../store/gifs.store';

@Component({
  selector: 'app-trending-page',
  imports: [
    GifListComponent, 
    GifSkeletonComponent, 
    ErrorStateComponent, 
    EmptyStateComponent
  ],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {
  private readonly gifsStore = inject(GifsStore);

  readonly trendingGifs = this.gifsStore.trendingGifs;
  readonly isTrendingLoading = this.gifsStore.isTrendingLoading;
  readonly hasTrendingError = this.gifsStore.hasTrendingError;
  readonly trendingState = this.gifsStore.trendingState;

  retryTrending() {
    this.gifsStore.retryTrending();
  }
}