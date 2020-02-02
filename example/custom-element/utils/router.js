import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function getView (view) {
  return import('@/views/' + view)
}

export function getRoutesFromViews (views) {
  return views.map((view) => {
    return {
      path: `/${view}`.replace(/index$/, ''),
      component: () => getView(view)
    }
  })
}

export function createRouter (mode = 'abstract') {
  const router = new VueRouter({
    mode
  })
  if (mode === 'abstract') {
    router.replace('/')
  }
  return router
}
