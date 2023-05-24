import type Vue from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    type IntrinsicElements = Record<string, any>
  }

  interface ImportMeta {
    env: Record<any, string>
  }
  interface Resp<T> {
    msg: string;
    code: number;
    data: T;
  }
  declare module 'swiper/js/swiper.esm'{
    export const Swiper: any
    export const Pagination: any
    export const Mousewheel: any
    export const Autoplay: any
  } 
}
