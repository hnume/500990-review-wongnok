'use client'

import CardRecipe from '@/components/CardRecipe'
import { fetchRecipes } from '@/services/recipe.service'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ClientPage = () => {
  const [recipesData, setRecipesData] = useState<any>()
  useEffect(() => {
    ;(async () => {
      const data = await fetchRecipes({ page: 1, limit: 10, search: '' })
      setRecipesData(data)
    })()
  }, [])
  return (
    <div className='flex flex-wrap gap-8'>
      {recipesData &&
        recipesData.results.length > 0 &&
        recipesData.results.map((recipe) => {
          return (
            <Link key={recipe.id} href={`recipe-details/${recipe.id}`}>
              <CardRecipe key={recipe.id} {...recipe} />
            </Link>
          )
        })}
    </div>
  )
}

export default ClientPage
