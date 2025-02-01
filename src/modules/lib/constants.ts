export const objects = {
  "propertyType": [
    {
      "title": "Apartment",
      "value": "apartment"
    },
    {
      "title": "House",
      "value": "house"
    },
    {
      "title": "Land",
      "value": "land"
    },
    {
      "title": "Commercial",
      "value": "commercial"
    }
  ],
  "propertySubType": {
    "apartment": [
      "lodging",
      "apartments",
      "penthouse",
      "loft"
    ],
    "house": [
      "cottage",
      "private house",
      "villa",
      "duplex",
      "townhouse",
      "homestead",
      "mansion",
      "manor",
      "maisonette",
      "castle"
    ],
    "land": [
      "land plot",
      "island",
      "vineyard"
    ],
    "commercial": [
      "hotel",
      "office",
      "trade",
      "storage",
      "catering",
      "manufacture",
      "free appointment",
      "other"
    ]
  } as Record<string, string[]>,
  currencys: [
    { title: "Euro, €", value: "€" },
    { title: "USD, $", value: "$" },
    { title: "RUB, ₽", value: "₽" },
    { title: "GBP, £", value: "£" },
    { title: "TRY, ₺", value: "₺" },
    { title: "AED, د. إ.", value: "د. إ." }
  ],
  adress: [
    { title: "Exact address", value: "address" },
    { title: "Range 5 km", value: "range" }
  ],
  additional: [
    { title: "Kitchen", value: "Kitchen" },
    { title: "Balcony", value: "Balcony" },
    { title: "Hall", value: "Hall" },
    { title: "Lounge", value: "Lounge" },
    { title: "Vestibule", value: "Vestibule" },
    { title: "Storeroom", value: "Storeroom" }
  ],
  equipment: [
    { title: "Soft furnishings", value: "Soft furnishings" },
    { title: "Kitchen furniture", value: "Kitchen furniture" },
    { title: "Household appliances", value: "Household appliances" },
    { title: "TV", value: "TV" },
    { title: "Refrigerator", value: "Refrigerator" },
    { title: "Microwave", value: "Microwave" },
    { title: "Oven", value: "Oven" },
    { title: "Washer", value: "Washer" },
    { title: "Coffeemaker", value: "Coffeemaker" },
    { title: "Air conditioner", value: "Air conditioner" },
    { title: "Fireplace", value: "Fireplace" },
    { title: "Wi-Fi", value: "Wi-Fi" },
    { title: "Jacuzzi", value: "Jacuzzi" },
    { title: "Smart home", value: "Smart home" }
  ],
  quarter: [
    { title: "1", value: "1" },
    { title: "2", value: "2" },
    { title: "3", value: "3" },
    { title: "4", value: "4" },
  ],
  goal: ["For living", "For seasonal vacations", "Rent", "Resell", "Save money", "Get a residence permit"],
  comission: [
    { title: "% of the transaction amount", value: "% of the transaction amount" },
    { title: "Fixed sum", value: "Fixed sum" },
    { title: "By arrangement", value: "By arrangement" },
    { title: "No commission", value: "No commission" },
  ],
  territory: [
    { title: "Open parking", value: "Open parking" },
    { title: "Pool", value: "Pool" },
    { title: "Hamam", value: "Hamam" },
    { title: "Sauna", value: "Sauna" },
    { title: "Gym", value: "Gym" },
    { title: "Cafe", value: "Cafe" },
    { title: "Children's playground", value: "Children's playground" },
    { title: "Security", value: "Security" },
    { title: "Video surveillance", value: "Video surveillance" },
    { title: "Garden", value: "Garden" },
    { title: "lounge zone", value: "lounge zone" }
  ],
  beside: [
    { title: "Sea", value: "Sea" },
    { title: "Pond", value: "Pond" },
    { title: "Park", value: "Park" },
    { title: "City Center", value: "City Center" },
    { title: "Metro", value: "Metro" },
    { title: "Kindergarten", value: "Kindergarten" },
    { title: "School", value: "School" },
    { title: "University", value: "University" },
    { title: "Hospital", value: "Hospital" },
    { title: "Supermarket", value: "Supermarket" },
    { title: "Café", value: "Café" },
    { title: "Restaurant", value: "Restaurant" },
    { title: "Club", value: "Club" },
    { title: "Shopping center", value: "Shopping center" }
  ],
  views: [
    { title: "Panoramic", value: "Panoramic" },
    { title: "At sea", value: "At sea" },
    { title: "To the river", value: "To the river" },
    { title: "To the lake", value: "To the lake" },
    { title: "To the mountains", value: "To the mountains" },
    { title: "To the city", value: "To the city" },
    { title: "To the park", value: "To the park" },
    { title: "Into the woods", value: "Into the woods" },
    { title: "To the garden", value: "To the garden" },
    { title: "On the field", value: "On the field" },
    { title: "In the courtyard", value: "In the courtyard" }
  ],
  services: [
    { title: "Remote transaction", value: "Remote transaction" },
    { title: "Free real estate tour", value: "Free real estate tour" },
    { title: "Cashbaсk", value: "Cashbaсk" },
    { title: "Cryptocurrency payment", value: "Cryptocurrency payment" },
    { title: "Real estate management", value: "Real estate management" },
    { title: "Re-sale", value: "Re-sale" },
    { title: "Legal assistance", value: "Legal assistance" }
  ],
  deal: [
    { title: "Buy", value: "buy" },
    { title: "Rent", value: "rent" }
  ]
}
