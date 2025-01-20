"use client"
import React from 'react'
import MyInput from '@/components/ui-kit/MyInput';
import RadioButtonGroup from '@/components/ui-kit/RadioButtonGroup';
import RadioButtons from '@/components/ui-kit/RadioButtons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Context } from '@/store/provider';
import DropDown from '@/components/ui-kit/DropDown';
import { objects } from '@/modules/lib/constants';
import RequestService from '@/modules/types/RequestService';



export default function LeadEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const { store } = React.useContext(Context)

  const { push } = useRouter();

  const [city, setCity] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [format, setFormat] = React.useState("");
  const [type, setType] = React.useState("");
  const [subType, setSubType] = React.useState("");
  const [year, setYear] = React.useState<number>();
  const [quarter, setQuarter] = React.useState<number>();


  const [goal, setGoal] = React.useState("");
  const [purchase, setPurchase] = React.useState("");
  const [urgency, setUrgency] = React.useState("");

  const [count, setCount] = React.useState("");

  const [coast, setCoast] = React.useState("")
  const [maxSquare, setMaxSquare] = React.useState<number>()
  const [minSquare, setMinSquare] = React.useState<number>()
  const [minPrice, setMinPrice] = React.useState<number>()
  const [maxPrice, setMaxPrice] = React.useState<number>()

  const [about, setAbout] = React.useState("")

  const getLead = async () => {
    const response = await RequestService.getById(Number(id))

    if (response.status == 200) {
      let obj = response.data
      setCity(obj.location.city[0])
      setRegion(obj.location.region[0])
      setFormat(obj.dealFormat)
      setType(obj.propertyType)
      setSubType(obj.propertySubType)
      setYear(obj.condition.buildingYear)
      setQuarter(obj.condition.buildingQuarter)
      setGoal(obj.purchaseGoal[0])
      setPurchase(obj.purchaseMethod)
      setUrgency(obj.urgency)
      setCount(obj.roomsCount.count[0])
      setCoast(obj.condition.status)
      setMaxSquare(obj.square.common.max)
      setMinSquare(obj.square.common.min)
      setMinPrice(obj.budget.min)
      setMaxPrice(obj.budget.max)
      setAbout(obj.description)
    }
  }

  const sendLead = async () => {
    try {
      const response = await axios.put(`https://rest.1key.group/api/leads`, {
        id: id,
        location: {
          city: [city],
          region: [region]
        },
        dealFormat: format,
        propertyType: type,
        propertySubType: subType,
        condition: {
          status: coast,
          buildingQuarter: quarter,
          buildingYear: year
        },
        roomsCount: {
          count: [count],
          bedroom: [],
          bathroom: [],
          balcony: []
        },
        square: {
          common: {
            min: maxSquare,
            max: minSquare
          },
          living: {
            min: 12,
            max: 34
          },
          kitchen: {
            min: 12,
            max: 34
          }
        },
        budget: {
          min: minPrice,
          max: maxPrice,
          currency: ""
        },
        purchaseGoal: [goal],
        urgency: urgency,
        purchaseMethod: purchase,
        description: about,
        type: type,
        parking: [],
        permits: [],
        storey: [],
        renovation: [],
        convenience: [],
        creator: {
          id: store.user.id,
          name: store.user.firstName + " " + store.user.lastName,
          avatar: store.user.photo ? `https://rest.1key.group/storage/images/${store.user.id}/${store.user.photo}` : "/img/static/grey.png",
          role: store.user.ownProfiles[0].type
        }

      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },

      })
      push('/leads/my')

    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => { getLead() }, [])

  return (
    <main>
      <div className="container offer-page">
        <div className="form settings" >
          <div className="settings-top">
            <h4>
              <a href="javascript:history.back()" className="back-link mob">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                  <rect width="28" height="28" rx="14" fill="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0959 19.7071C16.4865 19.3166 16.4865 18.6834 16.0959 18.2929L11.8031 14L16.0959 9.70711C16.4865 9.31658 16.4865 8.68342 16.0959 8.29289C15.7054 7.90237 15.0723 7.90237 14.6817 8.29289L10.0353 12.9393C9.4495 13.5251 9.4495 14.4749 10.0353 15.0607L14.6817 19.7071C15.0723 20.0976 15.7054 20.0976 16.0959 19.7071Z" fill="#7786A5" />
                </svg>
              </a>
              Edit request</h4>
          </div>


          <div className="form__inner ">
            <div className="form__heading">
              Location  <span className='red'>*</span>
            </div>
            <div className="form__line">
              Specify the city in which you are looking for real estate. You can specify one or more neighborhoods if you wish
            </div>
            <div className="form__body form__body-box search-reg">
              <div className="grid-box">
                <MyInput value={city} label="city " required onChange={e => setCity(e.target.value)} />
                <MyInput value={region} label="region " required onChange={e => setRegion(e.target.value)} />
              </div>

            </div>

          </div>
          <div className="form__inner ">
            <div className="form__heading bordered">
              Deal format <span className='red'>*</span>
            </div>

            <div className="form__body">
              <RadioButtonGroup options={objects.deal} value={format} onChange={setFormat} />

            </div>

          </div>
          <div className="form__inner ">
            <div className="form__heading bordered">
              Type  <span className='red'>*</span>
            </div>


            <div className="form__body">
              <RadioButtonGroup options={[
                { title: "Apartment", value: "apartment" },
                { title: "House", value: "house" },
                { title: "Land", value: "land" },
                { title: "Commercial", value: "commercial" }
              ]} onChange={setType} value={type} />

              {type.length > 0 &&
                <div className="sub__form-inner">
                  <div className="sub__form__title">
                    Sub-type
                  </div>
                  {(type === "apartment") ? <RadioButtons options={objects.propertySubType.apartment} onChange={setSubType} /> : ""}
                  {(type === "house") ? <RadioButtons options={objects.propertySubType.house} onChange={setSubType} /> : ""}
                  {(type === "land") ? <RadioButtons options={objects.propertySubType.land} onChange={setSubType} /> : ""}
                  {(type === "commercial") ? <RadioButtons options={objects.propertySubType.commercial} onChange={setSubType} /> : ""}
                </div>
              }
            </div>

          </div>
          {type != "land" &&
            <div className="form__inner ">
              <div className="form__heading bordered">
                Condition <span className='red'>*</span>
              </div>

              <div className="form__body">
                <RadioButtons options={["new", "recycling", "no matter"]} onChange={setCoast} />

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
          }

          {type != "land" &&
            <div className="form__inner ">
              <div className="form__heading bordered">
                Total rooms  <span className='red'>*</span>
              </div>

              <div className="form__body">
                <div className="form__radio-buttons">
                  <RadioButtons options={['studio', '1', '2', '3', '4', '5', '6+']} onChange={setCount} />
                </div>
                {/* {more &&
                <div className="open__more-descr">
                  <div className="sub__form-inner">
                    <div className="sub__form__title">
                      Bedroom
                    </div>
                    <RadioButtons options={['1', '2', '3', '4', '5', '6+']} onChange={setBedroom} />

                    <div className="sub__form__title">
                      Bathroom
                    </div>
                    <RadioButtons options={['1', '2', '3', '4', '5', '6+']} onChange={setBathroom} />

                    <div className="sub__form__title">
                      Balcony
                    </div>
                    <RadioButtons options={['1', '2', '3', '4', '5', '6+']} onChange={setBalcony} />

                  </div>
                </div>
              } */}


                {/* <button className={more ? "btn-reset open-more-btn down" : "btn-reset open-more-btn"} onClick={() => setMore(!more)}>{more ? "Hide" : "More"}</button> */}

              </div>

            </div>
          }

          <div className="form__inner ">
            <div className="form__heading bordered">
              Square  <span className='red'>*</span>
            </div>

            <div className="form__body">
              <div className="grid-box mini">
                <MyInput label="from" type='number' value={minSquare} onChange={e => setMinSquare(e.target.value)} />
                <MyInput label="to" type='number' value={maxSquare} onChange={e => setMaxSquare(e.target.value)} />
              </div>
            </div>

          </div>
          <div className="form__inner ">
            <div className="form__heading bordered">
              Your budget <span className='red'>*</span>
            </div>

            <div className="form__body">
              <div className="grid-box mini">
                <MyInput label="from " type='number' value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <MyInput label="to " type='number' value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              </div>
            </div>

          </div>
          <div className="form__inner ">
            <div className="form__heading">
              Purpose of purchase <span className='red'>*</span>
            </div>
            <div className="form__line">
              Indicate the most appropriate use for this property
            </div>
            <div className="form__body form__body-box">
              <RadioButtons options={["For living", "Rent", "Resell", "Save money", "Get a residence permit"]} onChange={setGoal} />
            </div>

          </div>
          <div className="form__inner ">
            <div className="form__heading bordered">
              Purchase Method
            </div>

            <div className="form__body">
              <RadioButtons options={["mortgage", "instalments", "cash", "certificate", "other"]} onChange={setPurchase} />
            </div>

          </div>
          <div className="form__inner ">
            <div className="form__heading bordered">
              Urgency of purchase
            </div>

            <div className="form__body">
              <RadioButtons options={["urgent", "find", "1-3 months", "3-6 months", "exploring"]} onChange={setUrgency} />
            </div>

          </div>
          <div className="form__inner ">
            <div className="form__heading bordered">
              Any requests?
            </div>

            <div className="form__body">
              <div className="textarea-box">

                <textarea onChange={e => setAbout(e.target.value)} value={about}
                  placeholder='Describe additional wishes' />

              </div>

            </div>

          </div>
          <button className=" reset-btn blue-btn submit-btn" onClick={sendLead}>Save</button>
        </div>
      </div >

    </main >
  );

}
