export class Form {
  constructor(form, controls) {
    this.form = form
    this.controls = controls
  }

  value() {
    const value = {}

    Object.keys(this.controls).forEach(control => {
      value[control] = this.form[control].value
    })

    return value
  }

  clear() {
    Object.keys(this.controls).forEach(control => {
      this.form[control].value = ''
    })
  }

  isValid() {
    let isFormValid = true

    Object.keys(this.controls).forEach(control => {
      const validators = this.controls[control]

      let isValid = true
      validators.forEach(validator => {
        isValid = validator(this.form[control].value) && isValid
      })

      !isValid ? setError(this.form[control]) : clearError(this.form[control])


      isFormValid = isFormValid && isValid

    })

    return isFormValid
  }
}

function setError($control) {
  clearError($control)

  let error = ''

  console.log($control.value)

  if ($control.name === "fulltext" && $control.value === '' && $control.value.trim() === '') {
    error = '<p class="validation-error">Поле обязательно для заполнения</p>'
  } else if ($control.name === "fulltext" && $control.value.length < 10) {
    error = '<p class="validation-error"> Минимальная длина - 15 символов</p>'
  } else {
    error = '<p class="validation-error">Поле обязательно для заполнения</p>'
  }
 


$control.classList.add('invalid')
  $control.insertAdjacentHTML('afterend', error)
}

function clearError($control) {
  $control.classList.remove('invalid')

  if ($control.nextSibling) {
    $control.closest('.form-control').removeChild($control.nextSibling)
  }
}