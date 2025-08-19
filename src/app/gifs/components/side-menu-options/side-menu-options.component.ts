import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsStore } from '../../store/gifs.store';

interface MenuOption {
  icon: string;
  label: string;
  subLabel?: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html'
})
export class SideMenuOptionsComponent {
  private readonly gifsStore = inject(GifsStore);
  
  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar Gifs',
      route: '/dashboard/search'
    }
  ];

  readonly searchGifHistoryKeys = this.gifsStore.searchGifHistoryKeys;
}
