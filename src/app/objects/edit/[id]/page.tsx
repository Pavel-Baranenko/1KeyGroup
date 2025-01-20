"use client"
import React from 'react'
import MyInput from '@/components/ui-kit/MyInput';
import RadioButtonGroup from '@/components/ui-kit/RadioButtonGroup';
import RadioButtons from '@/components/ui-kit/RadioButtons';
import DropDown from '@/components/ui-kit/DropDown';
import ImageUpload from '@/components/ui-kit/DragAndDropImg';
import Specs from '@/components/ui-kit/Specs';
import CheckBoxButtons from '@/components/ui-kit/CheckBoxButtons';
import { Context } from '@/store/provider';
import { useRouter } from 'next/navigation';
import FileUploadService from '@/modules/services/FileUploadService';
import ObjectsService from '@/modules/services/ObjectsService';
import { objects } from '@/modules/lib/constants';
import styles from "../../index.module.scss"



let fileNames: { [key: string]: string[] } = {
  photos: [],
  layouts: [],
  territory: []
}

export default function EditObject({ params }: { params: Promise<{ id: string }> }) {
  const { store } = React.useContext(Context)
  const { id } = React.use(params)

  const { push } = useRouter();
  const [dealFormat, setFormat] = React.useState<string>("")
  const [type, setType] = React.useState<string>("")
  const [subType, setSubType] = React.useState<string>("")
  const [coast, setCoast] = React.useState<string>("")
  const [year, setYear] = React.useState<number>()
  const [quarter, setQuarter] = React.useState<number>()
  const [price, setPrice] = React.useState<number>()
  const [location, setLocation] = React.useState<string>('')
  const [locationType, setLocationType] = React.useState<string>()
  const [currency, setCurrency] = React.useState<string>("Euro, €")
  const [comType, setComType] = React.useState<string>("% of the transaction amount")
  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [floor, setFloor] = React.useState<number>()
  const [total, setTotal] = React.useState<number>()
  const [living, setLiving] = React.useState<number>()
  const [kitchen, setKitchen] = React.useState<number>()
  const [height, setHeight] = React.useState<number>()
  const [rooms, setRooms] = React.useState<number>()
  const [bedroom, setBedroom] = React.useState<number>()
  const [bathroom, setBathroom] = React.useState<number>()
  const [commission, setCommission] = React.useState<number>()
  const [territorySquare, setTerritorySquare] = React.useState<number>()
  const [additionalList, setAdditionalList] = React.useState<string[]>([])
  const [equipmentList, setEquipmentList] = React.useState<string[]>([])
  const [territoryList, setTerritoryList] = React.useState<string[]>([])
  const [besideList, setBesideList] = React.useState<string[]>([])
  const [viewsList, setViewsList] = React.useState<string[]>([])
  const [servicesList, setServicesList] = React.useState<string[]>([])
  const [files, setFiles] = React.useState<FileList>()
  const [layout, setLayout] = React.useState<FileList>()
  const [territoryLayout, setTerritoryLayout] = React.useState<FileList>()


  const [load, setLoad] = React.useState<boolean>(false)



  const getObject = async () => {
    const response = await ObjectsService.getById(Number(id))
    if (response.status == 200) {
      let obj = response.data
      setFormat(obj.dealFormat)
      setType(obj.propertyType)
      setSubType(obj.propertySubType)
      setCoast(obj.condition.status)
      setYear(obj.condition.buildingYear)
      setQuarter(obj.condition.buildingQuarter)
      setPrice(obj.price.cost)
      setCurrency(obj.price.currency)
      setLocation(obj.location.address)
      setLocationType(obj.location.range ? "range" : "address")
      setCommission(obj.commission.cost || 0)
      setComType(obj.commission.commissionType)
      setTitle(obj.title)
      setDescription(obj.subTitle)
      setFloor(obj.floor)
      setTotal(obj.square.common)
      setLiving(obj.square.living)
      setKitchen(obj.square.kitchen)
      setHeight(obj.height)
      setRooms(obj.rooms.count)
      setBedroom(obj.rooms.bedroom)
      setBathroom(obj.rooms.bathroom)
      setTerritorySquare(obj.territory.square)
      setAdditionalList(obj.additional)
      setEquipmentList(obj.equipment)
      setTerritoryList(obj.territory.additional)
      setBesideList(obj.territory.near)
      setViewsList(obj.territory.view)
      setServicesList(obj.services)

      fileNames.photos = obj.photos
      fileNames.layouts = obj.layout
      fileNames.territory = obj.territory.layout

      setLoad(true)
    }
    else getObject()
  }

  let required = dealFormat && type && coast && location && price

  const EditObject = async () => {
    let id = store.user.id
    if (files) {
      const response = await FileUploadService.save(files, store.user.id, "images")
      if (response.status == 200) FileUploadService.write(response, id, fileNames.photos)
    }

    if (layout) {
      const response = await FileUploadService.save(layout, store.user.id, "images")
      if (response.status == 200) FileUploadService.write(response, id, fileNames.layouts)
    }
    if (territoryLayout) {
      const response = await FileUploadService.save(territoryLayout, store.user.id, "images")
      if (response.status == 200) FileUploadService.write(response, id, fileNames.territory)
    }

    const response = await ObjectsService.edit({
      id: id,
      dealFormat: dealFormat,
      propertyType: type,
      propertySubType: subType,
      characteristics: [],//это дополнительные материал здания, ЖК, хз почему это здесь, по логике должно быть в buildings
      condition: {
        status: coast,
        buildingQuarter: quarter,
        buildingYear: year
      },
      appointment: '',
      location: {
        address: location,
        range: locationType == "range" ? true : false
      },
      price: {
        cost: price,
        currency: currency
      },
      title: title,
      subTitle: description,
      photos: fileNames.photos,
      floor: floor,
      square: {
        common: total,
        living: living,
        kitchen: kitchen
      },
      height: height,
      rooms: {
        count: rooms,
        bedroom: bedroom,
        bathroom: bathroom
      },
      additional: additionalList,
      equipment: equipmentList,
      videos: [],
      documents: [],
      layout: fileNames.layouts,//массив с именами файлов фото
      status: "Available",
      building: null,
      territory: {
        square: territorySquare,
        additional: territoryList,
        layout: fileNames.territory,//массив с именами файлов фото
        near: besideList,
        view: viewsList
      },
      services: servicesList,
      commission: {
        cost: commission,
        commissionType: comType
      }
    })
    if (response.status == 200) push("/objects")
  }

  React.useEffect(() => { getObject() }, [])


  return (
    <main>
      <div className="container-fluid  offer-page">
        {load
          ?
          <div className="form settings" >
            <div className="settings-top">
              <h4>
                <a href="javascript:history.back()" className="back-link mob">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                    <rect width="28" height="28" rx="14" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0959 19.7071C16.4865 19.3166 16.4865 18.6834 16.0959 18.2929L11.8031 14L16.0959 9.70711C16.4865 9.31658 16.4865 8.68342 16.0959 8.29289C15.7054 7.90237 15.0723 7.90237 14.6817 8.29289L10.0353 12.9393C9.4495 13.5251 9.4495 14.4749 10.0353 15.0607L14.6817 19.7071C15.0723 20.0976 15.7054 20.0976 16.0959 19.7071Z" fill="#7786A5" />
                  </svg>
                </a>
                Edit a real estate page</h4>
            </div>
            <div className="form__inner">
              <h6 className="form__heading bordered">
                Deal format <span className='red'>*</span>
              </h6>
              <div className="form__body">
                <RadioButtonGroup value={dealFormat} options={objects.deal} onChange={setFormat} />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading bordered">
                Type  <span className='red'>*</span>
              </h6>
              <div className="form__body">
                <RadioButtonGroup value={type} options={objects.propertyType} onChange={setType} />
                {type.length > 0 &&
                  <div className="sub__form-inner">
                    <h6 className="sub__form__title">
                      Sub-type
                    </h6>
                    <RadioButtons value={subType} options={objects.propertySubType[type]} onChange={setSubType} />

                  </div>
                }
              </div>

            </div>
            <div className="form__inner">
              <h6 className="form__heading bordered">
                Condition <span className='red'>*</span>
              </h6>

              <div className="form__body">
                <RadioButtons options={["new", "recycling"]} onChange={setCoast} value={coast} />

                <div className="sub__form-inner">
                  <h6 className="sub__form__title">
                    Year built
                  </h6>
                  <div className="grid-box mini">
                    <MyInput label='Year' type={"number"} value={year} onChange={(e) => setYear(e.target.value)} />
                    <DropDown onChange={setQuarter} value={quarter || "Quarter"} options={objects.quarter} />
                  </div>
                </div>
              </div>

            </div>

            <div className="form__inner">
              <h6 className="form__heading">Location  <span className='red'>*</span></h6>
              <span className="form__line">
                Enter the exact address of the property. You can always hide the location and address name by selecting the 5 km range
              </span>
              <div className="form__body location-box">
                <MyInput label='adress' value={location} onChange={(e) => setLocation(e.target.value)} className={styles.full} />
                <DropDown value={locationType || "Exact address"} options={objects.adress} onChange={setLocationType} />
              </div>

            </div>
            <div className="form__inner">
              <h6 className="form__heading bordered">
                Real Estate Price  <span className='red'>*</span>
              </h6>
              <div className="form__body location-box">
                <MyInput label='price' type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                <DropDown value={currency || "Exact address"} options={objects.currencys} onChange={setCurrency} />
              </div>
            </div>
            <div className="form__inner ">
              <h6 className="form__heading bordered">
                Title and description <span className='red'>*</span>
              </h6>
              <div className="form__body">
                <MyInput label="Title" required value={title} onChange={e => setTitle(e.target.value)} className={styles.about} />

                <div className="textarea-box">
                  <textarea onChange={e => setDescription(e.target.value)} value={description}
                    placeholder='Property Description' />
                </div>
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading"> Image of real estate <span className="red">*</span></h6>
              <span className="form__line">
                Upload 3 to 50 real estate images with a weight of up to 10 mb in jpg / png format
              </span>
              <div className="form__body">
                <ImageUpload onChange={setFiles} srcList={fileNames.photos} />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading">In the apartment <span className="red">*</span></h6>
              <span className="form__line">
                Provide basic information about the parameters and layout of this property
              </span>
              <div className="form__body">
                <div className="lined__box">
                  <Specs label="Floor" value={floor} required onChange={setFloor} placeholder='Amount' />
                  <Specs label="Total area" value={total} required onChange={setTotal} placeholder='m²' />
                  <Specs label="Living area" value={living} onChange={setLiving} placeholder='m²' />
                  <Specs label="Kitchen area" value={kitchen} onChange={setKitchen} placeholder='m²' />
                  <Specs label="Ceiling height" value={height} onChange={setHeight} placeholder='m' />
                  <Specs label="Total rooms" value={rooms} required onChange={setRooms} placeholder='Amount' />
                  <Specs label="Bedroom" value={bedroom} onChange={setBedroom} placeholder='Amount' />
                  <Specs label="Bathroom" value={bathroom} onChange={setBathroom} placeholder='Amount' />
                </div>
                <CheckBoxButtons values={additionalList} editable options={objects.additional} onChange={setAdditionalList} />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading">Equipment</h6>
              <span className="form__line">
                Specify the main comfort items and technologies that the apartment is equipped with
              </span>
              <div className="form__body">
                <CheckBoxButtons values={equipmentList} editable options={objects.equipment} onChange={setEquipmentList} />
              </div>
            </div>

            <div className="form__inner">
              <h6 className="form__heading">Apartment layout</h6>
              <span className="form__line">
                Upload apartment layout with weight up to 10 mb in jpg / png / pdf format
              </span>
              <div className="form__body">
                <ImageUpload onChange={setLayout} srcList={fileNames.layouts} id="property-layout" />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading">On the territory</h6>
              <span className="form__line">
                Indicate basic information about the layout and facilities of the area
              </span>
              <div className="form__body">
                <div className="lined__box">
                  <Specs label="Area of territory" onChange={setTerritorySquare} placeholder='m²' />
                </div>
                <CheckBoxButtons values={territoryList} editable options={objects.territory} onChange={setTerritoryList} />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading"> Area planning</h6>
              <span className="form__line">
                Upload a site layout with up to 10 mb in jpg / png / pdf format
              </span>
              <div className="form__body">
                <ImageUpload onChange={setTerritoryLayout} srcList={fileNames.territory} id="territory-layout" />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading"> Places nearby</h6>
              <span className="form__line">
                Specify the distance from the property to important locations and infrastructure facilities
              </span>
              <div className="form__body">
                <CheckBoxButtons values={besideList} editable options={objects.beside} onChange={setBesideList} />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading">Views</h6>
              <span className="form__line">Indicate views from the property's windows</span>
              <div className="form__body">
                <CheckBoxButtons values={viewsList} editable options={objects.views} onChange={setViewsList} />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading">Services and maintenance </h6>
              <span className="form__line">Specify the service or services you provide</span>
              <div className="form__body">
                <CheckBoxButtons values={servicesList} editable options={objects.services} onChange={setServicesList} />
              </div>
            </div>
            <div className="form__inner">
              <h6 className="form__heading bordered">Commission for realtor</h6>

              <div className="form__body">
                <div className="grid-box">
                  <MyInput label='Commission amount' type={"number"} value={commission} onChange={(e) => setCommission(e.target.value)} />
                  <DropDown direction onChange={setComType} value={comType} options={objects.comission} />
                </div>
              </div>

            </div>
            {required &&
              <div className="button-bar">
                <span>Once published, the object page will be seen by all users</span>
                <button className='blue-btn' onClick={EditObject}>Save</button>
              </div>
            }

          </div>
          :
          <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" >
            <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
          </svg>
        }


      </div >

    </main >
  )
}
