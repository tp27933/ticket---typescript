/* eslint-disable symbol-description */
import { inject } from 'vue'
import Swal from 'sweetalert2'

const SwalSymbol = Symbol()

export function useSwal () {
  return inject(SwalSymbol) as Swal
}
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  install: (app: any) => {
    app.config.globalProperties.$Swal = Swal
    app.provide(SwalSymbol, Swal)
  }
}
