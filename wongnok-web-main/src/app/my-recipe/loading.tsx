import SkeletonCardLoading from '@/components/SkeletonCardLoading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Loading = () => (
  <div>
    <div className='flex justify-between items-center py-8'>
      <h1 className='font-bold text-4xl'>สูตรอาหารของฉัน</h1>
      <Link href={'/create-recipe'}>
        <Button className='bg-primary-500'>​+ สร้างสูตรอาหาร</Button>
      </Link>
    </div>
    <div className='flex flex-wrap gap-8'>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => {
        return <SkeletonCardLoading key={i} />
      })}
    </div>
  </div>
)

export default Loading
