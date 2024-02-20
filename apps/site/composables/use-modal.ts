import { $vfm, DynamicModalOptions } from 'vue-final-modal' // eslint-disable-line import/named
export default function useModal() {
  const open = (options: DynamicModalOptions) => {
    $vfm.show(options)
  }

  return {
    open,
  }
}
