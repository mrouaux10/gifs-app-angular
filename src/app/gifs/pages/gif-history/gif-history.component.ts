import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsStore } from '../../store/gifs.store';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html'
})
export default class GifHistoryComponent {
  private readonly gifsStore = inject(GifsStore);
  
  query = toSignal(inject(ActivatedRoute).params.pipe(map(params => params['key'])));

  gifsHistory = computed(() => this.gifsStore.getGifsByHistoryKey(this.query() ?? ''));
}
