export async function getAllCustomers(fields = '*') {
  const client = await useServerSupabaseServiceRole()

  return await client.from('customers').select(fields)
}

export async function getCustomer(userId: string) {
  const client = await useServerSupabaseServiceRole()

  const { data } = await client.from('customers').select().eq('id', userId).single()

  return data
}

export async function updateAccount(userId: string, updateData: any) {
  const client = await useServerSupabaseServiceRole()

  return await client.from('customers').update(updateData).eq('id', userId).select().single()
}

export async function getCustomerLimits(userId: string) {
  const client = await useServerSupabaseServiceRole()

  const { data } = await client.from('customer_limits').select().eq('customer_id', userId).single()

  return data
}