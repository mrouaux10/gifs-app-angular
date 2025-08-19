import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, of } from 'rxjs';

import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@/environments/environment';
import { GifMapper } from '../mappers/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

// Constante para la clave del localStorage
const SEARCH_GIFS_HISTORY_KEY = 'searchGifsHistory';

// Función para cargar el historial desde localStorage
const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const historyFromLocalStorage = localStorage.getItem(SEARCH_GIFS_HISTORY_KEY) ?? '{}';
  return JSON.parse(historyFromLocalStorage);
}

// 🆕 INTERFACES PARA ESTADOS MÁS SOFISTICADOS
interface LoadingState {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}

interface TrendingState extends LoadingState {
  gifs: Gif[];
}

interface SearchState extends LoadingState {
  gifs: Gif[];
  query: string | null;
  hasSearched: boolean;
}

@Injectable({ providedIn: 'root' })
export class GifsStore {
  // Inyección del HttpClient usando la nueva sintaxis de Angular
  private http = inject(HttpClient);

  // 🔒 ESTADO PRIVADO MEJORADO
  // Estados más granulares y descriptivos
  private readonly _trendingState = signal<TrendingState>({
    isLoading: false,
    error: null,
    isEmpty: false,
    gifs: []
  });

  private readonly _searchState = signal<SearchState>({
    isLoading: false,
    error: null,
    isEmpty: false,
    gifs: [],
    query: null,
    hasSearched: false
  });

  private readonly _searchGifsHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  // 🌐 ESTADO PÚBLICO (solo lectura para los componentes)
  readonly trendingState = this._trendingState.asReadonly();
  readonly searchState = this._searchState.asReadonly();
  readonly searchGifsHistory = this._searchGifsHistory.asReadonly();

  // 🧮 VALORES COMPUTADOS MEJORADOS
  readonly searchGifHistoryKeys = computed(() => 
    Object.keys(this._searchGifsHistory())
  );

  // 🆕 COMPUTED PARA ESTADOS DERIVADOS
  readonly isTrendingLoading = computed(() => this._trendingState().isLoading);
  readonly isSearchLoading = computed(() => this._searchState().isLoading);
  readonly hasTrendingError = computed(() => this._trendingState().error !== null);
  readonly hasSearchError = computed(() => this._searchState().error !== null);
  readonly trendingGifs = computed(() => this._trendingState().gifs);
  readonly searchGifsResults = computed(() => this._searchState().gifs);
  readonly currentSearchQuery = computed(() => this._searchState().query);

  // 🚀 ACCIONES MEJORADAS CON MANEJO DE ERRORES
  
  /**
   * Carga los gifs trending desde la API con estados mejorados
   */
  loadTrendingGifs() {
    // 1. Marcar como cargando y limpiar errores previos
    this._trendingState.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));
    
    // 2. Hacer la petición HTTP con manejo de errores
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: '20'
      }
    }).pipe(
      map((response: GiphyResponse) => GifMapper.mapGiphyItemsToGifArray(response.data)),
      tap((gifs: Gif[]) => {
        // 3. Actualizar estado exitoso
        this._trendingState.update(state => ({
          ...state,
          isLoading: false,
          error: null,
          gifs,
          isEmpty: gifs.length === 0
        }));
      }),
      catchError((error) => {
        // 4. Manejar errores de forma elegante
        console.error('Error loading trending gifs:', error);
        this._trendingState.update(state => ({
          ...state,
          isLoading: false,
          error: 'No se pudieron cargar los gifs trending. Intenta de nuevo.',
          gifs: [],
          isEmpty: true
        }));
        return of([]); // Retornar array vacío para evitar errores
      })
    ).subscribe();
  }

  /**
   * Busca gifs por término de búsqueda con estados mejorados
   */
  searchGifs(search: string) {
    // 1. Validar búsqueda
    if (!search.trim()) {
      this._searchState.update(state => ({
        ...state,
        error: 'Por favor ingresa un término de búsqueda',
        hasSearched: false
      }));
      return;
    }

    // 2. Marcar como cargando y actualizar query
    this._searchState.update(state => ({
      ...state,
      isLoading: true,
      error: null,
      query: search.trim(),
      hasSearched: true
    }));

    // 3. Hacer la petición HTTP con manejo de errores
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: search.trim(),
        limit: '20'
      }
    }).pipe(
      map((res: GiphyResponse) => GifMapper.mapGiphyItemsToGifArray(res.data)),
      tap((res: Gif[]) => {
        // 4. Actualizar estado exitoso
        this._searchState.update(state => ({
          ...state,
          isLoading: false,
          error: null,
          gifs: res,
          isEmpty: res.length === 0
        }));

        // 5. Actualizar historial
        this._searchGifsHistory.update(history => ({
          ...history,
          [search.toLowerCase()]: res
        }));
        
        // 6. Guardar en localStorage
        this.saveToLocalStorage();
      }),
      catchError((error) => {
        // 7. Manejar errores de búsqueda
        console.error('Error searching gifs:', error);
        this._searchState.update(state => ({
          ...state,
          isLoading: false,
          error: 'Error en la búsqueda. Verifica tu conexión e intenta de nuevo.',
          gifs: [],
          isEmpty: true
        }));
        return of([]);
      })
    ).subscribe();
  }

  /**
   * Retry para trending gifs
   */
  retryTrending() {
    this.loadTrendingGifs();
  }

  /**
   * Retry para búsqueda
   */
  retrySearch() {
    const currentQuery = this._searchState().query;
    if (currentQuery) {
      this.searchGifs(currentQuery);
    }
  }

  /**
   * Limpia los resultados de búsqueda
   */
  clearSearchResults() {
    this._searchState.update(state => ({
      ...state,
      gifs: [],
      error: null,
      isEmpty: false,
      hasSearched: false
    }));
  }

  /**
   * Obtiene gifs por clave del historial
   */
  getGifsByHistoryKey(key: string): Gif[] {
    return this._searchGifsHistory()[key] ?? [];
  }

  // 🔐 MÉTODOS PRIVADOS
  
  /**
   * Guarda el historial en localStorage
   */
  private saveToLocalStorage() {
    localStorage.setItem(SEARCH_GIFS_HISTORY_KEY, 
      JSON.stringify(this._searchGifsHistory())
    );
  }

  // 🪝 CONSTRUCTOR PARA INICIALIZACIÓN
  constructor() {
    // Cargar gifs trending automáticamente al inicializar
    this.loadTrendingGifs();
  }
}
