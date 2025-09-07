import CardRecipe from '@/components/CardRecipe'
import { fetchRecipes } from '@/services/recipe.service'
import Link from 'next/link'

const ServerPage = async () => {
  const recipesData = await fetchRecipes({ page: 1, limit: 10, search: '' })

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

export default ServerPage
