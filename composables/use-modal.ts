import { $vfm, DynamicModalOptions } from 'vue-final-modal' // eslint-disable-line import/named
export default function useModal(options: DynamicModalOptions) {
  const open = () => {
    $vfm.show(options)
  }

  return {
    open,
  }
}
