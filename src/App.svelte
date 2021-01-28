<script>
  import { onMount } from 'svelte'
  import MeetupsStore from './Meetups/meetups-store.js'
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import EditMeetup from './Meetups/EditMeetup.svelte'
  import MeetupDetails from './Meetups/MeetupDetails.svelte'
  import Loading from './UI/Loading.svelte'
  import Error from './UI/Error.svelte'

  let editMode = null
  let editedId = null;
  let page = 'overview'
  let pageData = {}
  let isLoading = true
  let error

  onMount(() => {
    fetch('https://svelte-course-1a51f-default-rtdb.firebaseio.com/meetups.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('An error occurred, please try again!')
        }
        return res.json()
      })
      .then(data => {
        const loadedData = []
        for (const key in data) {
          loadedData.push({
            ...data[key],
            id: key
          })
        }
        setTimeout(() => {
          MeetupsStore.setMeetups(loadedData.reverse())
          isLoading = false
        }, 1000)
      })
      .catch(err => {
        error = err
        isLoading = false
        console.log(err);
      })
  })

  let addMeetup = () => {
    editMode = null
    editedId = null
  }

  let editMeetup = (event) => {
    editMode = 'edit'
    editedId = event.detail
  }

  function cancelEdit() {
    editMode = null
    editedId = null
  }

  function showDetails(event) {
    page = 'details'
    pageData.id = event.detail
  }

  function closeDetail() {
    page = 'overview'
    pageData = {}
  }

  function clearError() {
    error = null
  }
</script>

{#if error}
  <Error message={error.message} on:cancel-modal={clearError} />
{/if}

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save-meetup={addMeetup} on:cancel-modal={cancelEdit} />
    {/if}

    {#if isLoading}
      <Loading />
    {:else}
      <MeetupGrid 
        meetups={$MeetupsStore} 
        on:show-details={showDetails} 
        on:edit-meetup={editMeetup} 
        on:add={() => editMode = 'edit'} />
    {/if}
  {:else}
    <MeetupDetails id={pageData.id} on:close-details={closeDetail} />
  {/if}
  
</main>

<style>
  main {
    margin-top: 4rem;
  }
</style>