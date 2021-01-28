import { writable } from 'svelte/store'

const meetups = writable([
  // {
  //   id: 'm1',
  //   title: 'Coding Bootcamp',
  //   subtitle: 'Learn to code in 2 hours',
  //   description: 'In this meetup, we will have some experts that teach you how to code!',
  //   imageUrl:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
  //   address: '27th Nerd Road, 32523 New York',
  //   contactEmail: 'code@test.com',
  //   isFavorite: false
  // },
  // {
  //   id: 'm2',
  //   title: 'Swim Together',
  //   subtitle: 'Let\'s go for some swimming',
  //   description: 'We will simply swim some rounds!',
  //   imageUrl:
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
  //   address: '150th Fanatic Avenue, 56789 Tampa',
  //   contactEmail: 'swim@test.com',
  //   isFavorite: false
  // },
  // {
  //   id: 'm3',
  //   title: 'Montain Run',
  //   subtitle: 'Let\'s go for some running on the montain!',
  //   description: 'We will run across the Italian Montains and see who survive!',
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2017/07/24/12/43/schrecksee-2534484_960_720.jpg",
  //   address: '24100 Bergamo, Province of Bergamo, Itália',
  //   contactEmail: 'running@test.com',
  //   isFavorite: false
  // },
  // {
  //   id: 'm4',
  //   title: 'Balloon Expo',
  //   subtitle: 'An amazing balloon expo!',
  //   description: 'We will present a nice outdoor balloon exposition in the beautifull city of Capadocia!',
  //   imageUrl:
  //     "https://cdn.pixabay.com/photo/2017/05/21/15/14/balloon-2331488_960_720.jpg",
  //   address: 'Goreme, Turkey',
  //   contactEmail: 'balloonexpo@test.com',
  //   isFavorite: false
  // }
])

const meetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: data => {
    meetups.set(data)
  },
  addMeetup: (data) => {
    const newMeetup = {...data}
    meetups.update(items => {
      return [newMeetup, ...items]
    })
  },
  updateMeetup: (id, data) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id)
      const updatedMeetup = {...items[meetupIndex], ...data}
      const updateMeetups = [...items]
      updateMeetups[meetupIndex] = updatedMeetup
      return updateMeetups
    })
  },
  deleteMeetup: (id) => {
    meetups.update(items => {
      return items.filter(i => i.id !== id)
    })
  },
  toggleFavorite: id => {
    meetups.update(items => {
      const updatedMeetup = {...items.find(val => val.id === id)}
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite

      const meetupIndex = items.findIndex(val => val.id === id)
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex] = updatedMeetup

      return updatedMeetups
    })
  }
}

export default meetupsStore