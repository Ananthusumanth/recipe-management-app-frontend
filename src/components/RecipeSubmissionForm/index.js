import React from 'react'
import "./index.css"

function RecipeSubmissionForm() {
  return (
    <div className='Submissioncontainer'>
      <form className='form'>
        <div className='formdiv'>
            <label htmlFor="inputtitle">TITLE</label>
            <input type="text" id="inputtitle" className='input' required/>
        </div>
        <div className='formdiv'>
            <label htmlFor="inputingredient">INGREDIENT</label>
            <input type="text" id="inputingredient" className='input' required/>
        </div>
        <div className='formdiv'>
            <label htmlFor="inputinstructions">INSTRUCTIONS</label>
            <textarea type="text" cols={20} rows={2} id="inputinstructions" required/>
        </div>
        <div className='formdiv'>
            <label htmlFor="inputcategories">CATEGORIES</label>
            <input type="text" id="inputcategories" className='input' required/>
        </div>
        <button type='submit' className='buttonAdd'>Add</button>
      </form>
    </div>
  )
}

export default RecipeSubmissionForm
