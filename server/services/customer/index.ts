export async function getAllCustomers() {
  const client = await useServerSupabaseServiceRole()

  return client.from('customers').select()
}

export async function getCustomer(userId: string) {
  const client = await useServerSupabaseServiceRole()

  const { data } = await client.from('customers').select().eq('id', userId).single()

  return data
}

export async function updateCustomer(userId: string, updateData: any) {
  const client = await useServerSupabaseServiceRole()

  return await client.from('customers').update(updateData).eq('id', userId).select().single()
}
