export default defineAuthEventHandler(async (_, user) => {
  const client = await useServerSupabaseClient()

  const [{ count: linkCount }, { count: clickCount }, mostPopular] = await Promise.all([
    client
      .from('links')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user?.id),
    client
      .from('clicks')
      .select('links!inner(user_id)', { count: 'exact', head: true })
      .eq('links.user_id', user?.id),
    client
      .from('links')
      .select('*, clicks!inner(count)')
      .eq('user_id', user?.id)
      .limit(1)
      .order('count', { referencedTable: 'clicks', ascending: false })
      .single(),
  ])

  return {
    clicks: clickCount || 0,
    links: linkCount || 0,
    mostPopular: { clicks: mostPopular.data?.clicks[0].count || 0, url: mostPopular.data?.redirect_url },
  }
})
