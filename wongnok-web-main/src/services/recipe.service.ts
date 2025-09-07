import { RecipeForm } from '@/app/create-recipe/page'
import { auth } from '@/lib/auth'
import { api } from '@/lib/axios'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

type User = {
  id: string
  firstName: string
  lastName: string
}

type CookingDuration = {
  id: number
  name: string
}

type Difficulty = {
  id: number
  name: string
}

export type Recipe = {
  id: string
  name: string
  imageUrl: string
  description: string
  cookingDuration: CookingDuration
  difficulty: Difficulty
  user: User
}

export type RecipePayload = {
  name: string
  description: string
  ingredient: string
  instruction: string
  imageURL: string
  cookingDurationID: number
  difficultyID: number
}

export type RecipeDetails = {
  id: number
  name: string
  description: string
  ingredient: string
  instruction: string
  imageUrl: string
  cookingDuration: CookingDuration
  difficulty: Difficulty
  createdAt: string
  updatedAt: string
  averageRating: number
  user: User
}

type fetchRecipeRequest = {
  page: number
  limit: number
  search: string
}

export const fetchRecipes = async (data: fetchRecipeRequest) => {
  try {
    const recipesFetch = await api.get<{
      results: Recipe[]
      total: number
    }>(
      // `/api/v1/food-recipes?page=${data.page}&limit=${data.limit}&search=${data.search}`
      '/api/v1/food-recipes?page=1&limit=10'
    )

    return recipesFetch.data
  } catch (e) {
    console.error(e)
  }
}

export const fetchRecipeDetails = async (recipeId: string) => {
  const recipeDetails = await api.get<RecipeDetails>(`/api/v1/food-recipes/${recipeId}`)
  return recipeDetails
}

export const createRecipe = async (data: RecipePayload) => {
  const recipeDetails = await api.post<RecipeForm>(
    '/api/v1/food-recipes',
    {
      ...data,
    }
  )
  return recipeDetails
}

export const fetchRecipesByUser = async () => {
  const session = await auth()
  console.log('session servcie',session )
  const recipes = await axios.get<{ results: Recipe[] }>(
    `http://localhost:8000/api/v1/users/${session?.userId}/food-recipes`,
    {headers:
      {
        Authorization: `Bearer ${session?.accessToken}`
      }
    }
  )
  return recipes.data.results
}
