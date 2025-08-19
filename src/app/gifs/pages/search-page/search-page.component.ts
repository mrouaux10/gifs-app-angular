import { Component, inject } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifSkeletonComponent } from '../../components/gif-skeleton/gif-skeleton.component';
import { ErrorStateComponent } from '../../components/error-state/error-state.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { GifsStore } from '../../store/gifs.store';

@Component({
  selector: 'app-search-page',
  imports: [
    GifListComponent, 
    GifSkeletonComponent, 
    ErrorStateComponent, 
    EmptyStateComponent
  ],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {
  private readonly gifsStore = inject(GifsStore);

  readonly searchGifsResults = this.gifsStore.searchGifsResults;
  readonly isSearchLoading = this.gifsStore.isSearchLoading;
  readonly hasSearchError = this.gifsStore.hasSearchError;
  readonly currentSearchQuery = this.gifsStore.currentSearchQuery;
  readonly searchState = this.gifsStore.searchState;

  onSearch(search: string) {
    this.gifsStore.searchGifs(search);
  }

  retrySearch() {
    this.gifsStore.retrySearch();
  }

  clearSearchResults() {
    this.gifsStore.clearSearchResults();
  }
}
