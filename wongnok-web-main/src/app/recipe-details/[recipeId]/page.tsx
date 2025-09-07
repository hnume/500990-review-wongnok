import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { fetchRecipeDetails } from '@/services/recipe.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

type RecipeDetailsIdProps = {
  params: Promise<{
    recipeId: string
  }>
}

const RecipeDetailsId = async ({ params }: RecipeDetailsIdProps) => {
  const { recipeId } = await params
  const data = await fetchRecipeDetails(recipeId)

  return (
    <div className='flex flex-col gap-y-5'>
      <div className='flex flex-col gap-y-5'>
        <h1 className='font-bold text-4xl'>{data?.data.name}</h1>
        <div>
          <p>{data?.data.description}</p>
          <p className='text-secondary text-xs'>{data?.data.updatedAt}</p>
        </div>
        <div>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>Oatter</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className='flex gap-x-8'>
        <div className='flex flex-col gap-6'>
          <div className='relative w-[584px] h-[334px]'>
            <Image
              src={data?.data.imageUrl || '/beef_wellington.png'}
              alt='beef wellington'
              fill
            />
          </div>
          <div className='rounded-sm px-2 bg-secondary-100 text-secondary-900'>
            <p>{data?.data.cookingDuration.name} นาที</p>
          </div>
        </div>
        <div>
          <h1 className='text-3xl font-bold'>วัตถุดิบ</h1>
          <p>เนื้อสันใน 300 กรับ</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailsId
