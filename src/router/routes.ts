import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'howler', component: () => import('pages/howler.vue') },
      { path: 'opusmediarecorder', component: () => import('pages/opus-media-recorder.vue') },
      { path: 'opusrecorder', component: () => import('pages/opus-recorder.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
