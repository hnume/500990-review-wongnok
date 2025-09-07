import CardRecipe from '@/components/CardRecipe'
import { Button } from '@/components/ui/button'
import { fetchRecipesByUser } from '@/services/recipe.service'
import Link from 'next/link'

const MyRecipe = async() => {
  const data = await fetchRecipesByUser()

  return (
    <div>
      <div className='flex justify-between items-center py-8'>
        <h1 className='font-bold xl:text-4xl lg:text-3xl sm:text-sm'>สูตรอาหารของฉัน</h1>
        <Link href={'/create-recipe'}>
          <Button className='bg-primary-500'>​+ สร้างสูตรอาหาร</Button>
        </Link>
      </div>
      {data && data.length > 0 ? (
        <div className='flex flex-wrap gap-8'>
          {data.map((recipe, i) => (
            <CardRecipe {...recipe} key={i} />
          ))}
        </div>
      ) : (
        <div>ยังไม่มีสูตรอาหารของตัวเอง</div>
      )}
    </div>
  )
}

export default MyRecipe
