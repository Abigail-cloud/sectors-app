import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddSector= () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    industry,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createSector,
    editSector,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!industry ||!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if (isEditing) {
      editSector()
      return
    }
    createSector()
  }
  const handleSectorInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit sector' : 'add sector'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* industry*/}
          <FormRow
            type='text'
            name='industry'
            value={industry}
            handleChange={handleSectorInput}
                  />
                  
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleSectorInput }
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleSectorInput }
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleSectorInput }
          />
          {/* Sector status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleSectorInput }
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleSectorInput }
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddSector