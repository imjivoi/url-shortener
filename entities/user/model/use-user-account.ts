export const useUserAccount = () => {
  const { data, pending } = useLazyFetch('/api/user/account')

  return { data, pending }
}
