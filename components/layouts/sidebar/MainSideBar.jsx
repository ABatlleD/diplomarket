import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import LangSelector from '../navbar/LangSelector'
import LockIcon from '@mui/icons-material/Lock'
import useWindowSize from '../../../hooks/WindowSize'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AppButton from '../../AppButton'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

function MainSideBar ({ mainSideBar = false, setMainSideBar = () => {} }) {
  const { t } = useTranslation()
  const size = useWindowSize()

  return (
    <AnimatePresence>
      {mainSideBar && (
        <>
          <div className='flex flex-row'>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{
                x: 0
              }}
              exit={{
                x: '-100%'
              }}
              transition={{ type: 'spring', bounce: 0, duration: 1 }}
              className="fixed z-50 bg-background-100 text-text-100 shadow-lg top-0 left-0 w-full max-w-sm h-screen p-5"
            >
              <div className='flex flex-row justify-between'>
              <div className='flex mt-3 mr-[-7px]'>
                <LangSelector />
              </div>
              <div
                className='hidden md:flex flex-row mt-4 md:mt-6 ml-1 md:ml-[-10px] text-text-100 xl:text-sm'
                onClick={() => {}}
              >
                USD <span className='mt-[-3px]'><LockIcon fontSize={size.width < 1024 ? 'large' : 'small'} /></span>
              </div>
                <button
                  onClick={() => setMainSideBar((mainSideBar) => !mainSideBar)}
                  className="bg-white text-black h-4 w-4 pt-[1.3rem] mr-2 block rounded-full"
                >
                  <HighlightOffIcon />
                </button>
              </div>
              <div className='mt-6'>
                <AppButton
                  sx={{
                    fontSize: 15,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    width: '100%'
                  }}
                  className='bg-button rounded-full'
                >
                  <span className='mt-[-3px] mr-1'><AddLocationAltOutlinedIcon fontSize='small' /></span> Miami <span className='mt-[-1px]'><KeyboardArrowDownOutlinedIcon fontSize='small' /></span>
                </AppButton>
              </div>
              <div className='flex flex-col items-center'>
              <div
                onClick={() => setMainSideBar((mainSideBar) => false)}
                className='mt-8 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
              >
                <Link href='/'>
                  {t('layout.navbar.allProducts')}
                </Link>
              </div>
              <div
                onClick={() => setMainSideBar((mainSideBar) => false)}
                className='mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
              >
                <Link href='/about'>
                  {t('layout.navbar.about')}
                </Link>
              </div>
              <div
                onClick={() => setMainSideBar((mainSideBar) => false)}
                className='mt-4 text-footer-background-200 hover:text-footer-background-100 font-semibold text-lg'
              >
                <Link href='/'>
                  {t('layout.navbar.contact')}
                </Link>
              </div>
              </div>
            </motion.div>
            <motion.div
              onClick={() => setMainSideBar((mainSideBar) => false)}
              animate={{
                opacity: 0.5
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className='fixed top-0 right-0 w-full h-screen opacity-100'
            />
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

MainSideBar.propTypes = {
  mainSideBar: PropTypes.bool,
  setMainSideBar: PropTypes.func
}

export default MainSideBar
