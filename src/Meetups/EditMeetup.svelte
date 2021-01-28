<script>
  import MeetupsStore from './meetups-store.js'
  import { createEventDispatcher } from 'svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Button from '../UI/Button.svelte'
  import Modal from '../UI/Modal.svelte'
  import { isEmpty, isEmailValid, isImageValid } from '../helpers/validations.js'

  export let id = null

  let title = ''
  let subtitle = ''
  let address = ''
  let image = ''
  let email = ''
  let description = ''
  let isFormValid = false

  if (id) {
    const unsubscribe = MeetupsStore.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id)
      title = selectedMeetup.title
      subtitle = selectedMeetup.subtitle
      description = selectedMeetup.description
      image = selectedMeetup.imageUrl
      address = selectedMeetup.address
      email = selectedMeetup.contactEmail
    })
    unsubscribe()
  }

  $: isFormValid = !isEmpty(title) && !isEmpty(subtitle) && !isEmpty(address) && !isEmpty(image) && isEmailValid(email) && !isEmpty(description) 

  const dispatch = createEventDispatcher();

  function submitForm() {
    const newMeetup = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: image,
      address: address,
      contactEmail: email
    }

    if (id) {
      fetch(`https://svelte-course-1a51f-default-rtdb.firebaseio.com/meetups/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(newMeetup),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('An error occurred, please try again!')
        }
        MeetupsStore.updateMeetup(id, newMeetup)
      })
      .catch(err => console.log(err))
    } else {
      fetch('https://svelte-course-1a51f-default-rtdb.firebaseio.com/meetups.json', {
        method: 'POST',
        body: JSON.stringify({...newMeetup, isFavorite: false}),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('An error occurred, please try again!')
        }
        return res.json()
      })
      .then(data => {
        MeetupsStore.addMeetup({...newMeetup, isFavorite: false, id: data.name})
      })
      .catch(err => console.log(err))
      
    }
    dispatch('save-meetup')
  }

  function deleteMeetup() {
    fetch(`https://svelte-course-1a51f-default-rtdb.firebaseio.com/meetups/${id}.json`, {
        method: 'DELETE'
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('An error occurred, please try again!')
        }
        MeetupsStore.deleteMeetup(id)
      })
      .catch(err => console.log(err))
    dispatch('save-meetup')
  }

  function cancel() {
    dispatch('cancel-modal')
  }
</script>

<Modal title="Edit Meetup Data" on:cancel-modal>
  <form>
    <TextInput label="Title" 
               id="title" 
               value={title} 
               on:input={event => (title = event.target.value)}
               valid={!isEmpty(title)}
               validityMessage="Please enter a valid title."
    />
    <TextInput label="Subtitle" 
               id="subtitle" 
               value={subtitle} 
               on:input={event => (subtitle = event.target.value)}
               valid={!isEmpty(subtitle)}
               validityMessage="Please enter a valid subtitle."
    />
    <TextInput label="Address" 
               id="address" 
               value={address} 
               on:input={event => (address = event.target.value)}
               valid={!isEmpty(address)}
               validityMessage="Please enter a valid address."
    />
    <TextInput label="Image" 
               id="image" 
               value={image} 
               on:input={event => (image = event.target.value)}
               valid={isImageValid(image)}
               validityMessage="Please enter a valid image."
    />
    <TextInput label="Email" 
               id="email" 
               value={email} 
               type="email" 
               on:input={event => (email = event.target.value)}
               valid={isEmailValid(email)}
               validityMessage="Please enter a valid email."
    />
    <TextInput label="Description" 
               id="description" 
               bind:value={description} 
               type="textarea" 
               rows="3" 
               on:input={event => (description = event.target.value)}
               valid={!isEmpty(description)}
               validityMessage="Please enter a valid description."
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!isFormValid}>Save</Button>
    {#if id}
    <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>