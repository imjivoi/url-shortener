const DEFAULT_LIMITS = {
  links_limit: 10,
  clicks_limit: 1000,
}

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

export async function createCustomerLimits(userId: string) {
  const client = await useServerSupabaseServiceRole()

  const { data, error } = await client.from('customer_limits').insert({ customer_id: userId, ...DEFAULT_LIMITS })

  if (error) {
    throw error
  }

  return data
}

export async function getCustomerLimits(userId: string) {
  const client = await useServerSupabaseServiceRole()

  let { data, error } = await client.from('customer_limits').select().eq('customer_id', userId).single()

  if (!data && error?.message === 'not_found') {
    data = await createCustomerLimits(userId)
  }

  return data
}
