import React, { useEffect, useState } from 'react'
import "./index.css"

const apiContentResponse = {
  intially: "INITALLY",
  in_progress : "IN_PROGRESS",
  success: "SUCCESS",
  isFailed: "IS_FAILED"
}

function RecipeDetails() {
  const [res, setResponse] = useState({
    state: apiContentResponse.intially,
    details: null
  })

  const getDetails = async () => {
    const response = await fetch("http://localhost:3000/recipes")
    if (response.ok){
      const data = await response.json()
      setResponse({state: apiContentResponse.success, details: data})
    }else {
      setResponse({state: apiContentResponse.isFailed})
    }
  }

  useEffect(()=>{
    setResponse({state: apiContentResponse.in_progress})
    getDetails()
  },[])

  const isLoadingView = () => (
    <div className='loader' data-testid="loader">
        <h1>Loading..........</h1>
    </div>
  )

  const isFailedView = () => (
      <div className='loader' data-testid="loader">
          <p>Failed to load......</p>
      </div>
  )

  const successView = () => (
      <table className='table'>
        <tr className='data-table'>
          <th className='th'>TITLE</th>
          <th className='th'>INGREDIENT</th>
          <th className='th'>INSTRUCTIONS</th>
          <th className='th'>CATEGORIES</th>
          <th className='thnill'></th>
        </tr>
        {res.details.length === 0 ? <h1>Empty....</h1> 
        :
        res.details.map((each) => (
          <tr key={each.id} className='data-table'>
            <td className='td'>{each.title}</td>
            <td className='td'>{each.ingredients}</td>
            <td className='td'>{each.instructions}</td>
            <td className='td'>{each.categories}</td>
            <td className='tdbutton'><button type="button" className='buttonedit'>EDIT</button></td>
          </tr>
        ))}
      </table>
  )

  const returnResponse = () => {
    const {state} = res
    switch (state) {
      case apiContentResponse.in_progress:
        return isLoadingView()
      case apiContentResponse.isFailed:
        return isFailedView()
      case apiContentResponse.success:
        return successView()
      default:
        return isLoadingView()
    }
  }

  return (
    <>
    {returnResponse()}
    </>
  )
}

export default RecipeDetails
