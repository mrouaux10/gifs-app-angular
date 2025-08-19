import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { GifsStore } from '../../store/gifs.store';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard-page.component.html'
})
export default class DashboardPageComponent { 
  private readonly gifsStore = inject(GifsStore);

  readonly trendingGifs = this.gifsStore.trendingGifs;
  readonly isTrendingLoading = this.gifsStore.isTrendingLoading;
  readonly searchGifsResults = this.gifsStore.searchGifsResults;
  readonly searchGifHistoryKeys = this.gifsStore.searchGifHistoryKeys;
  readonly hasTrendingError = this.gifsStore.hasTrendingError;
  readonly hasSearchError = this.gifsStore.hasSearchError;
  readonly currentSearchQuery = this.gifsStore.currentSearchQuery;

  searchGifs(search: string) {
    this.gifsStore.searchGifs(search);
  }

  getGifsByHistoryKey(key: string) {
    return this.gifsStore.getGifsByHistoryKey(key);
  }

  clearSearchResults() {
    this.gifsStore.clearSearchResults();
  }

  retryTrending() {
    this.gifsStore.retryTrending();
  }

  retrySearch() {
    this.gifsStore.retrySearch();
  }
}
