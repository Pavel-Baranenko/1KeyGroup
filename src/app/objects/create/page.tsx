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
import styles from "./index.module.scss"
import MapsService from '@/modules/services/MapService';
import { Suggestion } from '@/modules/types/Maps';


export default function CreateObject() {
  const { store } = React.useContext(Context)

  const { push } = useRouter();
  const [dealFormat, setFormat] = React.useState<string>("")
  const [type, setType] = React.useState<string>("")
  const [subType, setSubType] = React.useState<string>("")
  const [coast, setCoast] = React.useState<string>("")
  const [year, setYear] = React.useState<number>(0)
  const [quarter, setQuarter] = React.useState<number>(0)
  const [price, setPrice] = React.useState<number>(0)
  const [location, setLocation] = React.useState<string>('')
  const [locationType, setLocationType] = React.useState<string>()
  const [currency, setCurrency] = React.useState<string>("Euro, €")
  const [comType, setComType] = React.useState<string>("% of the transaction amount")
  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [floor, setFloor] = React.useState<number>(0)
  const [total, setTotal] = React.useState<number>(0)
  const [living, setLiving] = React.useState<number>(0)
  const [kitchen, setKitchen] = React.useState<number>(0)
  const [height, setHeight] = React.useState<number>(0)
  const [rooms, setRooms] = React.useState<number>(0)
  const [bedroom, setBedroom] = React.useState<number>(0)
  const [bathroom, setBathroom] = React.useState<number>(0)
  const [commission, setCommission] = React.useState<number>(0)
  const [territorySquare, setTerritorySquare] = React.useState<number>(0)
  const [additionalList, setAdditionalList] = React.useState<string[]>([])
  const [equipmentList, setEquipmentList] = React.useState<string[]>([])
  const [territoryList, setTerritoryList] = React.useState<string[]>([])
  const [besideList, setBesideList] = React.useState<string[]>([])
  const [viewsList, setViewsList] = React.useState<string[]>([])
  const [servicesList, setServicesList] = React.useState<string[]>([])
  const [files, setFiles] = React.useState<FileList>()
  const [layout, setLayout] = React.useState<FileList>()
  const [territoryLayout, setTerritoryLayout] = React.useState<FileList>()

  const [suggestion, setSuggestion] = React.useState<Suggestion[]>()
  const [mapId, setMapId] = React.useState<string>()


  let fileNames = {
    photos: [],
    layouts: [],
    territory: []
  }

  let required = dealFormat && type && location && price && title && files

  let requiredMass = [dealFormat, type, location, price, title, files]

  const checkRequired = () => {
    let count = 0;
    requiredMass.forEach(e => e && count++)

    return Math.floor(count / requiredMass.length * 10) * 10
  }

  const getMapItem = async () => {
    if (location) {
      const response = await MapsService.search(location)
      setSuggestion(response.data.suggestions)
    }
  }

  const Publish = async () => {
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

    const response = await ObjectsService.create({
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
        // address: location,
        address: location + '/' + mapId,//Это временное решение, убрать побыстрее
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
    }, store.user.ownProfiles[0].id)
    if (response.status == 200) push("/objects/my")
  }


  React.useEffect(() => { getMapItem() }, [location])

  return (
    <main>
      <div className={`load__line ${styles[`w${checkRequired()}`]}`} />
      <div className="container-fluid  offer-page">
        <div className="form settings" >
          <div className="settings-top">
            <h4>
              <a href="javascript:history.back()" className="back-link mob">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                  <rect width="28" height="28" rx="14" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0959 19.7071C16.4865 19.3166 16.4865 18.6834 16.0959 18.2929L11.8031 14L16.0959 9.70711C16.4865 9.31658 16.4865 8.68342 16.0959 8.29289C15.7054 7.90237 15.0723 7.90237 14.6817 8.29289L10.0353 12.9393C9.4495 13.5251 9.4495 14.4749 10.0353 15.0607L14.6817 19.7071C15.0723 20.0976 15.7054 20.0976 16.0959 19.7071Z" fill="#7786A5" />
                </svg>
              </a>
              Creating a real estate page</h4>
          </div>
          <div className="form__inner">
            <h6 className="form__heading bordered">
              Deal format <span className='red'>*</span>
            </h6>
            <div className="form__body">
              <RadioButtonGroup options={objects.deal} onChange={setFormat} />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading bordered">
              Type  <span className='red'>*</span>
            </h6>
            <div className="form__body">
              <RadioButtonGroup options={objects.propertyType} onChange={setType} />
              {type.length > 0 &&
                <div className="sub__form-inner">
                  <h6 className="sub__form__title">
                    Sub-type
                  </h6>
                  <RadioButtons options={objects.propertySubType[type]} onChange={setSubType} />

                </div>
              }
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading bordered">Condition</h6>

            <div className="form__body">
              <RadioButtons options={["new", "recycling"]} onChange={setCoast} />
              <div className="sub__form-inner">
                <h6 className="sub__form__title">Year built</h6>

                <div className="grid-box mini">
                  <MyInput label='Year' type={"number"} value={year || undefined} onChange={(e) => setYear(e.target.value)} />
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
              <div className={styles.map__input}>
                <MyInput label='adress' value={location} onChange={(e) => setLocation(e.target.value)} />
                {(location && suggestion && suggestion.length > 0) &&
                  <div className={styles.map__search__results}>
                    {suggestion.map((e) => {
                      return (
                        <div className={styles.map__search__item} key={e.mapbox_id} onClick={() => {
                          setMapId(e.mapbox_id)
                          setSuggestion([])
                          setLocation(e.full_address || e.address)
                        }}>
                          <span>{e.name_preferred || e.name}</span>
                          <p>{e.full_address || e.address}</p>
                        </div>
                      )
                    })}



                  </div>
                }

              </div>
              <div >
                <DropDown value={locationType || "Exact address"} options={objects.adress} onChange={setLocationType} />
              </div>
            </div>

          </div>
          <div className="form__inner">
            <h6 className="form__heading bordered">
              Real Estate Price  <span className='red'>*</span>
            </h6>
            <div className="form__body location-box">
              <MyInput label='price' type='number' value={price || undefined} onChange={(e) => setPrice(e.target.value)} />
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
              <ImageUpload onChange={setFiles} />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading">In the apartment</h6>
            <span className="form__line">
              Provide basic information about the parameters and layout of this property
            </span>
            <div className="form__body">
              <div className="lined__box">
                <Specs label="Floor" required onChange={setFloor} placeholder='Amount' />
                <Specs label="Total area" required onChange={setTotal} placeholder='m²' />
                <Specs label="Living area" onChange={setLiving} placeholder='m²' />
                <Specs label="Kitchen area" onChange={setKitchen} placeholder='m²' />
                <Specs label="Ceiling height" onChange={setHeight} placeholder='m' />
                <Specs label="Total rooms" required onChange={setRooms} placeholder='Amount' />
                <Specs label="Bedroom" onChange={setBedroom} placeholder='Amount' />
                <Specs label="Bathroom" onChange={setBathroom} placeholder='Amount' />
              </div>
              <CheckBoxButtons editable options={objects.additional} onChange={setAdditionalList} />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading">Equipment</h6>
            <span className="form__line">
              Specify the main comfort items and technologies that the apartment is equipped with
            </span>
            <div className="form__body">
              <CheckBoxButtons editable options={objects.equipment} onChange={setEquipmentList} />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading">Apartment layout </h6>
            <span className="form__line">
              Upload apartment layout with weight up to 10 mb in jpg / png / pdf format
            </span>
            <div className="form__body">
              <ImageUpload onChange={setLayout} id="property-layout" />
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
              <CheckBoxButtons editable options={objects.territory} onChange={setTerritoryList} />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading">Area planning</h6>
            <span className="form__line">
              Upload a site layout with up to 10 mb in jpg / png / pdf format
            </span>
            <div className="form__body">
              <ImageUpload onChange={setTerritoryLayout} id="territory-layout" />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading"> Places nearby</h6>
            <span className="form__line">
              Specify the distance from the property to important locations and infrastructure facilities
            </span>
            <div className="form__body">
              <CheckBoxButtons editable options={objects.beside} onChange={setBesideList} />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading">Views</h6>
            <span className="form__line">Indicate views from the property's windows</span>
            <div className="form__body">
              <CheckBoxButtons editable options={objects.views} onChange={setViewsList} />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading">Services and maintenance </h6>
            <span className="form__line">Specify the service or services you provide</span>
            <div className="form__body">
              <CheckBoxButtons editable options={objects.services} onChange={setServicesList} />
            </div>
          </div>
          <div className="form__inner">
            <h6 className="form__heading bordered">Commission for realtor</h6>

            <div className="form__body">
              <div className="grid-box">
                <MyInput label='Commission amount' type={"number"} value={commission || undefined} onChange={(e) => setCommission(e.target.value)} />
                <DropDown direction onChange={setComType} value={comType} options={objects.comission} />
              </div>
            </div>

          </div>
          {required ?
            <div className="button-bar">
              <span>Once published, the object page will be seen by all users</span>
              <button className='blue-btn' onClick={Publish}>Publish</button>
            </div>
            : ""
          }

        </div>

      </div >

    </main >
  )
}
