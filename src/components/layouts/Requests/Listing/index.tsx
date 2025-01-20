"use client"
import React from "react";
import { Request } from "@/modules/types/Requests";
import Card from "../Card";


const Listing = ({ list, withBtn }: { list: Request[], withBtn?: boolean }) => {
  return (
    <div className="container-fluid">
      <div className="leads">
        {list?.map((obj) => { return <Card offer={obj} my={withBtn} key={obj.id} /> })}
      </div>
    </div>
  )
}


export default Listing;