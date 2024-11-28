const menuItems = document.querySelectorAll('.name-section__time-frames-btn')
const nameCard = document.querySelectorAll('.activity-container__title-h2')
const hrs = document.querySelectorAll('.activity-container__time-hrs')
const duration = document.querySelectorAll('.activity-container__time-last')


async function fetchData() {
	const URL = 'data.json'
	try {
		const response = await fetch(URL)
		if (!response.ok) {
			// console.log('Oops! Something went wrong.')
			throw new Error(response.statusText)
		}
		const data = await response.json()
		return data
	} catch {
		console.error('error')
	}
}

async function time(name) {
	const data = await fetchData()
	if (!data) return

	data.forEach((item, i) => {
		nameCard[i].textContent = item.title
		hrs[i].textContent = `${item.timeframes[name].current}hrs`

		const num = `${item.timeframes[name].previous}hrs`
		
		if (name === 'daily') {
			duration[i].textContent = 'Yesterday - ' + num
		} else if (name === 'weekly') {
			duration[i].textContent = 'Last Week - ' + num
		} else if (name === 'monthly') {
			duration[i].textContent = 'Last Month - ' + num
		}
	})
	
}

const activeLink = selectedLink => {
	menuItems.forEach(link => {
		if (link === selectedLink) {
			link.classList.add('name-section--active')
		} else {
			link.classList.remove('name-section--active')
		}
	})
}

window.addEventListener('DOMContentLoaded', () => {
	const link = document.querySelector('.name-section__time-frames-btn[data-default]')
	const defaultTime = link.textContent.toLowerCase()
	time(defaultTime)
	activeLink(link)
})

menuItems.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		const selectedTimeFrame = link.textContent.toLowerCase()
		time(selectedTimeFrame)
		activeLink(link)
	})
})
