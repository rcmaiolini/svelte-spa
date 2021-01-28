<script>
  import { createEventDispatcher } from 'svelte'
  import { scale } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import MeetupItem from './MeetupItem.svelte'
  import MeetupFilter from './MeetupFilter.svelte'
  import Button from '../UI/Button.svelte';

  const dispatch = createEventDispatcher();

  export let meetups
  let favsOnly = false

  $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups
  
  let setFilter = (event) => {
    favsOnly = event.detail === 1
  }
</script>

<section id="filters">
  <MeetupFilter on:filter={setFilter} />
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>

{#if filteredMeetups.length === 0}
   <p class="no-meetups">No meetups found, you can start adding some.</p>
{:else}
  <section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
      <div transition:scale animate:flip={{duration: 300}}>
        <MeetupItem
          id={meetup.id}
          title={meetup.title}
          subtitle={meetup.subtitle}
          description={meetup.description}
          imageUrl={meetup.imageUrl}
          address={meetup.address}
          isFav={meetup.isFavorite}
          on:show-details
          on:edit-meetup
        />
      </div>
    {/each}
  </section>
{/if}


<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #filters {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .no-meetups {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>