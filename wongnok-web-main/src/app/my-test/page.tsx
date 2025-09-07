'use client'

import CardRecipe from "@/components/CardRecipe"
import { fetchRecipes, Recipe } from "@/services/recipe.service"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const MyTest = () => {
    const [recipesData, setRecipesData] = useState<{
    results: Recipe[]
    total: number
  }>({
    results: [],
    total: 0,
  })
  const {
    mutateAsync: getRecipe,
    isPending: isRecipeLoading,
    isError: isRecipeError,
  } = useMutation({
    mutationFn: fetchRecipes,
    onError: () => {
      console.log('error fetching')
    },
    onSuccess: (data) => {
        console.log(data)
      setRecipesData(data?.results)
    },
  })
  const limitDataPerPage = 5
  const pathname = usePathname()
  
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  params.set('limit', String(limitDataPerPage))

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page') ?? 1)
  )
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get('search') ?? ''
  )

  useEffect(() => {
    params.set('page', String(currentPage))
    router.replace(`${pathname}?${params.toString()}`)
    getRecipe({
      page: Number(currentPage),
      limit: limitDataPerPage,
      search: searchInput,
    })
  }, [currentPage])

  const handleSearch = useDebouncedCallback((data) => {
    params.set('page', '1')
    if (searchInput === '') {
      params.delete('search')
    } else {
      params.set('search', searchInput)
    }
    router.replace(`${pathname}?${params.toString()}`)
    getRecipe({
      page: Number(currentPage),
      limit: limitDataPerPage,
      search: data,
    })
  }, 1000)

  console.log(recipesData)

  if (isRecipeError) return <h1>Error</h1>
  return (
    <>
      <div>
        <div className='flex justify-between items-center mb-4 my-4'>
          <div className="text-4xl cursor-pointer">สูตรอาหารของฉัน</div>
          <button className="border p-3 cursor-pointer">+createMenu</button>
        </div>
        <div className='flex flex-wrap gap-8'>
          {recipesData &&
            recipesData.length > 0 &&
            recipesData.map((recipe) => {
              return (
                <Link key={recipe.id} href={`recipe-details/${recipe.id}`}>
                  <CardRecipe key={recipe.id} {...recipe} />
                </Link>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default MyTest
