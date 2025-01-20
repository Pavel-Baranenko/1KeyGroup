"use client"
import React from 'react'
import { Footer } from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import ObjectsService from '@/modules/services/ObjectsService';
import { Object } from '@/modules/types/Objects';
import { Context } from '@/store/provider';
import ObjectCard from '@/components/layouts/Objects/ObjectCard';
import NoItems from '@/components/ui-kit/NoItems';


let objects: Object[]

export default function MyObjects() {
  const { store } = React.useContext(Context)

  const [load, setLoad] = React.useState(false);

  const getObjects = async () => {

    const response = await ObjectsService.getByProfile(store.user.ownProfiles[0].id)

    if (response.status == 200) {
      objects = response.data.reverse()
      setLoad(true)
    }
  }

  React.useEffect(() => { getObjects() }, [])


  return (
    <>
      <div className='page__wrapper-leads'>
        <Header />
        <main>
          <div className=''>
            <div className="container-fluid">
              <div className="tabs white-box">
                <div className="tabs__title">My Objects</div>
              </div>
            </div>
            <div className="panels">
              <div className="container-fluid">

                <div className="objects-box">
                  {load ?
                    <>
                      {objects.length > 0 ?
                        <>
                          {objects?.map((obj: Object) => {
                            return <ObjectCard object={obj} key={obj.id} my />
                          })
                          }
                        </>
                        :
                        <NoItems type='objects' my />
                      }

                    </>

                    :
                    <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" >
                      <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                    </svg>
                  }


                </div>

              </div>

            </div>


          </div>
        </main >

        <Footer />
      </div >
    </>
  )
}
