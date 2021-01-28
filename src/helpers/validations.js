import { validate_component } from "svelte/internal"
export const isEmpty = (val) => {
  return val.trim().length === 0
}

export const isEmailValid = (val) => {
  return new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?").test(val)
}

export const isImageValid = (val) => {
  return new RegExp("https?:\/\/.*\.(?:png|jpg)").test(val)
}