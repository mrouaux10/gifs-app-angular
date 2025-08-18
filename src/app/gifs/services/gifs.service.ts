import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subscription, tap } from 'rxjs';

import type { GiphyResponse } from '../interfaces/giphy.interfaces';

import { environment } from '@/environments/environment';
import { GifMapper } from '../mappers/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

const SEARCH_GIFS_HISTORY_KEY = 'searchGifsHistory';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const historyFromLocalStorage = localStorage.getItem(SEARCH_GIFS_HISTORY_KEY) ?? '{}';
  const history = JSON.parse(historyFromLocalStorage);
  return history;
}

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchGifsResults = signal<Gif[]>([]);
  searchGifsHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  searchGifHistoryKeys = computed(() => Object.keys(this.searchGifsHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveSearchGifsHistory = effect(() => {
    localStorage.setItem(SEARCH_GIFS_HISTORY_KEY, JSON.stringify(this.searchGifsHistory()));
  })

  loadTrendingGifs(): Subscription {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20'
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data)
      this.trendingGifs.set(gifs)
      this.trendingGifsLoading.set(false)
    });
  }

  searchGifs(search: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: search,
        limit: '20'
      }
    }).pipe(
      map((res) => GifMapper.mapGiphyItemsToGifArray(res.data)),
      tap(res => {
       this.searchGifsHistory.update(history => (
        {
          ...history,
          [search.toLowerCase()]: res
        }
       ))
      })
    )
  }

  getGifsByHistoryKey(key: string): Gif[] {
    return this.searchGifsHistory()[key] ?? [];
  }
}
