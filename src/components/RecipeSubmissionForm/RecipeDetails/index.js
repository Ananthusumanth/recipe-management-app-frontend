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
  const [title, settitle] = useState("")
  const [ingredients, setIngedients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [categories, setCategories] = useState("")
  const [ID, setID] = useState("")
  const [onEditbutton, setonEditbutton] = useState(false)

  const getDetails = async () => {
    const response = await fetch("https://recipe-management-app-35ab.onrender.com/recipes")
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

  const editButton = (id, TITLE, ing, ins, cate) => {
    setID(id)
    settitle(TITLE)
    setIngedients(ing)
    setInstructions(ins)
    setCategories(cate)
    setonEditbutton(true)
  }

  const onSave = async () => {
    const url = `https://recipe-management-app-35ab.onrender.com/recipes/${ID}`
    const userDetails = {title, ingredients, instructions, categories}
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(url, options)
    await response.json()
    window.location.reload();
  }

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
            <td className='tdbutton'><button type="button" className='buttonedit' onClick={() => editButton(each.id, each.title, each.ingredients, each.instructions, each.categories)}>EDIT</button></td>
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

  const addContentotable = async () => {
    const url = "https://recipe-management-app-35ab.onrender.com/recipes"
    const userDetails = {title, ingredients, instructions, categories}
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify(userDetails)
    }
    const response = await fetch(url, options)
    await response.json()
    window.location.reload();
  }

  return (
    <>
    <div className='Submissioncontainer'>
      <form className='form' onSubmit={addContentotable}>
        <div className='formdiv'>
            <label htmlFor="inputtitle">TITLE</label>
            <input type="text" value={title} id="inputtitle" className='input' required onChange={(e) => settitle(e.target.value)}/>
        </div>
        <div className='formdiv'>
            <label htmlFor="inputingredient">INGREDIENT</label>
            <input type="text" value={ingredients} id="inputingredient" className='input' required onChange={(e) => setIngedients(e.target.value)}/>
        </div>
        <div className='formdiv'>
            <label htmlFor="inputinstructions">INSTRUCTIONS</label>
            <textarea type="text" value={instructions} cols={20} rows={2} id="inputinstructions" required onChange={(e) => setInstructions(e.target.value)}/>
        </div>
        <div className='formdiv'>
            <label htmlFor="inputcategories">CATEGORIES</label>
            <input type="text" value={categories} id="inputcategories" className='input' required onChange={(e) => setCategories(e.target.value)}/>
        </div>
        {onEditbutton ? 
        <button type="button" className="save-button" onClick={onSave}>
          Save
        </button> : <button type='submit' className='buttonAdd'>Add</button>}
      </form>
    </div>
    <div className='second-container'>
      {returnResponse()}
    </div>
    </>
  )
}

export default RecipeDetails
