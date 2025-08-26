import {motion} from 'framer-motion'

const Loading = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden'>
        <motion.div
        className='w-6 h-6  border-4 border-t-green-500 border-green-200 rounded-full'
        initial={{rotate:0}}
        animate={{rotate:360}}
        transition={{repeat:Infinity, duration:1, ease:'linear'}}
        />

      
    </div>
  )
}

export default Loading
