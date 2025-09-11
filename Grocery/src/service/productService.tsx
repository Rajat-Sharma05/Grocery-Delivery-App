import axios from "axios"
import { BASE_URL } from "./config"

export const getAllCategories = async () => {
  try {
    console.log('[ProductService] getAllCategories: START', { url: `${BASE_URL}/categories` })
    const response = await axios.get(`${BASE_URL}/categories`)
    console.log('[ProductService] getAllCategories: SUCCESS', {
      status: response?.status,
      count: Array.isArray(response?.data) ? response?.data?.length : undefined,
      sample: Array.isArray(response?.data) ? response?.data?.[0] : response?.data,
    })
    return response.data
  } catch (error) {
    console.log('[ProductService] getAllCategories: ERROR', {
      message: (error as any)?.message,
      status: (error as any)?.response?.status,
      data: (error as any)?.response?.data,
    })
    return []
  }
}

export const getProductsByCategoryId = async (id: string) => {
  try {
    console.log('[ProductService] getProductsByCategoryId: START', { url: `${BASE_URL}/products/${id}`, id })
    const response = await axios.get(`${BASE_URL}/products/${id}`)
    console.log('[ProductService] getProductsByCategoryId: SUCCESS', {
      status: response?.status,
      count: Array.isArray(response?.data) ? response?.data?.length : undefined,
      sample: Array.isArray(response?.data) ? response?.data?.[0] : response?.data,
    })
    return response.data
  } catch (error) {
    console.log('[ProductService] getProductsByCategoryId: ERROR', {
      id,
      message: (error as any)?.message,
      status: (error as any)?.response?.status,
      data: (error as any)?.response?.data,
    })
    return []
  }
}
