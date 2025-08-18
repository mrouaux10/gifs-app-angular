export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface User {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  website_url: string;
  is_verified: boolean;
}

export interface Images {
  url: string;
  width: string;
  height: string;
  size?: string;
  frames?: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
  webp_mp4?: string;
  webp_mp4_size?: string;
}

export interface ImageSizes {
  original: Images;
  fixed_height: Images;
  fixed_height_downsampled: Images;
  fixed_height_small: Images;
  fixed_height_small_still: Images;
  fixed_width: Images;
  fixed_width_downsampled: Images;
  fixed_width_small: Images;
  fixed_width_small_still: Images;
  fixed_width_still: Images;
  fixed_height_still: Images;
  looping: Images;
  preview_still: Images;
  original_still: Images;
  preview: Images;
  downsized: Images;
  downsized_still: Images;
  downsized_large: Images;
  downsized_medium: Images;
  downsized_small: Images;
  hd: Images;
  preview_gif: Images;
  preview_webp: Images;
  '480w_still': Images;
}

export interface GiphyItem {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  import_datetime: string;
  trending_datetime: string;
  user?: User;
  images: ImageSizes;
  analytics_response_payload: string;
  analytics: {
    onload: {
      url: string;
    };
    onclick: {
      url: string;
    };
    onsent: {
      url: string;
    };
  };
}

export interface GiphyResponse {
  data: GiphyItem[];
  pagination: Pagination;
  meta: Meta;
}

export interface SingleGifResponse {
  data: GiphyItem;
  meta: Meta;
}
