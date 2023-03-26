export default async function useUser() {
  const { data: user } = await useFetch('/api/auth/me', {
    headers: useRequestHeaders(['cookie']) as Record<string, string>,
  })

  return user
}
